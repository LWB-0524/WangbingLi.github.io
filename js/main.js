document.addEventListener('DOMContentLoaded', function() {
    // 获取当前页面URL
    const currentPage = window.location.pathname.split('/').pop();
    
    // 设置导航栏活动项
    const navLinks = document.querySelectorAll('nav ul li a');
    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        } else if (currentPage === '' && link.getAttribute('href') === 'index.html') {
            link.classList.add('active');
        }
    });
    
    // 添加平滑滚动
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
    
    // 加载Google Scholar数据
    loadScholarData();
});

function loadScholarData() {
    const scholarWidget = document.getElementById('scholar-widget');
    if (!scholarWidget) return;
    
    fetch('scholar_data.json')
        .then(response => response.json())
        .then(data => {
            // 更新引用数
            const citationsEl = document.getElementById('citations-count');
            if (citationsEl) {
                citationsEl.textContent = data.citations_all || 0;
            }
            
            // 更新h-index
            const hIndexEl = document.getElementById('h-index-count');
            if (hIndexEl) {
                hIndexEl.textContent = data.h_index_all || 0;
            }
            
            // 更新i10-index
            const i10IndexEl = document.getElementById('i10-index-count');
            if (i10IndexEl) {
                i10IndexEl.textContent = data.i10_index_all || 0;
            }
            
            // 更新最后更新时间
            const lastUpdatedEl = document.getElementById('last-updated');
            if (lastUpdatedEl && data.last_updated) {
                const updateDate = new Date(data.last_updated);
                lastUpdatedEl.textContent = `Last updated: ${updateDate.toLocaleDateString()}`;
            }
        })
        .catch(error => {
            console.error('Error loading scholar data:', error);
            scholarWidget.innerHTML = '<p style="color: #95a5a6; text-align: center;">Unable to load citation data</p>';
        });
}
