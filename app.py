import os
import flask
import flask_socketio
import requests
from flask import Flask, render_template
from flask_socketio import SocketIO

app = flask.Flask(__name__)
socketio = flask_socketio.SocketIO(app)

#Guidebox API Key c338d925a0672acf243133ddc1d5d66fb0191391
@app.route('/')
def hello():
    return flask.render_template('index.html')
   
@socketio.on('connect')
def on_connect():
    print('Client connected')
    
@socketio.on('disconnect')
def test_disconnect():
    print('Client disconnected')
    
 
if __name__ == '__main__':
    socketio.run(
        app,
        host=os.getenv('IP', '0.0.0.0'),
        port=int(os.getenv('PORT', 8080)),
        debug=True
    )

