# 网站部署快速指南

## 🎉 改造完成清单

✅ **视觉现代化**: 学术清新风格,渐变紫色主题,卡片式布局  
✅ **Google Scholar集成**: 侧边栏实时显示引用数据  
✅ **访客地图**: ClustrMaps访客统计(需配置)  
✅ **响应式设计**: 完美适配所有设备  

---

## 📋 立即部署(3步完成)

### 第1步: 配置ClustrMaps访客地图

1. 访问 https://clustrmaps.com/add
2. 输入您的网站URL并注册
3. 选择"Classic Map"样式
4. 复制获得的widget代码
5. 打开`index.html`,找到第229行,替换`YOUR_CLUSTRMAPS_ID`

**示例:**
```html
<!-- 原代码(第229行) -->
<script type="text/javascript" id="clustrmaps" 
  src="//clustrmaps.com/map_v2.js?d=YOUR_CLUSTRMAPS_ID&cl=ffffff&w=a">
</script>

<!-- 替换为(YOUR_CLUSTRMAPS_ID改为实际ID) -->
<script type="text/javascript" id="clustrmaps" 
  src="//clustrmaps.com/map_v2.js?d=abc123xyz456&cl=ffffff&w=a">
</script>
```

### 第2步: 上传到服务器

**方式A: GitHub Pages(推荐,免费)**
```bash
cd LWBWebsite
git init
git add .
git commit -m "Modern academic website"
git remote add origin https://github.com/yourusername/yourrepo.git
git push -u origin main

# 在GitHub仓库设置中启用Pages
# Settings → Pages → Source: main branch
# 您的网站将在 https://yourusername.github.io/yourrepo 上线
```

**方式B: 上传到您的服务器**
```bash
# 使用FTP/SFTP工具上传整个LWBWebsite文件夹
# 或使用命令行
scp -r LWBWebsite user@your-server.com:/var/www/html/
```

### 第3步: 设置Scholar数据自动更新

**如果您有服务器访问权限:**
```bash
# SSH登录服务器
ssh user@your-server.com

# 编辑crontab
crontab -e

# 添加以下行(每天凌晨2点更新)
0 2 * * * cd /path/to/LWBWebsite/api && ./update_scholar.sh

# 保存退出
```

**如果使用GitHub Pages:**
可以使用GitHub Actions自动更新,创建`.github/workflows/update-scholar.yml`:
```yaml
name: Update Scholar Data
on:
  schedule:
    - cron: '0 2 * * *'  # 每天凌晨2点UTC
  workflow_dispatch:

jobs:
  update:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Update Scholar Data
        run: |
          cd api
          python3 scholar.py
          cp scholar_data.json ../
      - name: Commit changes
        run: |
          git config --local user.email "action@github.com"
          git config --local user.name "GitHub Action"
          git add scholar_data.json
          git commit -m "Update scholar data" || exit 0
          git push
```

---

## 🔧 可选配置

### 更改API Key(如果需要)
编辑`api/scholar.py`,第13行:
```python
SERPAPI_KEY = os.environ["SERPAPI_KEY"]
```

### 手动更新Scholar数据
```bash
cd api
python3 scholar.py
cp scholar_data.json ../
```

---

## 📱 测试网站

### 本地测试
```bash
cd LWBWebsite
python3 -m http.server 8080
# 访问 http://localhost:8080/index.html
```

### 在线测试
部署后访问您的网站URL,检查:
- ✓ 页面样式是否正常
- ✓ Google Scholar数据是否显示(右侧侧边栏)
- ✓ 访客地图是否加载(页面底部)
- ✓ 响应式设计(调整浏览器窗口大小)

---

## 🎨 网站特色

### 现代化设计元素
- **渐变色彩**: 紫色系渐变(#667eea → #764ba2)
- **圆角卡片**: 所有内容模块12px圆角
- **柔和阴影**: 0 10px 40px rgba(0,0,0,0.05)
- **悬停动画**: transform: translateY(-3px)
- **平滑过渡**: transition: all 0.3s ease

### Google Scholar侧边栏
- 实时显示Citations、h-index、i10-index
- 24小时缓存机制
- 优雅的卡片式设计
- 直接链接到完整profile

### 访客地图
- ClustrMaps经典地图样式
- 实时访客统计
- 全球访客分布可视化

---

## 📞 技术支持

### 常见问题

**Q: Scholar数据不显示?**  
A: 检查`scholar_data.json`是否存在,或手动运行`python3 api/scholar.py`

**Q: 访客地图不显示?**  
A: 确认已替换`YOUR_CLUSTRMAPS_ID`为实际ID

**Q: 样式显示异常?**  
A: 清除浏览器缓存,确保`css/style.css`正确加载

**Q: 如何修改配色?**  
A: 编辑`css/style.css`,搜索`#667eea`和`#764ba2`替换为您喜欢的颜色

### 文件说明

| 文件 | 用途 | 是否必需 |
|------|------|---------|
| index.html | 主页 | ✅ 必需 |
| css/style.css | 样式表 | ✅ 必需 |
| js/main.js | JavaScript功能 | ✅ 必需 |
| scholar_data.json | Scholar数据 | ✅ 必需 |
| api/scholar.py | 数据获取脚本 | ⚙️ 可选(用于更新) |
| api/update_scholar.sh | 更新脚本 | ⚙️ 可选(用于定时任务) |

---

## 🚀 下一步建议

1. **SEO优化**: 添加meta标签和sitemap.xml
2. **性能优化**: 压缩图片,使用WebP格式
3. **分析工具**: 集成Google Analytics
4. **SSL证书**: 启用HTTPS(GitHub Pages自动支持)
5. **自定义域名**: 绑定您的个人域名

---

**祝您部署顺利!** 🎊

如有问题,请参考完整的`README.md`文档。
