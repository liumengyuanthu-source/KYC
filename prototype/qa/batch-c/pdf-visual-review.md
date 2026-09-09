# PDF proof review

Actual PDFs generated from the browser-produced saved workflow (case revision 32, scope revision 3), not HTML screenshots relabelled as PDFs.

- `output/pdf/batch-c-match.en-AU.pdf`: 22 A4 pages. Rendered and visually inspected pages 1, 4 and 22 using `pdftoppm`. Title, comparison precision, full semantic decision content and final source-gap disclosure are legible; no clipping or overlap observed on these sampled pages.
- `output/pdf/batch-c-match.zh-CN.pdf`: 18 A4 pages. Rendered and inspected page 1; Chinese headings and body render correctly. Original synthetic record fields/rationales remain in their stored language rather than being represented as an official translation.
- `output/pdf/batch-c-client.en-AU.pdf`: one A4 page, rendered and visually inspected; role-safe progress only with intentional whitespace. Browser assertions exclude provider/comparison/decision/reference details.

`pypdf` text extraction found non-empty text on all 41 output pages. This is not a visual inspection of every page, an accessibility certification, or proof of tagged PDF structure. Long internal references are deliberately included, so the internal print proof is an audit appendix rather than a short workshop handout. Chrome print only; other native print engines have not been certified.

Rendered review images: `pdf-en-first.png`, `pdf-en-content.png`, `pdf-en-last.png`, `pdf-zh-first.png`. Actual browser/print assertions are in `print-results.json`.
