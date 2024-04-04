from django.contrib import admin
from django.urls import include, path

# Defining the URL patterns for Website
urlpatterns = [
    path('admin/', admin.site.urls),
    path('users/', include(('users.urls', 'users'), namespace='users')),
    path('eduprod/', include(('eduprod.urls', 'eduprod'), namespace='eduprod')),
    path('accounts/login/', include('users.urls')),
]