from rest_framework import serializers
from .models import User

class UserlistSerializer(serializers.ModelSerializer):
    """Serializer to map the Model instance into JSON format."""

    class Meta:
        """Meta class to map serializer's fields with the model fields."""
        model = User
        fields = ('id', 'firstname', 'date_created', 'date_modified','username','password')
        read_only_fields = ('date_created', 'date_modified','password')