# -*- coding: utf-8 -*-
from __future__ import unicode_literals
import requests
from django.shortcuts import render
from django.http import HttpResponse, JsonResponse

# Create your views here.
def index(request):
    return render(request, 'index.html')

def word(request):
    r = requests.get('http://randomword.setgetgo.com/get.php')
    if r.status_code != 200:
        return JsonResponse({'message':'Maintainance','explanation':"Due to technical difficulties you won't be able to play Hangman!"}, status=r.status_code) 
    word = {
        'word': r.content
    }
    return JsonResponse(word)