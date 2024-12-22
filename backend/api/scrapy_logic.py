import requests
import json
def scrape_job_data() :

    headers = {
        'x-api-key': '1YAt0R9wBg4WfsF9VB2778F5CHLAPMVW3WAZcKd8',
    }

    params = {
        'q': 'Software',
        'countryCode2': 'US',
        'radius': '30',
        'radiusUnit': 'mi',
        'page': '1',
        'pageSize': '20',
        'facets': 'employmentType|postedDate|workFromHomeAvailability|workplaceTypes|employerType|easyApply|isRemote|willingToSponsor',
        'filters.workplaceTypes': 'Remote',
        'filters.employmentType': 'CONTRACTS',
        'filters.postedDate': 'ONE',
        'currencyCode': 'USD',
        'fields': 'id|jobId|guid|summary|title|postedDate|modifiedDate|jobLocation.displayName|detailsPageUrl|salary|clientBrandId|companyPageUrl|companyLogoUrl|companyLogoUrlOptimized|positionId|companyName|employmentType|isHighlighted|score|easyApply|employerType|workFromHomeAvailability|workplaceTypes|isRemote|debug|jobMetadata|willingToSponsor',
        'culture': 'en',
        'recommendations': 'true',
        'interactionId': '0',
        'fj': 'true',
        'includeRemote': 'true',
    }

    response = requests.get('https://job-search-api.svc.dhigroupinc.com/v1/dice/jobs/search', params=params, headers=headers)

    if response.status_code == 200:
        data = response.json()
        return data

# print(scrape_job_data())