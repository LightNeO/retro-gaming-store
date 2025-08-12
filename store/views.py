from rest_framework import viewsets, permissions, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.pagination import PageNumberPagination
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import SearchFilter, OrderingFilter
from django.db.models import Avg
from .models import Product, Rating, Comment
from .serializers import ProductSerializer, RatingSerializer, CommentSerializer


class ProductPagination(PageNumberPagination):
    page_size = 10
    page_size_query_param = 'page_size'
    max_page_size = 100


class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    pagination_class = ProductPagination
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    search_fields = ['name', 'brand', 'description']
    ordering_fields = ['price', 'release_year', 'rating']
    ordering = ['-release_year']

    @action(detail=True, methods=['get', 'post'], permission_classes=[permissions.IsAuthenticatedOrReadOnly])
    def comments(self, request, pk=None):
        product = self.get_object()
        
        if request.method == 'GET':
            comments = Comment.objects.filter(product=product).order_by('-created_at')
            serializer = CommentSerializer(comments, many=True)
            return Response(serializer.data)
        
        elif request.method == 'POST':
            serializer = CommentSerializer(data=request.data)
            
            if serializer.is_valid():
                serializer.save(product=product, user=request.user)
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=True, methods=['delete'], permission_classes=[permissions.IsAuthenticatedOrReadOnly])
    def delete_comment(self, request, pk=None):
        product = self.get_object()
        comment_id = request.data.get('comment_id')
        
        if not comment_id:
            return Response({'error': 'comment_id is required'}, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            comment = Comment.objects.get(id=comment_id, product=product)
            
            # Check if user owns the comment
            if comment.user != request.user:
                return Response({'error': 'You can only delete your own comments'}, status=status.HTTP_403_FORBIDDEN)
            
            comment.delete()
            return Response({'message': 'Comment deleted successfully'}, status=status.HTTP_204_NO_CONTENT)
        except Comment.DoesNotExist:
            return Response({'error': 'Comment not found'}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    @action(detail=True, methods=['get', 'post'], permission_classes=[permissions.IsAuthenticated])
    def ratings(self, request, pk=None):
        product = self.get_object()
        
        if request.method == 'GET':
            # Get user's rating for this product
            user_rating = Rating.objects.filter(product=product, user=request.user).first()
            response_data = {
                'user_rating': RatingSerializer(user_rating).data if user_rating else None,
                'average_rating': product.rating,
                'rating_count': product.ratings.count()
            }
            return Response(response_data)
        
        elif request.method == 'POST':
            # Check if user already rated this product
            existing_rating = Rating.objects.filter(product=product, user=request.user).first()
            
            if existing_rating:
                # Update existing rating
                serializer = RatingSerializer(existing_rating, data=request.data, partial=True)
            else:
                # Create new rating
                serializer = RatingSerializer(data=request.data)
            
            if serializer.is_valid():
                serializer.save(product=product, user=request.user)
                
                # Update product's average rating
                avg_rating = Rating.objects.filter(product=product).aggregate(Avg('score'))['score__avg']
                product.rating = avg_rating or 0
                product.save()
                
                return Response({
                    'success': True,
                    'average_rating': product.rating,
                    'rating_count': product.ratings.count()
                })
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class RatingViewSet(viewsets.ModelViewSet):
    queryset = Rating.objects.all()
    serializer_class = RatingSerializer


class CommentViewSet(viewsets.ModelViewSet):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        product_id = self.kwargs.get('product_pk')
        if product_id:
            return Comment.objects.filter(product_id=product_id)
        return Comment.objects.all()

    def perform_create(self, serializer):
        product_id = self.kwargs.get('product_pk')
        if product_id:
            serializer.save(user=self.request.user, product_id=product_id)
        else:
            serializer.save(user=self.request.user)

    def destroy(self, request, *args, **kwargs):
        comment = self.get_object()
        
        # Check if user owns the comment
        if comment.user != request.user:
            return Response({'error': 'You can only delete your own comments'}, status=status.HTTP_403_FORBIDDEN)
        
        comment.delete()
        return Response({'message': 'Comment deleted successfully'}, status=status.HTTP_204_NO_CONTENT)

    @action(detail=False, methods=['delete'], permission_classes=[permissions.IsAdminUser])
    def clear_all(self, request):
        """Admin-only: Clear all comments for testing purposes"""
        Comment.objects.all().delete()
        return Response({'message': 'All comments cleared successfully'}, status=status.HTTP_204_NO_CONTENT)
