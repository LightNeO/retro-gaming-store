from django.urls import path, include
from rest_framework.routers import DefaultRouter
from store.views import ProductViewSet, RatingViewSet, CommentViewSet
from orders.views import CartItemViewSet, OrderViewSet
from users.views import UserViewSet, ProfileViewSet, RegistrationView, LoginView, LogoutView
from drf_spectacular.views import SpectacularAPIView, SpectacularSwaggerView
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
    TokenVerifyView,
)

router = DefaultRouter()
router.register(r'products', ProductViewSet)
router.register(r'ratings', RatingViewSet)
router.register(r'comments', CommentViewSet)
router.register(r'cart', CartItemViewSet)
router.register(r'orders', OrderViewSet)
router.register(r'users', UserViewSet)
router.register(r'profiles', ProfileViewSet)

urlpatterns = [
    path('register/', RegistrationView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
    path('logout/', LogoutView.as_view(), name='logout'),
    path('', include(router.urls)),
    path('schema/', SpectacularAPIView.as_view(), name='schema'),
    path('docs/', SpectacularSwaggerView.as_view(url_name='schema'), name='swagger-ui'),
    path('auth/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('auth/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('auth/token/verify/', TokenVerifyView.as_view(), name='token_verify'),
] 