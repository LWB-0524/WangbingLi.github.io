# 网站改造详细说明

## 改造概览

本次改造将您的个人学术网站升级为**现代化学术清新风格**,在保持原有网页架构的基础上,进行了全面的视觉和功能升级。

---

## 一、视觉设计改造

### 1.1 配色方案升级

**原配色:**
- 主色: #0066cc (传统蓝色)
- 背景: #f8f9fa (浅灰)

**新配色(学术清新风格):**
- 主色渐变: #667eea → #764ba2 (优雅紫色渐变)
- 背景渐变: #f5f7fa → #e8eef5 (浅蓝灰渐变)
- 强调色: #5a9fd4 (柔和蓝色)
- 文字色: #2c3e50 (深灰蓝,更易读)

### 1.2 布局优化

**卡片式设计:**
- 所有section采用白色卡片背景
- 圆角半径: 12-15px
- 柔和阴影: `0 10px 40px rgba(0,0,0,0.05)`
- 卡片间距: 60px

**头部优化:**
- 渐变背景: `linear-gradient(135deg, #667eea 0%, #764ba2 100%)`
- 导航按钮圆角: 25px(胶囊形状)
- 半透明背景效果: `rgba(255,255,255,0.1)`

**头像优化:**
- 尺寸增加: 200px → 220px
- 边框优化: 4px浅色边框
- 阴影升级: 带紫色调的柔和阴影
- 悬停效果: scale(1.05)

### 1.3 字体排版

**字体栈升级:**
```css
font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 
             'Roboto', 'Helvetica Neue', Arial, 'Noto Sans', 
             sans-serif, 'Microsoft YaHei', 'SimHei';
```

**行高优化:**
- 正文: 1.6 → 1.8 (提升可读性)
- 标题: 保持原有比例

**标题样式:**
- 字重: 300-500 (更轻盈)
- 下划线: 改为渐变色装饰条
- 颜色: #2c3e50 (更柔和)

### 1.4 动画效果

**悬停动画:**
```css
/* 卡片悬停 */
.publication-item:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 25px rgba(0,0,0,0.1);
}

/* 按钮悬停 */
.cv-button:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(102,126,234,0.4);
}
```

**页面加载动画:**
```css
@keyframes fadeIn {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
}
```

### 1.5 响应式优化

**断点设置:**
- 桌面: > 1400px (显示侧边栏)
- 平板: 768px - 1400px (侧边栏移至内容区)
- 手机: < 768px (单列布局)

---

## 二、功能新增

### 2.1 Google Scholar引用数据

**实现方式:**
- 使用SerpAPI获取实时数据
- Python脚本自动化获取
- JSON格式存储
- 前端JavaScript动态加载

**显示位置:**
- 桌面: 右侧固定侧边栏
- 移动: 内容区顶部

**数据项:**
- Citations(总引用数): 45
- h-index: 0
- i10-index: 0
- 最后更新时间

**缓存机制:**
- 缓存时长: 24小时
- 缓存文件: `api/scholar_cache.json`
- 自动刷新: 超过24小时自动重新获取

**更新方式:**
1. 手动更新: `python3 api/scholar.py`
2. 定时更新: crontab每日凌晨2点
3. 脚本路径: `api/update_scholar.sh`

**API配置:**
```python
SERPAPI_KEY = "7eacbeb37f14223a652afdd95b65827a6086c73b33b6a6b26b1f36c3c244b831"
AUTHOR_ID = "mczdUnAAAAAJ"
CACHE_DURATION = 24  # 小时
```

### 2.2 ClustrMaps访客地图

**位置:** 页面底部footer内

**样式:** 经典地图样式

**配置步骤:**
1. 访问 https://clustrmaps.com/add
2. 注册并添加网站URL
3. 选择"Classic Map"
4. 获取widget代码
5. 替换`index.html`第229行的`YOUR_CLUSTRMAPS_ID`

**代码位置:**
```html
<!-- index.html 第227-235行 -->
<div class="visitor-map">
    <h3><i class="fas fa-map-marked-alt"></i> Visitor Map</h3>
    <script type="text/javascript" id="clustrmaps" 
      src="//clustrmaps.com/map_v2.js?d=YOUR_CLUSTRMAPS_ID&cl=ffffff&w=a">
    </script>
</div>
```

---

## 三、技术细节

### 3.1 CSS改造

**文件:** `css/style.css`
**行数:** 791行 → 约800行
**主要变化:**

1. **渐变背景:**
   ```css
   body {
       background: linear-gradient(135deg, #f5f7fa 0%, #e8eef5 100%);
   }
   ```

2. **卡片样式:**
   ```css
   .hero, .education, .skills, .academic-services {
       background: white;
       box-shadow: 0 10px 40px rgba(0,0,0,0.05);
       border-radius: 15px;
   }
   ```

3. **侧边栏样式(新增):**
   ```css
   .sidebar {
       position: fixed;
       right: 20px;
       top: 150px;
       width: 280px;
       background: white;
       border-radius: 12px;
       box-shadow: 0 8px 30px rgba(0,0,0,0.08);
   }
   ```

4. **访客地图容器(新增):**
   ```css
   .visitor-map {
       margin-top: 40px;
       padding: 30px;
       background: white;
       border-radius: 12px;
       box-shadow: 0 4px 15px rgba(0,0,0,0.05);
   }
   ```

### 3.2 JavaScript改造

**文件:** `js/main.js`
**主要新增功能:**

```javascript
// Google Scholar数据加载
function loadScholarData() {
    fetch('scholar_data.json')
        .then(response => response.json())
        .then(data => {
            // 更新Citations
            document.getElementById('citations-count').textContent = data.citations_all;
            // 更新h-index
            document.getElementById('h-index-count').textContent = data.h_index_all;
            // 更新i10-index
            document.getElementById('i10-index-count').textContent = data.i10_index_all;
            // 更新时间
            const updateDate = new Date(data.last_updated);
            document.getElementById('last-updated').textContent = 
                `Last updated: ${updateDate.toLocaleDateString()}`;
        })
        .catch(error => {
            console.error('Error loading scholar data:', error);
        });
}
```

### 3.3 HTML结构调整

**index.html主要变化:**

1. **添加Scholar侧边栏(第75-96行):**
   ```html
   <aside class="sidebar" id="scholar-widget">
       <h3><i class="fas fa-graduation-cap"></i> Google Scholar</h3>
       <div class="scholar-stats">...</div>
   </aside>
   ```

2. **添加访客地图(第227-235行):**
   ```html
   <div class="visitor-map">
       <h3><i class="fas fa-map-marked-alt"></i> Visitor Map</h3>
       <script type="text/javascript" id="clustrmaps" ...></script>
   </div>
   ```

### 3.4 后端脚本

**新增文件:**

1. **api/scholar.py** (Python数据获取脚本)
   - 功能: 从SerpAPI获取Google Scholar数据
   - 缓存: 24小时本地缓存
   - 输出: JSON格式数据文件

2. **api/update_scholar.sh** (Shell更新脚本)
   - 功能: 执行Python脚本并复制数据文件
   - 用途: crontab定时任务

3. **api/scholar_cache.json** (缓存文件)
   - 自动生成
   - 存储API返回的完整数据

4. **scholar_data.json** (前端数据文件)
   - 位置: 网站根目录
   - 供JavaScript加载使用

---

## 四、架构保持

### 4.1 未修改的结构

✅ **页面结构:** 保持原有的4个页面(index, publications, projects, awards)  
✅ **导航栏:** 位置和链接不变  
✅ **内容分区:** Education, Skills, Academic Services等section顺序不变  
✅ **图片资源:** 所有原有图片保持不变  
✅ **PDF文件:** CV和论文PDF保持不变  

### 4.2 仅优化的部分

🎨 **CSS样式:** 完全重写,但不影响HTML结构  
🎨 **视觉效果:** 颜色、间距、阴影、圆角等美化  
🎨 **动画效果:** 添加悬停和过渡动画  

---

## 五、浏览器兼容性

**测试通过:**
- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+

**关键技术:**
- CSS Grid (Skills部分)
- Flexbox (布局)
- CSS Variables (可选,未使用)
- Fetch API (Scholar数据)

---

## 六、性能优化

**已实施:**
- ✅ 数据缓存(24小时)
- ✅ 最小化API调用
- ✅ 优化CSS选择器
- ✅ 使用CDN(Font Awesome)

**建议进一步优化:**
- 图片WebP格式转换
- CSS/JS文件压缩
- 启用Gzip压缩
- 使用CDN托管静态资源

---

## 七、文件清单

### 修改的文件
- ✏️ `index.html` (添加Scholar侧边栏和访客地图)
- ✏️ `css/style.css` (完全重写样式)
- ✏️ `js/main.js` (添加Scholar数据加载功能)

### 新增的文件
- ➕ `api/scholar.py` (数据获取脚本)
- ➕ `api/update_scholar.sh` (更新脚本)
- ➕ `api/scholar_cache.json` (缓存文件,自动生成)
- ➕ `api/scholar_data.json` (API数据,自动生成)
- ➕ `scholar_data.json` (前端数据文件)
- ➕ `README.md` (完整说明文档)
- ➕ `DEPLOYMENT_GUIDE.md` (部署指南)
- ➕ `CHANGES.md` (本文档)

### 未修改的文件
- ✅ `publications.html`
- ✅ `projects.html`
- ✅ `awards.html`
- ✅ `images/*` (所有图片)
- ✅ `files/*` (所有PDF)

---

## 八、待配置项

### 必须配置
1. **ClustrMaps ID:** 替换`index.html`第229行的`YOUR_CLUSTRMAPS_ID`

### 可选配置
1. **定时任务:** 设置crontab自动更新Scholar数据
2. **自定义域名:** 绑定个人域名
3. **SSL证书:** 启用HTTPS
4. **Google Analytics:** 添加访问统计

---

## 九、升级亮点总结

### 视觉升级
✨ 学术清新风格,优雅紫色渐变主题  
✨ 现代卡片式布局,圆角柔和阴影  
✨ 精致的悬停动画和过渡效果  
✨ 完美的响应式设计  

### 功能升级
🚀 Google Scholar引用数据实时展示  
🚀 访客地图全球分布可视化  
🚀 自动化数据更新机制  
🚀 24小时智能缓存  

### 技术升级
⚡ 现代化CSS技术(Grid, Flexbox, 渐变)  
⚡ JavaScript异步数据加载  
⚡ Python自动化脚本  
⚡ API集成和缓存优化  

---

**改造完成时间:** 2024年10月30日  
**版本:** 2.0 (现代化学术清新版)  
**改造工程师:** Manus AI Assistant
