from django.db import models
from django.contrib.auth.models import User
from store.models import Product


class CartItem(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField(default=1)
    added_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.product.name} x {self.quantity}"


class OrderItem(models.Model):
    order = models.ForeignKey('Order', on_delete=models.CASCADE, related_name='order_items')
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    product_name = models.CharField(max_length=200)  # Store product name at time of order
    price = models.DecimalField(max_digits=10, decimal_places=2)  # Store price at time of order
    quantity = models.PositiveIntegerField(default=1)

    def __str__(self):
        return f"{self.product_name} x {self.quantity}"


class Order(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    total_price = models.DecimalField(max_digits=10, decimal_places=2)
    status = models.CharField(max_length=20, default='pending')
    shipping_name = models.CharField(max_length=100, blank=True, null=True)
    shipping_email = models.EmailField(blank=True, null=True)
    shipping_phone = models.CharField(max_length=30, blank=True, null=True)
    shipping_address = models.CharField(max_length=255, blank=True, null=True)
    payment_card = models.CharField(max_length=20, blank=True, null=True)
    payment_expiry = models.CharField(max_length=5, blank=True, null=True)
    payment_cvv = models.CharField(max_length=3, blank=True, null=True)

    def __str__(self):
        return f"Order {self.id} by {self.user.username}"
