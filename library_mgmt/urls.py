from django.contrib import admin
from django.urls import path, include
from books.views_auth import RegisterView, LoginView
from books.views import BookListAPIView


urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('books.urls')),
    path('api/register/', RegisterView.as_view(), name='register'),
    path('api/login/', LoginView.as_view(), name='login'),
    path('api/books/', BookListAPIView.as_view(), name='book-list'),
]
