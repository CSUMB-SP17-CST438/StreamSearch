import flask
import os
import random

app = flask.Flask(__name__)

@app.route('/')
def index():
    #print "this is a debug statement!"
    return "<b>Hello, world!</b>"
    
@app.route('/template')
def temp():
   return flask.render_template("template.html")

    
    
@app.route('/random')
def randNum():
    #print "now on random page"
    r = random.randint(1, 100)
    return flask.render_template("random.html",r = str(r))


app.run(
 port=int(os.getenv('PORT', 8080)),
 host=os.getenv('IP', '0.0.0.0'),
 debug = True
)

