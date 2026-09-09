import {defineConfig} from './tooling/node_modules/@playwright/test/index.mjs';
import path from 'node:path';import {fileURLToPath} from 'node:url';
const auditDir=path.dirname(fileURLToPath(import.meta.url));
export default defineConfig({testDir:'./tests',testMatch:'visual.spec.mjs',workers:1,timeout:30000,retries:0,outputDir:'./screenshots/diffs',snapshotPathTemplate:path.join(auditDir,'screenshots/baselines/{arg}{ext}'),reporter:[['list'],['json',{outputFile:path.join(auditDir,'reports/visual-results.json')}]],use:{browserName:'chromium',launchOptions:{executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'},viewport:{width:1440,height:900},reducedMotion:'reduce',locale:'en-AU',timezoneId:'Australia/Sydney',trace:'retain-on-failure'}});
