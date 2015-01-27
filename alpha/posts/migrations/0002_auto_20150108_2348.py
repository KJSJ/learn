# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('posts', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='post',
            old_name='content',
            new_name='review',
        ),
        migrations.AddField(
            model_name='post',
            name='recommend_status',
            field=models.CharField(max_length=1, default='', choices=[('G', 'Good'), ('B', 'Bad')]),
            preserve_default=True,
        ),
    ]
