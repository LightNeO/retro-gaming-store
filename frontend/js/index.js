console.log('Index.js file loaded');
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, loading featured products...');
    fetch('/api/products/?ordering=-rating&page_size=3')
        .then(response => {
            console.log('Response status:', response.status);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log('Products data:', data);
            const featured = document.getElementById('featured-consoles');
            if (!featured) {
                console.error('Featured consoles container not found');
                return;
            }
            const products = Array.isArray(data) ? data : (data.results || []);
            console.log('Number of products:', products.length);
            products.slice(0, 3).forEach(product => {
                const col = document.createElement('div');
                col.className = 'col-md-4 mb-4';
                col.innerHTML = `
                    <div class="card card-retro h-100">
                        <img src="${product.image}" class="card-img-top" alt="${product.name}" style="height:200px;object-fit:contain;background:#222;">
                        <div class="card-body">
                            <h5 class="card-title">${product.name}</h5>
                            <p class="card-text">${product.brand} (${product.release_year})</p>
                            <p class="card-text">$${product.price}</p>
                            <p class="card-text">⭐ ${product.rating}</p>
                            <a href="/product/?id=${product.id}" class="btn btn-pixel">View</a>
                        </div>
                    </div>
                `;
                featured.appendChild(col);
            });
        })
        .catch(error => {
            console.error('Error fetching products:', error);
            const featured = document.getElementById('featured-consoles');
            if (featured) {
                featured.innerHTML = '<div class="col-12 text-center"><p class="text-danger">Error loading products. Please check the console for details.</p></div>';
            }
        });
}); 