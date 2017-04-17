import os
import flask
import flask_socketio
import flask_sqlalchemy
import requests
from flask import Flask, render_template
from flask_socketio import SocketIO
import chill
import models

app = flask.Flask(__name__)

socketio = flask_socketio.SocketIO(app)

# URI scheme:
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://streamsearch:password@localhost/postgres'

db = flask_sqlalchemy.SQLAlchemy(app)


messages = []
#Guidebox API Key c338d925a0672acf243133ddc1d5d66fb0191391
#http://api-public.guidebox.com/v1.43/ {region} / {api key}
@app.route('/')
def hello():
    #response = requests.get('http://api-public.guidebox.com/v2/movies?api_key=c338d925a0672acf243133ddc1d5d66fb0191391')
    #response = requests.get('http://api-public.guidebox.com/v2/search?api_key=c338d925a0672acf243133ddc1d5d66fb0191391&type=show&field=title&query=fresh');
    #response = requests.get('http://api-public.guidebox.com/v2/shows?api_key=c338d925a0672acf243133ddc1d5d66fb0191391')
    #response = requests.get('http://api-public.guidebox.com/v2/shows/6959/episodes?api_key=c338d925a0672acf243133ddc1d5d66fb0191391&include_links=true ')
    #json_body = response.json()
    #total = json_body['total_results']
    #result1 = json_body['results'][1]
    #print result1
    #print json_body
    return flask.render_template('index.html')
   
@app.route('/shows')
def hello2():
    return flask.render_template('index.html')

@app.route('/movies')
def hello3():
    return flask.render_template('index.html')

@socketio.on('connect')
def on_connect():
    print('Client connected')
    
@socketio.on('disconnect')
def test_disconnect():
    print('Client disconnected')
@socketio.on('login')
def get_token(data):
    print(data['token'])
    
@socketio.on('new message')
def on_new_message(data):
    
    print data['message']
    messages.append({
                    'message': "got your message: " + data['message']
                })
    mes = chill.get_chatbot_response(data['message'])
    print mes
    messages.append(str(mes))
    socketio.emit('all messages',{'messages': messages})
    print "done"
    
    
@socketio.on('search1')
def onSearch(data):
    print data
    print "here"
 
if __name__ == '__main__':
    socketio.run(
        app,
        host=os.getenv('IP', '0.0.0.0'),
        port=int(os.getenv('PORT', 8080)),
        debug=True
    )

