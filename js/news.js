// News管理系统 - 从Markdown文件加载和显示新闻

class NewsManager {
    constructor() {
        this.newsItems = [];
    }

    // 解析Markdown文件的frontmatter
    parseFrontmatter(content) {
        const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/;
        const match = content.match(frontmatterRegex);
        
        if (!match) return null;
        
        const frontmatter = {};
        const lines = match[1].split('\n');
        
        lines.forEach(line => {
            const colonIndex = line.indexOf(':');
            if (colonIndex > 0) {
                const key = line.substring(0, colonIndex).trim();
                const value = line.substring(colonIndex + 1).trim();
                frontmatter[key] = value;
            }
        });
        
        frontmatter.content = match[2].trim();
        return frontmatter;
    }

    // 加载所有新闻文件
    async loadNews() {
        const newsFiles = [
            '2025-06-17-Scholarship.md',
        ];

        for (const file of newsFiles) {
            try {
                const response = await fetch(file);
                const content = await response.text();
                const newsData = this.parseFrontmatter(content);
                
                if (newsData) {
                    this.newsItems.push(newsData);
                }
            } catch (error) {
                console.error(`Error loading ${file}:`, error);
            }
        }

        // 按日期倒序排列
        this.newsItems.sort((a, b) => new Date(b.date) - new Date(a.date));
    }

    // 格式化日期
    formatDate(dateString) {
        const date = new Date(dateString);
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        return date.toLocaleDateString('en-US', options);
    }

    // 简单的Markdown转HTML处理
    markdownToHtml(text) {
        if (!text) return '';
        
        // 处理粗体 **text** -> <strong>text</strong>
        text = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
        
        // 处理斜体 *text* -> <em>text</em>
        text = text.replace(/\*(.*?)\*/g, '<em>$1</em>');
        
        // 处理换行
        text = text.replace(/\n/g, '<br>');
        
        return text;
    }

    // 渲染新闻列表
    renderNews() {
        const newsContainer = document.getElementById('news-container');
        if (!newsContainer) return;

        newsContainer.innerHTML = '';

        this.newsItems.forEach(item => {
            const newsCard = document.createElement('div');
            newsCard.className = 'news-card';

            let imageHTML = '';
            if (item.image && item.image.trim()) {
                imageHTML = `
                    <div class="news-image">
                        <img src="${item.image}" alt="${item.title}" onerror="this.parentElement.style.display='none'">
                    </div>
                `;
            }

            newsCard.innerHTML = `
                ${imageHTML}
                <div class="news-content">
                    <div class="news-category">${item.category}</div>
                    <h3 class="news-title">${item.title}</h3>
                    <p class="news-excerpt">${this.markdownToHtml(item.content)}</p>
                    <div class="news-date">${this.formatDate(item.date)}</div>
                </div>
            `;

            newsContainer.appendChild(newsCard);
        });
    }

    // 初始化
    async init() {
        await this.loadNews();
        this.renderNews();
    }
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', () => {
    const newsManager = new NewsManager();
    newsManager.init();
});
