import os
import flask
import flask_socketio
import requests
from flask import Flask, render_template
from flask_socketio import SocketIO
import chill
import certifi
import facebook
import flask_sqlalchemy
import psycopg2

try:
    conn = psycopg2.connect("dbname='postgres' user='admin' host='localhost' password='admin'")
except:
    print "I am unable to connect to the database"

import requests

app = flask.Flask(__name__)

import models
socketio = flask_socketio.SocketIO(app)
messages = []
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL')
db = flask_sqlalchemy.SQLAlchemy(app)
#Guidebox API Key c338d925a0672acf243133ddc1d5d66fb0191391
#http://api-public.guidebox.com/v1.43/ {region} / {api key}
@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def catch_all(path):
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
    print("user = " + data['token'])
    
@socketio.on('token')
def get_token1(data):
    print("user = " + data['facebook_user_token'])
    
@socketio.on('friends')
def get_friends(data):
    global conn
    graph = facebook.GraphAPI(data['fb_access_token'])
    friends = graph.get_object("me/friends")
    
    all_movies = []
    all_friends = []
    active_friends = []
    active_IDs = []
    for friend in friends['data']:
        print ""
        print friend
        cur = conn.cursor()
        cur.execute("""SELECT * FROM Clicks WHERE user_id = '""" + str(friend['id']) + "'")
        records = cur.fetchall();
        all_movies = {friend['id']: []};
        movies = [];
        for row in records:
            movies.append(row[3])
            print "   ", row[1], "   ", row[2]
        movies.append("test");
        movies.append("test");
        movies.append("test");
        all_movies = {friend['id']: movies}
        active_friends.append("{0}".format(friend['name'].encode('utf-8')))
        active_IDs.append(friend['id'])
        all_friends.append({'names': active_friends, 'IDs': active_IDs})
    print active_friends
    
    socketio.emit('friendsList', {'friends': all_friends,
                                  'all_movies': all_movies
    })
    
@socketio.on('onClick')
def get_Click(data):
    print ""
    print str(data['user_id']) + " is clicking " + str(data['title'])
    print ""
    #graph = facebook.GraphAPI(data['fb_access_token'])
    #friends = graph.get_object("me/friends")
    newRecord = models.Clicks(data['user_id'], data['type'], data['title'], data['title_id'])
    #newRecord = models.Clicks(123, "test", "test", 123)
    db.session.add(newRecord)
    db.session.commit()
    active_friends = []
    #for friend in friends['data']:
    #    active_friends.append("{0}".format(friend['name'].encode('utf-8')))
    #print active_friends
    
#    socketio.emit('friendsList', {'friends': active_friends})
    
@socketio.on('new message')
def on_new_message(data):
    
    print data['message']
    messages.append({
                    'message': "Me: " + data['message']
                })
    socketio.emit('all messages',{'messages': messages})
    mes = chill.get_chatbot_response(data['message'])
    print mes
    messages.append({
                    'message': str(mes['message'])
                })

    socketio.emit('all messages',{'messages': messages})
    print "done"
    
    
@socketio.on('search1')
def onSearch(data):
    #print data
    #print "here"
    print ""

 
if __name__ == '__main__':
    socketio.run(
        app,
        host=os.getenv('IP', '0.0.0.0'),
        port=int(os.getenv('PORT', 8080)),
        debug=True
    )