from django.urls import path, re_path
from django.contrib import admin

from . import views

urlpatterns = [
    re_path(r'^.*$', views.index, name="index"),
    # path("", views.index, name="index"),
]