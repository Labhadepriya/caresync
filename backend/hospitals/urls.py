
from django.urls import path
from .views import( HospitalListCreateAPIView,
                   HospitalDetailAPIView,
                   NearbyHospitalAPIView, 
                   DoctorListCreateAPIView, 
                   DoctorDetailAPIView,)

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
    path("doctors/", 
         DoctorListCreateAPIView.as_view(), 
         name="doctor-list-create"
         ),
    path(
        "doctors/<int:pk>/",
        DoctorDetailAPIView.as_view(),
        name="doctor-detail"
    ),
    path(
        "<int:pk>/",
        HospitalDetailAPIView.as_view(),
        name="hospital-detail",
    ),
    
]
