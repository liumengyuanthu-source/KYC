#!/usr/bin/env python3
"""Prepare a clean KYC source snapshot, without pushing or deploying it."""
import argparse
import json
import subprocess
from pathlib import Path
from build_site import ROOT, site_files, prepare_output, copy_files

EXTRAS = [
    'README.md', '.gitignore', '.gitattributes',
    '.github/workflows/pages.yml', 'deploy/site-files.json',
    'docs/DEPLOYMENT.md', 'docs/RELEASE_NOTES.md',
    'scripts/build_site.py', 'scripts/preview.py', 'scripts/prepare_kyc_release.py',
    'tests/test_site_build.py',
    'prototype/tests/scenario-mapping.test.mjs', 'prototype/tests/journey-scenario-popup.test.mjs',
]

if __name__ == '__main__':
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--output',type=Path,default=ROOT/'.release/KYC')
    args = parser.parse_args()
    files = sorted(set(site_files()+[Path(p) for p in EXTRAS]))
    for file in files:
        if not (ROOT/file).is_file():
            raise ValueError(f'Missing release input: {file}')
    output = prepare_output(args.output)
    manifest = copy_files(files,output)
    commit = subprocess.check_output(['git','rev-parse','HEAD'],cwd=ROOT,text=True).strip()
    report = {'source_commit':commit, 'source_has_uncommitted_changes':bool(subprocess.check_output(['git','status','--porcelain'],cwd=ROOT,text=True).strip()),
              'target_repository':'https://github.com/liumengyuanthu-source/KYC.git',
              'status':'prepared locally; not uploaded', 'files':manifest}
    (output/'release-manifest.json').write_text(json.dumps(report,ensure_ascii=False,indent=2)+'\n')
    print(f'Prepared {len(manifest)} files, {sum(f["bytes"] for f in manifest)/1024**2:.1f} MiB at {output}')
