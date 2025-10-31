// News管理系统 - 静态新闻数据（兼容GitHub Pages）

class NewsManager {
    constructor() {
        // 直接在JavaScript中定义新闻数据，避免CORS问题
        this.newsItems = [
            {
                date: '2025-06-17',
                category: 'Scholarship',
                title: 'Securing CSC Scholarship for Doctoral Studies at University of Auckland',
                image: 'images/news/CSCScholarship.jpg',
                content: `I am delighted to announce that I have been awarded the prestigious joint scholarship from the **China Scholarship Council (CSC)** and **the University of Auckland** in New Zealand to pursue my doctoral degree. This scholarship represents a significant opportunity for academic advancement and international collaboration.

Under the scholarship's terms, my doctoral studies at the University of Auckland will be comprehensively supported. The University of Auckland will provide **full tuition coverage** for up to 48 months, while CSC will offer **a round-trip international airfare** and **a monthly living allowance** throughout the funding period, enabling me to focus entirely on my research and studies.

The University of Auckland is New Zealand's leading higher education institution, consistently recognized for its academic excellence and research impact. It holds the **65th** position in the **2025 QS World University Rankings**, maintaining its status as the top-ranked university in New Zealand.

This achievement marks an important milestone in my academic journey, and I look forward to contributing to the knowledge exchange between China and New Zealand during my doctoral studies.`
            },
            {
                date: '2025-06-17',
                category: 'Scholarship',
                title: 'Securing CSC Scholarship for Doctoral Studies at University of Auckland',
                image: 'images/news/CSCScholarship.jpg',
                content: `I am delighted to announce that I have been awarded the prestigious joint scholarship from the **China Scholarship Council (CSC)** and **the University of Auckland** in New Zealand to pursue my doctoral degree. This scholarship represents a significant opportunity for academic advancement and international collaboration.

Under the scholarship's terms, my doctoral studies at the University of Auckland will be comprehensively supported. The University of Auckland will provide **full tuition coverage** for up to 48 months, while CSC will offer **a round-trip international airfare** and **a monthly living allowance** throughout the funding period, enabling me to focus entirely on my research and studies.

The University of Auckland is New Zealand's leading higher education institution, consistently recognized for its academic excellence and research impact. It holds the **65th** position in the **2025 QS World University Rankings**, maintaining its status as the top-ranked university in New Zealand.

This achievement marks an important milestone in my academic journey, and I look forward to contributing to the knowledge exchange between China and New Zealand during my doctoral studies.`
            }
            // 可以在这里添加更多新闻项目
        ];
    }

    // 加载新闻数据（现在是同步的）
    loadNews() {
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
    init() {
        this.loadNews();
        this.renderNews();
    }
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', () => {
    const newsManager = new NewsManager();
    newsManager.init();
});
