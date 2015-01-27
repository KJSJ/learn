from django.conf.urls import patterns, url, include
from django.views.generic.base import TemplateView
from django.contrib import admin
from django.http import HttpResponse as Response

from rest_framework_nested import routers 

from authentication.views import AccountViewSet,LoginView, LogoutView
from posts.views import AccountPostsViewSet, PostViewSet

router = routers.SimpleRouter()
router.register(r'accounts', AccountViewSet)
router.register(r'posts', PostViewSet)

accounts_router = routers.NestedSimpleRouter(
	router, r'accounts', lookup='accounts'
)

accounts_router.register(r'posts', AccountPostsViewSet)

def abc(request):
	social_user = request.user.social_auth.filter(provider='facebook', user=request.user.id).first()
	print (social_user.extra_data['access_token'])
	print (request.user.username)

	return Response(social_user.extra_data['access_token'])

urlpatterns = patterns(
	'',
  
  	url(r'^admin/', include(admin.site.urls)),

    url(r'^api/v1/', include(router.urls)),

    url(r'^api/v1/', include(accounts_router.urls)),

    url(r'^api/v1/auth/login/$', LoginView.as_view(), name='login'),

    url(r'^api/v1/auth/logout/$', LogoutView.as_view(), name='logout'),

    url(r'^api/v1/testing/', abc, name='abc'),

    url(r'^api/v1/social/', include('social.apps.django_app.urls', namespace='social')),

    # url(r'^sociallogin/', 'fbpage.views.social_register'),

    url(r'^.*$', TemplateView.as_view(template_name='index.html')),

)

