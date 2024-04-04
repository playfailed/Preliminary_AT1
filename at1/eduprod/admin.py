from django import forms
from django.contrib import admin
from .models import Results

# Register Question model with Admin
admin.site.register(Results)