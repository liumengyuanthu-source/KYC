const tri=(zh,enAU,enUS=enAU)=>({'zh-CN':zh,'en-AU':enAU,'en-US':enUS});

export const branchTitles={
  'BR-01':tri('范围与 Booking Context','Scope & Booking Context'),
  'BR-02':tri('主体、关系与具体权限','Entity, Relationships & Authority'),
  'BR-03':tri('要求确定','Requirements Determination'),
  'BR-04':tri('证据取得与用途评估','Evidence Sourcing & Use Assessment'),
  'BR-05':tri('缺口与客户协作','Residual Gaps & Client Collaboration'),
  'BR-06':tri('筛查群体与覆盖','Screening Population & Coverage'),
  'BR-07':tri('疑似命中复核','Possible-Match Review'),
  'BR-08':tri('加强尽调','Enhanced Due Diligence'),
  'BR-09':tri('利益冲突','Conflicts'),
  'BR-10':tri('信用风险与条件','Credit & Conditions'),
  'BR-11':tri('协议与执行','Legal Agreements & Execution'),
  'BR-12':tri('核验、准入与发布','Assurance, Clearance & Publication')
};

export const topicTitles={
  'TOPIC-BR01-SCOPE':tri('范围与 Booking Context','Scope and booking context'),
  'TOPIC-BR02-ENTITY':tri('主体、关系与权限','Entity, relationships and authority'),
  'TOPIC-BR03-APPLICABILITY':tri('适用性与复核','Applicability and review'),
  'TOPIC-BR03-REQUIREMENT-SET':tri('版本化要求集','Versioned requirement set'),
  'TOPIC-BR04-SOURCING':tri('获准来源','Permitted sourcing'),
  'TOPIC-BR04-CLAIMS':tri('候选资料声明','Candidate evidence claims'),
  'TOPIC-BR04-USE-ASSESSMENT':tri('用途评估','Purpose assessment'),
  'TOPIC-BR05-GAPS':tri('具体残余缺口','Specific residual gaps'),
  'TOPIC-BR05-RECIPIENTS':tri('收件人与有限访问','Recipients and limited access'),
  'TOPIC-BR05-RESPONSES':tri('局部响应与澄清','Partial response and clarification'),
  'TOPIC-BR06-POPULATION':tri('筛查群体与覆盖','Screening population and coverage'),
  'TOPIC-BR07-MATCH':tri('疑似命中复核','Possible-match review'),
  'TOPIC-BR08-EDD':tri('加强尽调','Enhanced due diligence'),
  'TOPIC-BR09-CONFLICTS':tri('利益冲突','Conflicts'),
  'TOPIC-BR10-CREDIT':tri('信用风险与条件','Credit and conditions'),
  'TOPIC-BR11-LEGAL':tri('协议与执行','Legal agreements and execution'),
  'TOPIC-BR12-QA':tri('QA核验','QA checks'),
  'TOPIC-BR12-REMEDIATION':tri('补正与重审','Remediation and re-review'),
  'TOPIC-BR12-READINESS':tri('准入前置核对','Readiness prerequisites'),
  'TOPIC-BR12-AUTHORISATION-PUBLICATION':tri('授权、记录与发布','Authorisation, record and publication')
};

export const nodeCopy={
  'CURRENT-BR03-M2.1-DETERMINE-REQUIREMENTS':{
    label:tri('确定要求与 relief','Determine requirements and reliefs'),
    explanation:tri('根据适用语境确定 AML/KYC 要求与可用 relief；来源未展开具体判定规则。','Determine AML/KYC requirements and applicable reliefs from context; the source does not set out the detailed decision rules.')
  },
  'CURRENT-BR03-M2.3-CONSOLIDATE-REQUIREMENTS':{
    label:tri('汇总要求','Consolidate requirements'),
    explanation:tri('把各项要求汇总；来源未说明版本、差异或不同控制来源如何保留。','Consolidate requirements; the source does not explain versioning, differences, or retention of distinct control origins.')
  },
  'CURRENT-BR04-M3.1-SOURCE-INFORMATION':{
    label:tri('从公共与商业源取得资料','Source public and commercial information'),
    explanation:tri('从公共与商业来源取得资料；本内容层不假设任何付费来源连接或访问权限。','Obtain information from public and commercial sources; this author layer assumes no paid-source connection or access right.')
  },
  'CURRENT-BR04-M3.4-CAPTURE-VALIDATE-EVIDENCE':{
    label:tri('捕获并验证资料','Capture and validate evidence'),
    explanation:tri('捕获并验证资料能否支持相关工作；来源未给出具体充分性标准。','Capture and validate whether evidence supports the relevant work; the source does not provide detailed sufficiency criteria.')
  },
  'CURRENT-BR05-M3.2-IDENTIFY-RESIDUAL-GAPS':{
    label:tri('识别残余缺口','Identify residual gaps'),
    explanation:tri('识别现有资料仍未满足的部分，并保留尚未确定适用性的内部判断。','Identify what existing information still does not satisfy, while retaining internally unresolved applicability judgements.')
  },
  'CURRENT-BR05-M3.3-REQUEST-INFORMATION':{
    label:tri('向客户请求资料','Request information from the client'),
    explanation:tri('客户、RM 与 Operations 围绕资料请求和回应沟通；来源未定义逐项访问 Grant。','The client, RM and Operations communicate about information requests and responses; the source does not define item-level access grants.')
  },
  'TOBE-D3-REQUIREMENTS-01-RULE':{
    label:tri('绑定规则与语境','Bind rule and context'),
    explanation:tri('把政策/CIP版本、主体、用途和条件评估绑定到要求；仅在规则可确定时执行。','Bind the policy/CIP version, subject, purpose and conditional assessment to the requirement; execute only when the rule is determinable.')
  },
  'TOBE-D3-REQUIREMENTS-01-REVIEW':{
    label:tri('建立适用性复核','Create applicability review'),
    explanation:tri('规则不能确定时建立独立复核工作，避免生成看似权威的要求。','Create separate review work when the rule cannot be determined, avoiding an apparently authoritative requirement.')
  },
  'TOBE-D3-REQUIREMENTS-03-REQUIREMENT-SET':{
    label:tri('组织版本化要求集','Organise a versioned requirement set'),
    explanation:tri('按主体与用途组织要求；候选重复可合并展示，但保留不同来源、控制、版本和差异。','Organise requirements by subject and purpose; candidate duplicates may be grouped for display while distinct origins, controls, versions and differences remain.')
  },
  'TOBE-D3-SOURCE-03-CANDIDATE-CLAIMS':{
    label:tri('准备候选 Claims','Prepare candidate claims'),
    explanation:tri('从已获准取得的资料准备姓名、关系等候选声明，保留原始位置与提取状态。','Prepare candidate name, relationship and other claims from permitted evidence, retaining the original locator and extraction status.')
  },
  'TOBE-D3-SOURCE-03-CONFIRMED-VALUES':{
    label:tri('确认后形成可用值','Form usable values after confirmation'),
    explanation:tri('只有经适当确认的候选声明才形成下游可用值；提取信心不代表身份或充分性结论。','Only appropriately confirmed candidate claims become usable downstream values; extraction confidence is not an identity or sufficiency conclusion.')
  },
  'TOBE-D3-GAP-01-SPECIFIC-GAP':{
    label:tri('形成具体缺口','Create a specific gap'),
    explanation:tri('结合当前用途评估与适用性形成具体缺口，并关联已有 open gap，避免重复制造。','Use the current purpose assessment and applicability to create a specific gap, linking an existing open gap rather than duplicating it.')
  },
  'TOBE-D3-GAP-03-RECIPIENT':{
    label:tri('区分适当收件人','Distinguish the appropriate recipient'),
    explanation:tri('Person T 受雇于 Entity B，但受雇关系不等于协调、签约或交易权限；把 Person T 的协调授权项目与 Entity A ownership/control 项目分给适当贡献者。','Person T is employed by Entity B. Employment does not establish coordination, signing or trading authority; separate that authority item from Entity A ownership/control and direct each to an appropriate contributor.')
  },
  'TOBE-D3-GAP-03-LIMITED-GRANT':{
    label:tri('限制逐项访问','Limit item-level access'),
    explanation:tri('每个候选 Grant 仅覆盖经审阅的资源和动作；转发邀请不传递权限。','Each candidate grant covers only reviewed resources and actions; forwarding an invitation does not transfer authority.')
  },
  'TOBE-D3-GAP-05-PARTIAL-RESPONSE':{
    label:tri('保存、提交与局部保持 Open','Save, submit and keep other items open'),
    explanation:tri('客户保存或提交自己的项目并获得回执；另一项保持 open，提问关联原请求项。','The client saves or submits their own item and receives a receipt; another item remains open and questions stay linked to the original request item.')
  },
  'TOBE-D3-VALIDATE-04-USE-ASSESSMENT':{
    label:tri('按用途准备评估','Prepare a purpose-specific assessment'),
    explanation:tri('把每项用途评估绑定到主体、要求、目的与输入版本，不把协调授权当作签约证明。','Bind each use assessment to its subject, requirement, purpose and input revision; do not treat coordination authority as evidence of signing authority.')
  },
  'TOBE-D3-VALIDATE-04-HUMAN-SUFFICIENCY':{
    label:tri('保留复杂充分性判断','Retain human sufficiency judgement'),
    explanation:tri('准备可检查的依据；复杂充分性和例外仍由适当人员处理，且结论仅适用于该用途和版本。','Prepare inspectable grounds; appropriate people still handle complex sufficiency and exceptions, and any conclusion applies only to that purpose and revision.')
  }
};

export const mappingCopy={
  'D3-REQUIREMENTS-01':{
    rationale:tri('将可确定规则的执行与不可确定时的人工复核分开；保留适用性判断边界。','Separate execution under determinable rules from human review when applicability is unresolved, retaining the judgement boundary.'),
    change:tri('从语境判断要求，变为带版本与用途的规则执行或复核。','Move from contextual requirements determination to versioned, purpose-bound rule execution or review.')
  },
  'D3-REQUIREMENTS-03':{
    rationale:tri('增强要求汇总的来源、控制、版本和差异可见性，不合并不同控制。','Enhance consolidated requirements with visible origins, controls, revisions and differences without merging distinct controls.'),
    change:tri('从一般汇总，变为按主体和用途组织的版本化 RequirementSet。','Move from general consolidation to a versioned RequirementSet organised by subject and purpose.')
  },
  'D3-SOURCE-03':{
    rationale:tri('候选 Claim 是待验证的设计细化；Current 来源仅作可读语境，不制造直接前身。','Candidate claims are a design proposal for validation; Current sources remain readable context and are not fabricated as direct predecessors.'),
    change:tri('新增候选 Claim 的准备与确认机制，不声称 Current 已存在该工具。','Propose preparation and confirmation of candidate claims without claiming that the Current process has this mechanism.')
  },
  'D3-GAP-01':{
    rationale:tri('增强用途评估到具体缺口的可追溯关系，并复用已有 open gap。','Enhance traceability from purpose assessment to a specific gap and reuse an existing open gap.'),
    change:tri('从识别未满足部分，变为带主体、用途与来源评估的具体缺口。','Move from identifying unmet information to a specific gap linked to subject, purpose and source assessment.')
  },
  'D3-GAP-03':{
    rationale:tri('逐项收件人与有限访问是待验证提案；Current 沟通活动只作语境。','Item-level recipients and limited access are proposals for validation; Current communication activities provide context only.'),
    change:tri('新增适当收件人与有限 Grant 的设计，不暗示转发即授权。','Propose appropriate recipients and limited grants without implying that forwarding confers authority.')
  },
  'D3-GAP-05':{
    rationale:tri('把请求沟通与资料捕获归入一个局部响应组，保留成员关系而非画全对全等价线。','Group request communication and evidence capture into one partial-response mapping, preserving membership rather than drawing cartesian equivalence.'),
    change:tri('从客户一般回应，变为逐项保存、提交、回执与澄清。','Move from a general client response to item-level save, submit, receipt and clarification.')
  },
  'D3-VALIDATE-04':{
    rationale:tri('增强用途充分性的输入版本与判断依据，并明确保留复杂人工处理。','Enhance purpose-specific sufficiency with input revisions and grounds while explicitly retaining complex human handling.'),
    change:tri('从一般资料验证，变为按主体、要求与用途准备评估并处理复杂判断。','Move from general evidence validation to assessment by subject, requirement and purpose with complex judgement handled separately.')
  }
};

export const pc01Copy={
  checkpoint:{
    description:tri('两侧使用同一案件事实：Entity A 的产品为 FX forward，报告的母公司 Entity B，Person T 受雇于 Entity B；并使用同一 Scope、RequirementSet、已有资料与两项残余缺口：Person T 对 Entity A 的资料协调权限，以及 Entity A ownership/control。受雇关系和协调权限都不代表签约或交易权限。','Both sides use the same case facts: Entity A and its FX forward, reported parent Entity B, and Person T is employed by Entity B; they also use the same Scope, RequirementSet, existing evidence and two residual gaps: Person T’s authority to coordinate information for Entity A, and Entity A ownership/control. Employment and coordination authority do not establish signing or trading authority.'),
    inputManifest:tri('同一 Scope 与要求版本、相同已有资料、相同获准来源及源时点、相同用途评估、两项 open gap、已审阅联系资料；没有 Target 专属隐藏文件、付费连接或额外证据。','The same Scope and requirement revisions, existing evidence, permitted sources and source time, purpose assessments, two open gaps and reviewed contact details; there are no Target-only hidden files, paid connections or extra evidence.'),
    workGoal:tri('解释要求、证据用途和具体残余缺口，再形成有限的客户协作任务。','Explain requirements, evidence use and specific residual gaps before forming bounded client collaboration tasks.')
  },
  painNeed:tri('工作假设：Ops/RM 可能重复组织要求与补件语境，且主体/用途缺口不易在同一任务中读懂；重复率尚未测量。','Working hypothesis: Ops/RM may repeatedly organise requirements and remediation context, while subject- and purpose-specific gaps may be hard to understand in one task; no repetition rate has been measured.'),
  opportunitySolution:tri('先解释哪项要求未被哪种用途证据满足，再形成有限任务；保留适用性、充分性与例外的人工控制。','Explain which requirement is unmet by evidence for which purpose before forming bounded tasks; retain human control over applicability, sufficiency and exceptions.'),
  basisNext:tri('依据 D3 v0.2、精确 PPT occurrence 与继承的参考观察；在相同输入下验证，未形成银行政策批准或业务证据。','Based on D3 v0.2, exact PPT occurrences and inherited reference observations; validate with the same inputs. This is not bank policy approval or operational evidence.')
};

export const referenceCopy={
  'REG-AUSTRAC-CDD':{
    observation:tri('分别考虑客户、代表人的身份与权限、受益所有人及关系目的。','Consider the customer, a representative’s identity and authority, beneficial owners, and the purpose of the relationship separately.'),
    adaptation:tri('启发主体、代表、权限、目的和证据用途分离。','Separate subject, representative, authority, purpose and evidence use.'),
    limits:tri('不是该银行的字段表、材料可接受性、豁免或授权判定；适用法律与过渡安排仍需验证。','It is not this bank’s field list, material-acceptance rule, exemption or authority decision; applicable law and transition arrangements still require validation.')
  },
  'IND-SWIFT-KYC':{
    observation:tri('标准化基线信息与文件共享，资料所有者决定银行访问。','Standardised baseline information and document sharing allow the information owner to decide bank access.'),
    adaptation:tri('把公共基线与本案要求分开，先查可用资料再请求缺口。','Separate shared baseline information from case requirements and check available material before requesting gaps.'),
    limits:tri('本案没有确认的 registry 接入；共享完整性不表示该银行认可充分性或法律依赖。','No registry connection is confirmed for this case; shared completeness does not mean the bank accepts sufficiency or legal reliance.')
  },
  'XB-FHIR-R5':{
    observation:tri('Provenance 可关联资源版本、活动、参与者和来源实体。','Provenance can relate a resource revision to an activity, participants and source entities.'),
    adaptation:tri('把判断记录关联到具体输入版本、操作者与生成活动。','Relate a judgement record to specific input revisions, the operator and the generating activity.'),
    limits:tri('FHIR 的 agent 指参与者而非 AI；本项目不声称实施 FHIR，并保留 R4/R5 版本差异。','In FHIR, agent means a participant rather than AI; this project does not claim a FHIR implementation, and R4/R5 remain distinct versions.')
  },
  'IB-ANZ-SECURE':{
    observation:tri('参考号与发送到登记联系信息的 OTP 提供入口；保存、提交和部分字段可见性分开。','A reference number and an OTP sent to registered contact details provide entry; save, submit and contributor visibility are separate.'),
    adaptation:tri('把官网入口与请求定位分开，并区分局部响应、提交回执与复核状态。','Separate official-site entry from request lookup and distinguish partial response, submission receipt and review status.'),
    limits:tri('不是完整的新机构客户旅程，也不能证明本案安全等级或代表权限。','It is not the whole new-institutional-client journey and does not establish this case’s security level or representative authority.')
  },
  'IB-ING-DOOR':{
    observation:tri('RM 可安排 KYC 代表访问；代表可填写、上传、保存与续办，多代表不等于同时编辑。','An RM can arrange access for KYC representatives who can enter information, upload material, save and resume; multiple representatives do not imply simultaneous editing.'),
    adaptation:tri('区分 RM 协调、贡献者任务、内部请求与外部视图。','Separate RM coordination, contributor tasks, the internal request and the external view.'),
    limits:tri('不是澳洲部署证明，不照抄时限，也不声称其访问模式等同本案逐项 Grant。','This is not evidence of an Australian deployment; do not copy its timeframes or equate its access model with this project’s item-level grants.')
  }
};

export const localeValue=(value,locale)=>value[locale]??value['en-AU'];
