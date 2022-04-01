from django.db import models
from django.contrib.auth.models import AbstractUser
import markdown2

class User(AbstractUser):
    pass

class Post(models.Model):
    STATUS = (
      (0,"Project"),
      (1,"About")
    )
    title = models.CharField(max_length=200, unique=True)
    summary=models.TextField(default="short summary")
    content = models.TextField()
    created_on = models.DateTimeField(auto_now_add=True)
    status = models.IntegerField(choices=STATUS, default=0)
    image=models.URLField(max_length=200, default="https://github.com/lheredias/comics-site/blob/main/screenshots/00.png?raw=true")
    labels=models.JSONField(blank=True, null=True)
    github=models.URLField(max_length=200, blank=True, null=True)
    website=models.URLField(max_length=200, blank=True, null=True)

    class Meta:
        ordering = ['-created_on']

    def parse_content(self):
        return markdown2.markdown(self.content)

    def __str__(self):
        return self.title