# Generated by Django 5.0.2 on 2024-04-01 04:38

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('eduprod', '0004_results_useranswer'),
    ]

    operations = [
        migrations.RenameField(
            model_name='results',
            old_name='catergory',
            new_name='category',
        ),
        migrations.RenameField(
            model_name='results',
            old_name='subcatergory',
            new_name='subcategory',
        ),
    ]
