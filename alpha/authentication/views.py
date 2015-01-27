import facebook
import requests
import json

from django.contrib.auth import authenticate, login ,logout
# from django.views.decorator.csrf import csrf_exempt
# from django.http im port HttpResponse as Response

from social.apps.django_app.utils import strategy, psa

from rest_framework import permissions, viewsets , status, views
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes

from authentication.models import Account
from authentication.permissions import IsAccountOwner
from authentication.serializers import AccountSerializer

# Create your views here.
class AccountViewSet(viewsets.ModelViewSet):
	lookup_field = 'username'
	queryset = Account.objects.all()
	serializer_class = AccountSerializer

	def get_permissions(self):
		if self.request.method in permissions.SAFE_METHODS:
			return (permissions.AllowAny(),)

		if self.request.method == 'POST':
			return (permissions.AllowAny(),)

		return (permissions.IsAuthenticated(), IsAccountOwner(),)

	def create(self, request):
		serializer = self.serializer_class(data=request.data)

		if serializer.is_valid():
			Account.objects.create_user(**serializer.validated_data)

			return Response(serializer.validated_data, status=status.HTTP_201_CREATED)
		return Response({
			'status': 'Bad request',
			'message': 'Account could not be created with received data.'
			}, status=status.HTTP_400_BAD_REQUEST)

class LoginView(views.APIView):
	def post(self, request, format=None):
		
		tempo = request.body
		data = json.loads(tempo.decode())

		email = data.get('email',None)
		password = data.get('password', None)

		account = authenticate(email=email, password=password)

		if account is not None:
			if account.is_active:
				login(request, account)

				serialized = AccountSerializer(account)

				return Response(serialized.data)
			else:
				return Response({
					'status': 'Unauthorized',
					'message': 'This account has been disabled.'
					}, status=status.HTTP_401_UNAUTHORIZED)
		else:
			return Response({
				'status': 'Unauthorized',
				'message': 'Username/password combination invalid.'
				}, status=status.HTTP_401_UNAUTHORIZED)

		# def testprint(page):
		# 	print(page['name']+ ' '+ page['id'])

		# social_user = request.user.social_auth.filter(provider='facebook',).first() 
		
		# graph = facebook.GraphAPI(access_token, version='2.2')

		# token = social_user.extra_data['access_token']
		
		# pages = graph.request("search", {'q': 'baju jersey', 'type': 'page'})

		# if social_user:
		# 	testprint(page=pages)
		# 	return response(a);

class LogoutView(views.APIView):
	permission_classes = (permissions.IsAuthenticated,)

	def post(self, request, format=None):
		logout(request)

		return Response({}, status=status.HTTP_204_NO_CONTENT)

# @strategy()
# def auth_by_token(request, backend):
# 	user = request.user
# 	user = backend.do_auth(
# 		access_token = request.DATA.get('access_token'),
# 		user = user.is_authenticated() and user or None
# 		)
# 	if user and user.is_active
# 		return user
# 	else:
# 		return None

# @csrf_exempt
# @api_view(['POST'])
# @permission_classes((permissions.AllowAny,))
# @psa('social:complete')
# def social_register(request):
# 	# This view expects an access_token GET parameter, if it's needed,
#     # request.backend and request.strategy will be loaded with the current
#     # backend and strategy.
# 	auth_token = request.GET.get('access_token')
# 	user = request.backend.do_auth(request.GET.get('access_token'))
# 	if user:
# 		login(request, user)
# 		return Response('User Logged in', status = status.HTTP_200_OK)
# 	else:
# 		return Response('Bad Credentials', status = status.HTTP_403_FORBIDDEN)