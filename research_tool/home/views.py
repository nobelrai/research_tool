from django.shortcuts import render

# Create your views here.
def research_tool(request):
    return render(request, template_name="research_tool.html")
