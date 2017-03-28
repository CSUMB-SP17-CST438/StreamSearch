import requests
key = '265287-CST438St-1TBZS5L9'
def GetRecomendations(movie,key,n):
    
    url = 'http://www.tastekid.com/api/similar?q='+ movie+ '&type=movie&limit='+ n + '&k=' + key
    response = requests.get(url)
    return response.json()

def GetRecomendations_info(movie,key,n):
    url = 'http://www.tastekid.com/api/similar?q='+ movie+ '&type=movie&info=1&limit='+ n + '&k=' + key
    response = requests.get(url)
    return response.json()
def get_chatbot_response(data):
    if(data[0] == "r"):
        movie = data.replace(" ", "+")
        response = GetRecomendations(movie,key,5)
    if(data[0:1] == "ri"):
        movie = data.replace(" ", "+")
        response = GetRecomendations_info(movie,key,5)
    