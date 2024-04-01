from django.core import serializers
from django.contrib.auth.decorators import login_required
from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .models import Results
import json

def save_quiz_results(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        question_text = data.get('question_text')
        answer_text = data.get('answer_text')
        users = data.get('users')
        iscorrect = data.get('iscorrect')
        useranswer = data.get('useranswer')
        category = data.get('category')
        subcategory = data.get('subcategory')

        # Create a new instance of the Results model
        result = Results(
            question_text=question_text,
            answer_text=answer_text,
            users=users,
            iscorrect=iscorrect,
            useranswer=useranswer,
            category=category,
            subcategory=subcategory
        )
        result.save()

        return JsonResponse({'status': 'success'})
    else:
        return JsonResponse({'status': 'error', 'message': 'Invalid request method'})

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
    print(results)
    return render(request, "eduprod/Progress.html", {'results': results})