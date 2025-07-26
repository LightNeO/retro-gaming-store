from rest_framework import serializers
from .models import Product, Rating, Comment


class ProductSerializer(serializers.ModelSerializer):
    ratings_count = serializers.SerializerMethodField()
    
    class Meta:
        model = Product
        fields = '__all__'
    
    def get_ratings_count(self, obj):
        return obj.ratings.count()


class RatingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Rating
        fields = ['id', 'product', 'user', 'score', 'created_at']
        read_only_fields = ['user', 'product', 'created_at']


class CommentSerializer(serializers.ModelSerializer):
    user_name = serializers.CharField(source='user.username', read_only=True)
    
    class Meta:
        model = Comment
        fields = ['id', 'product', 'user', 'user_name', 'text', 'created_at']
        read_only_fields = ['user', 'product', 'created_at'] 