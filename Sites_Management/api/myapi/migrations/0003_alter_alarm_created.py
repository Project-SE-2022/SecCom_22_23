# Generated by Django 4.1.2 on 2022-10-23 15:28

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('myapi', '0002_alarm_rename_designation_property_name_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='alarm',
            name='created',
            field=models.DateTimeField(auto_now_add=True),
        ),
    ]
