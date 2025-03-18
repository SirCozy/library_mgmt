from django.shortcuts import render, get_object_or_404, redirect
from django.http import HttpResponse
from .models import Category, Book, Member, BorrowRecord
from django.contrib.auth.decorators import login_required

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
