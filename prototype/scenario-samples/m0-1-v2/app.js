/* ============================================================
   Clear-to-Trade · Scenario Studio — M0.1
   Guided workshop wizard
   ============================================================ */
'use strict';

/* ---------------- icons (inline SVG, hand-drawn line style) ---------------- */
const I = {
  chat:'<svg viewBox="0 0 24 24" class="ic"><path d="M4 5h16v11H9l-5 4V5z" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/><path d="M8 9.5h8M8 12.5h5" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></svg>',
  map:'<svg viewBox="0 0 24 24" class="ic"><circle cx="5.5" cy="6" r="2.2" fill="none" stroke="currentColor" stroke-width="1.7"/><circle cx="18.5" cy="6" r="2.2" fill="none" stroke="currentColor" stroke-width="1.7"/><circle cx="12" cy="18" r="2.2" fill="none" stroke="currentColor" stroke-width="1.7"/><path d="M7.7 6h8.6M6.5 8l3.4 8M17.5 8l-3.4 8" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></svg>',
  search:'<svg viewBox="0 0 24 24" class="ic"><circle cx="10.5" cy="10.5" r="6" fill="none" stroke="currentColor" stroke-width="1.7"/><path d="M15.5 15.5L20 20" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/><path d="M8 10.5h5M10.5 8v5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>',
  agent:'<svg viewBox="0 0 24 24" class="ic"><path d="M12 3l1.8 4.6L18.5 9l-4.7 1.4L12 15l-1.8-4.6L5.5 9l4.7-1.4L12 3z" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/><path d="M18.5 15l.9 2.1 2.1.9-2.1.9-.9 2.1-.9-2.1-2.1-.9 2.1-.9.9-2.1z" fill="currentColor"/></svg>',
  gate:'<svg viewBox="0 0 24 24" class="ic"><path d="M7 3.5h10v6H7z" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/><path d="M12 9.5V13" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/><circle cx="12" cy="16.5" r="4" fill="none" stroke="currentColor" stroke-width="1.7"/><path d="M12 15v1.5l1.2 1" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>',
  doc:'<svg viewBox="0 0 24 24" class="ic"><path d="M6 3h8l4 4v14H6V3z" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/><path d="M14 3v4h4M9 12h6M9 15.5h6M9 8.5h2.5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>',
  mail:'<svg viewBox="0 0 24 24" class="ic"><rect x="3" y="5" width="18" height="14" rx="2.5" fill="none" stroke="currentColor" stroke-width="1.7"/><path d="M4 7.5l8 6 8-6" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  check:'<svg viewBox="0 0 24 24" class="ic"><path d="M5 12.5l4.5 4.5L19 7.5" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  play:'<svg viewBox="0 0 24 24" class="ic"><path d="M8 5.5v13l11-6.5-11-6.5z" fill="currentColor"/></svg>',
  stop:'<svg viewBox="0 0 24 24" class="ic"><rect x="7" y="7" width="10" height="10" rx="2" fill="currentColor"/></svg>',
  x:'<svg viewBox="0 0 24 24" class="ic"><path d="M6 6l12 12M18 6L6 18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>',
  chev:'<svg viewBox="0 0 24 24" class="ic chev"><path d="M6 9l6 6 6-6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  bldg:'<svg viewBox="0 0 24 24" class="ic"><path d="M4 20V5.5L12 3v17M12 8l8 2.5V20M4 20h16" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/><path d="M7.5 8.5h1.5M7.5 12h1.5M7.5 15.5h1.5M15.5 13h1.5M15.5 16.5h1.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>',
  user:'<svg viewBox="0 0 24 24" class="ic"><circle cx="12" cy="8" r="3.6" fill="none" stroke="currentColor" stroke-width="1.7"/><path d="M5 20c1.4-3.4 4-5 7-5s5.6 1.6 7 5" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></svg>',
  save:'<svg viewBox="0 0 24 24" class="ic"><path d="M5 4h11l3 3v13H5V4z" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/><path d="M8 4v5h7V4M8 20v-6h8v6" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/></svg>',
  print:'<svg viewBox="0 0 24 24" class="ic"><path d="M7 8V3.5h10V8M7 17H4v-7h16v7h-3" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/><rect x="7" y="14.5" width="10" height="6" fill="none" stroke="currentColor" stroke-width="1.7"/></svg>',
  next:'<svg viewBox="0 0 24 24" class="ic"><path d="M4 12h14M13 6l6 6-6 6" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  flag:'<svg viewBox="0 0 24 24" class="ic"><path d="M6 21V4M6 4.5h11l-2.5 4L17 12.5H6" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  spark:'<svg viewBox="0 0 24 24" class="ic"><path d="M12 4l1.6 4.4L18 10l-4.4 1.6L12 16l-1.6-4.4L6 10l4.4-1.6L12 4z" fill="currentColor"/><path d="M18.5 15.5l.8 2 2 .8-2 .8-.8 2-.8-2-2-.8 2-.8.8-2z" fill="currentColor" opacity=".6"/></svg>'
};

/* ---------------- wizard steps ---------------- */
const STEPS = [
  {id:'context',  label:'Context',     icon:'chat',
   sub:'The story frame: who asked, who is involved, and what M0.1 must establish.'},
  {id:'before',   label:'Before',      icon:'map',
   sub:'The current 10-step RM workflow as a playable map. Click any step to discuss Action → Pain → Opportunity → Blockers.'},
  {id:'diagnose', label:'Diagnose',    icon:'search',
   sub:'Validate working hypotheses, agree escalation handling, and inspect the Hero Case mock data behind the discussion.'},
  {id:'tobe',     label:'To-be',       icon:'agent',
   sub:'The agentic target workflow — Scope & Booking Agent with bounded skills, deterministic rules and explicit stop conditions.'},
  {id:'gates',    label:'Human Gates', icon:'gate',
   sub:'Five first-class decision points. Each shows why the Agent stopped, what it already did, and what happens after the answer.'},
  {id:'summary',  label:'Summary',     icon:'doc',
   sub:'Generated mapping, the Product Feature Bundle, and the editable Workshop Decision Summary — ready to save or export.'}
];

/* ---------------- Before: 10 current-state steps ---------------- */
const BEFORE = [
  {n:1, t:'Understand request', flags:[],
   doing:['Reads intake / email and manually interprets:','Entity A','Person T','Requested products','Geography','Relationship intent'],
   pain:'“I first have to piece together what this request actually is.”',
   opp:'Automatically create a structured business context and explicitly identify Known / Unknown information.',
   fwd:['Applicant entity identified','Product intent known','Geography known','Relationship trigger understood'],
   blk:['Applicant entity ambiguous','Relationship intent unclear','Product scope incomplete']},
  {n:2, t:'Search Entity A', flags:[],
   doing:['Searches Salesforce / RM system using:','Legal name','Customer number','Registration number','Known aliases'],
   pain:'“I found a record, but I’m not sure it is the entity I actually need.”',
   opp:'Entity Resolution + Candidate Comparison.',
   fwd:['A sufficiently supported applicant entity must be identified'],
   blk:['Similar legal names','Duplicate client records','Incomplete identifiers','Multiple candidate entities']},
  {n:3, t:'Find group relationship', flags:[],
   doing:['Searches for:','Similar company names','Parent / subsidiary records','Existing client relationships','Group notes','Prior onboarding / KYC information'],
   pain:'“I can find the company, but I may not be seeing the whole group.”',
   opp:'Automatically discover possible group relationships across permitted sources.',
   fwd:['At least one group-relationship hypothesis is established — or the system explicitly records that no supported relationship has been found'],
   blk:['Group records not linked','Different naming conventions','Multiple possible parents','Stale relationship information']},
  {n:4, t:'Verify Entity A ↔ Entity B', flags:[],
   doing:['Compares:','Legal names','Ownership / control','Historical KYC records','Relationship notes','Existing client data'],
   pain:'“They look related, but is that relationship still current?”',
   opp:'Multi-source relationship validation with source, freshness, confidence / support status, and contradictory evidence.',
   fwd:['Relationship becomes one of: supported · unsupported · unresolved · conflicting'],
   blk:['CRM says B is parent, current source disagrees','Ownership data is stale','Multiple parent candidates']},
  {n:5, t:'Check cross-region visibility', flags:['handoff','wait'],
   doing:['Determines whether an Australia RM can access the Singapore relationship. If not, RM may contact:','Singapore RM','Singapore KYC Operations','Another coverage / service team'],
   pain:'“I don’t know whether I can’t see it because the relationship doesn’t exist, or because I don’t have permission to see it.”',
   opp:'Explicitly distinguish: No relationship · Not visible · Not permitted · Unknown.',
   fwd:['The system must establish whether sufficient group-level context is available for M0.1'],
   blk:['Regional access restriction','Only summary-level visibility','No cross-region CRM linkage','Confirmation required from Singapore']},
  {n:6, t:'Interpret SG relationship relevance', flags:[],
   doing:['Determines what Entity B’s existing relationship means for Entity A’s request:','New relationship or extension?','Can group information be reused?','Does Singapore booking context matter?','What remains Entity-A-specific?'],
   pain:'“I found the parent relationship, but I still have to work out what it means for this request.”',
   opp:'Separate relationship discovery · applicability · reusable context · entity-specific requirements · information that must not be inherited automatically.',
   fwd:['The relevance of the Entity B relationship is classified'],
   blk:['Client relationship intent unclear','Reuse policy unclear','Group-level relationship exists but Entity A requires separate treatment']},
  {n:7, t:'Check product / booking / reporting options', flags:[],
   doing:['Checks across multiple rules / systems:','FX support','Trade Finance support','Jurisdiction constraints','Reporting model','Booking entity eligibility','Existing relationship context'],
   pain:'“I have to compare several systems and rules myself before I know which options are actually possible.”',
   opp:'Agent orchestrates Product Eligibility Skill, Booking Candidate Retrieval, Reporting Rule Service, and deterministic jurisdiction / booking rules.',
   fwd:['One or more supported options are generated'],
   blk:['No single entity supports both products','Two equally valid booking options','Policy / product rule conflict','Missing reporting context']},
  {n:8, t:'Resolve ambiguity', flags:['handoff'],
   doing:['Contacts:','Client','Singapore RM','Product team','KYC Operations','Booking specialist'],
   pain:'“Sometimes I only need one answer, but first I have to find the right person and explain the entire case again.”',
   opp:'Agent first attempts bounded resolution using available sources. If still unresolved, ask only the minimum necessary question.',
   fwd:['Required unknown is resolved — or a precise Human Gate is created'],
   blk:['Client intent ambiguous','Conflicting relationship evidence','Business judgement required','Exception required']},
  {n:9, t:'Determine context', flags:['branch'],
   doing:['Combines all information and chooses / proposes:','Sales location','Reporting context','Booking entity / booking model'],
   pain:'“Sometimes the problem isn’t that there is no answer — there are two valid answers and I have to decide which one is better.”',
   opp:'Agent prepares an Option Comparison: supported options, rule basis, implications, trade-offs, unresolved issues. Business judgement remains Human where required.',
   fwd:['Unique supported recommendation — or an explicit Human decision'],
   blk:['Multiple valid operating models','Policy exception','No supported option']},
  {n:10, t:'Record & handoff', flags:[],
   doing:['Updates CRM / case and hands the result to downstream onboarding.'],
   pain:'“After I make the decision, the next team still has to work out why I made it.”',
   opp:'Record structured: basis · source · source version / freshness · option considered · recommendation · human confirmation / authority · downstream use.',
   fwd:['WF-01 exposes the confirmed context as a downstream-consumable case state'],
   blk:['Incomplete basis','Missing confirmation','Stale rule version','Downstream system update failure']}
];

/* ---------------- To-be: agentic steps ---------------- */
const TOBE = [
  {n:1, t:'Understand request & establish goal', fn:'Create a structured business context for M0.1.',
   inp:['Applicant entity information','Person T','Requested products','Sales / relationship context','Relationship trigger'],
   beh:['Reads the current request','Identifies Known / Unknown','Establishes the M0.1 goal','Decides which information must be obtained next'],
   skl:['Case Context Extraction Skill','Existing case / CRM retrieval'],
   rul:['Access controls','Mandatory minimum context'],
   dec:null, out:['Structured current context + unresolved items'],
   nxt:'Step 2 — Resolve applicant entity',
   gate:'Applicant / relationship intent remains ambiguous.'},
  {n:2, t:'Resolve applicant entity', fn:'Identify the exact legal entity being onboarded.',
   inp:['Legal name','Registration information','CRM candidates','Existing relationships'],
   beh:['Calls Entity Resolution Skill and compares candidates'],
   skl:['Entity Resolution Skill','Candidate Comparison'],
   rul:['Entity matching confidence thresholds','Access controls'],
   dec:null, out:['Resolved Entity A — or a candidate set requiring clarification'],
   nxt:'Step 3 — Discover group relationships',
   gate:'No unique supported entity can be established.'},
  {n:3, t:'Discover group relationships', fn:'Find relevant group / parent relationships across permitted sources.',
   inp:['Resolved Entity A','Permitted relationship sources'],
   beh:['Searches relationship data','Discovers Entity B Singapore','Creates a relationship hypothesis'],
   skl:['Relationship Search'],
   rul:['Permitted source list','Cross-region access rules'],
   dec:null, out:['Entity B → parent / controlling entity → Entity A, with source / freshness'],
   nxt:'Step 4 — Validate relationship evidence',
   gate:'Multiple competing parent candidates / insufficient relationship data.'},
  {n:4, t:'Validate relationship evidence', fn:'Determine whether the A↔B relationship is sufficiently supported and current.',
   inp:['Relationship hypothesis','CRM relationship data','Ownership / registry sources'],
   beh:['Compares CRM relationship','Compares current ownership data','Compares registry / KYC relationship information'],
   skl:['Relationship Validation'],
   rul:['Currentness / source validity rules'],
   dec:['Supported','Unsupported','Conflicting','Unknown'],
   out:['Relationship support status with evidence'],
   nxt:'Step 5 — Check cross-region visibility / access',
   gate:'Sources conflict or currentness cannot be established.'},
  {n:5, t:'Check cross-region visibility / access', fn:'Determine whether the Singapore relationship context is available and usable under current access rights.',
   inp:['Entity B relationship identifier','RM access context'],
   beh:['Distinguishes: Found · Not found · Not visible · Not permitted · Unknown'],
   skl:['Cross-region visibility state check'],
   rul:['Access / disclosure rules','Regional permission model'],
   dec:['Found','Not found','Not visible','Not permitted','Unknown'],
   out:['Visibility / access state, and whether additional confirmation is required'],
   nxt:'Step 6 — Assess relationship relevance & reuse',
   gate:'Required relationship context needs regional confirmation.'},
  {n:6, t:'Assess relationship relevance & reuse', fn:'Determine what the existing Entity B relationship means for Entity A’s current request.',
   inp:['Validated relationship','Entity B relationship context','Reuse policy'],
   beh:['Separates potentially reusable: group structure · current parent identity · selected information subject to policy / currentness',
        'Entity A specific: local entity KYC · Person T authority · local product scope',
        'Not automatically inherited: Entity B booking context · clearance · legal agreement · Person T authority'],
   skl:['Relationship Applicability'],
   rul:['Reuse policy','Currentness rules'],
   dec:null, out:['Reuse classification: reusable / entity-specific / not inherited'],
   nxt:'Step 7 — Evaluate product / booking / reporting options',
   gate:'Applicability requires business / policy judgement.'},
  {n:7, t:'Evaluate product / booking / reporting options', fn:'Generate supported candidate operating contexts.',
   inp:['Product scope (FX + Trade Finance)','Entity / relationship context','Rule sets'],
   beh:['Orchestrates eligibility, booking and reporting evaluation in parallel'],
   skl:['Product Eligibility Skill','Booking Candidate Retrieval','Reporting Rule Service','Relationship Reuse Skill'],
   rul:['Product eligibility','Jurisdiction constraints','Reporting rules','Booking restrictions','Access / disclosure'],
   dec:null, out:['Supported candidate contexts — see Australia / Singapore comparison below'],
   nxt:'Decision — Enough information?',
   gate:'Multiple supported operating models · product split · policy exception · conflicting rules.'},
  {n:8, t:'Resolve gap — Agent first', fn:'Attempt to resolve unknowns before interrupting a person.',
   inp:['Unresolved items','Available approved sources','Existing case context'],
   beh:['Queries another approved source','Refreshes allowed relationship data','Inspects current product / rule data','Uses existing case context','Prepares one minimum clarification question'],
   skl:['Bounded Clarification','Clarification Question Preparation'],
   rul:['Only approved sources','One precise question at a time'],
   dec:['Unknown resolved → continue','Still unresolved → create Human Gate'],
   out:['Resolved context — or a precise Human Gate'],
   nxt:'Back into the flow — or pause at a Human Gate',
   gate:'Still unresolved after bounded resolution.'},
  {n:9, t:'Compare options / prepare recommendation', fn:'Distinguish a unique supported result from a business choice.',
   inp:['Supported candidate contexts','Rule basis','Constraints'],
   beh:['Prepares supported options','Why each option is supported','Constraints, implications, trade-offs','Unresolved items'],
   skl:['Explanation / Comparison Skill'],
   rul:['No recommendation around policy','Deterministic rule basis shown'],
   dec:['Unique supported result → recommendation','Multiple supported options → Human decision'],
   out:['Recommendation — or an explicit business choice presented to the Human'],
   nxt:'Step 10 — Record supported context',
   gate:'Business judgement required between valid options.'},
  {n:10, t:'Record supported context', fn:'Create an auditable, downstream-consumable M0.1 result.',
   inp:['Confirmed context','Human confirmation (if required)'],
   beh:['Records applicant relationship · sales location · reporting context · booking context','Records relationship link to Entity B and reusable group information','Records rule / source basis, version / freshness, human confirmation if required'],
   skl:['Structured Recommendation','Confirmation','Event / decision history'],
   rul:['Permission to record outcome','Audit trail mandatory'],
   dec:null, out:['WF-01 updates durable case state for downstream onboarding'],
   nxt:'Downstream onboarding',
   gate:'Missing confirmation or incomplete basis.'}
];

/* ---------------- Human Gates ---------------- */
const GATES = [
  {id:'HG-01', t:'Applicant / relationship clarification',
   trigger:'It is unclear whether Entity A is establishing a new relationship or extending Entity B’s existing Singapore relationship.',
   prep:['Entity A context','Entity B existing relationship','Product scope','Current relationship options'],
   q:'Is Entity A establishing a new Australian relationship, or extending the existing Singapore group relationship?',
   who:'RM / Client', after:'Agent resumes from current state.',
   opts:['New Australian relationship','Extends Singapore group relationship'],
   resume:['Relationship context retained','Intent confirmed: applies to Entity A onboarding','Re-evaluating booking candidates','Applying confirmed relationship context']},
  {id:'HG-02', t:'Relationship evidence conflict',
   trigger:'CRM and current ownership / registry evidence do not agree.',
   prep:['Source comparison','Last verified dates','Conflicting fields','Potential impact'],
   q:'Which source should be treated as current for the Entity A ↔ Entity B relationship?',
   who:'RM / KYC Operations', after:'Relationship status is updated; Agent resumes.',
   opts:['CRM record is current','Registry / ownership source is current','Request client evidence'],
   resume:['Conflicting sources retained with dates','Relationship status updated per decision','Re-validating downstream reuse eligibility','Continuing evaluation']},
  {id:'HG-03', t:'Cross-region confirmation',
   trigger:'Singapore relationship details are not available under the current access context and are needed for M0.1.',
   prep:['Entity B relationship identifier','What information is missing','Why it is required','Minimum confirmation request'],
   q:'Can Singapore confirm the minimum relationship context needed for the Australian onboarding?',
   who:'Singapore RM / Operations', after:'Agent resumes — or records the access limitation.',
   opts:['Confirmation provided','Partial / summary only','Access denied — record limitation'],
   resume:['Access request logged','Minimum context received','Group context updated','Resuming booking evaluation']},
  {id:'HG-04', t:'Business choice',
   trigger:'More than one booking / reporting option is valid.',
   prep:['Option A / Option B','Rule basis','Product coverage','Operational implications','Trade-offs'],
   q:'Both Australia and Singapore are valid booking contexts — which operating model should apply?',
   who:'RM / Booking / Product specialist', after:'Agent records the selected business context and continues.',
   opts:['Option A — Australia booking','Option B — Singapore booking','Split by product'],
   resume:['Options and trade-offs retained','Selected context recorded','Applying chosen booking model','Preparing structured recommendation']},
  {id:'HG-05', t:'Policy exception',
   trigger:'No standard supported option exists, or an override is required.',
   prep:['Why no standard option is supported','Rule basis for the stop','What an exception would require'],
   q:'An authorised exception is required to proceed. The Agent will not recommend around policy.',
   who:'Authorised specialist / policy authority', after:'Continue only with an authorised outcome.',
   opts:['Exception authorised','Stop — no exception'],
   resume:['Stop condition recorded','Authorisation captured with authority','Exception scope applied','Resuming under authorised outcome']}
];

/* ---------------- Hypotheses ---------------- */
const HYPO = [
  {id:'H1', t:'Group linkage', color:'pink',
   q:'Does Salesforce / the RM system already maintain the Entity A → Entity B parent / subsidiary relationship?',
   opts:['Yes','Partially','No','Unknown']},
  {id:'H2', t:'Cross-region visibility', color:'lav',
   q:'Can an Australia RM directly see Entity B’s existing Singapore relationship?',
   opts:['Full visibility','Summary only','Permission restricted','Separate regional confirmation required','Unknown']},
  {id:'H3', t:'Reuse / applicability', color:'mint',
   q:'If the Singapore relationship is visible, is it clear what information or relationship context may be reused for Entity A?',
   opts:['Clear rules exist','Partially clear','Primarily manual judgement','Unknown']}
];

/* ---------------- Escalation table ---------------- */
const ESC = [
  ['Entity A ↔ B relationship is explicit and current','Continue automatically','None'],
  ['Relationship may exist but sources disagree','Prepare source difference','RM / KYC Operations confirms'],
  ['Singapore relationship is not visible due to permissions','Initiate cross-region confirmation','Singapore RM / Operations'],
  ['Ownership data is stale','Try approved current sources first','Human if still unresolved'],
  ['Same group but relationship intent is unclear','Ask one precise question','RM / Client'],
  ['Multiple possible parent entities','Compare candidates','Human confirms'],
  ['Existing SG relationship affects AU booking and requires a business choice','Prepare options and impacts','RM / Booking specialist'],
  ['Policy exception required','Stop','Authorised specialist / policy authority']
];

/* ---------------- Mock data ---------------- */
const MOCK = [
  ['Applicant legal entity','Entity A — Global Tech Ltd','Intake / CRM','Can RM uniquely identify it?','Synthetic','st-syn'],
  ['Incorporation country','Australia','Registry / CRM','Is this current?','Synthetic','st-syn'],
  ['Parent entity','Entity B — Global Technologies Ltd','Group relationship / ownership data','Is linkage maintained in CRM?','Working hypothesis','st-wh'],
  ['Parent country','Singapore','CRM / registry','Cross-region visible?','Synthetic','st-syn'],
  ['Ownership / control','Entity B controls Entity A','Ownership data','Current / stale / conflicting?','Working hypothesis','st-wh'],
  ['Existing relationship','Entity B — existing institutional relationship','Singapore RM / CRM','Can AU RM see it?','Working hypothesis','st-wh'],
  ['Entity A relationship','New relationship','Intake','New vs extension confirmed?','Synthetic','st-syn'],
  ['Person T','Thomas Lee','Intake','Represents which entity / purpose?','Synthetic','st-syn'],
  ['RM','Sydney coverage team','RM system','Does RM system determine sales location?','Synthetic','st-syn'],
  ['Product 1','FX','Intake','Supported by which booking entities?','Synthetic','st-syn'],
  ['Product 2','Trade Finance','Intake','Supported by which booking entities?','Synthetic','st-syn'],
  ['Reporting context','TBD','M0.1','Rule / judgement?','Open','st-open'],
  ['Booking entity','TBD','M0.1','Unique candidate / multiple options?','Open','st-open'],
  ['Cross-region visibility','TBD','Salesforce / RM system','Full / summary / restricted?','To validate','st-tv'],
  ['Group reuse applicability','TBD','Policy / operating model','What can actually be reused?','To validate','st-tv']
];
const VARIANTS = [
  ['Happy case','A↔B current, SG relationship visible, unique AU booking result.','mint'],
  ['Access case','SG relationship exists but is not visible to AU RM.','blue'],
  ['Conflict case','CRM relationship and current ownership source disagree.','pink'],
  ['Choice case','AU and SG are both valid booking options.','lav'],
  ['Split-product case','FX and Trade Finance point to different booking options.','yellow'],
  ['Exception case','No standard supported booking option; policy exception required.','peach']
];

/* ---------------- Before → To-be mapping ---------------- */
const MAPPING = [
  ['RM interprets intake','Information scattered across inputs','Agent structures context + Unknowns','Ask RM only if applicant / intent is unclear'],
  ['RM searches Entity A','Similar / duplicate entities','Entity Resolution Skill','Cannot uniquely identify'],
  ['RM manually finds group','Cannot see the whole group','Agent searches permitted sources and builds relationship hypothesis','Multiple parent candidates'],
  ['RM verifies A/B','Relationship may be stale / conflicting','Agent compares source / freshness','Source conflict'],
  ['RM checks SG relationship','Not visible ≠ non-existent','Agent distinguishes not found / restricted / unknown','Cross-region confirmation'],
  ['RM interprets SG relationship','Found ≠ applicable','Agent separates reusable / entity-specific / not reusable','Applicability judgement'],
  ['RM checks product / booking','Multiple systems and rules','Agent orchestrates Skills + deterministic Rules','Only when options / rules require judgement'],
  ['RM asks many people','One unknown creates a full handoff','Agent resolves first; asks minimum necessary question','RM / Client / Specialist'],
  ['RM compares multiple options','Legal ≠ best operating choice','Agent prepares option comparison','Business judgement'],
  ['RM records result','Downstream cannot see why','Structured basis / source / version / confirmation','Formal confirmation'],
  ['Downstream re-interprets case','Handoff loses context','WF-01 exposes durable consumable case state','None']
];

/* ---------------- Product Feature Bundle ---------------- */
const BUNDLE = [
  ['Agent orchestration',['Goal management','Next-step planning','Multi-source investigation','Unknown detection','Bounded clarification','Pause / Resume','Option comparison','Recommendation preparation']],
  ['Skills',['Case Context Extraction','Entity Resolution','Relationship Search','Relationship Validation','Relationship Applicability','Product Eligibility','Booking Candidate Retrieval','Clarification Question Preparation','Explanation / Comparison Skill']],
  ['Rules / deterministic services',['Access / disclosure rules','Product eligibility','Jurisdiction constraints','Reporting rules','Booking restrictions','Currentness / source validity','Permission to record outcome']],
  ['Product UI capabilities',['Group Relationship View','Entity / relationship candidate comparison','Source & freshness display','Cross-region visibility state','Known / Unknown view','Reuse eligibility view','Agent Work State','Human Gate card','Option comparison','Agent Resume','Structured recommendation','Confirmation','Event / decision history']],
  ['Human roles',['RM','KYC Operations','Singapore RM / Operations','Product / Booking Specialist','Policy Authority']],
  ['Workflow — WF-01',['Durable workflow state','Current owner','Waiting on','Next actor','Human Gate','Stop / resume','Event history','Downstream handoff']]
];

/* ---------------- option comparison (To-be step 7) ---------------- */
const CMP = [
  ['Entity A jurisdiction alignment','ok:Supported','cond:Conditional'],
  ['FX support','ok:Supported','ok:Supported'],
  ['Trade Finance support','ok:Supported','cond:Conditional'],
  ['Reporting context','ok:Supported','cond:Needs confirmation'],
  ['Existing group relationship','new:New','exist:Existing via Entity B']
];

/* ============================================================
   state
   ============================================================ */
const LS_KEY = 'ctt-m01-studio-v2';
const blank = {
  step:0, done:{}, notes:{}, actions:{}, hypo:{}, gates:{},
  bundle:{}, summary:{status:'',trans:[],target:'',note:''},
  beforeQ:'', feed:[], visitedB:{}, visitedT:{}
};
let S;
try{ S = Object.assign(JSON.parse(JSON.stringify(blank)), JSON.parse(localStorage.getItem(LS_KEY)||'{}')); }
catch(e){ S = JSON.parse(JSON.stringify(blank)); }

let saveTimer=null;
function save(){
  renderActivity();
  const el=document.getElementById('saveState');
  el.textContent='Saving…';
  clearTimeout(saveTimer);
  saveTimer=setTimeout(()=>{
    localStorage.setItem(LS_KEY,JSON.stringify(S));
    el.textContent='All drafts saved locally';
  },350);
}
function feed(text,color){
  const t=new Date();
  S.feed.unshift({text,color:color||'var(--lav-d)',
    time:t.toLocaleTimeString([],{hour:'2-digit',minute:'2-digit'})});
  if(S.feed.length>14) S.feed.pop();
  save(); renderFeed();
}

/* ============================================================
   helpers
   ============================================================ */
const $=s=>document.querySelector(s);
const $$=s=>[...document.querySelectorAll(s)];
const esc=s=>String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');

let toastTimer=null;
function toast(msg){
  const t=$('#toast');
  t.innerHTML='<span class="t-dot"></span>'+esc(msg);
  t.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer=setTimeout(()=>t.classList.remove('show'),2600);
}

/* drawer */
function openDrawer(html){
  $('#drawer').innerHTML=html;
  $('#drawer').classList.add('open');
  $('#drawer').setAttribute('aria-hidden','false');
  $('#scrim').classList.add('on');
  $('#drawer').querySelector('.drawer-body').scrollTop=0;
}
function closeDrawer(){
  $('#drawer').classList.remove('open');
  $('#drawer').setAttribute('aria-hidden','true');
  $('#scrim').classList.remove('on');
}
document.addEventListener('click',e=>{
  if(e.target.closest('#scrim')||e.target.closest('.drawer-close')) closeDrawer();
});
document.addEventListener('keydown',e=>{ if(e.key==='Escape') closeDrawer(); });

/* discussion actions component */
const ACTS=[['agree','Agree'],['modify','Modify'],['na','Not applicable'],['validate','Needs validation']];
function actsHTML(id){
  const a=S.actions[id]||{};
  const btns=ACTS.map(([k,l])=>
    `<button class="act ${a.act===k?'sel':''} ${k==='na'?'act-na':''}" data-aid="${id}" data-act="${k}">${l}</button>`).join('')
    +`<button class="act ${a.comment||a.showC?'sel':''}" data-aid="${id}" data-act="comment">Comment</button>`;
  const showC=a.comment||a.showC?'show':'';
  return `<div data-acts-host="${id}"><div class="acts">${btns}</div>
    <div class="comment-row ${showC}">
      <input type="text" aria-label="Workshop comment: ${esc(labelFor(id))}" placeholder="Add a workshop comment…" value="${esc(a.comment||'')}" data-cid="${id}">
    </div></div>`;
}
const boundDiscussionControls=new WeakSet();
function bindActs(root){
  root.querySelectorAll('.act').forEach(b=>{
    if(boundDiscussionControls.has(b))return;
    boundDiscussionControls.add(b);
    b.addEventListener('click',()=>{
    const id=b.dataset.aid, k=b.dataset.act;
    const inlineComment=k==='comment'&&b.closest('.review-discussion,.legacy-escalation-review');
    const a=S.actions[id]||{};
    if(k==='comment'){ a.showC=inlineComment?true:!a.showC; }
    else{
      const was=a.act;
      a.act = was===k ? undefined : k;
      if(a.act&&a.act!==was){
        const lbl=ACTS.find(x=>x[0]===k)[1];
        toast(`${lbl} · recorded`);
        feed(`${lbl} — ${labelFor(id)}`,'var(--mint-d)');
      }
    }
    S.actions[id]=a; save();
    $$(`[data-acts-host="${id}"]`).forEach(host=>{
      const tmp=document.createElement('div');
      tmp.innerHTML=actsHTML(id);
      host.replaceWith(tmp.firstElementChild);
    });
    bindActs(document);
    if(inlineComment)inlineComment.querySelector(`input[data-cid="${id}"]`)?.focus();
    renderActivity();
    if(S.step===5)refreshSummaryDiscussion();
    });
  });
  root.querySelectorAll('input[data-cid]').forEach(inp=>{
    if(boundDiscussionControls.has(inp))return;
    boundDiscussionControls.add(inp);
    inp.addEventListener('input',()=>{
    const id=inp.dataset.cid; const a=S.actions[id]||{};
    a.comment=inp.value; S.actions[id]=a; save(); renderActivity();
    document.querySelectorAll(`input[data-cid="${id}"]`).forEach(other=>{if(other!==inp)other.value=inp.value;});
    if(S.step===5)refreshSummaryDiscussion();
    });
  });
}
function labelFor(id){
  if(/^b\d+$/.test(id)) return 'Before step '+id.slice(1)+' — '+BEFORE[+id.slice(1)-1].t;
  if(/^t\d+$/.test(id)) return 'To-be step '+id.slice(1)+' — '+TOBE[+id.slice(1)-1].t;
  if(/^e\d+$/.test(id)) return 'Escalation row '+id.slice(1);
  if(/^hg-/.test(id.toLowerCase())) return id.toUpperCase();
  return id;
}

/* notes binder */
function bindNotes(root,stepId){
  const ta=root.querySelector('textarea[data-notes]');
  if(!ta) return;
  ta.value=S.notes[stepId]||'';
  ta.addEventListener('input',()=>{ S.notes[stepId]=ta.value; save(); });
}

/* ============================================================
   right rail
   ============================================================ */
function renderHeroMini(){
  $('#heroMini').innerHTML=`
    <div class="t">${I.flag} Hero case — synthetic</div>
    <div class="persona">
      <img class="avatar persona-photo" src="assets/person-t.png" alt="Person T — synthetic persona" width="52" height="52">
      <div class="who"><b>Thomas Lee · Person T</b><span>Group Treasurer — represents Entity A</span></div>
    </div>
    <div class="entities">
      <div class="ent-row"><span class="ent-dot" style="background:var(--lav-d)"></span>Entity B — Singapore · parent · existing relationship</div>
      <div class="ent-row"><span class="ent-dot" style="background:var(--mint-d)"></span>Entity A — Australia · applicant · new relationship</div>
      <div class="ent-row"><span class="ent-dot" style="background:var(--peach-d)"></span>RM — Sydney / Australia coverage team</div>
    </div>
    <div style="margin-top:12px;display:flex;gap:7px;flex-wrap:wrap">
      <span class="chip chip-white">FX</span>
      <span class="chip chip-white">Trade Finance</span>
    </div>`;
}

function moduleProgress(){
  return discussionCoverage().map(s=>s.recorded/s.total);
}
function renderActivity(){
  if(!$('#activityCard'))return;
  const coverage=discussionCoverage(),recorded=coverage.reduce((n,s)=>n+s.recorded,0),slots=coverage.reduce((n,s)=>n+s.total,0);
  const p=moduleProgress();
  const total=Math.round(recorded/slots*100);
  const colors=['var(--pink)','var(--peach)','var(--lav)','var(--mint)','var(--gate-bg)','var(--blue)'];
  const bars=p.map((v,i)=>
    `<div class="bar" title="${STEPS[i].label}: ${coverage[i].recorded} / ${coverage[i].total} recorded"><i style="height:${Math.round(v*100)}%;background:${colors[i]}"></i><span>${STEPS[i].label.split(' ')[0]}</span></div>`).join('');
  $('#activityCard').innerHTML=`
    <div class="t">${I.doc} Discussion activity</div>
    <div class="activity-meta"><b>${total}%</b>
      <span class="chip ${total===100?'chip-mint':'chip-yellow'}" style="font-size:10px">${recorded===0?'Not started':total===100?'All prompts recorded':'In progress'}</span>
    </div>
    <div class="bars">${bars}</div><p class="coverage-note">${recorded} / ${slots} discussion prompts recorded. Includes comments and unanswered-issue flags; not approval or trade readiness.</p>
    <details class="coverage-note"><summary>How progress is counted</summary>${coverage.map((s,i)=>`<div>${STEPS[i].label}: ${s.recorded} / ${s.total}</div>`).join('')}<p>Each prompt counts once for a choice or non-empty comment. Optional module notes count once. Shared Before reviews count only under Before. Viewing, playing and feature suggestions do not count.</p></details>`;
}

function renderFeed(){
  const el=$('#feedCard');
  if(!S.feed.length){
    el.innerHTML=`<div class="t">${I.chat} Decisions & comments</div>
      <div class="feed-empty">Nothing captured yet. Agree / modify items, answer hypotheses, or decide a Human Gate — everything lands here and feeds the Summary.</div>`;
    return;
  }
  el.innerHTML=`<div class="t">${I.chat} Decisions & comments</div>
    <ul class="feed">${S.feed.map(f=>
      `<li><span class="f-dot" style="background:${f.color}"></span><span>${esc(f.text)}</span><span class="f-time">${f.time}</span></li>`).join('')}
    </ul>`;
}

/* ============================================================
   wizard chrome (progress + rail)
   ============================================================ */
function renderWiz(){
  const cur=S.step;
  $('#wiz').innerHTML=STEPS.map((s,i)=>{
    const done=!!S.done[s.id];
    const dot=done?I.check:(i+1);
    const cls=i===cur?'current':(done?'done':'');
    const link=i<STEPS.length-1?`<div class="wiz-link ${S.done[STEPS[i].id]?'fill':''}"><i></i></div>`:'';
    return `<button class="wiz-step ${cls}" data-step="${i}">
        <span class="wiz-dot">${dot}</span><span class="wiz-label">${s.label}</span>
      </button>${link}`;
  }).join('');
  $$('#wiz .wiz-step').forEach(b=>b.addEventListener('click',()=>go(+b.dataset.step)));
}
function renderRail(){
  $('#rail').innerHTML=STEPS.map((s,i)=>{
    const done=!!S.done[s.id];
    return `<button class="rail-btn ${i===S.step?'active':''} ${done?'done':''}" data-step="${i}">
      ${I[s.icon]}${done&&i!==S.step?'<span class="tick">✓</span>':''}
      <span class="tip">${i+1} · ${s.label}</span>
    </button>`;
  }).join('')+`
    <div class="rail-spacer"></div>
    <div class="rail-avatar" title="Facilitator">RM</div>`;
  $$('#rail .rail-btn').forEach(b=>b.addEventListener('click',()=>go(+b.dataset.step)));
}

/* ============================================================
   Module 1 — Context
   ============================================================ */
function renderContext(m){
  m.innerHTML=`
  <div class="sec">
    <div class="sec-head"><h2>The request that starts M0.1</h2>
      <span class="hint">Start of the story — compact by design</span></div>
    <div class="grid-2">
      <div class="card card-pink">
        <span class="card-tag">${I.user} Persona · initiator</span>
        <div class="persona">
          <div class="avatar avatar-lg av-pink">TL</div>
          <div class="who"><b>Person T — Thomas Lee</b><span>Group Treasurer · represents Entity A — Australia</span></div>
        </div>
        <div style="margin-top:14px;display:flex;gap:7px;flex-wrap:wrap">
          <span class="chip chip-white">New institutional onboarding</span>
          <span class="chip chip-white">FX</span>
          <span class="chip chip-white">Trade Finance</span>
        </div>
      </div>
      <div class="card">
        <span class="card-tag">${I.mail} Request · via email</span>
        <div class="bubble">
          <div class="from">${I.mail} Person T → RM · Sydney coverage</div>
          “We would like to onboard Entity A in Australia for FX and Trade Finance.”
        </div>
        <div class="bubble" style="margin-top:12px;border-radius:18px 4px 18px 18px">
          <div class="from">${I.agent} RM starts M0.1</div>
          Determine <b>sales location</b> &amp; <b>reporting / booking entity</b>.
        </div>
      </div>
    </div>
  </div>

  <div class="sec">
    <div class="sec-head"><h2>Case structure</h2>
      <span class="hint">Entity B’s group relationship is why M0.1 is triggered</span></div>
    <div class="grid-2-1">
      <div class="card card-mint" style="display:flex;justify-content:center">
        <div class="chain">
          <div class="chain-node" style="background:var(--lav)">
            <b>Entity B — Singapore</b>
            <small>Parent company · existing group banking relationship</small>
          </div>
          <div class="chain-link"><span class="stem"></span>owns / controls<span class="arr"></span></div>
          <div class="chain-node" style="background:var(--mint)">
            <b>Entity A — Australia</b>
            <small>Onboarding applicant · new relationship</small>
          </div>
          <div class="chain-link"><span class="stem"></span>represented by<span class="arr"></span></div>
          <div class="chain-node" style="background:var(--pink)">
            <b>Person T</b>
            <small>Group Treasurer / representative</small>
          </div>
        </div>
      </div>
      <div class="assume">
        <span class="chip chip-peach" style="font-size:10.5px">Synthetic Hero Case assumptions — for workshop discussion only</span>
        <ul>
          <li>Entity A is a new onboarding relationship.</li>
          <li>Entity B has an existing Singapore banking relationship.</li>
          <li>Entity B is the parent / controlling entity of Entity A.</li>
          <li>Person T represents Entity A for this onboarding request.</li>
          <li>RM is based in Sydney / Australia coverage.</li>
          <li>Products are FX + Trade Finance.</li>
        </ul>
      </div>
    </div>
  </div>

  <div class="sec">
    <div class="notes-label">${I.chat} Discussion notes — Context</div>
    <textarea class="notes-area" data-notes placeholder="What was agreed about the story frame, the parties, or the trigger?"></textarea>
  </div>`;
  bindNotes(m,'context');
}

/* ============================================================
   Module 2 — Before / Current Process
   ============================================================ */
let beforeWorkflowCleanup=null;
let tobeWorkflowCleanup=null;
function flagChip(f){
  if(f==='handoff')return '<span class="flag flag-handoff">Cross-region handoff</span>';
  if(f==='wait')return '<span class="flag flag-wait">Wait</span>';
  if(f==='branch')return '<span class="flag flag-branch">Branch</span>';
  return '';
}
function renderBefore(m){
  const nodes=BEFORE.map(s=>{
    const a=S.actions['b'+s.n];
    const visited=a&&(a.act||a.comment);
    return `<button class="node ${visited?'visited':''}" data-bnode="${s.n}">
      <div class="n-top"><span class="n-num">${s.n}</span><span class="n-title">${esc(s.t)}</span></div>
      <span class="n-status">${visited?'Discussed ✓':'Click to open'}</span>
      ${s.flags.length?`<div class="n-flags">${s.flags.map(flagChip).join('')}</div>`:''}
    </button>`;
  }).join('<div class="connector"></div>');

  m.innerHTML=`
  <div class="sec">
    <div class="card card-yellow" style="display:flex;align-items:center;gap:16px;flex-wrap:wrap">
      <div style="flex:1;min-width:260px">
        <b style="font-size:15px">“Is this broadly how M0.1 works today?”</b>
        <div style="font-size:12px;font-weight:600;color:var(--ink-2);margin-top:5px;line-height:1.5">
          All detailed current-state behaviour below is a <b>working hypothesis</b> unless confirmed by the client.</div>
      </div>
      <div class="radios" id="beforeQ">
        ${['Broadly yes','Partially','No'].map(o=>
          `<button class="radio-pill ${S.beforeQ===o?'sel':''}" data-v="${o}">${o}</button>`).join('')}
      </div>
    </div>
  </div>

  <div class="sec">
    <div class="sec-head"><h2>Current process — RM as human orchestrator</h2>
      <span class="spacer"></span><span class="hint">Playable · zoomable · click any step</span></div>
    <div class="mapwrap before-map" id="beforeMap">
      <div class="maptools">
        <span class="q" id="beforeMapTitle">M0.1 Sales location &amp; booking entity ｜ Before</span>
        <button class="toolbtn before-play" id="beforePlay" aria-pressed="false" disabled>Play guided tour</button>
        <button class="toolbtn" id="beforeExpand" aria-pressed="false">Expand diagram</button>
        <a class="toolbtn" href="diagrams/before.html?theme=light&v=manual-play-1" target="_blank" rel="noopener">Open full viewer ↗</a>
        <button class="toolbtn" id="beforeStaticToggle" aria-pressed="false">Static fallback</button>
      </div>
      <div class="before-viewer" id="mapscroll">
        <iframe id="beforeArchify" title="Interactive M0.1 Before workflow — Archify" src="diagrams/before.html?theme=light&v=manual-play-1" allow="fullscreen; clipboard-write" allowfullscreen></iframe>
        <div id="beforeStatic" hidden>
          <img src="diagrams/before.svg" alt="Complete Before workflow: Person T request followed by ten RM actions in numbered order">
          <p class="before-boundary">Static version · full process preserved. Open an action below for its discussion details.</p>
          <div class="before-static-actions">${nodes}</div>
        </div>
      </div>
      <div class="map-legend">
        <span id="beforeViewerStatus">Loading Archify… Static fallback is always available.</span>
        <span>Play / focus / export are read-only demonstrations.</span>
      </div>
    </div>
    <div class="before-detail-picker"><label for="beforeAction">Explore an action</label><select id="beforeAction"><option value="0">Trigger · Person T’s request</option>${BEFORE.map(s=>`<option value="${s.n}">${s.n} · ${esc(s.t)}</option>`).join('')}</select></div>
    <div class="card before-inspector" id="beforeInspector" aria-live="polite"></div>
  </div>

  <div class="sec">
    <div class="notes-label">${I.chat} Discussion notes — Before</div>
    <textarea class="notes-area" data-notes placeholder="Where did the client correct the workflow? What is confirmed vs assumed?"></textarea>
  </div>`;

  bindNotes(m,'before');
  m.querySelectorAll('[data-bnode]').forEach(n=>n.addEventListener('click',()=>{
    const k=+n.dataset.bnode; if(k>0) openBeforeStep(k);
  }));
  m.querySelectorAll('#beforeQ .radio-pill').forEach(b=>b.addEventListener('click',()=>{
    S.beforeQ=S.beforeQ===b.dataset.v?'':b.dataset.v; save();
    m.querySelectorAll('#beforeQ .radio-pill').forEach(x=>x.classList.toggle('sel',x.dataset.v===S.beforeQ));
    if(S.beforeQ){ toast('Current-process read · '+S.beforeQ); feed('“How M0.1 works today?” → '+S.beforeQ,'var(--yellow-d)'); }
  }));
  beforeWorkflowCleanup=BeforeWorkflow.mount(m,BEFORE,openBeforeStep);
}

function openBeforeStep(n){
  const s=BEFORE[n-1];
  S.visitedB[n]=true; save();
  const doingFirst=s.doing.length>1?`<div style="font-size:13.5px;font-weight:700;color:var(--ink-2);margin-bottom:6px">${esc(s.doing[0])}</div>`:'';
  const doingList=(s.doing.length>1?s.doing.slice(1):s.doing).map(d=>`<li>${esc(d)}</li>`).join('');
  openDrawer(`
    <div class="drawer-head">
      <div><div class="kicker">Before · Step ${s.n} of 10 · Working hypothesis</div><h3>${esc(s.t)}</h3></div>
      <button class="drawer-close">${I.x}</button>
    </div>
    <div class="drawer-body">
      <div class="d-sec">
        <div class="d-label"><span class="sq" style="background:var(--blue)"></span>What RM may be doing today</div>
        <div class="d-box">${doingFirst}<ul style="margin-top:${s.doing.length>1?'2px':'0'}">${doingList}</ul></div>
      </div>
      <div class="d-sec">
        <div class="d-label"><span class="sq" style="background:var(--pink)"></span>Human pain / friction</div>
        <div class="d-quote">${esc(s.pain)}</div>
      </div>
      <div class="d-sec">
        <div class="d-label"><span class="sq" style="background:var(--mint)"></span>Opportunity</div>
        <div class="d-box">${esc(s.opp)}</div>
      </div>
      <div class="d-sec">
        <div class="d-label"><span class="sq" style="background:var(--lav)"></span>Required to move to the next step</div>
        <ul>${s.fwd.map(f=>`<li>${esc(f)}</li>`).join('')}</ul>
      </div>
      <div class="d-sec">
        <div class="d-label"><span class="sq" style="background:var(--gate)"></span>Possible blockers</div>
        <div class="d-chips">${s.blk.map(b=>`<span class="chip chip-gate">${esc(b)}</span>`).join('')}</div>
      </div>
      <div class="d-sec">
        <div class="d-label"><span class="sq" style="background:var(--ink)"></span>Workshop discussion</div>
        ${actsHTML('b'+s.n)}
      </div>
    </div>`);
  bindActs($('#drawer'));
}

/* ============================================================
   Module 3 — Diagnose
   ============================================================ */
function renderDiagnose(m){
  const loop=[
    ['Current process','white'],['Pain','pink'],['Opportunity','yellow'],
    ['Agentic To-be','mint'],['Human role','lav'],['Features','peach']
  ];
  // Keep earlier escalation decisions attached to their original IDs, never to a Before action.
  const legacy=ESC.map((row,i)=>({row,id:'e'+(i+1)})).filter(({id})=>{
    const a=S.actions[id];return a&&(a.act||a.comment);
  });
  m.innerHTML=`
  <div class="sec">
    <div class="sec-head"><h2>Design chain</h2></div>
    <ol class="design-chain" aria-label="From current process to product features">${loop.map(([label,color])=>
      `<li class="card-${color}">${label}</li>`).join('')}</ol>
  </div>

  <div class="sec">
    <div class="sec-head"><h2>Working hypotheses to validate</h2><span class="hint">These are not conclusions</span></div>
    <div class="grid-3">${HYPO.map(h=>{
      const st=S.hypo[h.id]||{};
      return `<div class="hyp card-${h.color}">
        <span class="chip chip-white" style="font-size:10px">${h.id} · Working hypothesis</span>
        <h4>${esc(h.t)}</h4>
        <div class="q">${esc(h.q)}</div>
        <div class="radios" data-hypo="${h.id}">
          ${h.opts.map(o=>`<button class="radio-pill ${st.choice===o?'sel':''}" data-v="${esc(o)}">${esc(o)}</button>`).join('')}
        </div>
        <div class="comment-row show" style="margin-top:10px">
          <input type="text" placeholder="Client comment…" value="${esc(st.comment||'')}" data-hc="${h.id}">
        </div>
      </div>`;}).join('')}
    </div>
  </div>

  <div class="sec">
    <div class="sec-head"><h2 id="beforeReviewTitle">Before → pain → opportunity</h2>
      <span class="hint">Working hypotheses — validate with the client</span></div>
    <p class="diagnose-review-hint">Add a review or comment in the Discussion column. Your input is shared with the corresponding Before step.</p>
    <div class="diagnose-table-scroll" role="region" aria-labelledby="beforeReviewTitle" tabindex="0">
    <table class="esc diagnose-review">
      <thead><tr><th scope="col">Before step</th><th scope="col">RM possible action</th><th scope="col">Human Pain and Friction</th><th scope="col">Opportunity</th><th scope="col">Discussion</th></tr></thead>
      <tbody>${BEFORE.map(s=>`
        <tr data-before-step="${s.n}">
          <th scope="row"><span class="before-step-number">${s.n}</span>${esc(s.t)}</th>
          <td><p>${esc(s.doing[0])}</p>${s.doing.length>1?`<ul>${s.doing.slice(1).map(t=>`<li>${esc(t)}</li>`).join('')}</ul>`:''}</td>
          <td class="review-pain">${esc(s.pain)}</td>
          <td class="review-opportunity">${esc(s.opp)}</td>
          <td class="review-discussion">${actsHTML('b'+s.n)}</td>
        </tr>`).join('')}
      </tbody>
    </table>
    </div>
    ${legacy.length?`<details class="legacy-escalation-review">
      <summary>Earlier escalation reviews · ${legacy.length} saved</summary>
      <p>Kept separately under their original situations; not reassigned to Before steps.</p>
      ${legacy.map(({row,id})=>`<div class="legacy-review-item"><h3>${esc(row[0])}</h3>${actsHTML(id)}</div>`).join('')}
    </details>`:''}
  </div>

  <div class="sec">
    <div class="expander" id="mockExp">
      <button>${I.search} View Hero Case data &amp; assumptions <span class="chip chip-lav" style="font-size:10px">Mock · discussion aid</span> ${I.chev}</button>
      <div class="exp-body"><div class="exp-inner">
        <table class="mocktbl">
          <thead><tr><th>Field</th><th>Mock value</th><th>Source / assumed source</th><th>Current-state question</th><th>Status</th></tr></thead>
          <tbody>${MOCK.map(r=>`<tr>
            <td>${esc(r[0])}</td><td>${esc(r[1])}</td><td>${esc(r[2])}</td><td>${esc(r[3])}</td>
            <td><span class="st-tag ${r[5]}">${r[4]}</span></td></tr>`).join('')}
          </tbody>
        </table>
        <div class="notes-label" style="margin-top:18px">${I.flag} Mock variation cases — workshop backup (discussion aids, not separate scenarios)</div>
        <div class="variants">${VARIANTS.map(v=>
          `<div class="variant" style="background:var(--${v[2]})"><b>${esc(v[0])}</b>${esc(v[1])}</div>`).join('')}
        </div>
      </div></div>
    </div>
  </div>

  <div class="sec">
    <div class="notes-label">${I.chat} Discussion notes — Diagnose</div>
    <textarea class="notes-area" data-notes placeholder="Which steps, pain points and opportunities were confirmed? What needs to change?"></textarea>
  </div>`;

  bindNotes(m,'diagnose');
  bindActs(m);
  m.querySelectorAll('[data-hypo]').forEach(w=>w.querySelectorAll('.radio-pill').forEach(b=>b.addEventListener('click',()=>{
    const id=w.dataset.hypo; const st=S.hypo[id]||{};
    st.choice=st.choice===b.dataset.v?undefined:b.dataset.v;
    S.hypo[id]=st; save();
    w.querySelectorAll('.radio-pill').forEach(x=>x.classList.toggle('sel',x.dataset.v===st.choice));
    if(st.choice){ toast(`${id} · ${st.choice}`); feed(`${id} ${HYPO.find(h=>h.id===id).t} → ${st.choice}`,'var(--lav-d)'); }
    renderActivity();
  })));
  m.querySelectorAll('input[data-hc]').forEach(inp=>inp.addEventListener('input',()=>{
    const st=S.hypo[inp.dataset.hc]||{}; st.comment=inp.value; S.hypo[inp.dataset.hc]=st; save();
  }));
  const exp=$('#mockExp');
  exp.querySelector('button').addEventListener('click',()=>exp.classList.toggle('open'));
}

/* ============================================================
   Module 4 — To-be Agentic Execution
   ============================================================ */
function vNode(n,t,sub,cls,data){
  return `<button class="v-node ${cls||''}" ${data||''}>
    <span class="n-num">${n}</span><span><b>${t}</b>${sub?`<small>${sub}</small>`:''}</span>
  </button>`;
}
function vLink(lbl){
  return `<div class="v-link"><span class="stem"></span>${lbl?`<span>${lbl}</span>`:''}<span class="arr"></span></div>`;
}
function renderTobe(m){

  m.innerHTML=`
  <div class="sec">
    <div class="card card-mint" style="display:flex;gap:14px;align-items:center;flex-wrap:wrap">
      <div class="avatar av-mint">${I.agent}</div>
      <div style="flex:1;min-width:260px">
        <b style="font-size:15px">Diagnose → Transform → Product Solutioning</b>
        <div style="font-size:12.5px;font-weight:600;color:var(--ink-2);margin-top:4px;line-height:1.5">
          The Agent investigates, calls bounded Skills and deterministic Rules, identifies Unknowns, resolves what it can — and asks a precise Human only when required.</div>
      </div>
      <span class="chip chip-white">Agentic pattern · Scope &amp; Booking Agent</span>
    </div>
  </div>

  <div class="sec">
    <div class="sec-head"><h2>Target workflow — playable map</h2>
      <span class="spacer"></span><span class="hint">Human Gates are first-class objects, not icons</span></div>
    <div class="mapwrap before-map tobe-map" id="tobeMap">
      <div class="maptools">
        <span class="q">M0.1 Sales location &amp; booking entity ｜ To-be</span>
        <div class="tobe-view-switch" role="group" aria-label="Workflow section">
          <button class="toolbtn" data-tobe-view="investigate" aria-pressed="true">1 · Investigate</button>
          <button class="toolbtn" data-tobe-view="resolve" aria-pressed="false">2 · Resolve &amp; handoff</button>
        </div>
        <button class="toolbtn before-play" id="tobePlay" disabled aria-pressed="false">Play guided tour</button>
        <button class="toolbtn" id="tobeExpand" aria-pressed="false">Expand diagram</button>
        <a class="toolbtn" id="tobeFullViewer" href="diagrams/tobe-investigate.html?theme=light&v=manual-play-1" target="_blank" rel="noopener">Open full viewer ↗</a>
        <button class="toolbtn" id="tobeStaticToggle" aria-pressed="false">Static fallback</button>
      </div>
      <div class="before-viewer" id="tobeScroll">
        <iframe id="tobeArchify" title="Interactive M0.1 To-be workflow — Archify" allow="fullscreen; clipboard-write" allowfullscreen></iframe>
        <div id="tobeStatic" hidden>
          <img src="diagrams/tobe-investigate.svg" alt="Complete M0.1 investigation workflow">
          <p class="before-boundary">Static diagram · all action details remain available below.</p>
          <div class="before-static-actions">${TOBE.map(s=>`<button class="toolbtn" data-tnode="${s.n}">${s.n} · ${esc(s.t)}</button>`).join('')}</div>
        </div>
      </div>
      <div class="map-legend">
        <span id="tobeViewerStatus">Loading Archify…</span><span>Play / focus / export are read-only demonstrations.</span>
      </div>
    </div>
    <div class="before-detail-picker"><label for="tobeAction">Explore an action</label><select id="tobeAction"><option value="">Workflow context</option>${TOBE.map(s=>`<option value="${s.n}">${s.n} · ${esc(s.t)}</option>`).join('')}</select></div>
    <div class="card before-inspector" id="tobeInspector" aria-live="polite"></div>
  </div>

  <div class="sec">
    <div class="sec-head"><h2 id="tobeReviewTitle">Agent &amp; Human collaboration</h2>
      <span class="hint">Proposed situations — validate roles and authority with the client</span></div>
    <p class="diagnose-review-hint">Existing situation reviews are retained. “None” means no human action for that situation, not overall approval.</p>
    <div class="tobe-review-scroll" role="region" aria-labelledby="tobeReviewTitle" tabindex="0">
      <table class="esc tobe-review">
        <thead><tr><th scope="col">Situation</th><th scope="col">Agent</th><th scope="col">Human</th><th scope="col">Discussion</th></tr></thead>
        <tbody>${ESC.map((r,i)=>`<tr data-situation="e${i+1}">
          <td>${esc(r[0])}</td><td class="review-agent">${esc(r[1])}</td><td class="review-human">${esc(r[2])}</td>
          <td class="review-discussion">${actsHTML('e'+(i+1))}</td>
        </tr>`).join('')}</tbody>
      </table>
    </div>
  </div>

  <div class="sec">
    <div class="sec-head"><h2>Option comparison — Step 7 output example</h2>
      <span class="hint">Supported options with rule basis, not a recommendation around policy</span></div>
    <div class="card" style="padding:8px 18px">
      <table class="cmp">
        <thead><tr><th>Check</th><th>Australia</th><th>Singapore</th></tr></thead>
        <tbody>${CMP.map(r=>`<tr><td>${esc(r[0])}</td>${cmpCell(r[1])}${cmpCell(r[2])}</tr>`).join('')}</tbody>
      </table>
    </div>
  </div>

  <div class="sec">
    <div class="notes-label">${I.chat} Discussion notes — To-be</div>
    <textarea class="notes-area" data-notes placeholder="What did the client challenge in the agentic flow? Where should the Agent stop earlier / later?"></textarea>
  </div>`;

  bindNotes(m,'tobe');
  bindActs(m);
  tobeWorkflowCleanup=TobeWorkflow.mount(m,TOBE,GATES,openTobeStep,openGateDrawer);
}
function cmpCell(v){
  const [k,t]=v.split(':');
  const cls={ok:'pill-ok',cond:'pill-cond',new:'pill-new',exist:'pill-exist'}[k];
  return `<td><span class="${cls}">${esc(t)}</span></td>`;
}
function openTobeStep(n){
  const s=TOBE[n-1];
  S.visitedT[n]=true; save(); renderActivity();
  const sec=(label,color,inner)=>inner?`
    <div class="d-sec"><div class="d-label"><span class="sq" style="background:${color}"></span>${label}</div>${inner}</div>`:'';
  const ul=a=>`<ul>${a.map(x=>`<li>${esc(x)}</li>`).join('')}</ul>`;
  openDrawer(`
    <div class="drawer-head">
      <div><div class="kicker">To-be · Step ${s.n} of 10 · Scope &amp; Booking Agent</div><h3>${esc(s.t)}</h3></div>
      <button class="drawer-close">${I.x}</button>
    </div>
    <div class="drawer-body">
      ${sec('1 · Business function','var(--mint)',`<div class="d-box">${esc(s.fn)}</div>`)}
      ${sec('2 · Input','var(--blue)',ul(s.inp))}
      ${sec('3 · Agent behaviour','var(--lav)',ul(s.beh))}
      ${sec('4 · Skills / tools','var(--peach)',`<div class="d-chips">${s.skl.map(x=>`<span class="chip chip-peach">${esc(x)}</span>`).join('')}</div>`)}
      ${sec('5 · Rules / constraints','var(--yellow)',`<div class="d-chips">${s.rul.map(x=>`<span class="chip chip-yellow">${esc(x)}</span>`).join('')}</div>`)}
      ${sec('6 · Decision logic','var(--pink)',s.dec?ul(s.dec):'<div class="d-box">Deterministic pass-through — no branching at this step.</div>')}
      ${sec('7 · Output','var(--mint)',ul(s.out))}
      ${sec('8 · Next step','var(--blue)',`<div class="d-box">${esc(s.nxt)}</div>`)}
      ${sec('9 · Human Gate — the Agent stops when','var(--gate)',`<div class="d-box gate-box">${esc(s.gate)}</div>`)}
      <div class="d-sec">
        <div class="d-label"><span class="sq" style="background:var(--ink)"></span>10 · Workshop comment</div>
        ${actsHTML('t'+s.n)}
      </div>
    </div>`);
  bindActs($('#drawer'));
}

/* ============================================================
   Module 5 — Human Gates
   ============================================================ */
function renderGates(m){
  m.innerHTML=`
  <div class="sec">
    <div class="card card-peach" style="display:flex;gap:14px;align-items:center;flex-wrap:wrap">
      <div class="avatar av-peach">${I.gate}</div>
      <div style="flex:1;min-width:260px">
        <b style="font-size:15px">Human Gates are first-class objects</b>
        <div style="font-size:12.5px;font-weight:600;color:var(--ink-2);margin-top:4px;line-height:1.5">
          Each gate shows why the Agent stopped, what it has already done, the one precise question, who acts — and what happens after the answer. Decide a gate to see <b>Agent Resume</b>.</div>
      </div>
      <span class="chip chip-gate">${Object.values(S.gates).filter(g=>g.decision).length} / ${GATES.length} decided</span>
    </div>
  </div>
  <div class="sec">
    ${GATES.map(g=>gateCardHTML(g)).join('')}
  </div>
  <div class="sec">
    <div class="notes-label">${I.chat} Discussion notes — Human Gates</div>
    <textarea class="notes-area" data-notes placeholder="Which gates stay? Which owners are wrong? What is missing?"></textarea>
  </div>`;
  bindNotes(m,'gates');
  GATES.forEach(g=>bindGate(m,g));
}
function gateCardHTML(g){
  const st=S.gates[g.id]||{};
  return `
  <div class="gate-card" style="margin-bottom:16px" id="card-${g.id}">
    <span class="g-id">${I.gate} ${g.id}${st.decision?' · decided ✓':''}</span>
    <h4>${esc(g.t)}</h4>
    <div class="g-trigger"><b>Why did the Agent stop?</b> — ${esc(g.trigger)}</div>
    <div class="g-grid">
      <div class="g-block"><div class="t">What the Agent has already done</div>
        <ul>${g.prep.map(p=>`<li>${esc(p)}</li>`).join('')}</ul></div>
      <div class="g-block"><div class="t">Who should act · after the answer</div>
        <ul><li><b>${esc(g.who)}</b></li><li>${esc(g.after)}</li></ul></div>
    </div>
    <div class="g-question"><span class="qmark">?</span><span>${esc(g.q)}</span></div>
    <div class="g-actions">
      ${g.opts.map(o=>`<button class="g-decide ${st.decision===o?'sel':''}" data-gid="${g.id}" data-v="${esc(o)}">${esc(o)}</button>`).join('')}
    </div>
    <div class="resume-anim ${st.decision?'show':''}" id="res-${g.id}">
      <div class="r-title">${I.agent} Agent Resume — thanks, continuing from where we stopped…</div>
      <ul>${g.resume.map(r=>`<li class="${st.decision?'on':''}"><span class="r-check">✓</span>${esc(r)}</li>`).join('')}</ul>
    </div>
    <div class="comment-row ${st.comment?'show':''}" style="margin-top:12px">
      <input type="text" placeholder="Workshop comment on this gate…" value="${esc(st.comment||'')}" data-gc="${g.id}">
    </div>
  </div>`;
}
function bindGate(m,g){
  m.querySelectorAll(`#card-${g.id} .g-decide`).forEach(b=>b.addEventListener('click',()=>{
    const st=S.gates[g.id]||{};
    st.decision=b.dataset.v; S.gates[g.id]=st; save();
    m.querySelectorAll(`#card-${g.id} .g-decide`).forEach(x=>x.classList.toggle('sel',x===b));
    const res=$('#res-'+g.id);
    res.classList.add('show');
    const items=res.querySelectorAll('li');
    items.forEach(li=>li.classList.remove('on'));
    items.forEach((li,i)=>setTimeout(()=>li.classList.add('on'),350*(i+1)));
    const idChip=m.querySelector(`#card-${g.id} .g-id`);
    if(!idChip.textContent.includes('decided')) idChip.innerHTML=`${I.gate} ${g.id} · decided ✓`;
    toast(`Agent resumed · ${g.id} decided`);
    feed(`${g.id} decided → ${st.decision}`,'var(--gate-d)');
    renderActivity();
  }));
  const inp=m.querySelector(`#card-${g.id} input[data-gc]`);
  inp.addEventListener('input',()=>{ const st=S.gates[g.id]||{}; st.comment=inp.value; S.gates[g.id]=st; save(); });
}
function openGateDrawer(id){
  const g=GATES.find(x=>x.id===id);
  openDrawer(`
    <div class="drawer-head">
      <div><div class="kicker">Human Gate · first-class stop</div><h3>${g.id} — ${esc(g.t)}</h3></div>
      <button class="drawer-close">${I.x}</button>
    </div>
    <div class="drawer-body">
      <div class="d-sec"><div class="d-label"><span class="sq" style="background:var(--gate)"></span>Why did the Agent stop?</div>
        <div class="d-box gate-box">${esc(g.trigger)}</div></div>
      <div class="d-sec"><div class="d-label"><span class="sq" style="background:var(--mint)"></span>What has the Agent already done?</div>
        <ul>${g.prep.map(p=>`<li>${esc(p)}</li>`).join('')}</ul></div>
      <div class="d-sec"><div class="d-label"><span class="sq" style="background:var(--pink)"></span>Decision / input needed</div>
        <div class="d-quote" style="border-left-color:var(--gate);color:var(--gate-d)">${esc(g.q)}</div></div>
      <div class="d-sec"><div class="d-label"><span class="sq" style="background:var(--lav)"></span>Who should act?</div>
        <div class="d-box">${esc(g.who)}</div></div>
      <div class="d-sec"><div class="d-label"><span class="sq" style="background:var(--blue)"></span>What happens after the answer?</div>
        <div class="d-box">${esc(g.after)}</div></div>
      <div class="d-sec" style="font-size:12px;color:var(--muted);font-weight:700">
        Decide this gate in the Human Gates step — the Agent Resume animation plays there.</div>
    </div>`);
}

/* ============================================================
   Module 6 — Summary
   ============================================================ */
function bundleId(g,i){return 'bd-'+g+'-'+i;}
function bindSummaryBundle(m){
 m.querySelectorAll('[data-bid]').forEach(b=>b.onclick=()=>{S.bundle[b.dataset.bid]=S.bundle[b.dataset.bid]!==true;save();renderSummary(m);});
 m.querySelectorAll('[data-breset]').forEach(b=>b.onclick=()=>{delete S.bundle[b.dataset.breset];save();renderSummary(m);});
}
function refreshSummaryDiscussion(){
 const m=$('#module');if(!m.querySelector('#discussionSynthesis'))return;
 const model=discussionModel();
 m.querySelector('#mappingCount').textContent=`${model.rows.length} / 10 actions discussed · 1 linked handoff`;
 summaryMappingRows(model).forEach(row=>{
  const el=m.querySelector(`[data-mapping-row="${row.id}"]`);
  el.hidden=summaryMappingView==='discussed'&&!row.records.length;
  if(row.records.length&&row.id!=='handoff')el.dataset.summaryRow=String(row.step);else delete el.dataset.summaryRow;
  el.querySelector('.mapping-status').textContent=mappingReviewStatus(row);
  el.querySelector('.mapping-sources').innerHTML=row.records.map(sourceRecordHTML).join('');
 });
 m.querySelector('.mapping-filter-empty').hidden=summaryMappingView!=='discussed'||model.rows.length>0;
 m.querySelectorAll('[data-mapping-filter]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.mappingFilter===summaryMappingView)));
 m.querySelector('#dynamicBundle').innerHTML=bundleSummaryHTML(model);
 m.querySelector('#bundleCount').textContent=`${model.features.length} relevant / manually retained features · ${model.features.filter(f=>f.included).length} included manually`;
 bindSummaryBundle(m);
 const pains=BEFORE.filter(s=>S.actions['b'+s.n]?.act==='agree');
 m.querySelector('#confirmedPains').innerHTML=pains.length?'<ul>'+pains.map(s=>`<li>Step ${s.n} — ${esc(s.t)}</li>`).join('')+'</ul>':'No Before steps agreed yet. Modified and comment-only items remain open.';
 const open=[...model.unanswered,...model.open.map(r=>`${r.id} · ${r.title} — ${r.status}`)];
 m.querySelector('#openQuestions').innerHTML=open.length?'<ul>'+open.map(q=>`<li>${esc(q)}</li>`).join('')+'</ul>':'No recorded open issues. Unreviewed actions are not confirmed.';
}
function renderSummary(m){
  const model=discussionModel();
  const confirmedPains=BEFORE.filter(s=>S.actions['b'+s.n]?.act==='agree');
  const decidedGates=GATES.filter(g=>S.gates[g.id]&&S.gates[g.id].decision);
  const openQ=[...model.unanswered,...model.open.map(r=>`${r.id} · ${r.title} — ${r.status}`)];

  m.innerHTML=`
  <div class="sec">
    <div class="sec-head"><h2>Before → Pain → To-be mapping</h2>
      <span class="chip chip-mint" id="mappingCount" style="font-size:10px">${model.rows.length} / 10 actions discussed · 1 linked handoff</span></div>
    <p class="diagnose-review-hint">Template baseline · M0.1 Workshop Spec §12. Current-state claims remain working hypotheses; To-be responses are proposals. Review each scope separately. Comments are retained verbatim.</p>
    <div class="mapping-filters" role="group" aria-label="Mapping visibility"><button class="toolbtn" data-mapping-filter="all" aria-pressed="${summaryMappingView==='all'}">All mappings</button><button class="toolbtn" data-mapping-filter="discussed" aria-pressed="${summaryMappingView==='discussed'}">Discussed only</button></div>
    <div class="card" id="discussionSynthesis">${mappingSummaryHTML(model,{interactive:true})}</div>
  </div>

  <div class="sec">
    <div class="sec-head"><h2>Product Feature Bundle — Scope &amp; Booking Agent</h2>
      <span class="hint" id="bundleCount">${model.features.length} relevant / manually retained features · ${model.features.filter(f=>f.included).length} included manually</span></div>
    <p class="diagnose-review-hint">Suggestions follow an explicit discussion-to-feature crosswalk. Click to include or exclude; manual choices survive later discussion changes.</p>
    <div class="card" id="dynamicBundle">${bundleSummaryHTML(model)}</div>
  </div>
  <div class="sec"><details class="card"><summary>Discussion notes · original wording</summary>${discussionNotesHTML()}</details>
  </div>

  <div class="sec">
    <div class="sec-head"><h2>Workshop Decision Summary</h2><span class="hint">Editable — this is what exports to PDF</span></div>
    <div class="grid-2">
      <div class="card card-mint">
        <span class="card-tag">Current process — status</span>
        <div class="radios" id="sumStatus">
          ${['Validated','Adjusted','Needs evidence'].map(o=>
            `<button class="radio-pill ${S.summary.status===o?'sel':''}" data-v="${o}">${o}</button>`).join('')}
        </div>
        <div style="margin-top:14px"><span class="card-tag">Confirmed pain points</span>
          <div class="d-box" id="confirmedPains">${confirmedPains.length
            ? '<ul>'+confirmedPains.map(s=>`<li>Step ${s.n} — ${esc(s.t)}</li>`).join('')+'</ul>'
            : 'No Before steps agreed yet. Modified and comment-only items remain open.'}</div></div>
        <div style="margin-top:14px"><span class="card-tag">Transformation decision</span>
          <div class="radios" id="sumTrans">
            ${['Remove','Optimize','Add'].map(o=>
              `<button class="radio-pill ${S.summary.trans.includes(o)?'sel':''}" data-v="${o}">${o}</button>`).join('')}
          </div></div>
      </div>
      <div class="card card-lav">
        <span class="card-tag">Agentic target — Scope &amp; Booking Agent</span>
        <div class="radios" id="sumTarget">
          ${['Agree','Modify','Explore later'].map(o=>
            `<button class="radio-pill ${S.summary.target===o?'sel':''}" data-v="${o}">${o}</button>`).join('')}
        </div>
        <div style="margin-top:14px"><span class="card-tag">Human Gate discussion decisions</span>
          <div class="d-box">${decidedGates.length
            ? '<ul>'+decidedGates.map(g=>`<li><b>${g.id}</b> — ${esc(g.t)} · ${esc(S.gates[g.id].decision)}${hasText(S.gates[g.id].comment)?' — '+esc(S.gates[g.id].comment):''}</li>`).join('')+'</ul>'
            : 'No gates decided yet — open the Human Gates step.'}</div></div>
        <div style="margin-top:14px"><span class="card-tag">Open questions — auto-collected</span>
          <div class="d-box" id="openQuestions">${openQ.length
            ? '<ul>'+openQ.map(q=>`<li>${esc(q)}</li>`).join('')+'</ul>'
            : 'No recorded open issues. Unreviewed actions are not confirmed.'}</div></div>
      </div>
    </div>
    <div style="margin-top:16px">
      <div class="notes-label">${I.chat} Workshop note — overall</div>
      <textarea class="notes-area" id="sumNote" placeholder="Final wording, references, anything to carry into M0.2…">${esc(S.summary.note)}</textarea>
    </div>
  </div>

  <div class="sec">
    <div class="card">
      <div class="sec-head" style="margin-bottom:10px"><h2>Save &amp; export</h2>
        <span class="hint">PDF includes context, validated process, pain / opportunity, to-be, gates, mapping, bundle and open questions</span></div>
      <div class="big-actions">
        <button class="btn btn-dark" id="btnSaveDraft">${I.save} Save draft</button>
        <button class="btn btn-ghost" id="btnPdf">${I.doc} Export scenario summary PDF</button>
        <button class="btn btn-ghost" id="btnPrint">${I.print} Print view</button>
        <button class="btn btn-warm" id="btnNext2">Next scenario → M0.2 ${I.next}</button>
      </div>
      <div style="margin-top:12px;font-size:11.5px;color:var(--muted);font-weight:600">
        Local, rule-based workshop synthesis — review before saving. Source comments and manual choices are preserved.</div>
    </div>
  </div>`;

  bindSummaryBundle(m);
  bindActs(m);
  m.querySelectorAll('[data-mapping-filter]').forEach(b=>b.onclick=()=>{summaryMappingView=b.dataset.mappingFilter;refreshSummaryDiscussion();});
  m.querySelectorAll('[data-summary-review-target]').forEach(select=>select.onchange=()=>{
   summaryReviewTargets[select.dataset.summaryReviewTarget]=select.value;
   const host=select.closest('td').querySelector('[data-acts-host]'),tmp=document.createElement('div');tmp.innerHTML=actsHTML(select.value);host.replaceWith(tmp.firstElementChild);bindActs(m);
  });
  const grp=(sel,key,multi)=>{
    m.querySelectorAll(sel+' .radio-pill').forEach(b=>b.addEventListener('click',()=>{
      if(multi){
        const i=S.summary[key].indexOf(b.dataset.v);
        if(i>=0)S.summary[key].splice(i,1);else S.summary[key].push(b.dataset.v);
        b.classList.toggle('sel');
      }else{
        S.summary[key]=S.summary[key]===b.dataset.v?'':b.dataset.v;
        m.querySelectorAll(sel+' .radio-pill').forEach(x=>x.classList.toggle('sel',x.dataset.v===S.summary[key]));
        if(S.summary[key]) toast('Summary · '+S.summary[key]);
      }
      save(); renderActivity();
    }));
  };
  grp('#sumStatus','status'); grp('#sumTrans','trans',true); grp('#sumTarget','target');
  $('#sumNote').addEventListener('input',e=>{S.summary.note=e.target.value;save();});
  $('#btnSaveDraft').addEventListener('click',()=>{save();toast('Draft saved · M0.1 workshop state');feed('Draft saved from Summary','var(--blue-d)');});
  $('#btnPdf').addEventListener('click',()=>{buildPrint();window.print();});
  $('#btnPrint').addEventListener('click',()=>{buildPrint();window.print();});
  $('#btnNext2').addEventListener('click',()=>{
    S.done.summary=true; save(); renderRail(); renderWiz();
    toast('M0.1 marked complete — M0.2 prepared with the same template');
    feed('M0.1 completed → M0.2 workspace prepared','var(--gate-d)');
  });
}

/* ============================================================
   print / export
   ============================================================ */
function buildPrint(){
  const model=discussionModel();
  const d=new Date().toLocaleDateString([],{year:'numeric',month:'long',day:'numeric'});
  const gates=GATES.map(g=>{const st=S.gates[g.id]||{};
    return `<tr><td><b>${g.id}</b> — ${esc(g.t)}</td><td>${esc(g.who)}</td><td>${esc(st.decision||'Not decided')}</td></tr>`;}).join('');
  const bmap=mappingSummaryHTML(model);
  const bundle=bundleSummaryHTML(model,false);
  const hypo=HYPO.map(h=>{const st=S.hypo[h.id]||{};
    return `<li>${h.id} — ${esc(h.t)}: ${esc(st.choice||'unanswered')}${st.comment?' — “'+esc(st.comment)+'”':''}</li>`;}).join('');
  $('#printArea').innerHTML=`
    <h1>Clear-to-Trade · M0.1 Workshop Decision Summary</h1>
    <div class="p-meta">Scenario M0.1 — Determine sales location &amp; reporting / booking entity · Journey: Initiate &amp; Scope · Hero Case: Entity A Australia / Entity B Singapore / Person T · Exported ${d}</div>
    <h2>1 · Context / Hero Case</h2>
    <p>Person T (Thomas Lee, Group Treasurer) initiates onboarding of Entity A — Australia for FX and Trade Finance. Entity B — Singapore is the parent with an existing group relationship. RM: Sydney coverage. Synthetic Hero Case assumptions apply.</p>
    <h2>2 · Current process read</h2>
    <p>“Is this broadly how M0.1 works today?” → <b>${esc(S.beforeQ||'not answered')}</b> · Status: <b>${esc(S.summary.status||'—')}</b></p>
    <h2>3 · Hypotheses</h2><ul>${hypo}</ul>
    <h2>4 · Before → Pain → To-be mapping</h2>
    ${bmap}
    <h2>5 · Human Gates</h2>
    <table><tr><th>Gate</th><th>Owner</th><th>Decision</th></tr>${gates}</table>
    <h2>6 · Product Feature Bundle</h2>${bundle}
    <h2>7 · Transformation &amp; agentic target</h2>
    <p>Transformation: ${S.summary.trans.join(' · ')||'—'} · Agentic target (Scope &amp; Booking Agent): ${esc(S.summary.target||'—')}</p>
    <h2>8 · Workshop note</h2><p>${esc(S.summary.note||'—')}</p>
    <h2>9 · Module notes — original wording</h2>${discussionNotesHTML()}
    <h2>10 · Recorded open issues</h2>${model.unanswered.map(t=>`<p>${esc(t)}</p>`).join('')}${model.open.map(sourceRecordHTML).join('')}
    <p style="margin-top:14px;font-size:10px;color:#777">Local, rule-based workshop synthesis. Proposals, comments and demo decisions do not establish bank policy, authority or trade clearance.</p>
    <section class="tobe-print-diagram"><h2>To-be workflow · Investigate</h2><img src="diagrams/tobe-investigate.svg" alt="Complete investigation workflow"></section>
    <section class="tobe-print-diagram"><h2>To-be workflow · Resolve &amp; handoff</h2><img src="diagrams/tobe-resolve.svg" alt="Complete resolution and handoff workflow"><p>Read-only proposed workflow. Human authority and bank rules require validation; M0.1 is not trade clearance.</p></section>`;
  $('#printArea').querySelectorAll('details').forEach(d=>d.open=true);
}

/* ============================================================
   navigation
   ============================================================ */
const RENDER={context:renderContext,before:renderBefore,diagnose:renderDiagnose,tobe:renderTobe,gates:renderGates,summary:renderSummary};
const SCENARIO_OBJECTIVE_HTML=$('#moduleSub').innerHTML;
// SRC-007:p5:shape22:pain1/3/4/6; adapted from the PPT's analyst-wide pain points, not a verified RM interview.
const BEFORE_SUMMARY='Fragmented systems, manual data entry and repeated clarifications create multiple handoffs and delays.';

function go(i){
  beforeWorkflowCleanup?.();beforeWorkflowCleanup=null;
  tobeWorkflowCleanup?.();tobeWorkflowCleanup=null;
  const prev=STEPS[S.step];
  if(i>S.step) S.done[prev.id]=true;
  S.step=Math.max(0,Math.min(STEPS.length-1,i));
  save();
  const s=STEPS[S.step];
  // Scenario identity and journey location stay global; Before has its own summary.
  $('#moduleSub').innerHTML=s.id==='before'
    ? '<b class="objective-label">Before summary</b> '+esc(BEFORE_SUMMARY)+'<small class="before-summary-source" title="Adapted from the client fulfilment analyst pain points in Sanitised Process Map, slide 5; scenario applicability remains to validate.">PPT p. 5 · adapted to M0.1</small>'
    : SCENARIO_OBJECTIVE_HTML;
  const m=$('#module');
  m.classList.remove('in'); m.classList.add('lazy');
  RENDER[s.id](m);
  requestAnimationFrame(()=>requestAnimationFrame(()=>m.classList.add('in')));
  renderWiz(); renderRail(); renderActivity();
  $('#canvas').scrollTop=0;
  $('#btnBack').disabled=S.step===0;
  $('#btnNext').innerHTML = S.step===STEPS.length-1
    ? 'Finish &amp; save '+I.check
    : 'Continue <svg viewBox="0 0 24 24" class="ic"><path d="M9 5l7 7-7 7" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  $('#wiznavNote').textContent = S.step===STEPS.length-1
    ? 'Export includes everything agreed across all six steps'
    : 'Notes are kept when you move between steps';
  if(i>0) toast(`Draft saved · ${prev.label} ${S.notes[prev.id]?'notes kept':'step updated'}`);
}

$('#btnBack').addEventListener('click',()=>go(S.step-1));
$('#btnNext').addEventListener('click',()=>{
  if(S.step===STEPS.length-1){
    S.done.summary=true; save(); renderRail(); renderWiz();
    toast('M0.1 saved · ready for M0.2');
    feed('M0.1 finished & saved','var(--mint-d)');
  } else go(S.step+1);
});

/* ============================================================
   init
   ============================================================ */
renderHeroMini();
renderFeed();
const _mm=(location.hash||'').match(/^#(\d)(?:\/(\w+))?/);
if(_mm){ const h=+_mm[1]; if(h>=1&&h<=STEPS.length) S.step=h-1; }
go(S.step);
if(_mm&&_mm[2]){
  const sub=_mm[2];
  if(S.step===1&&/^\d+$/.test(sub)) openBeforeStep(+sub);
  if(S.step===3&&/^\d+$/.test(sub)) openTobeStep(+sub);
  if(S.step===4&&/^hg/i.test(sub)) openGateDrawer(sub.toUpperCase());
}
