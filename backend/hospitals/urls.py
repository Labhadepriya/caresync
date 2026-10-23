
from django.urls import path
from .views import( HospitalListCreateAPIView,HospitalDetailAPIView,NearbyHospitalAPIView,)

urlpatterns = [
    path(
        "",
        HospitalListCreateAPIView.as_view(),
        name="hospital-list-create",
    ),
    path(
            "nearby/",
            NearbyHospitalAPIView.as_view(),
            name="hospital-nearby",
        ),
    path(
        "<int:pk>/",
        HospitalDetailAPIView.as_view(),
        name="hospital-detail",
    ),
    
]
