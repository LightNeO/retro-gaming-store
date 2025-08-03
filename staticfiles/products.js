const apiUrl = '/api/products/';
const productList = document.getElementById('product-list');
const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');
const sortSelect = document.getElementById('sort-select');
const pagination = document.getElementById('pagination');

let currentPage = 1;

function fetchProducts(page = 1, search = '', ordering = '-release_year') {
    let url = `${apiUrl}?page=${page}&ordering=${ordering}`;
    if (search) url += `&search=${encodeURIComponent(search)}`;
    console.log('Fetching products from:', url);
    fetch(url)
        .then(res => {
            console.log('Products response status:', res.status);
            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }
            return res.json();
        })
        .then(data => {
            console.log('Products data:', data);
            let products = Array.isArray(data) ? data : (data.results || []);
            console.log('Number of products:', products.length);
            renderProducts(products);
            renderPagination(data, page);
        })
        .catch(error => {
            console.error('Error fetching products:', error);
            productList.innerHTML = '<div class="col-12 text-center"><p class="text-danger">Error loading products. Please check the console for details.</p></div>';
        });
}

function renderProducts(products) {
    productList.innerHTML = '';
    products.forEach(product => {
        const col = document.createElement('div');
        col.className = 'col-md-4 mb-4';
        col.setAttribute('data-qa', 'product-card');
        col.innerHTML = `
            <div class="card card-retro h-100">
                <img src="${product.image}" class="card-img-top" alt="${product.name}" style="height:200px;object-fit:contain;background:#222;">
                <div class="card-body">
                    <h5 class="card-title">${product.name}</h5>
                    <p class="card-text">${product.brand} (${product.release_year})</p>
                    <p class="card-text">$${product.price}</p>
                    <p class="card-text">⭐ ${product.rating}</p>
                    <a href="/product/?id=${product.id}" class="btn btn-pixel" data-qa="view-product-btn">View</a>
                </div>
            </div>
        `;
        productList.appendChild(col);
    });
}

function renderPagination(data, page) {
    pagination.innerHTML = '';
    
    // Check if we have pagination data
    if (data && data.count && data.results) {
        const totalPages = Math.ceil(data.count / 10); // Assuming page size is 10
        if (totalPages <= 1) return;
        
        let html = '<ul class="pagination justify-content-center">';
        
        // Previous button
        if (page > 1) {
            html += `<li class="page-item"><a class="page-link" href="#" data-page="${page - 1}">Previous</a></li>`;
        }
        
        // Page numbers
        for (let i = 1; i <= totalPages; i++) {
            html += `<li class="page-item${i === page ? ' active' : ''}"><a class="page-link" href="#" data-page="${i}">${i}</a></li>`;
        }
        
        // Next button
        if (page < totalPages) {
            html += `<li class="page-item"><a class="page-link" href="#" data-page="${page + 1}">Next</a></li>`;
        }
        
        html += '</ul>';
        pagination.innerHTML = html;
        
        // Add event listeners to pagination links
        document.querySelectorAll('#pagination .page-link').forEach(link => {
            link.addEventListener('click', e => {
                e.preventDefault();
                currentPage = parseInt(link.dataset.page);
                fetchProducts(currentPage, searchInput.value, sortSelect.value);
            });
        });
    }
}

searchForm.setAttribute('data-qa', 'search-form');
searchInput.setAttribute('data-qa', 'search-input');
sortSelect.setAttribute('data-qa', 'sort-select');

searchForm.addEventListener('submit', function(e) {
    e.preventDefault();
    fetchProducts(1, searchInput.value, sortSelect.value);
});
sortSelect.addEventListener('change', function() {
    fetchProducts(1, searchInput.value, sortSelect.value);
});

document.addEventListener('DOMContentLoaded', function() {
    fetchProducts();
}); 