from django.contrib import admin

# Register your models here.

from .models import Book, Member, BorrowRecord, Category

admin.site.register(Book)
admin.site.register(Member)
admin.site.register(BorrowRecord)
admin.site.register(Category)
