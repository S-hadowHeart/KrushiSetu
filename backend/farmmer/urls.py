from django.urls import path 
from . import views

urlpatterns = [
    
    path('farmdetails',views.farmDetails,name='farmDetails'),
    
]