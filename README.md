# Retro Gaming Store - Full-Stack E-commerce Platform

A full-stack e-commerce website for selling retro gaming consoles, built with Django and vanilla JavaScript. Perfect for QA automation training with intentionally injected bugs and comprehensive test hooks.

## 🎮 Features

### Frontend
- **Modern Retro Theme** with pixel-style fonts and nostalgic colors
- **Responsive Design** using Bootstrap 5
- **Product Catalog** with search, filter, and sort functionality
- **Interactive Product Ratings** with 5-star system
- **Product Comments** with user authentication
- **Shopping Cart** with real-time updates
- **User Authentication** (register, login, logout)
- **Order Management** with detailed order history
- **Checkout Process** with payment validation
- **Profile Management** with email/password updates

### Backend
- **Django REST API** with comprehensive CRUD operations
- **JWT Authentication** for secure API access
- **Admin Panel** for product and order management
- **Database Models** for products, users, orders, cart, ratings, and comments
- **API Documentation** via Swagger/OpenAPI
- **Seeded Data** with 10 iconic retro gaming consoles
- **Rating System** with average calculations and user restrictions

## 🛠️ Tech Stack

- **Backend**: Django 5.2, Django REST Framework, SQLite
- **Frontend**: HTML5, CSS3, JavaScript (ES6+), Bootstrap 5
- **Authentication**: JWT (djangorestframework-simplejwt)
- **API Documentation**: drf-spectacular (Swagger/OpenAPI)
- **Database**: SQLite (development), PostgreSQL ready

## 🚀 Quick Deployment

### Option 1: Automated Deployment (Recommended)

**Windows Users:**
```bash
deploy.bat
```

**Linux/Mac Users:**
```bash
chmod +x deploy.sh
./deploy.sh
```

### Option 2: Manual Deployment

1. **Create GitHub repository**
2. **Push your code:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Retro Gaming Store"
   git remote add origin https://github.com/YOUR_USERNAME/retro-gaming-store.git
   git push -u origin main
   ```
3. **Enable GitHub Pages** in repository settings
4. **Choose backend option** (see DEPLOYMENT.md for details)

### Your site will be live at:
`https://YOUR_USERNAME.github.io/retro-gaming-store`

## 🚀 Quick Start

### Prerequisites
- Python 3.8+
- pip

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd qa4autotest
   ```

2. **Set up virtual environment**
   ```bash
   python -m venv venv
   # Windows
   venv\Scripts\activate
   # Linux/Mac
   source venv/bin/activate
   ```

3. **Install dependencies**
   ```bash
   pip install django djangorestframework drf-spectacular djangorestframework-simplejwt django-cors-headers
   ```

4. **Run migrations**
   ```bash
   python manage.py migrate
   ```

5. **Seed the database**
   ```bash
   python manage.py seed_consoles
   ```

6. **Start the development server**
   ```bash
   python manage.py runserver
   ```

### Access Points
- **Frontend**: http://127.0.0.1:8000/
- **API**: http://127.0.0.1:8000/api/
- **API Documentation**: http://127.0.0.1:8000/api/docs/
- **Admin Panel**: http://127.0.0.1:8000/admin/

### Admin Credentials
- **Username**: admin
- **Password**: Qapass22!

## 📚 API Endpoints

### Authentication
- `POST /api/register/` - User registration
- `POST /api/login/` - Session-based login
- `POST /api/logout/` - Session-based logout
- `POST /api/auth/token/` - JWT token obtain
- `POST /api/auth/token/refresh/` - JWT token refresh
- `POST /api/auth/token/verify/` - JWT token verify

### Products
- `GET /api/products/` - List all products (with search, filter, sort)
- `GET /api/products/{id}/` - Get product details
- `POST /api/products/` - Create product (admin)
- `PUT /api/products/{id}/` - Update product (admin)
- `DELETE /api/products/{id}/` - Delete product (admin)
- `GET /api/products/{id}/comments/` - Get product comments
- `POST /api/products/{id}/comments/` - Add comment to product
- `GET /api/products/{id}/ratings/` - Get product rating info
- `POST /api/products/{id}/ratings/` - Rate product (1 per user)

### Cart
- `GET /api/cart/` - Get user's cart
- `POST /api/cart/` - Add item to cart
- `PUT /api/cart/{id}/` - Update cart item
- `DELETE /api/cart/{id}/` - Remove cart item

### Orders
- `GET /api/orders/` - Get user's orders
- `GET /api/orders/{id}/` - Get order details
- `POST /api/orders/` - Create order (checkout)

### Users & Profiles
- `GET /api/users/{id}/` - Get user info
- `PATCH /api/users/{id}/` - Update user (username, email, password)

### Comments & Ratings
- `GET /api/comments/` - List comments
- `POST /api/comments/` - Create comment
- `DELETE /api/comments/{id}/` - Delete comment (owner only)
- `GET /api/ratings/` - List ratings
- `POST /api/ratings/` - Create rating

## 🧪 QA Automation & Test Hooks

This project is specifically designed for QA automation training with intentionally injected bugs and comprehensive test hooks.

### Test Hooks (data-qa attributes)

All major interactive elements have `data-qa` attributes for easy automation:

#### Forms
- `data-qa="login-form"` - Login form
- `data-qa="register-form"` - Registration form
- `data-qa="checkout-form"` - Checkout form
- `data-qa="profile-update-form"` - Profile update form
- `data-qa="search-form"` - Product search form
- `data-qa="comment-form"` - Comment submission form

#### Input Fields
- `data-qa="username"` - Username field
- `data-qa="password"` - Password field
- `data-qa="email"` - Email field
- `data-qa="update-username"` - Profile update username field
- `data-qa="update-email"` - Profile update email field
- `data-qa="update-password"` - Profile update password field
- `data-qa="search-input"` - Search input
- `data-qa="card-number"` - Credit card number
- `data-qa="card-expiry"` - Card expiry date
- `data-qa="card-cvv"` - Card CVV
- `data-qa="quantity-input"` - Product quantity input
- `data-qa="comment-text"` - Comment text area

#### Buttons
- `data-qa="login-btn"` - Login button
- `data-qa="register-btn"` - Register button
- `data-qa="place-order-btn"` - Place order button
- `data-qa="profile-update-btn"` - Profile update button
- `data-qa="order-detail-btn"` - Order detail button
- `data-qa="view-product-btn"` - View product button
- `data-qa="add-to-cart-btn"` - Add to cart button
- `data-qa="submit-comment-btn"` - Submit comment button
- `data-qa="checkout-btn"` - Proceed to checkout button

#### Rating Elements
- `data-qa="rating-star"` - Individual rating stars
- `data-qa="average-rating"` - Average rating display
- `data-qa="rating-count"` - Rating count display
- `data-qa="user-rating"` - User's rating display

#### Tables & Lists
- `data-qa="orders-table"` - Orders table
- `data-qa="order-row"` - Individual order row
- `data-qa="cart-row"` - Cart item row
- `data-qa="product-card"` - Product card

#### Hidden Elements
- `id="QA_PASS"` - Hidden div for automation verification

### Buggy Behaviors (Intentionally Injected)

#### 1. Cart "Phantom" Bug
- **Location**: Cart page (`frontend/js/cart.js`)
- **Behavior**: 20% chance that removing an item doesn't update the total
- **Trigger**: Click remove button on cart items
- **Expected**: Total should update immediately
- **Bug**: Sometimes total remains unchanged
- **Test Hook**: `data-qa="cart-remove"` buttons

#### 2. Product Search Bug
- **Location**: Products page (`frontend/js/products.js`)
- **Behavior**: 30% chance that searching for "Atari" returns no results
- **Trigger**: Search for "Atari" in product search
- **Expected**: Should show Atari 2600 product
- **Bug**: Sometimes returns empty results
- **Test Hook**: `data-qa="search-input"` field

#### 3. Order History "Missing" Bug
- **Location**: Profile page (`frontend/js/profile.js`)
- **Behavior**: 20% chance that order history table is empty
- **Trigger**: Load profile page with existing orders
- **Expected**: Should display order history
- **Bug**: Sometimes shows empty table
- **Test Hook**: `data-qa="orders-table"` and `data-qa="order-row"`

#### 4. Profile Update Random Failure
- **Location**: Profile page (`frontend/js/profile.js`)
- **Behavior**: 30% chance that profile update fails with random error
- **Trigger**: Submit profile update form
- **Expected**: Should update email/password successfully
- **Bug**: Sometimes shows "Update failed due to a random bug"
- **Test Hook**: `data-qa="profile-update-btn"` and `data-qa="profile-update-error"`

#### 5. Checkout "Stuck" Bug
- **Location**: Checkout page (`frontend/js/checkout.js`)
- **Behavior**: 25% chance that Place Order button is disabled for 5 seconds
- **Trigger**: Load checkout page
- **Expected**: Button should be immediately clickable
- **Bug**: Sometimes button shows "Please wait..." for 5 seconds
- **Test Hook**: `data-qa="place-order-btn"`

#### 6. Rating Submission Failure
- **Location**: Product page (`frontend/templates/product.html`)
- **Behavior**: 15% chance that rating submission fails
- **Trigger**: Submit a product rating
- **Expected**: Rating should be saved successfully
- **Bug**: Sometimes shows "Rating submission failed due to a random bug"
- **Test Hook**: Rating star elements and submission logic

### Test Credentials

#### Payment Test Data
- **Card Number**: `4242 4242 4242 4242`
- **Expiry**: `12/34`
- **CVV**: `123`
- **Tooltips**: Available on checkout form fields

#### User Registration
- Create any username/email/password combination
- Passwords are validated for strength
- Profiles are auto-created on registration

## 🎯 QA Automation Scenarios

### Recommended Test Scenarios

1. **User Registration & Login**
   - Register new user
   - Login with JWT
   - Verify profile creation

2. **Product Browsing**
   - Search for products (test Atari bug)
   - Filter and sort products
   - View product details

3. **Product Ratings & Comments**
   - Rate products (test rating failure bug)
   - Add comments to products
   - Delete own comments
   - Verify rating restrictions (1 per user)

4. **Shopping Cart**
   - Add items to cart
   - Update quantities
   - Remove items (test phantom bug)
   - Verify total calculations

5. **Checkout Process**
   - Fill checkout form
   - Use test payment data
   - Handle stuck button bug
   - Complete order

6. **Order Management**
   - View order history (test missing bug)
   - View order details
   - Update profile (test random failure)

7. **Bug Detection**
   - Verify all injected bugs are detectable
   - Test error handling
   - Validate test hooks are accessible

## 🚀 Deployment

### Frontend (GitHub Pages)
1. Copy `frontend/` contents to a new repository
2. Enable GitHub Pages in repository settings
3. Update API URLs to point to your backend

### Backend (Production)
1. Set `DEBUG = False` in settings
2. Configure production database (PostgreSQL recommended)
3. Set up proper CORS settings
4. Use production WSGI server (Gunicorn)
5. Configure environment variables for secrets

## 📁 Project Structure

```
qa4autotest/
├── retrostore/          # Django project settings
├── store/              # Products, ratings, comments
│   ├── models.py       # Product, Rating, Comment models
│   ├── views.py        # ProductViewSet, RatingViewSet, CommentViewSet
│   ├── serializers.py  # Product, Rating, Comment serializers
│   └── admin.py        # Admin panel registrations
├── users/              # User management and profiles
│   ├── models.py       # Profile model
│   ├── views.py        # UserViewSet, auth views
│   ├── serializers.py  # User, Profile serializers
│   └── admin.py        # Admin panel registrations
├── orders/             # Cart and order management
│   ├── models.py       # CartItem, Order, OrderItem models
│   ├── views.py        # CartItemViewSet, OrderViewSet
│   ├── serializers.py  # Cart, Order serializers
│   └── admin.py        # Admin panel registrations
├── api/                # API routing and documentation
│   └── urls.py         # API endpoint routing
├── frontend/           # Static frontend files
│   ├── templates/      # HTML templates
│   │   ├── base.html   # Base template with navigation
│   │   ├── index.html  # Homepage
│   │   ├── products.html # Product listing
│   │   ├── product.html  # Product detail with ratings
│   │   ├── cart.html   # Shopping cart
│   │   ├── checkout.html # Checkout process
│   │   ├── login.html  # Login form
│   │   ├── register.html # Registration form
│   │   └── profile.html # User profile and orders
│   ├── css/           # Stylesheets
│   ├── js/            # JavaScript files
│   └── img/           # Product images
├── manage.py          # Django management
└── README.md          # This file
```

## 🔧 Recent Updates

### Latest Features Added
- **Product Rating System**: 5-star interactive ratings with user restrictions
- **Product Comments**: User comments with delete functionality
- **Enhanced API**: New rating and comment endpoints
- **Improved UI**: Purple color scheme for rating elements
- **Better Error Handling**: Comprehensive error messages and validation
- **QA Test Hooks**: Additional data-qa attributes for automation

### Technical Improvements
- **JWT Token Management**: Automatic token refresh and authentication
- **Database Schema**: Added OrderItem model for persistent order details
- **API Validation**: Enhanced serializer validation and error handling
- **Frontend Integration**: Embedded JavaScript for better reliability

## 🤝 Contributing

This project is designed for educational purposes and QA automation training. Feel free to:
- Add more buggy behaviors
- Enhance test hooks
- Improve documentation
- Add new features

## 📄 License

This project is open source and available under the MIT License.

---

**Happy Testing! 🎮🧪**
