import os
import flask
import flask_socketio
import requests
from flask import Flask, render_template
from flask_socketio import SocketIO

app = flask.Flask(__name__)
socketio = flask_socketio.SocketIO(app)

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
   
@socketio.on('connect')
def on_connect():
    print('Client connected')
    
@socketio.on('disconnect')
def test_disconnect():
    print('Client disconnected')

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

