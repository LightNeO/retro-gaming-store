from django.db import models
from django.contrib.auth.models import User


class Product(models.Model):
    name = models.CharField(max_length=100)
    brand = models.CharField(max_length=50)
    release_year = models.PositiveIntegerField()
    price = models.DecimalField(max_digits=8, decimal_places=2)
    image = models.URLField(blank=True)
    description = models.TextField(blank=True)
    platform = models.CharField(max_length=50)
    rating = models.FloatField(default=0)

    def __str__(self):
        return self.name


class Rating(models.Model):
    product = models.ForeignKey('Product', on_delete=models.CASCADE, related_name='ratings')
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    score = models.PositiveIntegerField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.product.name} - {self.score} by {self.user.username}"


class Comment(models.Model):
    product = models.ForeignKey('Product', on_delete=models.CASCADE, related_name='comments')
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    text = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.product.name} - {self.user.username}: {self.text[:30]}"
