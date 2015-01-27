# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('authentication', '0005_account_profile_picture'),
    ]

    operations = [
        migrations.AddField(
            model_name='account',
            name='access_token',
            field=models.CharField(max_length=140, default='1', blank=True),
            preserve_default=False,
        ),
    ]
