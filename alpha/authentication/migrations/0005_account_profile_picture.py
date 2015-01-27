# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('authentication', '0004_remove_account_profile_picture'),
    ]

    operations = [
        migrations.AddField(
            model_name='account',
            name='profile_picture',
            field=models.TextField(default='123', blank=True),
            preserve_default=False,
        ),
    ]
