from django.shortcuts import render, redirect
from django.http import HttpResponseRedirect
from django.urls import reverse
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.contrib import messages

#Index template that redirects the user to login page if not login
def index(request):
    if not request.user.is_authenticated:
        return HttpResponseRedirect(reverse("users:login"))
    return render(request, "users/user.html")

#Authenticate User to the system
def login_view(request):
    if request.method == "POST":
        username = request.POST["username"]
        password = request.POST["password"]
        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            return HttpResponseRedirect(reverse("users:index"))
        else:
            messages.success(request, "Invalid Credentials.")
            return render(request, "users/login.html")
    return render(request, "users/login.html")

#Unauthenticate User to the system
def logout_view(request):
    logout(request)
    messages.success(request, "Successfully logged out.")
    return redirect(reverse('users:login'))