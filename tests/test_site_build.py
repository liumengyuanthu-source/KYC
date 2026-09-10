import json
import tempfile
import unittest
from pathlib import Path
from scripts.build_site import build_site, site_files, prepare_output


class SiteBuildTests(unittest.TestCase):
    def setUp(self):
        self.temp = tempfile.TemporaryDirectory()
        self.addCleanup(self.temp.cleanup)
        self.root = Path(self.temp.name)/'source'
        self.root.mkdir()
        self.write('deploy/site-files.json',json.dumps({'include':['index.html','prototype'], 'exclude':['prototype/qa','prototype/tests'], 'extensions':['.html','.mjs','.json']}))
        self.write('index.html','<a href="./prototype/index.html">Open</a>')
        self.write('prototype/index.html','<script type="module" src="./app.mjs"></script>')
        self.write('prototype/app.mjs','export const value = 1;')
        self.write('prototype/qa/private-session.json','{"test":true}')
        self.write('prototype/tests/test.mjs','test')
        self.write('audit/report.html','audit')

    def write(self,path,text):
        file=self.root/path
        file.parent.mkdir(parents=True,exist_ok=True)
        file.write_text(text)

    def test_runtime_preserved_and_test_audit_files_excluded(self):
        output=Path(self.temp.name)/'site'
        manifest=build_site(output,self.root)
        self.assertEqual({f['path'] for f in manifest},{'index.html','prototype/index.html','prototype/app.mjs'})
        self.assertEqual((output/'prototype/app.mjs').read_bytes(),(self.root/'prototype/app.mjs').read_bytes())
        self.assertTrue((output/'.nojekyll').exists())
        self.assertTrue(all(len(f['sha256'])==64 for f in manifest))

    def test_only_owned_generated_outputs_can_be_replaced(self):
        output=Path(self.temp.name)/'site'
        build_site(output,self.root)
        (output/'stale.html').write_text('stale')
        build_site(output,self.root)
        self.assertFalse((output/'stale.html').exists())
        (output/'.git').mkdir()
        with self.assertRaises(ValueError):
            build_site(output,self.root)
        with self.assertRaises(ValueError):
            prepare_output(self.root,self.root)
        with self.assertRaises(ValueError):
            build_site(self.root/'prototype/generated',self.root)

    def test_symlink_and_missing_inputs_fail(self):
        (self.root/'prototype/linked.mjs').symlink_to(self.root/'prototype/app.mjs')
        with self.assertRaises(ValueError):
            site_files(self.root)
        (self.root/'prototype/linked.mjs').unlink()
        (self.root/'index.html').unlink()
        with self.assertRaises(ValueError):
            site_files(self.root)


if __name__ == '__main__':
    unittest.main()
