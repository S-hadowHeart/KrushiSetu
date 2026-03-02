
from django.urls import path
from . import views

urlpatterns = [
    path('',views.home,name='home'),
    path('about/',views.about,name='about'),
    path('contactUs/',views.contactUs,name='contactUs'),
    
    path('login/',views.login,name='login'),
    path('login/password/forgot/',views.forgotPassword,name='forgotPassword'),
    path('login/password/forgot/otp',views.otpVerify,name='otpVerify'),
    path('login/password/forgot/reset',views.resetPassword,name='resetPassword'),
    
    
    path('registration/',views.registration,name='registration'),
    path('registration/success',views.success,name='success'),

    path('farmmer/verification',views.verification,name='verification'),
    path('buyer/verification',views.verification,name='verification'),
    
    path('farmmer/registration',views.basicinfo,name="basicinfo"),
    path('buyer/registration',views.basicinfo,name="basicinfo"),

   
    
]