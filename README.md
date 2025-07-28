# Retro Gaming Store - Full-Stack E-commerce Platform

A full-stack e-commerce website for selling retro gaming consoles, built with Django and vanilla JavaScript. Perfect for QA automation training with intentionally injected bugs and comprehensive test hooks.

## 🎮 Features

### Frontend
- **Modern Retro Theme** with pixel-style fonts and nostalgic colors
- **Enhanced Navigation** with visual separators and hover effects
- **Comprehensive Footer** with contact info and social media links
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

- **Backend**: Django 5.2, Django REST Framework, PostgreSQL
- **Frontend**: HTML5, CSS3, JavaScript (ES6+), Bootstrap 5, FontAwesome Icons
- **Authentication**: JWT (djangorestframework-simplejwt)
- **API Documentation**: drf-spectacular (Swagger/OpenAPI)
- **Deployment**: Railway (Backend + Database)

## 🌐 Live Demo

**Production Site**: [https://web-production-c47e.up.railway.app/](https://web-production-c47e.up.railway.app/)

## 🚀 Quick Start

### Prerequisites
- Python 3.8+
- pip

### Local Development

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
   pip install -r requirements.txt
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

7. **Visit the site**
   - Frontend: http://127.0.0.1:8000/
   - Admin Panel: http://127.0.0.1:8000/admin/
   - API Documentation: http://127.0.0.1:8000/api/schema/swagger-ui/

## 🚀 Deployment

This project is deployed on Railway. For deployment instructions, see [DEPLOYMENT.md](DEPLOYMENT.md).

## 🧪 QA Automation Features

### Intentionally Injected Bugs
- **Product Images**: Some products may have broken image links
- **User Registration**: Email validation may fail in certain scenarios
- **Cart Functionality**: Cart items may not persist correctly
- **Order Processing**: Checkout may fail with specific payment data
- **Rating System**: Users can rate the same product multiple times

### Test Credentials
- **Admin**: `admin` / `admin123`
- **Test User**: `testuser` / `testpass123`

### Comprehensive Test Scenarios

#### 1. **Navigation & UI Testing**
- **Header Navigation**:
  - Verify logo displays with gamepad icon
  - Test navigation links (Products, Cart, Login, Register)
  - Check visual separators between navigation sections
  - Test hover effects on navigation items
  - Verify responsive behavior on mobile devices
  - Test authentication state changes (Login/Register vs Profile/Logout)

- **Footer Testing**:
  - Verify footer displays on all pages
  - Test social media icons (Facebook, Twitter, Instagram, YouTube, Discord)
  - Check hover effects on social icons (transparency, rotation, scaling)
  - Verify contact information displays correctly
  - Test quick links functionality
  - Check responsive layout on mobile

#### 2. **User Registration & Login**
- **Registration Flow**:
  - Test valid user registration
  - Verify email validation (intentionally buggy)
  - Test password strength requirements
  - Check error message display
  - Verify automatic login after registration

- **Login Flow**:
  - Test valid login credentials
  - Test invalid credentials error handling
  - Verify JWT token storage
  - Test "Remember Me" functionality
  - Check logout functionality

#### 3. **Product Browsing & Search**
- **Product Display**:
  - Verify featured products on homepage
  - Test product images loading (some intentionally broken)
  - Check product details (name, price, rating, description)
  - Test product filtering and sorting
  - Verify search functionality (test "Atari" search bug)

- **Product Details**:
  - Test individual product page navigation
  - Verify product information accuracy
  - Test "Add to Cart" functionality
  - Check product ratings display

#### 4. **Shopping Cart Management**
- **Cart Functionality**:
  - Test adding items to cart
  - Verify cart persistence across sessions
  - Test quantity updates
  - Check cart total calculations
  - Test removing items from cart
  - Verify cart empty state handling

- **Cart Bugs to Test**:
  - "Phantom" cart bug (20% chance total doesn't update)
  - Cart items disappearing after adding
  - Empty cart checkout attempts

#### 5. **Checkout Process**
- **Checkout Flow**:
  - Test checkout with valid cart items
  - Verify shipping information form
  - Test payment information validation
  - Check order confirmation
  - Verify cart clearing after successful order

- **Checkout Bugs to Test**:
  - "Stuck" button bug (25% chance button disabled for 5 seconds)
  - Empty cart checkout prevention
  - Payment validation failures

#### 6. **Order Management**
- **Order History**:
  - Test order creation and storage
  - Verify order details display
  - Check order status updates
  - Test order history pagination

- **Order Bugs to Test**:
  - "Missing" order history bug (20% chance table empty)
  - Order items not displaying correctly

#### 7. **Product Ratings & Comments**
- **Rating System**:
  - Test rating submission (1-5 stars)
  - Verify one rating per user restriction
  - Check average rating calculations
  - Test rating display on product pages

- **Comment System**:
  - Test comment submission
  - Verify comment display and formatting
  - Test comment deletion (own comments only)
  - Check comment moderation

- **Rating/Comment Bugs to Test**:
  - Rating submission failure (15% chance)
  - Comment submission errors
  - Multiple ratings per user (intentional bug)

#### 8. **Profile Management**
- **Profile Updates**:
  - Test username updates
  - Verify email address changes
  - Test password updates
  - Check profile information persistence

- **Profile Bugs to Test**:
  - Random profile update failure (30% chance)
  - Update error message display

#### 9. **Admin Panel Operations**
- **Admin Access**:
  - Test admin login
  - Verify product management
  - Test order management
  - Check user management
  - Verify data export functionality

#### 10. **Responsive Design Testing**
- **Mobile Compatibility**:
  - Test navigation on mobile devices
  - Verify footer layout on small screens
  - Check product cards responsiveness
  - Test form usability on touch devices

#### 11. **Performance & Error Handling**
- **Error Scenarios**:
  - Test 404 page handling
  - Verify 500 error pages
  - Check network error handling
  - Test API timeout scenarios

- **Performance**:
  - Test page load times
  - Verify image loading performance
  - Check API response times

### Test Hooks (data-qa attributes)
All major interactive elements have `data-qa` attributes for easy automation:

#### **Navigation & Header**
- **Brand**: `data-qa="nav-brand"` (logo/home link)
- **Main Navigation**: `data-qa="nav-products"`, `data-qa="nav-cart"`
- **Authentication**: `data-qa="nav-login"`, `data-qa="nav-register"`, `data-qa="nav-profile"`, `data-qa="nav-logout"`

#### **Footer**
- **Social Media**: `data-qa="social-facebook"`, `data-qa="social-twitter"`, `data-qa="social-instagram"`, `data-qa="social-youtube"`, `data-qa="social-discord"`
- **Contact Info**: `data-qa="contact-phone"`, `data-qa="contact-email"`, `data-qa="contact-hours"`, `data-qa="contact-address"`
- **Quick Links**: `data-qa="footer-products"`, `data-qa="footer-cart"`, `data-qa="footer-login"`, `data-qa="footer-register"`, `data-qa="footer-admin"`

#### **Products Page**
- **Product Cards**: `data-qa="product-card"` (each product container)
- **View Buttons**: `data-qa="view-product-btn"` (each product's view link)
- **Search & Filter**: `data-qa="search-form"`, `data-qa="search-input"`, `data-qa="sort-select"`

#### **Product Detail Page**
- **Add to Cart**: `data-qa="quantity-input"`, `data-qa="add-to-cart-btn"`
- **Comments**: `data-qa="comment-form"`, `data-qa="comment-text"`, `data-qa="submit-comment-btn"`
- **Rating System**: `data-qa="rating-star-1"` through `data-qa="rating-star-5"`, `data-qa="change-rating-btn"`, `data-qa="user-rating-section"`, `data-qa="rate-product-section"`

#### **Shopping Cart**
- **Cart Items**: `data-qa="cart-row"` (each cart item row)
- **Quantity Controls**: `data-qa="cart-qty"` (quantity inputs)
- **Remove Buttons**: `data-qa="cart-remove"` (remove item buttons)
- **Item Totals**: `data-qa="cart-item-total"` (individual item totals)

#### **Checkout Process**
- **Form**: `data-qa="checkout-form"`
- **Input Fields**: `data-qa="name"`, `data-qa="email"`, `data-qa="phone"`, `data-qa="address"`, `data-qa="card-number"`, `data-qa="card-expiry"`, `data-qa="card-cvv"`
- **Submit Button**: `data-qa="place-order-btn"`

#### **User Profile**
- **Profile Form**: `data-qa="update-username"`, `data-qa="update-email"`, `data-qa="update-password"`, `data-qa="profile-update-btn"`, `data-qa="profile-update-error"`
- **Order History**: `data-qa="orders-table"`, `data-qa="order-row"` (each order), `data-qa="order-detail-btn"`, `data-qa="order-detail-body"`

#### **Global Elements**
- **QA Pass Indicator**: `id="QA_PASS"` (hidden div for automation pass/fail signaling)

## 📁 Project Structure

```
qa4autotest/
├── retrostore/          # Django project settings
├── store/              # Product and rating models
├── users/              # User authentication
├── orders/             # Cart and order management
├── api/                # API endpoints and serializers
├── frontend/           # Static files (CSS, JS, images)
│   ├── templates/      # Django templates
│   │   ├── base.html   # Base template with navigation & footer
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
├── staticfiles/        # Collected static files
├── requirements.txt    # Python dependencies
├── railway.json        # Railway deployment config
├── railway.toml        # Railway environment variables
└── manage.py          # Django management script
```

## 🔧 Configuration

### Environment Variables
- `DEBUG`: Set to `False` for production
- `ALLOWED_HOSTS`: Railway domain
- `DATABASE_URL`: PostgreSQL connection string (provided by Railway)
- `SECRET_KEY`: Django secret key

### API Endpoints
- **Products**: `/api/products/`
- **Authentication**: `/api/auth/login/`, `/api/auth/register/`
- **Cart**: `/api/cart/`
- **Orders**: `/api/orders/`
- **Users**: `/api/users/`

## 🎨 UI/UX Features

### Enhanced Navigation
- **Visual Separators**: Clear separators between navigation sections
- **Hover Effects**: Smooth animations and visual feedback
- **Icon Integration**: FontAwesome icons for better visual appeal
- **Responsive Design**: Mobile-friendly navigation with collapsible menu

### Comprehensive Footer
- **Contact Information**: Phone, email, hours, and address
- **Social Media Links**: Facebook, Twitter, Instagram, YouTube, Discord
- **Quick Links**: Direct navigation to important pages
- **Interactive Elements**: Hover effects and animations

### Retro Gaming Aesthetic
- **Color Scheme**: Dark theme with vibrant pink, purple, and cyan accents
- **Typography**: Pixel-style fonts for authentic retro feel
- **Animations**: Smooth transitions and hover effects
- **Icons**: Gaming-themed icons throughout the interface

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly using the comprehensive test scenarios above
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For issues and questions:
1. Check the [DEPLOYMENT.md](DEPLOYMENT.md) for deployment help
2. Review the API documentation at `/api/schema/swagger-ui/`
3. Check the Django admin panel for data management
4. Use the comprehensive test scenarios for debugging

---

**Happy Testing! 🎮🧪**
