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

- **Backend**: Django 5.2, Django REST Framework, PostgreSQL
- **Frontend**: HTML5, CSS3, JavaScript (ES6+), Bootstrap 5
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

### Recommended Test Scenarios
1. **User Registration & Login**
2. **Product Browsing & Search**
3. **Cart Management**
4. **Checkout Process**
5. **Order History**
6. **Product Ratings & Comments**
7. **Admin Panel Operations**

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

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For issues and questions:
1. Check the [DEPLOYMENT.md](DEPLOYMENT.md) for deployment help
2. Review the API documentation at `/api/schema/swagger-ui/`
3. Check the Django admin panel for data management
