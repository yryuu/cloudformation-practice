from django.contrib import admin
from django.urls import path
from django.urls import include
import file_upload.views as file_upload


urlpatterns = [
    path('success/url/', file_upload.success),
    path('upload/', file_upload.success),
    path('file_upload/', include('file_upload.urls')),
    path('admin/', admin.site.urls),
]
