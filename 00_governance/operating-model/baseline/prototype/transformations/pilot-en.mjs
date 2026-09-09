export const pilotEnglish={
  'SCN-GAP':{
    title:'Turn internal gaps into actionable requests',
    checkpoint:"The same two initial residual gaps: Person T's authority to coordinate information and Entity A ownership/control. Other internal requirements remain separate.",
    inputManifest:'Existing purpose assessments and gaps, reviewed contact details, actual grants and client-disclosable reasons.',
    waitResume:'Keep the request in draft while recipient, disclosure or sending authority is unconfirmed. Return a client response to its original item rather than creating a separate case.',
    invariants:'A business request may have multiple recipients, but there is one source requirement. Login or email verification does not grant signing authority.',
    validationQuestion:'Can the client tell which entity the request concerns, why the information is needed and how to respond? Does submitting one item leave the other item open?',
    currentSummary:'M3.2 identifies residual gaps, M3.3 requests client information, and M2.5 issues requirements; RM and client clarification also appears. The source map does not confirm a client channel.',
    targetSummary:'The product performs M3.2 and M3.3. Separation of limited contributors, a secure web task, notifications and submissions is inspired by approved design and reference examples.',
    changes:{
      'D3-GAP-01':{
        title:'Identify actual residual gaps',
        current:'Identify where information requirements remain unmet.',
        target:'Use the current purpose assessment and applicability to create a specific gap type. Link an existing open gap instead of creating a duplicate.',
        boundary:'Confirm unknown applicability internally; do not present it as a mandatory client request.'
      },
      'D3-GAP-02':{
        title:'Organise client request items',
        current:'Issue requirements to the client and clarify their response.',
        target:'Group related gaps into response-ready items while retaining each requirement, subject and purpose link, accepted response options and reasons.',
        boundary:'Do not require a new document for every control requirement. Use configured material types rather than inventing them case by case.'
      },
      'D3-GAP-03':{
        title:'Set recipients and limited access',
        current:'The Current map shows communication between the client, RM and Operations only.',
        target:"Separate the item about Person T's authority from the ownership item for an appropriate company contributor. Each grant covers only reviewed resources and actions.",
        boundary:'Forwarding an invitation does not transfer access. Without authority, use an appropriate contact or an approved assisted path.'
      },
      'D3-GAP-04':{
        title:'Review, send and observe delivery',
        current:'The source map does not detail transmission states.',
        target:'After the request revision is reviewed, notify according to configuration. Keep draft, approved, sent and observed delivery states separate. The demo uses an official-site reference and mock authentication only.',
        boundary:'No real OTP or email is connected. Reminders do not require RM approval by default.'
      },
      'D3-GAP-05':{
        title:'Handle partial responses and clarification',
        current:'The client provides information and responses.',
        target:'Let a client save or submit their own items and receive a receipt. Keep the other item open and link questions to the original request item.',
        boundary:'Actual bank-user authority is not the same as switching a prototype role.'
      },
      'D3-GAP-06':{
        title:'Record assisted communication and collection',
        current:'The RM has client contact, but the specific phone or email process is not confirmed.',
        target:'Let the RM save reviewed communication notes. For staff-assisted upload, retain the original provider, staff uploader, channel and time.',
        boundary:'A summary is not authority or a formal decision. Do not record a fictional client login.'
      }
    }
  },
  'SCN-MATCH':{
    title:'Review one possible match for Person T using the same evidence',
    checkpoint:'Checkpoint 1 uses the same possible match with insufficient evidence. Checkpoint 2 uses the same additional identity evidence after receipt and purpose review; either view may remain reasonably unresolved.',
    inputManifest:'Person T and SYN-PROVIDER-RECORD-C01 use the same inputs and source time. There is no real listed person and no additional identity evidence supplied behind the scenes.',
    waitResume:'Return an information-gap branch to the same finding. Where authority is insufficient, refer the same review task. EDD handling cannot replace a material sanctions restriction.',
    invariants:'A source comparison is not verified identity. Excluding this record is not a permanent whitelist. A local disposition is not complete coverage.',
    validationQuestion:'Does the work stop correctly when evidence is missing? Does selecting Target avoid automatically excluding a match when the input is unchanged?',
    currentSummary:'M4.5 sits with Operations; M4.6 and M4.7 sit with Financial Crime, Risk and Compliance. Current already includes adjudication and a risk decision.',
    targetSummary:'M4.5 to M4.7 appear in the agentic lane, while Operations reviews ambiguity and Financial Crime adjudicates material cases. Responsibility for recording execution and judgement remains to be clarified.',
    changes:{
      'D3-MATCH-01':{
        title:'Bind the finding to its original query',
        current:'Operations handles screening hits.',
        target:'Fix the subject, run and provider record in the comparison context. Do not split one alias into multiple people or silently remove duplicates.',
        boundary:'Keep source, version and content immutable. Data preparation does not make the final risk judgement.'
      },
      'D3-MATCH-02':{
        title:'Compare identifying attributes',
        current:'A person reviews relevant client and match information.',
        target:'Create name, date-of-birth and other comparisons from current claims. Preserve multiple values, precision and unknowns, and show the source of each value.',
        boundary:'A missing date of birth cannot be shown as a mismatch. One different date or nationality is not an automatic exclusion rule.'
      },
      'D3-MATCH-03':{
        title:'Request specific distinguishing evidence',
        current:'The Current client lane already allows screening clarification.',
        target:'Reuse the existing request model to create a new versioned item for distinguishing this finding. Check approved existing sources before asking externally.',
        boundary:"An earlier coordination grant does not automatically cover Person T's identity evidence, and the two existing request items remain intact."
      },
      'D3-MATCH-04':{
        title:'Prepare the review pack',
        current:'Operations handles the hit; the current effort needed to assemble information has not been measured.',
        target:'Organise cited evidence summaries, differences, unknowns and related requests. Keep AI suggestions separate from known facts.',
        boundary:'A language model cannot write a default pass rationale. The reviewer must inspect the supporting material.'
      },
      'D3-MATCH-05':{
        title:'Assess risk and materiality',
        current:'Financial Crime, Risk and Compliance assess risk and materiality.',
        target:'Prepare risk context and route ambiguous or material findings to the appropriate person, retaining action-specific authority and hold scope.',
        boundary:'The Target map does not establish autonomous risk decisions. When authority is unknown, do not offer a Record action.'
      },
      'D3-MATCH-06':{
        title:'Record a disposition for bounded inputs',
        current:'Financial Crime determines the screening outcome.',
        target:'Record the finding disposition, rationale, reviewed evidence and scope version. Keep any additional approval separate.',
        boundary:'Allow unresolved and refer outcomes. The record action and bank authority remain demo configuration only.'
      },
      'D3-MATCH-07':{
        title:'Separate the local result from whole-case impact',
        current:'The result feeds later review of clearance prerequisites.',
        target:'Update only the related finding and coverage, then derive an explainable snapshot. Ownership population, EDD, Legal and Credit unknowns remain.',
        boundary:'Do not write person.safe=true or case.cleared=true. Later evidence changes trigger only dependency-based reassessment.'
      }
    }
  }
};

export const referenceEnglish={
  'IB-ING-DOOR':{
    observation:'An RM can arrange access for KYC representatives, who can enter information, upload material, save and resume in InsideBusiness; multiple representatives do not imply simultaneous editing.',
    adaptation:'Separate RM coordination from contributor tasks, and separate the internal request from the external view.',
    limits:'This is not evidence of an Australian deployment. Do not copy its timeframes or claim its access model is equivalent to this project\'s item-level grants.'
  },
  'IB-ANZ-SECURE':{
    observation:'A reference number and an OTP sent to registered contact details provide entry; save and submit are separate, and some fields have contributor-visibility limits.',
    adaptation:'Separate official-site entry from request lookup, and keep partial response, submission receipt and review status distinct.',
    limits:'This is not the whole new-institutional-client journey and does not establish the security level or representative authority for this case.'
  },
  'IC-PHKL':{
    observation:'The internal design keeps one case across roles while separating AI preparation, doctor sign-off, insurer review and clarification.',
    adaptation:'Use task workspaces and separate preparation, decision and submission, linking each stage to data events and downstream roles.',
    limits:'Internal design reference only. Production deployment and business benefit were not verified in this work, so it is not a public implementation success story.'
  },
  'IND-WOLFSBERG':{
    observation:'An alert is not a confirmed risk. Review should use relevant information, record the disposition rationale, and make screening scope and configuration explicit.',
    adaptation:'Separate Population, Run, Finding, Review, Decision and Coverage, and organise judgement material for a person.',
    limits:'The guidance does not directly define this project\'s authority, thresholds, pause scope or reuse configuration.'
  },
  'REG-DFAT-LIST':{
    observation:'List records can contain several identifying attributes, aliases and incomplete information.',
    adaptation:'Preserve multiple values, precision, unknowns and the original record to support a purpose-specific comparison.',
    limits:'Do not automatically exclude on one differing attribute, assume the Australian list covers every applicable jurisdiction, or import real people.'
  },
  'XB-FHIR-R5':{
    observation:'Provenance can relate a resource version to its activity, participants and source entities.',
    adaptation:'Link a judgement record to specific input versions, the operator and the generating activity.',
    limits:'FHIR uses agent to mean a participant, not an AI agent. This project does not claim a FHIR implementation, and R4 and R5 remain distinct versions.'
  }
};
