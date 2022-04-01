from django.shortcuts import render
from .models import *
from .utils import *

def index(request):
    posts = Post.objects.filter(status=0)
    journey= Post.objects.get(title__startswith="My")
    aboutme= Post.objects.get(title__startswith="About")
    return render(request, "blog/index.html", {
        "posts":posts,
        "aboutme":aboutme,
        "journey":journey,
        "skills":SKILLS,
        "skills02":SKILLS02
    })
