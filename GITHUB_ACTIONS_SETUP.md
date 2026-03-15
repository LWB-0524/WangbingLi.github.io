# GitHub Actions 自动更新设置指南

## 📋 概述
这个GitHub Actions工作流会每天自动更新您的Google Scholar数据，无需手动干预。

## 🔧 设置步骤

### 1. 设置API密钥（重要！）
1. 进入您的GitHub仓库页面
2. 点击 **Settings** 标签
3. 在左侧菜单中选择 **Secrets and variables** → **Actions**
4. 点击 **New repository secret**
5. 添加以下密钥：
   - **Name**: `SERPAPI_KEY`
   - **Value**: `7eacbeb37f14223a652afdd95b65827a6086c73b33b6a6b26b1f36c3c244b831`

### 2. 启用GitHub Pages
1. 在仓库设置中找到 **Pages** 部分
2. 选择 **Source**: Deploy from a branch
3. 选择 **Branch**: `gh-pages`
4. 点击 **Save**

### 3. 启用GitHub Actions
1. 进入仓库的 **Actions** 标签
2. 如果看到提示，点击 **I understand my workflows, go ahead and enable them**

## ⏰ 运行时间
- **自动运行**: 每天北京时间上午9点（UTC时间凌晨1点）
- **手动运行**: 可以在Actions页面手动触发

## 🔄 工作流程
1. 检出代码
2. 设置Python环境
3. 安装依赖
4. 运行scholar.py更新数据
5. 检查是否有数据变化
6. 如有变化，提交并推送到仓库
7. 自动部署到GitHub Pages

## 📊 监控
- 在仓库的 **Actions** 标签可以查看运行历史
- 每次运行的日志都会显示详细信息
- 如果运行失败，您会收到邮件通知

## 🛠️ 故障排除
- 确保SERPAPI_KEY正确设置
- 检查API配额是否用完
- 查看Actions运行日志获取详细错误信息

## 📝 注意事项
- 首次设置后可能需要手动触发一次来测试
- 如果连续几天没有新的引用数据，工作流不会产生新的提交
- SerpAPI有使用限制，请注意配额管理