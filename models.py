import flask_sqlalchemy, app, os

#app.app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://admin:admin@localhost/postgres'
app.app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL')
db = flask_sqlalchemy.SQLAlchemy(app.app)

class Clicks(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.String(50))
    type = db.Column(db.String(40))
    title = db.Column(db.String(120))
    title_id = db.Column(db.String(50))
    
    def __init__(self, i, ty, ti, tiid):
        self.user_id = str(i)
        self.type = ty
        self.title = ti
        self.title_id = str(tiid)
    
    def __repr__(self): # what's __repr__?
        return '%f' % self.user_id + '|><|%s' % self.title