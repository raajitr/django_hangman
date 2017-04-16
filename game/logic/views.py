# -*- coding: utf-8 -*-
from __future__ import unicode_literals
import requests
from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
import pickle
import random
# Create your views here.
def index(request):
    return render(request, 'index.html')

def word(request):
    if request.GET.get('letter') is not None:
        return process_letter(request)

    extracted_word, meaning = determine_word()

    if request.session.get('word') is not None:
        print request.session['word']

    word = {
        'word': extracted_word,
        'meaning': meaning,
        'length': len(extracted_word),
        'blanks': '_' * len(extracted_word),
        'guesses': 7,
        'winning': False
    }
    request.session['word'] = word
    return JsonResponse(word)
    
    
def process_letter(request):
    letter = str(request.GET['letter'])
    blanks = list(str(request.session['word']['blanks']))
    word_list = list(str(request.session['word']['word']))
    won = False
    if letter in word_list:
        indices = [count for count, i in enumerate(word_list) if i == letter]
        for i in indices:
            blanks[i] = letter
        if '_' not in blanks:
            won = True
        request.session['word']['blanks'] = ''.join(blanks)
        color = 'green'
    else:
        request.session['word']['guesses'] -= 1
        color = 'red'
    
    request.session['word']['winning'] = won
    request.session.modified = True
    response = request.session['word']
    if request.session['word']['guesses'] == 0 or won:
            del request.session['word']
    response['color'] = color
    return JsonResponse(response)

def determine_word():
    with open('wordlist.pkl', 'rb') as f:
        data = pickle.load(f)
        num_of_words = len(data.keys())
        random_num = str(random.randint(1, num_of_words))
        word = data[random_num]['word'].upper()
        meaning = data[random_num]['meaning']
    
    return word, meaning