// Get product ID from URL parameters
const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get('id');

// DOM elements
const productImage = document.getElementById('product-image');
const productName = document.getElementById('product-name');
const productBrand = document.getElementById('product-brand');
const productDescription = document.getElementById('product-description');
const productPrice = document.getElementById('product-price');
const productRating = document.getElementById('product-rating');
const addToCartBtn = document.getElementById('add-to-cart');
const commentsList = document.getElementById('comments-list');
const commentForm = document.getElementById('comment-form');
const commentText = document.getElementById('comment-text');

// Fetch product details
function fetchProduct() {
    if (!productId) {
        console.error('No product ID provided');
        return;
    }

    console.log('Fetching product with ID:', productId);
    fetch(`/api/products/${productId}/`)
        .then(response => {
            console.log('Product response status:', response.status);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(product => {
            console.log('Product data:', product);
            displayProduct(product);
            fetchComments();
        })
        .catch(error => {
            console.error('Error fetching product:', error);
            document.querySelector('.col-md-6').innerHTML = '<p class="text-danger">Error loading product. Please check the console for details.</p>';
        });
}

// Display product information
function displayProduct(product) {
    productImage.src = product.image;
    productImage.alt = product.name;
    productName.textContent = product.name;
    productBrand.textContent = `${product.brand} (${product.release_year})`;
    productDescription.textContent = product.description || 'No description available.';
    productPrice.textContent = `$${product.price}`;
    productRating.innerHTML = `⭐ ${product.rating}/5`;
    
    // Add to cart functionality
    addToCartBtn.addEventListener('click', () => addToCart(product.id));
}

// Add to cart functionality
function addToCart(productId) {
    const token = localStorage.getItem('token');
    if (!token) {
        alert('Please log in to add items to cart');
        window.location.href = '/login/';
        return;
    }

    fetch('/api/cart/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
            product: productId,
            quantity: 1
        })
    })
    .then(response => response.json())
    .then(data => {
        console.log('Added to cart:', data);
        addToCartBtn.textContent = 'Added to Cart!';
        addToCartBtn.disabled = true;
        setTimeout(() => {
            addToCartBtn.textContent = 'Add to Cart';
            addToCartBtn.disabled = false;
        }, 2000);
    })
    .catch(error => {
        console.error('Error adding to cart:', error);
        alert('Error adding to cart');
    });
}

// Fetch comments
function fetchComments() {
    fetch(`/api/products/${productId}/comments/`)
        .then(response => response.json())
        .then(comments => {
            console.log('Comments:', comments);
            displayComments(comments);
        })
        .catch(error => {
            console.error('Error fetching comments:', error);
        });
}

// Display comments
function displayComments(comments) {
    commentsList.innerHTML = '';
    if (comments.length === 0) {
        commentsList.innerHTML = '<p>No comments yet. Be the first to comment!</p>';
        return;
    }

    comments.forEach(comment => {
        const commentDiv = document.createElement('div');
        commentDiv.className = 'card mb-2';
        commentDiv.innerHTML = `
            <div class="card-body">
                <h6 class="card-subtitle mb-2 text-muted">${comment.user_name || 'Anonymous'}</h6>
                <p class="card-text">${comment.text}</p>
                <small class="text-muted">${new Date(comment.created_at).toLocaleDateString()}</small>
            </div>
        `;
        commentsList.appendChild(commentDiv);
    });
}

// Submit comment
commentForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const token = localStorage.getItem('token');
    if (!token) {
        alert('Please log in to comment');
        window.location.href = '/login/';
        return;
    }

    fetch(`/api/products/${productId}/comments/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
            text: commentText.value
        })
    })
    .then(response => response.json())
    .then(data => {
        console.log('Comment added:', data);
        commentText.value = '';
        fetchComments();
    })
    .catch(error => {
        console.error('Error adding comment:', error);
        alert('Error adding comment');
    });
});

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
    console.log('Product detail page loaded');
    if (productId) {
        fetchProduct();
    } else {
        console.error('No product ID in URL');
        document.querySelector('.col-md-6').innerHTML = '<p class="text-danger">No product ID provided.</p>';
    }
}); 