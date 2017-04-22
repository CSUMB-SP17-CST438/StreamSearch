import requests
import certifi

#requests.packages.urllib3.disable_warnings()

key = '265287-CST438St-3WX060Y1'

def get_chatbot_response(data):
    str1 = str.split(str(data))
    if data == "Help":
         message = ({
            'message': 'To get reccomeneded a movie similar to a movie you have seen before type "!movie <movie title>" \n To get Reccomended a TV Show Similar to a show you have watched type "!show <show title>" \n '
        })
    elif str1[0] == "!movie":
        spl = str.split(str(data))
        str2 = "+".join(str(item) for item in spl[1:])
        response = GetRecomendations(str2,key,'5')
        # print response
        m = response
        # print m
        message =  ({
            'message': "ChillBot: I reccomend - " + str(response['Similar']['Results'][0]['Name']) + ", " + str(response['Similar']['Results'][1]['Name']) + ", " + str(response['Similar']['Results'][2]['Name'] + "," + str(response['Similar']['Results'][3]['Name']) + "," + str(response['Similar']['Results'][4]['Name']))
        })
    elif str1[0] == "!show":
        spl = str.split(str(data))
        str2 = "+".join(str(item) for item in spl[1:])
        response = GetRecomendations_shows(str2,key,'5')
        print response
        m = response
        print m
        message =  ({
            'message': "ChillBot: I reccomend - " + str(response['Similar']['Results'][0]['Name']) + ", " + str(response['Similar']['Results'][1]['Name']) + ", " + str(response['Similar']['Results'][2]['Name'] + "," + str(response['Similar']['Results'][3]['Name']) + "," + str(response['Similar']['Results'][4]['Name']))
        })
    else:
            message = ({
            'message': 'Unknown command'
        })

    return message
    
def GetRecomendations(movie,key,n):
    url = 'https://www.tastekid.com/api/similar?q='+ movie+ '&type=movie&limit='+ n + '&k=' + key
    response = requests.get(url)
    return response.json()
    
def GetRecomendations_shows( show,key,n):
    
    url = 'https://www.tastekid.com/api/similar?q='+ show+ '&type=show&limit='+ n + '&k=' + key
    response = requests.get(url)
    return response.json()

def GetRecomendations_info(movie,key,n):
    url = 'https://www.tastekid.com/api/similar?q='+ movie+ '&type=movie&info=1&limit='+ n + '&k=' + key
    response = requests.get(url)
    return response.json()
    

r = GetRecomendations('spiderman',key,'3')
print str(r)