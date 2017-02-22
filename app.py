import os
import flask
import flask_socketio
import requests
import random

app = flask.Flask(__name__)
socketio = flask_socketio.SocketIO(app)

@app.route('/')
def hello():
    return flask.render_template('index.html')
all_users = []
userCount = 0
@socketio.on('connect')
def on_connect():
    global userCount
    userCount +=1
   
    
@socketio.on('disconnect')
def on_disconnect(data):
    global userCount
    userCount -=1
    response = requests.get('https://graph.facebook.com/v2.8/me?fields=id%2Cname%2Cpicture&access_token=' + data['facebook_user_token'])
    json = response.json()
    if data['facebook_user_token'] != '':
        
        all_mah_numbers.append({
                'name': 'ChickenBot_version '+ str(chickenBotVer),
                'picture': 'https://cdn4.iconfinder.com/data/icons/social-productivity-line-art-5/128/chatbot-128.png',
                'number': json['name'] + "has disconnected"
            })
    
    

all_mah_numbers = []
chickenBotVer = 1
@socketio.on('new number')
def on_new_number(data):
    response = requests.get('https://graph.facebook.com/v2.8/me?fields=id%2Cname%2Cpicture&access_token=' + data['facebook_user_token'])
    json = response.json()
    
    if data['facebook_user_token'] != '':
        all_mah_numbers.append({
            'name': json['name'],
            'picture': json['picture']['data']['url'],
            'number': data['number']
        })
    elif data['facebook_user_token'] == '' :
        response2 = requests.get('https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=' + data['google_user_token'])
        json2 = response2.json()
        all_mah_numbers.append({
            'name': json2['name'],
            'picture': json2['picture'],
            'number': data['number']
        })
    socketio.emit('all numbers', {'numbers': all_mah_numbers})
    botCheck = data['number']
    botHelp = '!! help'
    botAbout= '!! about'
    botSay = '!! say'
    botJoke = '!! joke'
    botCross = '!! cross'
    if botCheck[0:7] == botHelp:
        global chickenBotVer
        all_mah_numbers.append({
            'name': 'ChickenBot '+ str(chickenBotVer),
            'picture': 'https://cdn4.iconfinder.com/data/icons/social-productivity-line-art-5/128/chatbot-128.png',
            'number': 'Commands: !! help(help message) !! about(about the chatroom) !! say (make me say something: ex!! say <something>) !! joke (I will tell a joke) and !! cross(make me cross the road)'
        })
    elif botCheck[0:6] == botSay:
        global chickenBotVer
        word = botCheck
        all_mah_numbers.append({
            'name': 'ChickenBot_version '+ str(chickenBotVer),
            'picture': 'https://cdn4.iconfinder.com/data/icons/social-productivity-line-art-5/128/chatbot-128.png',
            'number': word[6:]
        })
    elif botCheck[0:8] == botAbout:
        global chickenBotVer
        all_mah_numbers.append({
            'name': 'ChickenBot'+ str(chickenBotVer),
            'picture': 'https://cdn4.iconfinder.com/data/icons/social-productivity-line-art-5/128/chatbot-128.png',
            'number': "hello This is chicken bots chatroom, please do not kick me. This app is used for chatting and stuff I guess, Please refer to this github link for more info: "
        })
    elif botCheck[0:7] == botJoke:
        global chickenBotVer
        jokes = ['guess what...chickenBot','why did chickenBot cross the road? because chickenBots road crossing function was invoked.','what do you call a fake noodle? An impasta!',
        'What did one plate say to the other?.... Lunch is on me.','Why did the hipster fall in the lake?.....He went ice skating before it was cool.',
        'Why can\'t you trust atoms?....Because they make up everything!']
        
        all_mah_numbers.append({
            'name': 'ChickenBot_Version ' + str(chickenBotVer),
            'picture': 'https://cdn4.iconfinder.com/data/icons/social-productivity-line-art-5/128/chatbot-128.png',
            'number': random.choice(jokes)
        })
    elif botCheck[0:8] == botCross:
        global chickenBotVer
        r = random.randint(0,1)
        string = ''
        if r == 1:
            string = "ChickenBot made it across safely"
        else:
            string = "I hope you are happy...ChickenBot has perished and I have taken his place"
            chickenBotVer +=1
            
        all_mah_numbers.append({
            'name': 'ChickenBot_Version ' + str(chickenBotVer),
            'picture': 'https://cdn4.iconfinder.com/data/icons/social-productivity-line-art-5/128/chatbot-128.png',
            'number': string
        })
    elif botCheck[0:2] == '!!' and botCheck[0:8] != botCross and botCheck[0:7] != botJoke and botCheck[0:8] != botAbout and botCheck[0:6] != botSay and botCheck[0:7] != botHelp:
        global chickenBotVer
        all_mah_numbers.append({
            'name': 'ChickenBot_Version ' + str(chickenBotVer),
            'picture': 'https://cdn4.iconfinder.com/data/icons/social-productivity-line-art-5/128/chatbot-128.png',
            'number': "unknown command: " + botCheck
        })
    socketio.emit('all numbers', {'numbers': all_mah_numbers})
socketio.run(
    app,
    host=os.getenv('IP', '0.0.0.0'),
    port=int(os.getenv('PORT', 8080)),
    debug=True
)

