from django.shortcuts import render
from .models import *

def index(request):
    posts = Post.objects.filter(status=0)
    journey= Post.objects.get(title__startswith="My")
    aboutme= Post.objects.get(title__startswith="About")
    limit=(Skill.objects.count() // 2) + 1
    skills01={}
    skills02={}
    for skill in Skill.objects.all()[:limit]:
        skills01.update(skill.serialize())
    for skill in Skill.objects.all()[limit:]:
        skills02.update(skill.serialize())
    return render(request, "blog/index.html", {
        "posts":posts,
        "aboutme":aboutme,
        "journey":journey,
        "skills":skills01,
        "skills02":skills02
    })
