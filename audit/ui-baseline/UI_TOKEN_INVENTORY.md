# Current UI baseline

Inspected BEFORE fresh screenshots. Source of truth: current prototype/glass.css, readability/navigation styles and product-experience/product-experience.css, not older design prose. All source files hashed.

| Layer | Existing implementation |
|---|---|
| Colour | ink #17191c; muted #5b6067; blue #086bb5; deep blue #004d86; paper #efede9; translucent white panel |
| Typography | Helvetica Neue / Helvetica / Arial / PingFang SC / Microsoft YaHei; operational 14px, metadata 12px, mobile inputs 16px; display headings light |
| Spacing | Operational grid gap 32px; panel padding 28px; details 12px; 6-step strip gap 4px |
| Radius | Glass panel 30px, card 22px, capsule control 999px; D5 step cards 6px, layout editor 8px |
| Border / surface | Muted grey-blue hairlines, soft white glass; backdrop blur + simulated gradient bevel/highlight, NOT physical optical refraction |
| Icons | Existing ui-icon / status icon mapping; labels remain sharp |
| States | Focus-visible blue outline; disabled grey; glass pressed/release; reduced motion disables transforms/transitions |
| Layout | Evidence/action 1.9:1; six steps desktop, three <=900px, two <=650px; task grid stacks <=650px |
| Breakpoints | Glass 1200,1101,700; D5 1200,900,650; audit also checks tablet/mobile |

Exact declarations: tokens.json. No palette/radius/font redesign authorised by this audit.
