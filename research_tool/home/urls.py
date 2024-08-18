from django.urls import path
from .views import research_tool

urlpatterns = [
    path("", research_tool, name="research_tool"),
]