#  view for listing and creating hospitals data in the database
from rest_framework import generics
from .models import Hospital
from .serializers import HospitalSerializer


class HospitalListCreateAPIView(generics.ListCreateAPIView):
    queryset = Hospital.objects.filter(is_active=True)
    serializer_class = HospitalSerializer

class HospitalDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Hospital.objects.all()
    serializer_class = HospitalSerializer
    http_method_names = ["get", "put", "patch", "head", "options"]