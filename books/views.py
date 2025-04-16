from django.shortcuts import render, get_object_or_404
from django.contrib.auth.decorators import login_required
from .models import Category, Book, Member, BorrowRecord
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.generics import ListAPIView
from .models import Book
from .serializers import BookSerializer

# Home Page
def home(request):
    return render(request, "books/home.html")

# List of Books
@login_required
def book_list(request):
    books = Book.objects.all()
    return render(request, "books/book_list.html", {"books": books})

# Book Details
@login_required
def book_detail(request, book_id):
    book = get_object_or_404(Book, id=book_id)
    return render(request, "books/book_detail.html", {"book": book})

# API: User Registration
from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from django.contrib.auth.models import User

class RegisterView(generics.CreateAPIView):
    permission_classes = [AllowAny]

    def post(self, request):
        username = request.data.get("username")
        password = request.data.get("password")

        if not username or not password:
            return Response({"error": "Username and password are required."}, status=status.HTTP_400_BAD_REQUEST)

        if User.objects.filter(username=username).exists():
            return Response({"error": "Username already exists."}, status=status.HTTP_400_BAD_REQUEST)

        user = User.objects.create_user(username=username, password=password)
        return Response({"message": "User created successfully."}, status=status.HTTP_201_CREATED)

# Use the built-in LoginView for JWT Token authentication
class LoginView(TokenObtainPairView):
    pass

class BookListAPIView(ListAPIView):
    queryset = Book.objects.all()
    serializer_class = BookSerializer