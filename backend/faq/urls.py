from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register(r'faq', views.FAQViewSet, basename='faq')
router.register(r'categories', views.FAQCategoryViewSet, basename='faq-category')

urlpatterns = router.urls