from django.db import models

from authentication.models import Account

# Create your models here.
RECOMMENDED = (('G','Good'),('B','Bad'),)

class Post(models.Model):
	author = models.ForeignKey(Account)
	review = models.TextField()
	recommend_status = models.CharField(max_length=1, choices=RECOMMENDED , default='G', null=True)	

	created_at = models.DateTimeField(auto_now_add=True)
	updated_at = models.DateTimeField(auto_now=True)

	def __unicode__(self):
		return '{0}'.format(self.content)