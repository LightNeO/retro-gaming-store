from rest_framework import serializers
from .models import CartItem, Order, OrderItem
from store.serializers import ProductSerializer


class CartItemSerializer(serializers.ModelSerializer):
    product = ProductSerializer(read_only=True)
    
    class Meta:
        model = CartItem
        fields = ['id', 'user', 'product', 'quantity', 'added_at']
        read_only_fields = ['user', 'added_at']


class OrderItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderItem
        fields = ['id', 'product_name', 'price', 'quantity']


class OrderSerializer(serializers.ModelSerializer):
    items = serializers.SerializerMethodField()
    
    class Meta:
        model = Order
        fields = [
            'id', 'user', 'items', 'created_at', 'total_price', 'status',
            'shipping_name', 'shipping_email', 'shipping_phone', 'shipping_address',
            'payment_card', 'payment_expiry', 'payment_cvv'
        ]
        read_only_fields = ['user', 'created_at', 'status']
    
    def get_items(self, obj):
        # Try to get items from OrderItem first (new system)
        try:
            if hasattr(obj, 'order_items') and obj.order_items.exists():
                return OrderItemSerializer(obj.order_items.all(), many=True).data
        except Exception:
            pass
        
        # Fallback: return empty list for old orders
        return [] 