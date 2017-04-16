from django.conf.urls import url
from django.views.generic import RedirectView
from . import views

urlpatterns = [
    url(r'^$', RedirectView.as_view(pattern_name='startup')),
    url(r'^home/', views.index, name='startup'),
    url(r'^word/', views.word, name='get_word')
]