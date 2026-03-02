from django.urls import path
from . import views

urlpatterns = [
    path('buyerdetails',views.buyerdetails,name='buyerdetails'),
    

]
