import requests
def GetSummonerData(movie,key,number of requests):
    
    url = "https://" + region + ".api.pvp.net/api/lol/" + region + "/v1.4/summoner/by-name/" + summonerName + "?api_key=" + key
    response = requests.get(url)
    