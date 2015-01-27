# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('authentication', '0002_auto_20150108_2348'),
    ]

    operations = [
        migrations.AddField(
            model_name='account',
            name='profile_picture',
            field=models.ImageField(blank=True, default='userprofile/default.jpg', upload_to='userprofile/images'),
            preserve_default=True,
        ),
    ]
