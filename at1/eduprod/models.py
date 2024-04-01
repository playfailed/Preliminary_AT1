from django.db import models
from django.contrib.auth.models import User
from django.utils.translation import gettext_lazy as _

class Results(models.Model):
    question_text = models.CharField(max_length=255)
    answer_text = models.CharField(max_length=255)
    users = models.CharField(max_length=255)
    iscorrect = models.BooleanField(default=False)
    useranswer = models.CharField(max_length=255, default='')
    category = models.CharField(max_length=255) # Added field
    subcategory = models.CharField(max_length=255) # Added field

    def __str__(self):
        return self.question_text
