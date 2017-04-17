import flask_sqlalchemy
import app

app.app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://streamsearch:password@localhost/postgres'

db = flask_sqlalchemy.SQLAlchemy(app.app);

class UserSearch(db.Model):
    __tablename__ = 'UserSearch'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    uid = db.Column(db.Integer)
    title = db.Column(db.String(120))
    
    def __init__(self, uid, title):
        self.uid = uid
        self.title = title

    def __repr__(self):
        return '<UserSearch title: %s>' % self.title