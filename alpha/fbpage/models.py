from django.db import models

# Create your models here.
class Pages(models.Model):
	page_Name = models.TextField()
	page_type = models.TextField()
	page_Location = models.TextField()
	page_Description = models.TextField()
	page_Likes = models.IntegerField()
	page_URL = models.URLField()

	def __unicode__(self):
		return self.page_Name
