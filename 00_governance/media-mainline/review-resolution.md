# Mainline integration checks and fixes

Only selected Scope/Entity media integration is in scope. Existing case/Batch A/Batch B engines were not edited.

| Finding / evidence | Root cause | Resolution / regression |
| --- | --- | --- |
| First screenshot: media transport covered dialog heading and language | Standalone sticky transport created a second navigation layer inside sticky host chrome | Embedded transport static; host slot isolated stacking context. Both direct-preview geometry checks place media below header. |
| Mandatory locale/source failure could render fallback English in another locale | Component initially maintained a second fallback narrative | Required content/views/locale now reject after cleanup; host-localized all-cue fallback is independent of optional media files. Module/all-media-blocked browser checks. |
| Help close could reopen when focus returned to trigger | focusin opened help again after programmatic restore | Refocus suppression; keyboard Escape and explicit close checks pass without closing host modal. |
| Async mount may finish after user leaves scene | Awaited imports/fetches outlive the original DOM | Host ticket + AbortSignal, component abort/disconnect check, stale callback rejection. Host unit tests cover stale completion. |
| Next at story end could move 16→13 | Last-beat clamping sought the last cue start | Dedicated RED regression failed, reducer fixed, then GREEN; ending remains stopped at16. |
| Frozen EV-A05 text could contradict a later live Batch B receipt | Existing live authority prose was hardcoded to Batch A opening state | Fixed live text reads actual receipt and purpose status; immutable story explicitly retains its snapshot. Unit test checks both side by side. |
| Independent component review: closed details would not render all cue children in print | display:block on details does not open the native content | Internal all-cue copy is now a non-collapsible print-only section. Actual Chromium print-media check confirms 5/6 cue articles are individually visible. Host all-cue printing remains independent. |
| Independent review: interactive close button used tooltip semantics | Tooltip ARIA pattern is non-interactive | Labelled/described non-modal dialog; keyboard behavior retained. Focused browser role/name and print-visible checks passed. |
| First browser script read shadow-host innerText / closed details as empty, and expected static Play not to step | Test harness did not account for Shadow DOM or approved reduced-motion stepping | Read shadow component DOM / fallback textContent; assert paused stepped behavior. Corrected harness rerun, not counted as implementation success from the failed run. |

Source diagram topology/ID mappings are documented in diagram-crosswalk.md. No bank policy or authority was inferred. Full data snapshots before/after controls and unsolicited media messages are compared, not just visible readiness labels.

Fresh unit/browser evidence is stored alongside this report. Standalone sample test numbers are retained only as historical source metadata.
