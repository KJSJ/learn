# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('posts', '0002_auto_20150108_2348'),
    ]

    operations = [
        migrations.AlterField(
            model_name='post',
            name='recommend_status',
            field=models.CharField(null=True, choices=[('G', 'Good'), ('B', 'Bad')], default='G', max_length=1),
            preserve_default=True,
        ),
    ]
