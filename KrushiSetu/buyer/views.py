from django.shortcuts import render

# Create your views here.

def buyerdetails(request):
    return render(request,'registration/buyerdetails.html')