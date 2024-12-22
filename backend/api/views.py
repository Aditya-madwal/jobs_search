from rest_framework.views import APIView
from rest_framework.response import Response
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from .models import Job
import datetime
from .serializers import JobSerializer
from rest_framework import status
from .scrapy_logic import scrape_job_data
from django.db.models import Q

class JobListView(APIView):
    def get(self, request):
        jobs = Job.objects.all()
        page = request.query_params.get('page', 1)


        paginator = Paginator(jobs, 5)

        try:
            paginated_jobs = paginator.page(page)
        except PageNotAnInteger:
            paginated_jobs = paginator.page(1)
        except EmptyPage:
            paginated_jobs = []

        serializer = JobSerializer(paginated_jobs, many=True)

        if page == "all" :
            return Response(JobSerializer(jobs, many=True).data)

        return Response({
            "count": paginator.count,
            "num_pages": paginator.num_pages,
            "current_page": int(page),
            "next_page": paginated_jobs.next_page_number() if paginated_jobs.has_next() else None,
            "previous_page": paginated_jobs.previous_page_number() if paginated_jobs.has_previous() else None,
            "results": serializer.data
        })

    def post(self, request):
        print(request.data)
        serializer = JobSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

class JobSearch(APIView) :
    def get(self, request) :
        search_query = request.query_params.get("search", None)

        if search_query:
            jobs = Job.objects.filter(Q(title__icontains=search_query))
        else:
            jobs = Job.objects.all()

        serializer = JobSerializer(jobs, many=True)

        return Response({
            "count": jobs.count(),
            "results": serializer.data
        })


class ScrapyJobs(APIView) :
    def post(self, request) :
        job_data = scrape_job_data()
        save_jobs_from_json(job_data)
        return Response(job_data)

def save_jobs_from_json(data):
    for job in data.get('data', []):
        try:
            job_id = job.get('id')
            title = job.get('title')
            location = job.get('jobLocation', {}).get('displayName', '')
            company_name = job.get('companyName', '')
            company_page_url = job.get('companyPageUrl', '')
            company_logo_url = job.get('companyLogoUrl', '')
            employment_type = job.get('employmentType', '')
            salary = job.get('salary', '')
            summary = job.get('summary', '')
            details_page_url = job.get('detailsPageUrl', '')
            is_remote = job.get('isRemote', False)
            easy_apply = job.get('easyApply', False)
            posted_date = job.get('postedDate', '')
            modified_date = job.get('modifiedDate', '')

            posted_date = datetime.datetime.fromisoformat(posted_date.replace('Z', ''))
            modified_date = datetime.datetime.fromisoformat(modified_date.replace('Z', ''))

            if not Job.objects.filter(job_id=job_id).exists():
                Job.objects.create(
                    job_id=job_id,
                    title=title,
                    location=location,
                    company_name=company_name,
                    company_page_url=company_page_url,
                    company_logo_url=company_logo_url,
                    employment_type=employment_type,
                    salary=salary,
                    summary=summary,
                    details_page_url=details_page_url,
                    is_remote=is_remote,
                    easy_apply=easy_apply,
                    posted_date=posted_date,
                    modified_date=modified_date,
                )

        except Exception as e:
            print(f"Error saving job {job.get('id')}: {e}")
    

