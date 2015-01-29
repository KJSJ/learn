# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('authentication', '0006_account_access_token'),
    ]

    operations = [
        migrations.AddField(
            model_name='account',
            name='address',
            field=models.TextField(blank=True, default=' '),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='account',
            name='phone_number',
            field=models.CharField(blank=True, default=' ', max_length=12),
            preserve_default=False,
        ),
    ]
