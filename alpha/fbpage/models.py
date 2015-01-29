from django.db import models

# Create your models here.
class Pages(models.Model):
	page_ID = models.IntegerField(unique=True)
	spam = models.BooleanField(default=False)
	# page_name = models.TextField()
	# page_type = models.TextField()
	# page_location = models.TextField()
	# page_description = models.TextField()
	# page_likes = models.IntegerField()
	# page_URL = models.URLField()
	# keyword = models.TextField()

	def __str__(self):
		return str(self.page_ID)
