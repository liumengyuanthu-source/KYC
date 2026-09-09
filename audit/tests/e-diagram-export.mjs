// Preserve the E export entry point; common static export mechanics live in one helper.
import {exportDiagrams} from './diagram-export.mjs';
const result=await exportDiagrams({root:new URL('../../prototype/diagrams/batch-e/',import.meta.url),names:['DG-E01.en-AU','DG-E02.en-AU','DG-E01.zh-CN','DG-E02.zh-CN','DG-E03.zh-CN']});
console.log(JSON.stringify({exports:result.exports,status:result.status}));
