from django.urls import path
from . import views

# Defining the URL patterns for the application
urlpatterns = [
    path("", views.index, name="index"),
    path("login", views.login_view, name="login"),
    path("logout", views.logout_view, name="logout"),
]