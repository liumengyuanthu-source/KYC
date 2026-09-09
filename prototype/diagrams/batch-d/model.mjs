// Generated from delivered Archify specs; no business state.
export default {
  "DG-D01.zh-CN": {
    "id": "DG-D01",
    "locale": "zh-CN",
    "asset": "DG-D01.zh-CN.r02",
    "title": "并行专业工作",
    "nodes": [
      {
        "id": "D01-SCOPE",
        "lane": "specialist",
        "col": 0,
        "type": "external",
        "label": "范围与要求",
        "sublabel": "按各项输入判断启动",
        "width": 170
      },
      {
        "id": "D01-CONFLICTS",
        "lane": "conflicts",
        "col": 2,
        "type": "external",
        "label": "利益冲突检查",
        "sublabel": "搜索完成 · 专业复核待办",
        "width": 170
      },
      {
        "id": "D01-CREDIT",
        "lane": "specialist",
        "col": 2,
        "type": "external",
        "label": "信贷条件",
        "sublabel": "有条件批准 · 合成状态",
        "width": 170
      },
      {
        "id": "D01-LEGAL",
        "lane": "specialist",
        "col": 3,
        "type": "external",
        "label": "协议工作",
        "sublabel": "内部批准 · 待签署",
        "width": 170
      },
      {
        "id": "D01-KYC",
        "lane": "kyc",
        "col": 2,
        "type": "external",
        "label": "尽调与筛查",
        "sublabel": "局部结果 · 覆盖未闭合",
        "width": 170
      },
      {
        "id": "D01-READY",
        "lane": "specialist",
        "col": 5,
        "type": "external",
        "label": "整体就绪",
        "sublabel": "尚未就绪 · 不等于批准",
        "width": 170
      }
    ],
    "edges": [
      {
        "id": "D01-E01",
        "from": "D01-SCOPE",
        "to": "D01-CONFLICTS",
        "label": "启动条件",
        "variant": "default",
        "width": 1.2
      },
      {
        "id": "D01-E02",
        "from": "D01-SCOPE",
        "to": "D01-CREDIT",
        "label": "启动条件",
        "variant": "default",
        "width": 1.2
      },
      {
        "id": "D01-E03",
        "from": "D01-SCOPE",
        "to": "D01-KYC",
        "label": "启动条件",
        "variant": "default",
        "width": 1.2
      },
      {
        "id": "D01-E04",
        "from": "D01-CREDIT",
        "to": "D01-LEGAL",
        "label": "版本依赖",
        "variant": "default",
        "width": 2
      },
      {
        "id": "D01-E05",
        "from": "D01-CONFLICTS",
        "to": "D01-READY",
        "label": "条件贡献",
        "variant": "default",
        "width": 1.2
      },
      {
        "id": "D01-E06",
        "from": "D01-LEGAL",
        "to": "D01-READY",
        "label": "条件贡献",
        "variant": "default",
        "width": 1.2
      },
      {
        "id": "D01-E07",
        "from": "D01-KYC",
        "to": "D01-READY",
        "label": "条件贡献",
        "variant": "default",
        "width": 1.2
      }
    ],
    "width": 949,
    "height": 528
  },
  "DG-D01.en-AU": {
    "id": "DG-D01",
    "locale": "en-AU",
    "asset": "DG-D01.en-AU.r02",
    "title": "Parallel specialist work",
    "nodes": [
      {
        "id": "D01-SCOPE",
        "lane": "specialist",
        "col": 0,
        "type": "external",
        "label": "Scope / requirements",
        "sublabel": "Start against own inputs",
        "width": 170
      },
      {
        "id": "D01-CONFLICTS",
        "lane": "conflicts",
        "col": 2,
        "type": "external",
        "label": "Conflicts review",
        "sublabel": "Search done · review pending",
        "width": 170
      },
      {
        "id": "D01-CREDIT",
        "lane": "specialist",
        "col": 2,
        "type": "external",
        "label": "Credit condition",
        "sublabel": "Conditional approval · synthetic",
        "width": 170
      },
      {
        "id": "D01-LEGAL",
        "lane": "specialist",
        "col": 3,
        "type": "external",
        "label": "Legal agreement",
        "sublabel": "Approved · execution pending",
        "width": 170
      },
      {
        "id": "D01-KYC",
        "lane": "kyc",
        "col": 2,
        "type": "external",
        "label": "KYC and screening",
        "sublabel": "Scoped result · coverage open",
        "width": 170
      },
      {
        "id": "D01-READY",
        "lane": "specialist",
        "col": 5,
        "type": "external",
        "label": "Readiness",
        "sublabel": "Not ready · not authorisation",
        "width": 170
      }
    ],
    "edges": [
      {
        "id": "D01-E01",
        "from": "D01-SCOPE",
        "to": "D01-CONFLICTS",
        "label": "Start condition",
        "variant": "default",
        "width": 1.2
      },
      {
        "id": "D01-E02",
        "from": "D01-SCOPE",
        "to": "D01-CREDIT",
        "label": "Start condition",
        "variant": "default",
        "width": 1.2
      },
      {
        "id": "D01-E03",
        "from": "D01-SCOPE",
        "to": "D01-KYC",
        "label": "Start condition",
        "variant": "default",
        "width": 1.2
      },
      {
        "id": "D01-E04",
        "from": "D01-CREDIT",
        "to": "D01-LEGAL",
        "label": "Version dependency",
        "variant": "default",
        "width": 2
      },
      {
        "id": "D01-E05",
        "from": "D01-CONFLICTS",
        "to": "D01-READY",
        "label": "Contribution",
        "variant": "default",
        "width": 1.2
      },
      {
        "id": "D01-E06",
        "from": "D01-LEGAL",
        "to": "D01-READY",
        "label": "Contribution",
        "variant": "default",
        "width": 1.2
      },
      {
        "id": "D01-E07",
        "from": "D01-KYC",
        "to": "D01-READY",
        "label": "Contribution",
        "variant": "default",
        "width": 1.2
      }
    ],
    "width": 1022,
    "height": 528
  },
  "DG-D01.en-US": {
    "id": "DG-D01",
    "locale": "en-US",
    "asset": "DG-D01.en-US.r02",
    "title": "Parallel specialist work",
    "nodes": [
      {
        "id": "D01-SCOPE",
        "lane": "specialist",
        "col": 0,
        "type": "external",
        "label": "Scope / requirements",
        "sublabel": "Start against own inputs",
        "width": 170
      },
      {
        "id": "D01-CONFLICTS",
        "lane": "conflicts",
        "col": 2,
        "type": "external",
        "label": "Conflicts review",
        "sublabel": "Search done · review pending",
        "width": 170
      },
      {
        "id": "D01-CREDIT",
        "lane": "specialist",
        "col": 2,
        "type": "external",
        "label": "Credit condition",
        "sublabel": "Conditional approval · synthetic",
        "width": 170
      },
      {
        "id": "D01-LEGAL",
        "lane": "specialist",
        "col": 3,
        "type": "external",
        "label": "Legal agreement",
        "sublabel": "Approved · execution pending",
        "width": 170
      },
      {
        "id": "D01-KYC",
        "lane": "kyc",
        "col": 2,
        "type": "external",
        "label": "KYC and screening",
        "sublabel": "Scoped result · coverage open",
        "width": 170
      },
      {
        "id": "D01-READY",
        "lane": "specialist",
        "col": 5,
        "type": "external",
        "label": "Readiness",
        "sublabel": "Not ready · not authorisation",
        "width": 170
      }
    ],
    "edges": [
      {
        "id": "D01-E01",
        "from": "D01-SCOPE",
        "to": "D01-CONFLICTS",
        "label": "Start condition",
        "variant": "default",
        "width": 1.2
      },
      {
        "id": "D01-E02",
        "from": "D01-SCOPE",
        "to": "D01-CREDIT",
        "label": "Start condition",
        "variant": "default",
        "width": 1.2
      },
      {
        "id": "D01-E03",
        "from": "D01-SCOPE",
        "to": "D01-KYC",
        "label": "Start condition",
        "variant": "default",
        "width": 1.2
      },
      {
        "id": "D01-E04",
        "from": "D01-CREDIT",
        "to": "D01-LEGAL",
        "label": "Version dependency",
        "variant": "default",
        "width": 2
      },
      {
        "id": "D01-E05",
        "from": "D01-CONFLICTS",
        "to": "D01-READY",
        "label": "Contribution",
        "variant": "default",
        "width": 1.2
      },
      {
        "id": "D01-E06",
        "from": "D01-LEGAL",
        "to": "D01-READY",
        "label": "Contribution",
        "variant": "default",
        "width": 1.2
      },
      {
        "id": "D01-E07",
        "from": "D01-KYC",
        "to": "D01-READY",
        "label": "Contribution",
        "variant": "default",
        "width": 1.2
      }
    ],
    "width": 1022,
    "height": 528
  },
  "DG-D02.zh-CN": {
    "id": "DG-D02",
    "locale": "zh-CN",
    "asset": "DG-D02.zh-CN.r02",
    "title": "信贷至协议的版本链",
    "nodes": [
      {
        "id": "D02-ASSESS",
        "lane": "credit",
        "col": 0,
        "type": "external",
        "label": "信贷评估",
        "sublabel": "所需资料与评估版本"
      },
      {
        "id": "D02-DECISION",
        "lane": "credit",
        "col": 1,
        "type": "external",
        "label": "信贷决定",
        "sublabel": "CD-01 · 合成批准"
      },
      {
        "id": "D02-CONDITION",
        "lane": "credit",
        "col": 2,
        "type": "external",
        "label": "信贷条件",
        "sublabel": "CC-01 · 纳入产品协议"
      },
      {
        "id": "D02-INPUT",
        "lane": "credit",
        "col": 3,
        "type": "external",
        "label": "协议输入",
        "sublabel": "AI-01 · 锁定信贷版本"
      },
      {
        "id": "D02-REVISION",
        "lane": "legal",
        "col": 3,
        "type": "external",
        "label": "协议版本",
        "sublabel": "AGR-01 · 版本 03"
      },
      {
        "id": "D02-REVIEW",
        "lane": "legal",
        "col": 4,
        "type": "external",
        "label": "法律复核",
        "sublabel": "针对具体协议版本"
      },
      {
        "id": "D02-APPROVAL",
        "lane": "legal",
        "col": 5,
        "type": "external",
        "label": "内部批准",
        "sublabel": "不是签署完成"
      },
      {
        "id": "D02-EXECUTION",
        "lane": "execution",
        "col": 5,
        "type": "external",
        "label": "签署执行",
        "sublabel": "仍需权限与条件"
      }
    ],
    "edges": [
      {
        "id": "D02-E01",
        "from": "D02-ASSESS",
        "to": "D02-DECISION",
        "label": "评估依据",
        "variant": "default",
        "width": 1.2
      },
      {
        "id": "D02-E02",
        "from": "D02-DECISION",
        "to": "D02-CONDITION",
        "label": "形成条件",
        "variant": "default",
        "width": 1.2
      },
      {
        "id": "D02-E03",
        "from": "D02-CONDITION",
        "to": "D02-INPUT",
        "label": "供给条款",
        "variant": "default",
        "width": 1.2
      },
      {
        "id": "D02-E04",
        "from": "D02-INPUT",
        "to": "D02-REVISION",
        "label": "纳入版本",
        "variant": "default",
        "width": 1.2
      },
      {
        "id": "D02-E05",
        "from": "D02-REVISION",
        "to": "D02-REVIEW",
        "label": "复核版本",
        "variant": "default",
        "width": 1.2
      },
      {
        "id": "D02-E06",
        "from": "D02-REVIEW",
        "to": "D02-APPROVAL",
        "label": "批准版本",
        "variant": "default",
        "width": 1.2
      },
      {
        "id": "D02-E07",
        "from": "D02-APPROVAL",
        "to": "D02-EXECUTION",
        "label": "执行门槛",
        "variant": "default",
        "width": 1.2
      }
    ],
    "width": 945,
    "height": 528
  },
  "DG-D02.en-AU": {
    "id": "DG-D02",
    "locale": "en-AU",
    "asset": "DG-D02.en-AU.r02",
    "title": "Credit-to-Legal version chain",
    "nodes": [
      {
        "id": "D02-ASSESS",
        "lane": "credit",
        "col": 0,
        "type": "external",
        "label": "Assessment",
        "sublabel": "Credit data",
        "width": 120
      },
      {
        "id": "D02-DECISION",
        "lane": "credit",
        "col": 1,
        "type": "external",
        "label": "CD-01",
        "sublabel": "Credit decision",
        "width": 120
      },
      {
        "id": "D02-CONDITION",
        "lane": "credit",
        "col": 2,
        "type": "external",
        "label": "CC-01",
        "sublabel": "Credit condition",
        "width": 120
      },
      {
        "id": "D02-INPUT",
        "lane": "credit",
        "col": 3,
        "type": "external",
        "label": "AI-01",
        "sublabel": "Agreement input",
        "width": 120
      },
      {
        "id": "D02-REVISION",
        "lane": "legal",
        "col": 3,
        "type": "external",
        "label": "AGR-01 rev 03",
        "sublabel": "Current agreement",
        "width": 120
      },
      {
        "id": "D02-REVIEW",
        "lane": "legal",
        "col": 4,
        "type": "external",
        "label": "Legal review",
        "sublabel": "Version-specific",
        "width": 120
      },
      {
        "id": "D02-APPROVAL",
        "lane": "legal",
        "col": 5,
        "type": "external",
        "label": "Approval",
        "sublabel": "Not executed",
        "width": 120
      },
      {
        "id": "D02-EXECUTION",
        "lane": "execution",
        "col": 5,
        "type": "external",
        "label": "Execution",
        "sublabel": "Authority needed",
        "width": 120
      }
    ],
    "edges": [
      {
        "id": "D02-E01",
        "from": "D02-ASSESS",
        "to": "D02-DECISION",
        "label": "Basis",
        "variant": "default",
        "width": 1.2
      },
      {
        "id": "D02-E02",
        "from": "D02-DECISION",
        "to": "D02-CONDITION",
        "label": "Condition",
        "variant": "default",
        "width": 1.2
      },
      {
        "id": "D02-E03",
        "from": "D02-CONDITION",
        "to": "D02-INPUT",
        "label": "Terms",
        "variant": "default",
        "width": 1.2
      },
      {
        "id": "D02-E04",
        "from": "D02-INPUT",
        "to": "D02-REVISION",
        "label": "Incorporate",
        "variant": "default",
        "width": 1.2
      },
      {
        "id": "D02-E05",
        "from": "D02-REVISION",
        "to": "D02-REVIEW",
        "label": "Review",
        "variant": "default",
        "width": 1.2
      },
      {
        "id": "D02-E06",
        "from": "D02-REVIEW",
        "to": "D02-APPROVAL",
        "label": "Approve",
        "variant": "default",
        "width": 1.2
      },
      {
        "id": "D02-E07",
        "from": "D02-APPROVAL",
        "to": "D02-EXECUTION",
        "label": "Execution gate",
        "variant": "default",
        "width": 1.2
      }
    ],
    "width": 1103,
    "height": 528
  },
  "DG-D02.en-US": {
    "id": "DG-D02",
    "locale": "en-US",
    "asset": "DG-D02.en-US.r02",
    "title": "Credit-to-Legal version chain",
    "nodes": [
      {
        "id": "D02-ASSESS",
        "lane": "credit",
        "col": 0,
        "type": "external",
        "label": "Assessment",
        "sublabel": "Credit data",
        "width": 120
      },
      {
        "id": "D02-DECISION",
        "lane": "credit",
        "col": 1,
        "type": "external",
        "label": "CD-01",
        "sublabel": "Credit decision",
        "width": 120
      },
      {
        "id": "D02-CONDITION",
        "lane": "credit",
        "col": 2,
        "type": "external",
        "label": "CC-01",
        "sublabel": "Credit condition",
        "width": 120
      },
      {
        "id": "D02-INPUT",
        "lane": "credit",
        "col": 3,
        "type": "external",
        "label": "AI-01",
        "sublabel": "Agreement input",
        "width": 120
      },
      {
        "id": "D02-REVISION",
        "lane": "legal",
        "col": 3,
        "type": "external",
        "label": "AGR-01 rev 03",
        "sublabel": "Current agreement",
        "width": 120
      },
      {
        "id": "D02-REVIEW",
        "lane": "legal",
        "col": 4,
        "type": "external",
        "label": "Legal review",
        "sublabel": "Version-specific",
        "width": 120
      },
      {
        "id": "D02-APPROVAL",
        "lane": "legal",
        "col": 5,
        "type": "external",
        "label": "Approval",
        "sublabel": "Not executed",
        "width": 120
      },
      {
        "id": "D02-EXECUTION",
        "lane": "execution",
        "col": 5,
        "type": "external",
        "label": "Execution",
        "sublabel": "Authority needed",
        "width": 120
      }
    ],
    "edges": [
      {
        "id": "D02-E01",
        "from": "D02-ASSESS",
        "to": "D02-DECISION",
        "label": "Basis",
        "variant": "default",
        "width": 1.2
      },
      {
        "id": "D02-E02",
        "from": "D02-DECISION",
        "to": "D02-CONDITION",
        "label": "Condition",
        "variant": "default",
        "width": 1.2
      },
      {
        "id": "D02-E03",
        "from": "D02-CONDITION",
        "to": "D02-INPUT",
        "label": "Terms",
        "variant": "default",
        "width": 1.2
      },
      {
        "id": "D02-E04",
        "from": "D02-INPUT",
        "to": "D02-REVISION",
        "label": "Incorporate",
        "variant": "default",
        "width": 1.2
      },
      {
        "id": "D02-E05",
        "from": "D02-REVISION",
        "to": "D02-REVIEW",
        "label": "Review",
        "variant": "default",
        "width": 1.2
      },
      {
        "id": "D02-E06",
        "from": "D02-REVIEW",
        "to": "D02-APPROVAL",
        "label": "Approve",
        "variant": "default",
        "width": 1.2
      },
      {
        "id": "D02-E07",
        "from": "D02-APPROVAL",
        "to": "D02-EXECUTION",
        "label": "Execution gate",
        "variant": "default",
        "width": 1.2
      }
    ],
    "width": 1103,
    "height": 528
  },
  "DG-D03.zh-CN": {
    "id": "DG-D03",
    "locale": "zh-CN",
    "asset": "DG-D03.zh-CN.r02",
    "title": "限定范围的暂停",
    "nodes": [
      {
        "id": "D03-ISSUE",
        "lane": "branch",
        "col": 0,
        "type": "external",
        "label": "发现问题",
        "sublabel": "不自动暂停全案",
        "width": 150
      },
      {
        "id": "D03-IMPACT",
        "lane": "branch",
        "col": 1,
        "type": "external",
        "label": "判断影响",
        "sublabel": "依据依赖与授权",
        "width": 150
      },
      {
        "id": "D03-TASK",
        "lane": "task",
        "col": 2,
        "type": "external",
        "label": "任务暂停",
        "sublabel": "仅对应活动",
        "width": 150
      },
      {
        "id": "D03-BRANCH",
        "lane": "branch",
        "col": 2,
        "type": "external",
        "label": "分支暂停",
        "sublabel": "仅对应工作分支",
        "width": 150
      },
      {
        "id": "D03-CASE",
        "lane": "case",
        "col": 2,
        "type": "external",
        "label": "案件暂停",
        "sublabel": "需明确全案依据",
        "width": 150
      },
      {
        "id": "D03-UNKNOWN",
        "lane": "unknown",
        "col": 2,
        "type": "external",
        "label": "影响未知",
        "sublabel": "不能当作不受影响",
        "width": 150
      },
      {
        "id": "D03-AFFECTED",
        "lane": "branch",
        "col": 3,
        "type": "external",
        "label": "受影响工作",
        "sublabel": "核对暂停解除条件",
        "width": 150
      },
      {
        "id": "D03-UNAFFECTED",
        "lane": "task",
        "col": 4,
        "type": "external",
        "label": "独立工作",
        "sublabel": "须有独立性依据",
        "width": 150
      },
      {
        "id": "D03-DEPS",
        "lane": "unknown",
        "col": 4,
        "type": "external",
        "label": "未知依赖",
        "sublabel": "等待复核影响",
        "width": 150
      },
      {
        "id": "D03-RESOLVE",
        "lane": "branch",
        "col": 5,
        "type": "external",
        "label": "解决或重评",
        "sublabel": "保留决定及历史",
        "width": 150
      }
    ],
    "edges": [
      {
        "id": "D03-E01",
        "from": "D03-ISSUE",
        "to": "D03-IMPACT",
        "label": "评估范围",
        "variant": "default",
        "width": 1.2
      },
      {
        "id": "D03-E02",
        "from": "D03-IMPACT",
        "to": "D03-TASK",
        "label": "已证实任务影响",
        "variant": "default",
        "width": 1.2
      },
      {
        "id": "D03-E03",
        "from": "D03-IMPACT",
        "to": "D03-BRANCH",
        "label": "已证实分支影响",
        "variant": "default",
        "width": 1.2
      },
      {
        "id": "D03-E04",
        "from": "D03-IMPACT",
        "to": "D03-CASE",
        "label": "已证实全案影响",
        "variant": "default",
        "width": 1.2
      },
      {
        "id": "D03-E05",
        "from": "D03-IMPACT",
        "to": "D03-UNKNOWN",
        "label": "尚未判定",
        "variant": "default",
        "width": 1.2
      },
      {
        "id": "D03-E06",
        "from": "D03-TASK",
        "to": "D03-AFFECTED",
        "label": "限定暂停",
        "variant": "default",
        "width": 1.2
      },
      {
        "id": "D03-E07",
        "from": "D03-BRANCH",
        "to": "D03-AFFECTED",
        "label": "限定暂停",
        "variant": "default",
        "width": 1.2
      },
      {
        "id": "D03-E08",
        "from": "D03-CASE",
        "to": "D03-AFFECTED",
        "label": "限定暂停",
        "variant": "default",
        "width": 1.2
      },
      {
        "id": "D03-E09",
        "from": "D03-TASK",
        "to": "D03-UNAFFECTED",
        "label": "独立性已证实",
        "variant": "default",
        "width": 1.2
      },
      {
        "id": "D03-E10",
        "from": "D03-UNKNOWN",
        "to": "D03-DEPS",
        "label": "保持未知",
        "variant": "default",
        "width": 1.2
      },
      {
        "id": "D03-E11",
        "from": "D03-AFFECTED",
        "to": "D03-RESOLVE",
        "label": "检查解除",
        "variant": "default",
        "width": 1.2
      },
      {
        "id": "D03-E12",
        "from": "D03-UNAFFECTED",
        "to": "D03-RESOLVE",
        "label": "继续独立工作",
        "variant": "default",
        "width": 1.2
      },
      {
        "id": "D03-E13",
        "from": "D03-DEPS",
        "to": "D03-RESOLVE",
        "label": "重新判断",
        "variant": "default",
        "width": 1.2
      }
    ],
    "width": 1110,
    "height": 652
  },
  "DG-D03.en-AU": {
    "id": "DG-D03",
    "locale": "en-AU",
    "asset": "DG-D03.en-AU.r02",
    "title": "Scoped holds",
    "nodes": [
      {
        "id": "D03-ISSUE",
        "lane": "branch",
        "col": 0,
        "type": "external",
        "label": "Issue detected",
        "sublabel": "No blanket stop",
        "width": 150
      },
      {
        "id": "D03-IMPACT",
        "lane": "branch",
        "col": 1,
        "type": "external",
        "label": "Determine impact",
        "sublabel": "Evidence required",
        "width": 150
      },
      {
        "id": "D03-TASK",
        "lane": "task",
        "col": 2,
        "type": "external",
        "label": "Task hold",
        "sublabel": "Named task only",
        "width": 150
      },
      {
        "id": "D03-BRANCH",
        "lane": "branch",
        "col": 2,
        "type": "external",
        "label": "Branch hold",
        "sublabel": "Named branch only",
        "width": 150
      },
      {
        "id": "D03-CASE",
        "lane": "case",
        "col": 2,
        "type": "external",
        "label": "Case hold",
        "sublabel": "Case-wide basis",
        "width": 150
      },
      {
        "id": "D03-UNKNOWN",
        "lane": "unknown",
        "col": 2,
        "type": "external",
        "label": "Impact unknown",
        "sublabel": "Not unaffected",
        "width": 150
      },
      {
        "id": "D03-AFFECTED",
        "lane": "branch",
        "col": 3,
        "type": "external",
        "label": "Affected work",
        "sublabel": "Release criteria",
        "width": 150
      },
      {
        "id": "D03-UNAFFECTED",
        "lane": "task",
        "col": 4,
        "type": "external",
        "label": "Unaffected work",
        "sublabel": "Independence basis",
        "width": 150
      },
      {
        "id": "D03-DEPS",
        "lane": "unknown",
        "col": 4,
        "type": "external",
        "label": "Unknown dependencies",
        "sublabel": "Impact review due",
        "width": 150
      },
      {
        "id": "D03-RESOLVE",
        "lane": "branch",
        "col": 5,
        "type": "external",
        "label": "Resolve / reassess",
        "sublabel": "Retain history",
        "width": 150
      }
    ],
    "edges": [
      {
        "id": "D03-E01",
        "from": "D03-ISSUE",
        "to": "D03-IMPACT",
        "label": "Assess scope",
        "variant": "default",
        "width": 1.2
      },
      {
        "id": "D03-E02",
        "from": "D03-IMPACT",
        "to": "D03-TASK",
        "label": "Task impact known",
        "variant": "default",
        "width": 1.2
      },
      {
        "id": "D03-E03",
        "from": "D03-IMPACT",
        "to": "D03-BRANCH",
        "label": "Branch impact known",
        "variant": "default",
        "width": 1.2
      },
      {
        "id": "D03-E04",
        "from": "D03-IMPACT",
        "to": "D03-CASE",
        "label": "Case impact known",
        "variant": "default",
        "width": 1.2
      },
      {
        "id": "D03-E05",
        "from": "D03-IMPACT",
        "to": "D03-UNKNOWN",
        "label": "Not established",
        "variant": "default",
        "width": 1.2
      },
      {
        "id": "D03-E06",
        "from": "D03-TASK",
        "to": "D03-AFFECTED",
        "label": "Scoped stop",
        "variant": "default",
        "width": 1.2
      },
      {
        "id": "D03-E07",
        "from": "D03-BRANCH",
        "to": "D03-AFFECTED",
        "label": "Scoped stop",
        "variant": "default",
        "width": 1.2
      },
      {
        "id": "D03-E08",
        "from": "D03-CASE",
        "to": "D03-AFFECTED",
        "label": "Scoped stop",
        "variant": "default",
        "width": 1.2
      },
      {
        "id": "D03-E09",
        "from": "D03-TASK",
        "to": "D03-UNAFFECTED",
        "label": "Independence established",
        "variant": "default",
        "width": 1.2
      },
      {
        "id": "D03-E10",
        "from": "D03-UNKNOWN",
        "to": "D03-DEPS",
        "label": "Remain unknown",
        "variant": "default",
        "width": 1.2
      },
      {
        "id": "D03-E11",
        "from": "D03-AFFECTED",
        "to": "D03-RESOLVE",
        "label": "Review release",
        "variant": "default",
        "width": 1.2
      },
      {
        "id": "D03-E12",
        "from": "D03-UNAFFECTED",
        "to": "D03-RESOLVE",
        "label": "Continue independent work",
        "variant": "default",
        "width": 1.2
      },
      {
        "id": "D03-E13",
        "from": "D03-DEPS",
        "to": "D03-RESOLVE",
        "label": "Reassess",
        "variant": "default",
        "width": 1.2
      }
    ],
    "width": 1168,
    "height": 652
  },
  "DG-D03.en-US": {
    "id": "DG-D03",
    "locale": "en-US",
    "asset": "DG-D03.en-US.r02",
    "title": "Scoped holds",
    "nodes": [
      {
        "id": "D03-ISSUE",
        "lane": "branch",
        "col": 0,
        "type": "external",
        "label": "Issue detected",
        "sublabel": "No blanket stop",
        "width": 150
      },
      {
        "id": "D03-IMPACT",
        "lane": "branch",
        "col": 1,
        "type": "external",
        "label": "Determine impact",
        "sublabel": "Evidence required",
        "width": 150
      },
      {
        "id": "D03-TASK",
        "lane": "task",
        "col": 2,
        "type": "external",
        "label": "Task hold",
        "sublabel": "Named task only",
        "width": 150
      },
      {
        "id": "D03-BRANCH",
        "lane": "branch",
        "col": 2,
        "type": "external",
        "label": "Branch hold",
        "sublabel": "Named branch only",
        "width": 150
      },
      {
        "id": "D03-CASE",
        "lane": "case",
        "col": 2,
        "type": "external",
        "label": "Case hold",
        "sublabel": "Case-wide basis",
        "width": 150
      },
      {
        "id": "D03-UNKNOWN",
        "lane": "unknown",
        "col": 2,
        "type": "external",
        "label": "Impact unknown",
        "sublabel": "Not unaffected",
        "width": 150
      },
      {
        "id": "D03-AFFECTED",
        "lane": "branch",
        "col": 3,
        "type": "external",
        "label": "Affected work",
        "sublabel": "Release criteria",
        "width": 150
      },
      {
        "id": "D03-UNAFFECTED",
        "lane": "task",
        "col": 4,
        "type": "external",
        "label": "Unaffected work",
        "sublabel": "Independence basis",
        "width": 150
      },
      {
        "id": "D03-DEPS",
        "lane": "unknown",
        "col": 4,
        "type": "external",
        "label": "Unknown dependencies",
        "sublabel": "Impact review due",
        "width": 150
      },
      {
        "id": "D03-RESOLVE",
        "lane": "branch",
        "col": 5,
        "type": "external",
        "label": "Resolve / reassess",
        "sublabel": "Retain history",
        "width": 150
      }
    ],
    "edges": [
      {
        "id": "D03-E01",
        "from": "D03-ISSUE",
        "to": "D03-IMPACT",
        "label": "Assess scope",
        "variant": "default",
        "width": 1.2
      },
      {
        "id": "D03-E02",
        "from": "D03-IMPACT",
        "to": "D03-TASK",
        "label": "Task impact known",
        "variant": "default",
        "width": 1.2
      },
      {
        "id": "D03-E03",
        "from": "D03-IMPACT",
        "to": "D03-BRANCH",
        "label": "Branch impact known",
        "variant": "default",
        "width": 1.2
      },
      {
        "id": "D03-E04",
        "from": "D03-IMPACT",
        "to": "D03-CASE",
        "label": "Case impact known",
        "variant": "default",
        "width": 1.2
      },
      {
        "id": "D03-E05",
        "from": "D03-IMPACT",
        "to": "D03-UNKNOWN",
        "label": "Not established",
        "variant": "default",
        "width": 1.2
      },
      {
        "id": "D03-E06",
        "from": "D03-TASK",
        "to": "D03-AFFECTED",
        "label": "Scoped stop",
        "variant": "default",
        "width": 1.2
      },
      {
        "id": "D03-E07",
        "from": "D03-BRANCH",
        "to": "D03-AFFECTED",
        "label": "Scoped stop",
        "variant": "default",
        "width": 1.2
      },
      {
        "id": "D03-E08",
        "from": "D03-CASE",
        "to": "D03-AFFECTED",
        "label": "Scoped stop",
        "variant": "default",
        "width": 1.2
      },
      {
        "id": "D03-E09",
        "from": "D03-TASK",
        "to": "D03-UNAFFECTED",
        "label": "Independence established",
        "variant": "default",
        "width": 1.2
      },
      {
        "id": "D03-E10",
        "from": "D03-UNKNOWN",
        "to": "D03-DEPS",
        "label": "Remain unknown",
        "variant": "default",
        "width": 1.2
      },
      {
        "id": "D03-E11",
        "from": "D03-AFFECTED",
        "to": "D03-RESOLVE",
        "label": "Review release",
        "variant": "default",
        "width": 1.2
      },
      {
        "id": "D03-E12",
        "from": "D03-UNAFFECTED",
        "to": "D03-RESOLVE",
        "label": "Continue independent work",
        "variant": "default",
        "width": 1.2
      },
      {
        "id": "D03-E13",
        "from": "D03-DEPS",
        "to": "D03-RESOLVE",
        "label": "Reassess",
        "variant": "default",
        "width": 1.2
      }
    ],
    "width": 1168,
    "height": 652
  }
};
