from django.db import models

# Create your models here.

class Job(models.Model):
    job_id = models.CharField(max_length=100, unique=True)
    title = models.CharField(max_length=255)
    location = models.CharField(max_length=255)
    company_name = models.CharField(max_length=255)
    company_page_url = models.URLField(null=True, blank=True)
    company_logo_url = models.URLField(null=True, blank=True)
    company_logo_image = models.ImageField(null=True, blank=True, upload_to="logos")
    employment_type = models.CharField(max_length=50)
    salary = models.CharField(max_length=100, null=True, blank=True)
    summary = models.TextField(null=True, blank=True)
    details_page_url = models.URLField(null=True, blank=True)
    is_remote = models.BooleanField(default=False)
    easy_apply = models.BooleanField(default=False)
    posted_date = models.DateTimeField()
    modified_date = models.DateTimeField()

    def __str__(self):
        return f"{self.title}"

