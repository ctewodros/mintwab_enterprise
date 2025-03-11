from django.db import models

# Create your models here.
class Organization(models.Model):
    title = models.CharField(max_length=255, verbose_name='Organization Name')
    motto = models.CharField(max_length=255, blank=True, null=True)
    logo = models.ImageField(upload_to='organization/logos/', blank=True, null=True)
    email = models.EmailField(blank=True, null=True)
    website = models.URLField(blank=True, null=True)
    phone = models.CharField(max_length=20, blank=True, null=True)
    pobox = models.CharField(max_length=50, blank=True, null=True, verbose_name='P.O. Box')
    street = models.CharField(max_length=255, blank=True, null=True)
    city = models.CharField(max_length=100, blank=True, null=True)
    country = models.CharField(max_length=100, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return self.title
    
    class Meta:
        verbose_name = 'Organization'
        verbose_name_plural = 'Organizations'
