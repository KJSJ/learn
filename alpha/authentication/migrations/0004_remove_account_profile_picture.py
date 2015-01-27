# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('authentication', '0003_account_profile_picture'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='account',
            name='profile_picture',
        ),
    ]
