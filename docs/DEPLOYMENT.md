# KYC repository and GitHub Pages

Target repository: https://github.com/liumengyuanthu-source/KYC.git

Prepared locally on 2026-09-09. No code has been uploaded and no Pages site has been published by this preparation. The repository is public and the currently connected GitHub account reports read permission only (`push: false`). Repository write access is needed for the later upload.

## Local review

```sh
python3 scripts/preview.py
```

Keep this process running while using the preview. The default port is 8899; use `--port 8900` if it is already in use. The server binds to `127.0.0.1` and does not share the workspace over the network.

```sh
python3 -m unittest discover -s tests -p test_site_build.py -v
node --test prototype/tests/scenario-mapping.test.mjs prototype/tests/journey-scenario-popup.test.mjs
python3 scripts/build_site.py
python3 scripts/preview.py --directory .build/site --port 8900
```

The runtime uses relative paths and can run under `/KYC/`. Site root redirects directly to the Journey Map, while preserving query parameters and the hash. Workshop and Demo remain accessible from the shared navigation. No npm install, database or service credentials are required.

## Prepared source snapshot

```sh
python3 scripts/prepare_kyc_release.py
```

This creates `.release/KYC/` as an independent source snapshot, with runtime assets, the selected runtime JSON dependencies, focused tests, deployment tooling, documentation and a SHA-256 manifest. It excludes historical Git history, original source attachments, baseline archives, audit outputs and QA screenshots/session captures. It does not delete or move the working files.

The runtime inclusion rules are in `deploy/site-files.json`. The same build runs locally and in GitHub Actions. Do not publish the entire historical workspace as the Pages artifact. Shared source IDs and synthetic process data are retained where the application uses them; this packaging step is not a content-publication approval.

The existing workspace's distribution policy requires a configured prohibited-term review before public sharing. Its `00_governance/prohibited_terms.txt` currently contains comments only, so that historical confidentiality gate is not recorded as passed. The generated snapshot is ready for content review, not certified for public distribution.

## Upload and publish, when approved

Use a GitHub identity that has write access to KYC. From the prepared snapshot, initialize a new repository if it has not already been initialized:

```sh
git init -b main
git add .
git commit -m "Import Clear-to-Trade main flow"
git remote add origin https://github.com/liumengyuanthu-source/KYC.git
git push -u origin main
```

For an already initialized snapshot, inspect `git status` and `git remote -v` first; do not reinitialize or force-push. If the remote has acquired commits, fetch and reconcile them before pushing.

After the code is uploaded:

1. In repository **Settings → Pages**, choose **GitHub Actions** as the source.
2. In **Actions**, select **Validate and publish Clear-to-Trade** and run it manually on `main`.
3. Pushes and pull requests run validation only. Manual execution on `main` builds and deploys the Pages artifact.
4. Use the deployment job's reported URL. The expected project URL is `https://liumengyuanthu-source.github.io/KYC/`; it is not live as part of this local preparation.

The workflow uses the official [GitHub Pages custom workflow](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages) with `configure-pages`, `upload-pages-artifact` and `deploy-pages`. Only the deployment job receives Pages write permissions.

## After deployment

Open the root URL, switch Workshop / Scenario Studio, open a node and its source-step preview, follow the scenario-detail CTA, and open Demo. Check English / Chinese and a narrow viewport. Browser-saved notes and synthetic demo state belong to each browser and are not uploaded or synchronized by this static site.
