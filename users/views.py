from rest_framework import viewsets, permissions
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth.models import User
from .models import Profile
from .serializers import UserSerializer, ProfileSerializer
from django.contrib.auth.password_validation import validate_password
from django.core.exceptions import ValidationError
from django.contrib.auth import authenticate, login, logout


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        # Users can only see their own profile
        return User.objects.filter(id=self.request.user.id)

    def update(self, request, *args, **kwargs):
        user = self.get_object()
        
        # Only allow users to update their own profile
        if user.id != request.user.id:
            return Response({'error': 'You can only update your own profile.'}, status=status.HTTP_403_FORBIDDEN)
        
        username = request.data.get('username')
        email = request.data.get('email')
        password = request.data.get('password')
        
        # Validate username uniqueness if it's being changed
        if username and username != user.username:
            if User.objects.filter(username=username).exclude(id=user.id).exists():
                return Response({'error': 'Username already exists.'}, status=status.HTTP_400_BAD_REQUEST)
        
        # Update fields
        if username:
            user.username = username
        if email:
            user.email = email
        if password:
            try:
                validate_password(password)
                user.set_password(password)
            except ValidationError as e:
                return Response({'error': e.messages}, status=status.HTTP_400_BAD_REQUEST)
        
        user.save()
        return Response(UserSerializer(user).data)


class ProfileViewSet(viewsets.ModelViewSet):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer
    permission_classes = [permissions.IsAuthenticated]


class RegistrationView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        username = request.data.get('username')
        email = request.data.get('email')
        password = request.data.get('password')
        if not username or not password:
            return Response({'error': 'Username and password are required.'}, status=status.HTTP_400_BAD_REQUEST)
        try:
            validate_password(password)
        except ValidationError as e:
            return Response({'error': e.messages}, status=status.HTTP_400_BAD_REQUEST)
        if User.objects.filter(username=username).exists():
            return Response({'error': 'Username already exists.'}, status=status.HTTP_400_BAD_REQUEST)
        user = User.objects.create_user(username=username, email=email, password=password)
        Profile.objects.get_or_create(user=user)
        return Response(UserSerializer(user).data, status=status.HTTP_201_CREATED)


class LoginView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')
        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            return Response({'success': 'Logged in successfully.'})
        return Response({'error': 'Invalid credentials.'}, status=status.HTTP_401_UNAUTHORIZED)


class LogoutView(APIView):
    def post(self, request):
        logout(request)
        return Response({'success': 'Logged out successfully.'})
