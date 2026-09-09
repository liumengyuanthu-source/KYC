"""Inspect every physical PDF page, render bounded visual samples, assemble internal review proof."""
from pathlib import Path
import json, re, subprocess, unicodedata, logging
import pdfplumber
from pypdf import PdfReader, PdfWriter

root=Path('prototype/qa/d5/print')
manifest=json.loads((root/'results.json').read_text())
writer=PdfWriter();results=[];samples=[];warnings=[]
class CapturedWarnings(logging.Handler):
    def emit(self,record):warnings.append(record.getMessage())
logger=logging.getLogger('pdfminer');logger.handlers=[CapturedWarnings()];logger.propagate=False
for view in manifest['results']:
    if view['status']!='passed':
        raise RuntimeError('Cannot assemble a failed print view')
    source=Path(view['pdf']);page_checks=[];texts=[]
    with pdfplumber.open(source) as doc:
        for index,page in enumerate(doc.pages):
            text=page.extract_text() or '';texts.append(text)
            clipped=[c.get('text','') for c in page.chars if c.get('text','').strip() and (c['x0'] < -1 or c['top'] < -1 or c['x1'] > page.width+1 or c['bottom'] > page.height+1)]
            page_checks.append({'page':index+1,'text_chars':len(text),'clipped_characters':clipped[:20]})
        count=len(doc.pages)
    # Chrome's CJK font extraction may use Kangxi compatibility radicals.
    # Normalize only extraction for comparison; never alter the PDF or source text.
    text=unicodedata.normalize('NFKC','\n'.join(texts))
    checks={'nonempty_pages':all(p['text_chars']>20 for p in page_checks),'no_page_overflow':all(not p['clipped_characters'] for p in page_checks)}
    checks['synthetic_not_bank_approved_header']='合成演示记录' in text and '未获银行批准' in text if view['locale']=='zh-CN' else 'Synthetic demonstration record' in text and 'not bank-approved' in text
    if view['role']!='ROLE-KYCOPS':
        checks['restricted_terms_absent']=not re.search(r'1970|1971|person-t-c01|sanctions_name_match|D4A-MATCH|comparison_basis',text)
    else:
        checks['required_identity_comparison_present']='1970' in text and '1971' in text and 'Person T' in text
        checks['isolated_time_example_present']='D5U-TIME-DEMO-01' in text
        checks['all_six_steps_present']=all(x in text for x in (['绑定查询','比较信息','按需补证','复核包','人判断','记录局部结果'] if view['locale']=='zh-CN' else ['Bind query','Compare information','Request evidence if needed','Review pack','Human judgment','Record local result']))
    if view['locale']!='zh-CN':checks['no_unexpected_chinese']=not re.search('[\u4e00-\u9fff]',text)
    results.append({'name':view['name'],'pages':count,'checks':checks,'page_checks':page_checks})
    for index in sorted({1,(count+1)//2,count}):
        prefix=root/f"{view['name']}-page{index}"
        subprocess.run(['pdftoppm','-f',str(index),'-singlefile','-scale-to','1600','-png',str(source),str(prefix)],check=True,capture_output=True)
        samples.append({'view':view['name'],'page':index,'image':str(prefix)+'.png'})
    writer.append(PdfReader(source),outline_item=f"{view['name']} — synthetic review proof")
(root/'physical-results.json').write_text(json.dumps({'results':results,'parser_warnings':{'count':len(warnings),'samples':list(dict.fromkeys(warnings))}},indent=2))
(root/'sample-manifest.json').write_text(json.dumps(samples,indent=2))
if any(not all(r['checks'].values()) for r in results):
    print(json.dumps(results,indent=2));raise RuntimeError('PDF check failed; do not deliver merged proof')
target=Path('output/pdf/d5-product-review-proof.pdf');target.parent.mkdir(parents=True,exist_ok=True)
writer.add_metadata({'/Title':'D5 Product Experience — Internal Synthetic Review Proof','/Subject':'Local prototype proof; not bank policy, client communication, or operational approval'})
with target.open('wb') as output:writer.write(output)
print(json.dumps({'views':len(results),'physical_pages':sum(r['pages'] for r in results),'samples':len(samples),'proof':str(target),'checks':[{r['name']:r['checks']} for r in results]},indent=2))
