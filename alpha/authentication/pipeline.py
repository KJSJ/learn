from authentication.models import Account

from requests import request, HTTPError

from django.core.files.base import ContentFile

def get_profile_picture(backend, user, response, details, is_new=False, *args, **kwargs):

 	profile = Account.objects.get_or_create(email = user.email, username = user.username, profile_picture = user.profile_picture, access_token=user.access_token)[0]
 	if backend.name == 'facebook':
 		profile.profile_picture = 'http://graph.facebook.com/{0}/picture?'.format(response['id'])
 		profile.access_token = response.get('access_token')
 	profile.save()