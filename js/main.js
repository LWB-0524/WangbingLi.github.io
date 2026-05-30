document.addEventListener('DOMContentLoaded', function() {
    const currentPage = window.location.pathname.split('/').pop();

    document.querySelectorAll('nav ul li a').forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        } else if (currentPage === '' && link.getAttribute('href') === 'index.html') {
            link.classList.add('active');
        }
    });

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();

            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    loadScholarData();
});

function loadScholarData() {
    const scholarWidget = document.getElementById('scholar-widget');
    if (!scholarWidget) return;

    fetch('scholar_data.json')
        .then(response => response.json())
        .then(data => {
            const citationsEl = document.getElementById('citations-count');
            if (citationsEl) {
                citationsEl.textContent = data.citations_all || 0;
            }

            const hIndexEl = document.getElementById('h-index-count');
            if (hIndexEl) {
                hIndexEl.textContent = data.h_index_all || 0;
            }

            const i10IndexEl = document.getElementById('i10-index-count');
            if (i10IndexEl) {
                i10IndexEl.textContent = data.i10_index_all || 0;
            }

            const lastUpdatedEl = document.getElementById('last-updated');
            if (lastUpdatedEl && data.last_updated) {
                const updateDate = new Date(data.last_updated);
                const options = {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                    hour: '2-digit',
                    minute: '2-digit'
                };
                lastUpdatedEl.textContent = `Last updated (Beijing Time):\n ${updateDate.toLocaleDateString('en-CA', options).replace(',', '')}`;
            }
        })
        .catch(error => {
            console.error('Error loading scholar data:', error);
            scholarWidget.innerHTML = '<p style="color: #64748b; text-align: center;">Unable to load citation data</p>';
        });
}
