"""Read actual browser print proofs; do not equate text extraction with visual QA."""
from pathlib import Path
import json,re,logging
import pdfplumber

warnings=[]
class WarningCapture(logging.Handler):
    def emit(self,record): warnings.append(record.getMessage())
pdf_logger=logging.getLogger('pdfminer')
pdf_logger.handlers=[WarningCapture()]
pdf_logger.propagate=False

root=Path('output/pdf/operating-model')
results=[]
for path in sorted(root.glob('*.pdf')):
    with pdfplumber.open(path) as pdf:
        texts=[page.extract_text() or '' for page in pdf.pages]
        text='\n'.join(texts)
        failures=[]
        if not texts or any(len(t.strip())<30 for t in texts): failures.append('Blank or nearly blank page')
        if 'zh-CN' not in path.name and re.search(r'[\u3400-\u9fff]',text): failures.append('Chinese text in English proof')
        for i,page in enumerate(pdf.pages):
            outside=[c.get('text') for c in page.chars if c['x0']<0 or c['x1']>page.width+1 or c['top']<0 or c['bottom']>page.height+1]
            if outside: failures.append(f'Page {i+1} text out of page bounds: {outside[:10]}')
        if 'scenario' in path.name:
            for expected in ['D4A-MATCH-01-01','D4A-MATCH-07-02','OM-F3','OM-F4','OM-F6']:
                if expected not in text: failures.append('Missing offscreen scenario content '+expected)
        if 'skill' in path.name and 'SK-03' not in text and 'SK-06' not in text: failures.append('Missing selected Skill')
        for i,page_text in enumerate(texts):
            if 'Person T' not in page_text or 'D4 v0.1' not in page_text: failures.append(f'Page {i+1} missing repeated context/version')
            if not re.search(r'Synthetic|synthetic|合成',page_text): failures.append(f'Page {i+1} missing synthetic label')
            if not re.search(r'Workflow contains work.*Human decides|图例',page_text): failures.append(f'Page {i+1} missing repeated legend')
        if 'customer' in path.name:
            for forbidden in ['IC-PHKL','INT-C0','D3-ISS','/Users/','score_rationale','N = 8']:
                if forbidden in text: failures.append('Restricted customer payload '+forbidden)
        results.append(dict(file=str(path),pages=len(pdf.pages),status='failed' if failures else 'passed',failures=failures,text_characters=len(text),page_sizes=[[p.width,p.height] for p in pdf.pages]))
Path('prototype/qa/operating-model/pdf-results.json').write_text(json.dumps(dict(results=results,parser_warning_count=len(warnings),parser_warning_examples=list(dict.fromkeys(warnings))),indent=2))
print(json.dumps(dict(results=[{k:v for k,v in r.items() if k!='page_sizes'} for r in results],parser_warning_count=len(warnings),parser_warning_examples=list(dict.fromkeys(warnings))),indent=2))
raise SystemExit(1 if not results or any(x['status']=='failed' for x in results) else 0)
