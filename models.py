import flask_sqlalchemy, app
app.app.config['SQLALCHEMY_DATABASE_URI'] = \
'postgresql://elias:lakers32@localhost/postgres'
db = flask_sqlalchemy.SQLAlchemy(app.app)

class Message(db.Model):
    image = db.Column(db.string(120))
    id = db.Column(db.String(120), primary_key=True) # key
    text = db.Column(db.String(120))

    def __init__(self, t):
        self.text = t

    def __repr__(self): # what's __repr__?
        return '<Message text: %s>' % self.text