from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('Factorise', views.Factorise, name='Factorise'),
    path('Complete', views.Complete, name='Complete'),
    path('Formula', views.Formula, name='Formula'),
    path('Test', views.Test, name='Test'),
    path('Quiz', views.Quiz, name='Quiz'),
    path('Progress', views.Progress, name='Progress'),
]