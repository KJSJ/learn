from django.db import models

# Create your models here.
class Pages(models.Model):
	page_ID = models.IntegerField(unique=True)
	page_name = models.TextField()
	page_type = models.TextField()
	page_location = models.TextField()
	page_description = models.TextField()
	page_likes = models.IntegerField()
	page_URL = models.URLField()
	keyword = models.TextField()

	def __unicode__(self):
		return self.page_ID
