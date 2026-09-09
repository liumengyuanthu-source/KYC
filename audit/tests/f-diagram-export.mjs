// Export only delivered F candidates. DG-F02 is a disclosed semantic fallback.
import {exportDiagrams} from './diagram-export.mjs';
const result=await exportDiagrams({root:new URL('../../prototype/diagrams/batch-f/',import.meta.url),names:['DG-F01.en-AU','DG-F01.zh-CN','DG-F03.en-AU','DG-F03.zh-CN']});
console.log(JSON.stringify({exports:result.exports,status:result.status}));
