from django import forms
from django.contrib import admin
from .models import Results

# Register Question model with the default ModelAdmin
admin.site.register(Results)