import requests
import certifi

key = '265287-CST438St-1TBZS5L9'

def get_chatbot_response(data):
    str1 = str.split(str(data))
    if data == "Help":
         message = ({
            'message': 'To get reccomeneded a movie similar to a movie you have seen before type "Rec_movie <movie title> \n To get Reccomended a TV Show Similar to a show you have watched type "Rec_Show <show title> \n '
        })
    elif str1[0] == "Rec_movie":
        spl = str.split(str(data))
        str2 = "+".join(str(item) for item in spl[1:])
        response = GetRecomendations(str2,key,'3')
        # print response
        m = response
        # print m
        message =  ({
            'message': "dank2"
        })
    elif str1[0] == "Rec_show":
        spl = str.split(str(data))
        str2 = "+".join(str(item) for item in spl[1:])
        response = GetRecomendations_shows(str2,key,'3')
        print response
        m = response
        print m
        message =  ({
            'message': "dank"
        })
    else:
            message = ({
            'message': 'Unknown command'
        })

    return message
    
def GetRecomendations(movie,key,n):
    
    url = 'http://www.tastekid.com/api/similar?q='+ movie+ '&type=movie&limit='+ n + '&k=' + key
    response = requests.get(url)
    return response.json()
    
def GetRecomendations_shows( show,key,n):
    
    url = 'http://www.tastekid.com/api/similar?q='+ show+ '&type=show&limit='+ n + '&k=' + key
    response = requests.get(url,verify=False)
    return response.json()

def GetRecomendations_info(movie,key,n):
    url = 'http://www.tastekid.com/api/similar?q='+ movie+ '&type=movie&info=1&limit='+ n + '&k=' + key
    response = requests.get(url,verify=False)
    return response.json()
    

r = GetRecomendations('spiderman',key,'3')
print str(r)