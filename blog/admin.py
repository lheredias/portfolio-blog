from django.contrib import admin
from .models import *
from django.forms import TextInput, Textarea


admin.site.register(User)

class PostAdmin(admin.ModelAdmin):
    formfield_overrides = {
        models.TextField: {'widget': Textarea(attrs={'rows':20, 'cols':80})},
    }

admin.site.register(Post, PostAdmin)
admin.site.register(Skill)
