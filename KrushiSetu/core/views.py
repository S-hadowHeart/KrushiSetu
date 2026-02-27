from django.shortcuts import render


# Create your views here.

def home(request):
    return render(request,'home.html')

def about(request):
    return render(request,'about.html')

def contactUs(request):
    return render(request,'contactUs.html')

def comingSoon(request):
    return render(request,'comingSoon.html')


def registration(request):
    return render(request,'registration/registration.html')

def verification(request):
    return render(request,'registration/verification.html')

def success(request):
    return render(request,'registration/success.html')

def basicinfo(request):
    return render(request,'registration/basicinfo.html')


def login(request):
    return render(request,'login/login.html')

def forgotPassword(request):
    return render(request,'login/forgotPassword.html')

def otpVerify(request):
    return render(request,'login/otpVerify.html')

def resetPassword(request):
    return render(request,'login/resetPassword.html')