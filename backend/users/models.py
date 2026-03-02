from email.policy import default
from random import choice, choices

from django.db import models
from django.contrib.auth.models import AbstractUser

from KrushiSetu.core.views import verification 

# Create your models here.

# Custom User Model (Common Fields)

class User(AbstractUser):

    username = None  # remove username from default user model 

    ROLE_CHOICES = (
        ('admin','Admin'),
        ('buyer','Buyer'),
        ('seller','Seller'),
    )

    STATUS_CHOICES = (
        ('active','Active'),
        ('inactive','Inactive'),
        ('spam','Spam'),
        ('suspended','Suspended'),
    )

    VERIFICATION_STATUS = (
        ('pending','Pending'),
        ('approved','Approved'),
        ('rejected','Rejected'),
    )

    BADGE_CHOICES = (
        ('bronze','Bronze'),
        ('sliver','Sliver'),
        ('gold','Gold'),
    )

    name = models.CharField(max_length=150)
    email = models.CharField(unique=True)
    phone = models.CharField(max_length=15,unique=True)

    role = models.CharField(max_length=10,choices=ROLE_CHOICES)

    profile_picture = models.ImageField(
        upload_to='profile_pictures/',
        blank= True,
        null=True
    )

    verify_document_photo = models.ImageField(
        upload_to='verification_docs/',
        blank = True,
        null = True
    )

    verification_status = models.CharField(
        max_length=10,
        choices=VERIFICATION_STATUS,
        default="pending"
    )

    user_status = models.CharField(
        max_length= 10 ,
        choices=STATUS_CHOICES,
        default='active'
    )

    trust_badge = models.charField(
        max_length = 10,
        choices = BADGE_CHOICES,
        blank = True,
        null = True
    )

    total_successful_transactions = models.postiive_integer_field(default=0)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['name','phone']



#  Seller Profile 

class SellerProfile(models.Model):

    user = models.one_to_one_field(
        User,
        on_delete=models.CASCADE,
        related_name ='seller_profile'
    )

    location = models.CharField( max_length=255)

    primary_cops = models.TextField()

    land_area = models.FloatField(help_text="In acres")

    experience = models.models.PositiveIntegerField(
        help_text = "Years of farming experience"
    )
    
    def __str__(self):
        return f"Seller - {self.user.email}"
    

# Buyer Profile

class BuyerProfile(models.Model):
    
    BUSINESS_TYPE_CHOICES = (
        ('hotel','Hotel/Restaurant'),
        ('manufacturer','Manufacturer'),
        ('retailer','Retailer'),
        ('wholesaler','Wholesaler'),
        ('exporter','Exporter'),
        ('ngo','NGO'),
        ('other','Other'),
    )

    PURCHASE_VOLUME_CHOICES = (
        ('lt10','Less than 10 quintals')
        ('10_50','10-50 quintals'),
        ('50_200','50-200 quintals'),
        ('200_plus' , '200+ quintals'),
    )

    user = models.OneToOneField(
        User,
        on_delete=models.CASCADE,
        related_name='buyer_profile'
    )

    business_name = models.models.CharField(max_length=255)

    business_type = models.CharField(
        max_length=20,
        choices=BUSINESS_TYPE_CHOICES
    )

    year_in_operation = models.models.PositiveIntegerField()

    business_locations = models.TextField()

    gst_number = models.CharField(
        max_length=50,
        blank=True,
        null=True
    ) 

    monthly_purchase_volume = models.CharField(
        max_length=20,
        choices=PURCHASE_VOLUME_CHOICES
    )

    preferred_crops = models.TextField()

    def __str__(self):
        return f"Buyer - {self.user.email}"