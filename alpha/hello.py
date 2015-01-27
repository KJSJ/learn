import facebook
import requests
import json

def some_action(page):
    # """ Here you might want to do something with each post. E.g. grab the
    # post's message (post['message']) or the post's picture (post['picture']).
    # In this implementation we just print the post's created time.
    # """
    print(page['name'] + ' ' + page['id'] )

# def pp(o):
	# print (json.dumps(o, indent=1))

# You'll need an access token here to do anything.  You can get a temporary one
# here: https://developers.facebook.com/tools/explorer/
access_token = 'CAACEdEose0cBAIZCenPJ0pdWAbevWFiUNybEiN6ttQhTfHXPsEQu1Ntu4bzQEV36FFKc6aPDvYAHsmmcCHfHBVlc16ZCMf1keiobZCGM9LoV7fF4KKlANIZClqkvq33q3MZABEzBqt0QMMjgrEuZBLGOuvcNZA6jv32E12ELEILcQLqk0EvS1clLDNTpaa2eKe7SGppyDxvTgzOGjpoqsPy'
# Look at Bill Gates's profile for this example by using his Facebook id.
# user = 'BillGates'

graph = facebook.GraphAPI(access_token, version='2.2')
# profile = graph.get_object(user)
pages = graph.request("search", {'q': ' baju jersey', 'type': 'page'})
# posts = graph.get_connections(profile['id'], 'posts')
# pp(graph.request("search", {'q':'baju jersey','type': 'page'}))

# Wrap this block in a while loop so we can keep paginating requests until
# finished.
while True:
    try:
        # Perform some action on each post in the collection we receive from
        # Facebook.
        [some_action(page=page) for page in pages['data']]
        # Attempt to make a request to the next page of data, if it exists.
        posts = requests.get(pages['paging']['next']).json()
    except KeyError:
        # When there are no more pages (['paging']['next']), break from the
        # loop and end the script.
        break

# import facebook
# import requests
# import json

# ACCESS_TOKEN = 'CAANMJZCvoREIBAH1vd4DBTNEjEnsNUT0mIGmZCtZAnPKn7UlrBTO9kRyalu92fqZCZB59RyCy0MNhNuWX1ZBKC7VsgpoXzQZC8obZAdmD2EdsROWH7NnZC6ZCYZAknkPjpG32ySsUBf8ZCB7RaVkt4YcCEwyr90XfEerOzuMjrZBqu6GgXX908pDXEI1qYzrzbogpoZCbmKebS39RtQylXgIBCgvqtZA0m23ogrTE0ZD'

# base_url = 'https://graph.facebook.com/me'

# fields = 'id,name'

# url = '%s?fields=%s&access_token=%s' % \
# 	(base_url, fields, ACCESS_TOKEN,)

# print (url)

# content = requests.get(url).json()

# print (json.dumps(content, indent=1))