# News 模块使用说明

## 📝 如何添加新闻

### 1. 创建Markdown文件

在 `news/` 目录下创建新的Markdown文件,文件名格式:
```
YYYY-MM-DD-简短标题.md
```

例如: `2025-06-15-conference-award.md`

### 2. 文件格式

每个新闻文件包含两部分:

**Frontmatter(元数据)** - 使用YAML格式,包含在`---`之间:
```markdown
---
date: 2025-06-15
category: AWARD
title: 新闻标题
image: images/news/photo.jpg
---
```

**Content(正文)** - Frontmatter之后的内容:
```markdown
新闻的详细描述内容,支持Markdown格式...
```

### 3. 元数据字段说明

| 字段 | 必填 | 说明 | 示例 |
|------|------|------|------|
| `date` | ✅ | 新闻日期(YYYY-MM-DD格式) | `2025-06-15` |
| `category` | ✅ | 新闻类别标签 | `PHD`, `JOURNAL ARTICLE`, `AWARD` |
| `title` | ✅ | 新闻标题 | `Congratulations on...` |
| `image` | ❌ | 新闻配图路径(可选) | `images/news/photo.jpg` |

### 4. 常用类别标签

- `PHD` - 博士相关
- `JOURNAL ARTICLE` - 期刊论文
- `INTERNATIONAL JOURNAL` - 国际期刊
- `INTERNATIONAL COLLABORATION` - 国际合作
- `AWARD` - 获奖信息
- `CONFERENCE` - 会议相关
- `PROJECT` - 项目相关

### 5. 完整示例

创建文件: `news/2025-06-15-best-paper-award.md`

```markdown
---
date: 2025-06-15
category: AWARD
title: Our paper won the Best Paper Award at ICSC 2025!
image: images/news/award-ceremony.jpg
---

We are thrilled to announce that our research paper "AI-Powered Construction Safety Monitoring" has been awarded the Best Paper Award at the International Conference on Smart Construction (ICSC) 2025. This recognition highlights our team's dedication to advancing construction technology through innovative AI applications.
```

### 6. 更新新闻列表

添加新文件后,需要在 `js/news.js` 中的 `newsFiles` 数组添加文件路径:

```javascript
const newsFiles = [
    'news/2025-06-15-best-paper-award.md',  // 新添加的
    'news/2025-05-14-phd-degree.md',
    'news/2025-04-08-editorial-board.md',
    // ... 其他文件
];
```

### 7. 图片管理

**建议图片规格:**
- 尺寸: 800x600px 或 16:9比例
- 格式: JPG或PNG
- 大小: < 500KB

**存放位置:**
```
images/news/your-image.jpg
```

**如果没有图片:**
将 `image:` 字段留空或省略,新闻卡片将自动调整为无图片样式。

### 8. 排序规则

新闻会自动按照 `date` 字段**倒序排列**(最新的在前)。

### 9. 注意事项

- ✅ 日期格式必须是 `YYYY-MM-DD`
- ✅ Frontmatter必须在文件开头
- ✅ `---` 分隔符必须独占一行
- ✅ 字段名后的冒号后要有空格
- ✅ 标题和内容避免使用特殊字符

### 10. 快速添加模板

复制以下模板快速创建新闻:

```markdown
---
date: YYYY-MM-DD
category: CATEGORY_NAME
title: Your News Title Here
image: images/news/your-image.jpg
---

Your news content here. You can use **bold**, *italic*, and other Markdown formatting.
```

---

## 🌐 News页面说明

News模块作为**独立页面**存在:

**页面位置:**
- URL: `news.html`
- 导航栏: Home → **News** → Publications → Projects → Awards

**页面特点:**
- 专门展示新闻的独立页面
- 2列网格布局(移动端自动变为1列)
- 与网站整体风格完全一致
- 包含页面简介说明

**访问方式:**
1. 点击导航栏的"News"链接
2. 直接访问 `news.html`

---

## 🎨 样式说明

新闻卡片采用2列网格布局(移动端自动变为1列),包含:
- 新闻配图(可选,200px高度)
- 类别标签(蓝色大写)
- 标题(粗体)
- 摘要(正文内容)
- 日期(灰色小字)

卡片支持悬停效果,与网站整体风格保持一致。

---

## 📂 文件结构

```
LWBWebsite/
├── news.html                        # News独立页面
├── news/
│   ├── README.md                    # 本文档
│   ├── 2025-05-14-phd-degree.md    # 示例新闻
│   ├── 2025-04-08-editorial-board.md
│   ├── 2025-04-04-dbi-fellowship.md
│   └── 2025-03-23-paper-accepted.md
├── js/
│   └── news.js                      # News管理脚本
└── css/
    └── style.css                    # 包含News样式
```

---

## 🚀 部署说明

**无需额外配置!**

上传到服务器后,News页面会自动工作:
1. 访问 `news.html` 页面
2. 自动读取 `news/` 目录下的Markdown文件
3. 解析frontmatter元数据
4. 按日期排序并渲染为卡片布局
