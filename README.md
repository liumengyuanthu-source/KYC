# KYC · Clear-to-Trade

交互式 Clear-to-Trade 设计原型，包含 Workshop、Scenario Studio 与 Demo。使用合成案例和角色，支持英文／简体中文。无需数据库或 npm 安装。

## 本地启动

需要 Python 3.10+；运行测试另需 Node.js 22+。

```sh
python3 scripts/preview.py
```

打开 http://127.0.0.1:8899/ 。保持启动窗口运行；关闭服务后，本地链接将无法访问。

- **Scenario Studio**：进入 Journey Map，切换 Customer journey / Hero case；点击节点查看 Scenario 与 M/C 源步骤映射，再进入详情。
- **Workshop**：五阶段讨论、记录、汇总及导出。
- **Demo**：客户端请求与案例演示，保留现有状态和操作流程。

## 主要目录

| 路径 | 内容 |
| --- | --- |
| `prototype/studio-next/` | CJ / Hero 地图、场景详情、源步骤映射与弹窗 |
| `prototype/workshop-guide/` | Workshop 五阶段讨论 |
| `08_inspire/app/` | Demo 页面、样式和交互 |
| `prototype/i18n/` | 中英文翻译 |
| `deploy/site-files.json` | 发布文件清单 |
| `scripts/` | 本地服务、站点构建及发布副本生成 |
| `.github/workflows/pages.yml` | 校验与手动 GitHub Pages 发布 |

## 验证与构建

```sh
python3 -m unittest discover -s tests -p test_site_build.py -v
node --test prototype/tests/scenario-mapping.test.mjs prototype/tests/journey-scenario-popup.test.mjs
python3 scripts/build_site.py
```

站点生成在 `.build/site/`。从完整开发目录生成独立发布副本：

```sh
python3 scripts/prepare_kyc_release.py
```

副本生成在 `.release/KYC/`，包含代码、页面、运行数据、测试、部署配置及文件校验清单。历史截图、审计产物和原始附件不进入该副本。

## 部署

目标仓库：[liumengyuanthu-source/KYC](https://github.com/liumengyuanthu-source/KYC)。当前仅完成本地准备，尚未上传或发布。

完整步骤、权限状态与公开发布前的内容检查见 [部署说明](docs/DEPLOYMENT.md)；功能范围见 [版本说明](docs/RELEASE_NOTES.md)。GitHub Pages 使用相对路径，支持 `/KYC/` 项目子路径。推送／PR 执行校验，手动运行 main 分支工作流才部署站点。

Scenario Template 暂不改动。浏览器中保存的讨论记录和 Demo 状态不会同步到 GitHub。
