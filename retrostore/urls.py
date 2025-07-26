"""
URL configuration for retrostore project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from django.views.generic import TemplateView
from django.conf import settings
from django.conf.urls.static import static
from django.http import JsonResponse
from store.models import Product
from django.shortcuts import render


def health_check(request):
    """Simple health check endpoint for Railway"""
    return JsonResponse({'status': 'healthy', 'message': 'Retro Gaming Store is running!'})


def debug_products(request):
    products = Product.objects.all()[:5]
    data = [{'id': p.id, 'name': p.name, 'price': str(p.price), 'brand': p.brand} for p in products]
    return JsonResponse({'products': data, 'count': len(data)})


def test_products(request):
    products = Product.objects.all()[:6]
    return render(request, 'test_products.html', {'products': products})


urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('api.urls')),
    # Health check endpoint
    path('health/', health_check, name='health_check'),
    # Debug endpoints
    path('debug/products/', debug_products, name='debug_products'),
    path('test/', test_products, name='test_products'),
    # Frontend routes
    path('', TemplateView.as_view(template_name='index.html'), name='home'),
    path('products/', TemplateView.as_view(template_name='products.html'), name='products'),
    path('login/', TemplateView.as_view(template_name='login.html'), name='login'),
    path('register/', TemplateView.as_view(template_name='register.html'), name='register'),
    path('cart/', TemplateView.as_view(template_name='cart.html'), name='cart'),
    path('checkout/', TemplateView.as_view(template_name='checkout.html'), name='checkout'),
    path('profile/', TemplateView.as_view(template_name='profile.html'), name='profile'),
    path('product/', TemplateView.as_view(template_name='product.html'), name='product'),
]

# Serve static files during development
if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
