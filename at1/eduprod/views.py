from django.core import serializers
from .models import Results
from django.contrib.auth.decorators import login_required
from django.shortcuts import render, redirect
from django.http import JsonResponse
import json

@login_required
def index(request):
    return render(request, 'eduprod/index.html')

def Factorise(request):
    return render(request, 'eduprod/Factorise.html')

def Complete(request):
    return render(request, 'eduprod/Complete.html')

def Formula(request):
    return render(request, 'eduprod/Formula.html')

def Test(request):
    return render(request, 'eduprod/Test.html')

def Progress(request):
    results = Results.objects.all()
    questions_json = serializers.serialize('json', results)
    return render(request, "eduprod/Progress.html", {'questions_json': questions_json})