# view for listing and creating hospitals data in the database
from rest_framework import generics
from .models import Hospital
from .serializers import HospitalSerializer


class HospitalListCreateAPIView(generics.ListCreateAPIView):
    serializer_class = HospitalSerializer

    def get_queryset(self):
        queryset = Hospital.objects.filter(is_active=True)

        city = self.request.query_params.get("city")
        state = self.request.query_params.get("state")
        emergency = self.request.query_params.get("emergency_available")

        if city:
            queryset = queryset.filter(city__icontains=city)

        if state:
            queryset = queryset.filter(state__icontains=state)

        if emergency:
            queryset = queryset.filter(
                emergency_available=emergency.lower() == "true"
            )

        return queryset


class HospitalDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Hospital.objects.all()
    serializer_class = HospitalSerializer
    http_method_names = ["get", "put", "patch", "head", "options"]