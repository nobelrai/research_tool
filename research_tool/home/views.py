from django.shortcuts import render

# Create your views here.
def research_tool(request):
    context = {
        "prompts": "what is Computer?",
        "response":"Computer is an electronic device."    }
    return render(request, "research_tool.html", context)
