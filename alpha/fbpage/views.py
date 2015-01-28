import facebook
import requests
import json

from django.shortcuts import render

from rest_framework import permissions
from rest_framework.views import APIView
from rest_framework.decorators import api_view
from rest_framework.response import Response

from fbpage.models import Pages
from fbpage.serializers import PageSerializer

from authentication.models import Account

class PageView(APIView):

	# def get(self, request):
	# 	request.user.

	def post(self, request,format=None):
		tempo = request.body
		data = json.loads(tempo.decode())

		keyword = data.get('keyword', None)

		token = request.user.access_token
		graph = facebook.GraphAPI(token, version='2.2')
		pagequery = graph.request("search",{'q': keyword,'type':'page'})

		print (pagequery['name'])
		
		return Response(pagequery)


	# def some_action(page):
	#     print(page['name','id'] + ' ' + page['id'] )

	# def pp(o):
	# 	print json.dumps(o, indent=1)
	# g = facebook.GraphAPI(ACCESS_TOKEN)

	# social = user.social_auth.get(provider='facebook')
	# ACCESS_TOKEN = social.extra_data['access_token']

	# graph = facebook.GraphAPI['ACCESS_TOKEN']

	# serializer_class = PageSerializer





# class PageViewSet(viewsets.APIView):
# 	@strategy()
# 	def auth_by_token(request, backend):
# 		backend = request.strategy.backend
# 		user=request.user
# 		user = backend.do_auth(
# 			access_token=request.DATA.get('access_token'),
# 			user=user.is_authenticated() and user or None
# 			)
# 		if user and user.is_active:
# 			return user# Return anything that makes sense here
# 		else:
# 			return None
	                
# 	@csrf_exempt
# 	@api_view(['POST'])
# 	@permission_classes((permissions.AllowAny,))
# 	def social_register(request):
# 		auth_token = request.DATA.get('access_token', None)
# 		backend = request.DATA.get('backend', None)
# 		if auth_token and backend:
# 			try:
# 				user = auth_by_token(request, backend)
# 			except getopt.GetoptError as err:
# 				return Response(str(err), status=400)
# 			if user:
# 				strategy = load_strategy(request=request, backend=backend)
# 				_do_login(strategy, user)
# 				return Response( "User logged in", status=status.HTTP_200_OK )
# 			else:
# 				return Response("Bad Credentials", status=403)
# 		else:
# 			return Response("Bad request", status=400)
