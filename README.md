# 个人学术网站 - 部署说明

## 网站改造总结

本次改造将网站升级为**学术清新风格**,主要改进包括:

### 1. 视觉设计现代化
- **配色方案**: 采用渐变紫色主题(#667eea → #764ba2),搭配浅色背景
- **卡片式布局**: 所有内容模块采用圆角卡片设计,增强层次感
- **优雅字体**: 使用系统现代字体栈,提升可读性
- **动画效果**: 添加hover悬停动画和淡入效果
- **响应式设计**: 完美适配桌面、平板和手机

### 2. Google Scholar引用数据集成
- **实时数据**: 使用SerpAPI自动获取Google Scholar引用数据
- **侧边栏展示**: 在首页右侧显示Citations、h-index、i10-index
- **自动缓存**: 数据缓存24小时,减少API调用
- **每日更新**: 通过定时任务每天自动刷新数据

### 3. 访客地图功能
- **ClustrMaps集成**: 在页脚添加访客地图组件
- **访客统计**: 实时显示全球访客分布

## 文件结构

```
LWBWebsite/
├── index.html              # 主页
├── publications.html       # 论文页面
├── projects.html          # 项目页面
├── awards.html            # 奖项页面
├── scholar_data.json      # Google Scholar数据(自动生成)
├── css/
│   └── style.css          # 现代化样式文件
├── js/
│   └── main.js            # JavaScript功能(含Scholar数据加载)
├── images/                # 图片资源
├── files/                 # PDF文件
├── api/
│   ├── scholar.py         # Google Scholar数据获取脚本
│   ├── scholar_cache.json # 数据缓存文件
│   ├── scholar_data.json  # 生成的数据文件
│   └── update_scholar.sh  # 每日更新脚本
└── README.md              # 本文档
```

## 部署步骤

### 方式一: 静态网站托管(推荐)

1. **GitHub Pages部署**
   ```bash
   # 创建GitHub仓库
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin <your-repo-url>
   git push -u origin main
   
   # 在GitHub仓库设置中启用Pages
   # Settings → Pages → Source: main branch
   ```

2. **设置定时任务更新Scholar数据**
   
   在服务器上设置crontab:
   ```bash
   # 编辑crontab
   crontab -e
   
   # 添加每天凌晨2点更新的任务
   0 2 * * * cd /path/to/LWBWebsite/api && ./update_scholar.sh
   ```

3. **配置ClustrMaps**
   
   - 访问 https://clustrmaps.com/
   - 注册账号并添加您的网站URL
   - 获取您的widget代码
   - 在`index.html`中替换`YOUR_CLUSTRMAPS_ID`为您的实际ID

### 方式二: 本地测试

```bash
# 进入网站目录
cd LWBWebsite

# 启动简单HTTP服务器
python3 -m http.server 8080

# 在浏览器访问
# http://localhost:8080/index.html
```

### 方式三: 使用Web服务器

**Nginx配置示例:**
```nginx
server {
    listen 80;
    server_name your-domain.com;
    root /path/to/LWBWebsite;
    index index.html;
    
    location / {
        try_files $uri $uri/ =404;
    }
}
```

## Google Scholar数据更新

### 手动更新
```bash
cd api
python3 scholar.py
cp scholar_data.json ../
```

### 自动更新(推荐)
使用cron定时任务每天自动更新:
```bash
# 添加到crontab
0 2 * * * cd /path/to/LWBWebsite/api && ./update_scholar.sh
```

### API配置
如需更换API Key或Author ID,编辑`api/scholar.py`:
```python
SERPAPI_KEY = "your-api-key"
AUTHOR_ID = "your-author-id"
```

## ClustrMaps配置

1. 访问 https://clustrmaps.com/add
2. 输入您的网站URL
3. 选择地图样式(已选择经典样式)
4. 获取widget代码
5. 在`index.html`第229行替换`YOUR_CLUSTRMAPS_ID`

示例:
```html
<script type="text/javascript" id="clustrmaps" 
  src="//clustrmaps.com/map_v2.js?d=YOUR_ACTUAL_ID&cl=ffffff&w=a">
</script>
```

## 浏览器兼容性

- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+

## 性能优化建议

1. **图片优化**: 使用WebP格式压缩图片
2. **CDN加速**: 使用CDN托管静态资源
3. **缓存策略**: 配置浏览器缓存
4. **代码压缩**: 压缩CSS和JS文件

## 维护说明

### 更新个人信息
- 编辑`index.html`中的About Me部分
- 更新`images/avatar.jpg`头像图片

### 添加论文
- 编辑`publications.html`
- 添加论文图片到`images/`
- 添加PDF到`files/`

### 添加项目
- 编辑`projects.html`
- 添加项目图片到`images/`

### 添加奖项
- 编辑`awards.html`
- 添加奖项图片到`images/`

## 技术栈

- **前端**: HTML5, CSS3, JavaScript (ES6+)
- **样式**: 自定义CSS(渐变、动画、响应式)
- **图标**: Font Awesome 6.0
- **后端**: Python 3 (数据获取)
- **API**: SerpAPI (Google Scholar数据)
- **统计**: ClustrMaps (访客地图)

## 联系方式

如有问题,请联系:
- Email: liwangbing@emails.bjut.edu.cn
- Google Scholar: https://scholar.google.com/citations?user=mczdUnAAAAAJ

---

**最后更新**: 2024年10月30日
**版本**: 2.0 (现代化改造版)
