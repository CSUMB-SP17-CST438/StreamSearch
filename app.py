import os
import flask
import flask_socketio
import requests

app = flask.Flask(__name__)
socketio = flask_socketio.SocketIO(app)

#Guidebox API Key c338d925a0672acf243133ddc1d5d66fb0191391
@socketio.on('connect')
def on_connect():
    test()
    
def test():
    socketio.emit('hello to client', {
        'message': 'Hey there!'
    })
    
@app.route('/')
def hello():
    return flask.render_template('index.html')
    
if __name__ == '__main__':
    socketio.run(
        app,
        host=os.getenv('IP', '0.0.0.0'),
        port=int(os.getenv('PORT', 8080)),
        debug=True
    )

