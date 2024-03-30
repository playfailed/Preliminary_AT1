from django.core import serializers
from .models import Question
from django.contrib.auth.decorators import login_required
from django.shortcuts import render, redirect
from django.http import JsonResponse
import json

@login_required
def index(request):
    questions = Question.objects.all()
    questions_json = serializers.serialize('json', questions)
    return render(request, 'eduprod/index.html', {'questions_json': questions_json})

def Factorise(request):
    return render(request, 'eduprod/Factorise.html')

def Complete(request):
    return render(request, 'eduprod/Complete.html')

def Formula(request):
    return render(request, 'eduprod/Formula.html')

def Test(request):
    return render(request, 'eduprod/Test.html')

def Progress(request):
    return render(request, "eduprod/Progress.html")