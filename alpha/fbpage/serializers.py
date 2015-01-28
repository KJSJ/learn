from rest_framework import serializers

from fbpage.models import Pages

class PageSerializer(serializers.ModelSerializer):
	page_ID = serializers.IntegerField(read_only = True , required=False)

	class Meta:
		models = Pages
		fields = ('page_ID','page_name','page_type','page_likes','page_location','page_description','page_URL','keyword')
		read_only_fields = ('page_ID')

