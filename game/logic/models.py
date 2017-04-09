# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models

# Create your models here.
class Word(models.Model):
    word = models.CharField(max_length=50)

    def __str__(self):
        return self.word