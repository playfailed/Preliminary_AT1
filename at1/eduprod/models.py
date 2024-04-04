from django.db import models
from django.contrib.auth.models import User
from django.utils.translation import gettext_lazy as _

#Creating a Model named results
class Results(models.Model):
    question_text = models.CharField(max_length=255)
    answer_text = models.CharField(max_length=255)
    users = models.CharField(max_length=255)
    iscorrect = models.BooleanField(default=False)
    useranswer = models.CharField(max_length=255, default='')
    category = models.CharField(max_length=255)
    subcategory = models.CharField(max_length=255) 

    def __str__(self):
        return self.question_text
