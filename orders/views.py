from rest_framework import viewsets, permissions, status
from rest_framework.response import Response
from .models import CartItem, Order, OrderItem
from .serializers import CartItemSerializer, OrderSerializer


class CartItemViewSet(viewsets.ModelViewSet):
    queryset = CartItem.objects.all()
    serializer_class = CartItemSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        # Users can only see their own cart items
        return CartItem.objects.filter(user=self.request.user)

    def create(self, request, *args, **kwargs):
        print("=== ADDING TO CART ===")
        print(f"Request data: {request.data}")
        print(f"User: {request.user}")
        print(f"User authenticated: {request.user.is_authenticated}")
        
        # Check if item already exists in cart
        product_id = request.data.get('product')
        existing_item = CartItem.objects.filter(user=request.user, product_id=product_id).first()
        
        if existing_item:
            # Update quantity if item already exists
            existing_item.quantity += request.data.get('quantity', 1)
            existing_item.save()
            serializer = self.get_serializer(existing_item)
            print(f"Updated existing cart item: {existing_item}")
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            # Create new cart item
            serializer = self.get_serializer(data=request.data)
            print(f"Serializer data: {request.data}")
            print(f"Serializer is valid: {serializer.is_valid()}")
            if serializer.is_valid():
                # Create the cart item with both user and product
                cart_item = CartItem.objects.create(
                    user=request.user,
                    product_id=product_id,
                    quantity=request.data.get('quantity', 1)
                )
                print(f"Created new cart item: {cart_item}")
                # Return the serialized data
                response_serializer = self.get_serializer(cart_item)
                return Response(response_serializer.data, status=status.HTTP_201_CREATED)
            else:
                print(f"Serializer errors: {serializer.errors}")
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class OrderViewSet(viewsets.ModelViewSet):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        # Users can only see their own orders
        return Order.objects.filter(user=self.request.user)

    def create(self, request, *args, **kwargs):
        data = request.data.copy()
        user = request.user
        items = data.get('items', [])
        
        # Validate that items are provided
        if not items:
            return Response(
                {'error': 'Order must contain at least one item.'}, 
                status=status.HTTP_400_BAD_REQUEST
            )
        
        # Get cart items and validate they exist and belong to user
        cart_items = CartItem.objects.filter(id__in=items, user=user)
        
        # Check if all requested items were found
        if len(cart_items) != len(items):
            return Response(
                {'error': 'Some cart items were not found or do not belong to you.'}, 
                status=status.HTTP_400_BAD_REQUEST
            )
        
        # Check if cart is empty
        if not cart_items.exists():
            return Response(
                {'error': 'Cannot create order with empty cart.'}, 
                status=status.HTTP_400_BAD_REQUEST
            )
        
        total = sum(item.product.price * item.quantity for item in cart_items)
        data['total_price'] = total
        serializer = self.get_serializer(data=data)
        serializer.is_valid(raise_exception=True)
        order = serializer.save(user=user)
        
        # Try to create OrderItem instances from cart items (new system)
        try:
            for cart_item in cart_items:
                OrderItem.objects.create(
                    order=order,
                    product=cart_item.product,
                    product_name=cart_item.product.name,
                    price=cart_item.product.price,
                    quantity=cart_item.quantity
                )
            print(f"Created {len(cart_items)} OrderItem instances for order {order.id}")
        except Exception as e:
            print(f"Could not create OrderItem instances (table may not exist yet): {e}")
            # Continue without OrderItem - order will still be created successfully
        
        # Clear cart after order
        cart_items.delete()
        
        headers = self.get_success_headers(serializer.data)
        response_data = serializer.data.copy()
        for field in ['payment_card', 'payment_expiry', 'payment_cvv']:
            response_data.pop(field, None)
        return Response(response_data, status=status.HTTP_201_CREATED, headers=headers)
