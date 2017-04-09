from django.conf.urls import url
from . import views

urlpatterns = [
    # url(r'^', views.index, name='startup'),
    url(r'^word/', views.word, name='get_word'),
    url(r'^home/', views.index, name='startup')

]