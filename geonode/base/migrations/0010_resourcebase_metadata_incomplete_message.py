# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0009_auto_20180623_1900'),
    ]

    operations = [
        migrations.AddField(
            model_name='resourcebase',
            name='metadata_incomplete_message',
            field=models.CharField(max_length=500, null=True, blank=True),
        ),
    ]
