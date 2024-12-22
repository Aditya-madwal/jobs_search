from django.urls import path
from .views import *

urlpatterns = [
    path('', JobListView.as_view(), name='job-list'),
    path('create/', JobListView.as_view(), name='job-create'),
    path('scrape/', ScrapyJobs.as_view(), name='jobs-scrape'),
    path('search/', JobSearch.as_view(), name='jobs-search'),
]
