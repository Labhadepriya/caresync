# view for listing and creating hospitals data in the database
from rest_framework import generics, status
from rest_framework.response import Response
from math import radians, sin, cos, sqrt, atan2
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


class NearbyHospitalAPIView(generics.ListAPIView):
    serializer_class = HospitalSerializer

    def get(self, request, *args, **kwargs):
        latitude = request.query_params.get("latitude")
        longitude = request.query_params.get("longitude")
        radius = request.query_params.get("radius", "10")
        emergency = request.query_params.get("emergency_available")

        if not latitude or not longitude:
            return Response(
                {
                    "error": "latitude and longitude are required"
                },
                status=status.HTTP_400_BAD_REQUEST
            )

        try:
            latitude = float(latitude)
            longitude = float(longitude)
            radius = float(radius)
        except ValueError:
            return Response(
                {
                    "error": "latitude, longitude and radius must be valid numbers"
                },
                status=status.HTTP_400_BAD_REQUEST
            )

        if not -90 <= latitude <= 90:
            return Response(
                {
                    "error": "latitude must be between -90 and 90"
                },
                status=status.HTTP_400_BAD_REQUEST
            )

        if not -180 <= longitude <= 180:
            return Response(
                {
                    "error": "longitude must be between -180 and 180"
                },
                status=status.HTTP_400_BAD_REQUEST
            )

        if radius <= 0:
            return Response(
                {
                    "error": "radius must be greater than 0"
                },
                status=status.HTTP_400_BAD_REQUEST
            )

        hospitals = Hospital.objects.filter(
            is_active=True,
            latitude__isnull=False,
            longitude__isnull=False
        )

        if emergency:
            hospitals = hospitals.filter(
                emergency_available=emergency.lower() == "true"
            )

        results = []

        earth_radius_km = 6371.0

        for hospital in hospitals:
            hospital_latitude = float(hospital.latitude)
            hospital_longitude = float(hospital.longitude)

            lat1 = radians(latitude)
            lon1 = radians(longitude)
            lat2 = radians(hospital_latitude)
            lon2 = radians(hospital_longitude)

            delta_lat = lat2 - lat1
            delta_lon = lon2 - lon1

            a = (
                sin(delta_lat / 2) ** 2
                + cos(lat1)
                * cos(lat2)
                * sin(delta_lon / 2) ** 2
            )

            c = 2 * atan2(sqrt(a), sqrt(1 - a))

            distance_km = earth_radius_km * c

            if distance_km <= radius:
                hospital_data = HospitalSerializer(hospital).data
                hospital_data["distance_km"] = round(distance_km, 2)

                results.append(hospital_data)

        results.sort(key=lambda hospital: hospital["distance_km"])

        return Response(results)