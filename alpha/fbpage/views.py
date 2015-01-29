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
		print (tempo.decode())
		print (type(tempo.decode()))
		# print (json.loads(tempo.decode()))
		# print (request.body)
		data = tempo.decode()

		keyword = tempo.decode()
		print (keyword) #print user input

		token = request.user.access_token
		print (token) #print user access token
		graph = facebook.GraphAPI(token, version='2.2')
		pagequery = graph.request("search",{'q': keyword,'type':'page'})
		result = pagequery['data']

		result = result[:18] if len(result) > 18 else result
		
		new_results = []
		base_url = 'https://graph.facebook.com/'
		counter = 0
		for index, data in enumerate(result):
			pageID = data['id']
			# print (pageID)
			url = base_url + pageID
			content = requests.get(url).json()
			if content.get('error'):
				pass
			elif Pages.objects.all().filter(page_ID=pageID, spam=True): 
				pass
			else:
				new_results.append(content)
				Pages.objects.get_or_create(page_ID=pageID)
				counter +=1
				if counter >= 9:
					break
			
		with open('test.json','w',encoding='utf-8') as io:
			json.dump(new_results, io, indent=4)


		ctxdict = {}
		i = [j for j in range(26)]		
		l = len(i)
		first_col, second_col, third_col = [],[],[]
		for index, item in enumerate(new_results):
			if index %3 == 0:
				first_col.append(item)
			elif index % 3 == 1:
				second_col.append(item)
			else:
				third_col.append(item)
		ctxdict['first_col'] = first_col
		ctxdict['second_col'] = second_col
		ctxdict['third_col'] = third_col


		return Response(ctxdict)

	def put(self, request, format=None):

		tempo = request.body
		data = tempo.decode()

		id = data
		page_ID = id
		base_url = 'https://graph.facebook.com/'
		url = base_url + id
		content = requests.get(url).json()

		return Response(content)		