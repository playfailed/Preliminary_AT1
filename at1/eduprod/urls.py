from django.urls import path
from . import views

# Defining the URL patterns for the application
urlpatterns = [
    path('', views.index, name='index'),
    path('Factorise', views.Factorise, name='Factorise'),
    path('Complete', views.Complete, name='Complete'),
    path('Formula', views.Formula, name='Formula'),
    path('Test', views.Test, name='Test'),
    path('Progress', views.Progress, name='Progress'),
    path('save_quiz_results', views.save_quiz_results, name='save_quiz_results'),
]