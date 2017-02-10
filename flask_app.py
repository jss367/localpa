from flask import Flask, redirect, jsonify, render_template, request#, url_for
from flask.ext.sqlalchemy import SQLAlchemy
from text_analysis import analyze_text
from text_analysis2 import analyze_text2
import sys

app = Flask(__name__)
app.config["DEBUG"] = True

SQLALCHEMY_DATABASE_URI = "mysql+mysqlconnector://{username}:{password}@{hostname}/{databasename}".format(
    username="sappho",
    password="mysqldbpw0o0o",
    hostname="sappho.mysql.pythonanywhere-services.com",
    databasename="sappho$comments",
)

app.config["SQLALCHEMY_DATABASE_URI"] = SQLALCHEMY_DATABASE_URI
app.config["SQLALCHEMY_POOL_RECYCLE"] = 299

db = SQLAlchemy(app)

class Comment(db.Model):

    __tablename__ = "comments"

    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.String(4096))

@app.route("/", methods=["GET", "POST"])
def index():
    errors = []
    results = {}
    results2 = {}
    verbs = {}
    if request.method == "POST":
        #comment = Comment(content=request.form["contents"])
        #db.session.add(comment)
        #db.session.commit()
        try:
            text = request.form['contents']
        except:
            errors.append(
                "Unable to get URL. Please make sure it's valid and try again."
            )
        #results = analyze_text(text)
        (results, results2, verbs) = analyze_text(text)
    return render_template("main_page.html", errors=errors, results=results, results2=results2, verbs=verbs)

@app.route('/index', methods=['GET', 'POST'])
def new_index():
    errors = []
    results = {}
    results2 = {}
    verbs = {}
    text = "The text is not being found"
    if request.method == "POST":
        try:
            text = request.form['contents']
        except:
            errors.append(
                "Unable to get URL. Please make sure it's valid and try again."
            )
        (results, results2, verbs) = analyze_text2(text)
    return render_template('index.html', errors=errors, results=results, results2=results2, verbs=verbs)


@app.route('/post', methods=['GET', 'POST'])
def post():
    if request.method == "POST":
        return("Jel")
    return render_template('post.html')



@app.route('/return_text')
def add_numbers():
    a = request.args.get('a', 0, type=int)
    b = request.args.get('b', 0, type=int)
    contents = request.args.get('contents', 'notext')
    #return jsonify(result=contents)
    (results, results2, verbs) = analyze_text2(contents)
    #return jsonify({'results': results, 'results2': results2, 'verbs': verbs})
    return render_template('index.html', errors=errors, results=results, results2=results2, verbs=verbs)

@app.route('/analyze', methods=['POST'])
def analyze():
    print('You made it to analyze', file=sys.stderr)
    errors = []
    results = {}
    results2 = {}
    verbs = {}
    #content = request.get_json(silent=True)
    #content2 = request.json
    #content3 = request.get_json()
    content4 = request.form.get('html', '')
    #content5 = request.form['contents']
    #print(content, file=sys.stderr) #These all return "None"
    #print(content2, file=sys.stderr) #Trying to make them return user text
    #print(content3, file=sys.stderr)
    print(content4, file=sys.stderr)
    #print(content5, file=sys.stderr)
    #if request.method == "POST":
    html = request.form.get('html', '')
    print(html, file=sys.stderr)
    text = "The text is not being found"
    print('Hello world!', file=sys.stderr)
    try:
        text = request.form['contents']
    except:
        errors.append(
            "Unable to get URL. Please make sure it's valid and try again."
        )
    (results, results2, verbs) = analyze_text2(content4)
    print(text, file=sys.stderr)
    print(results, file=sys.stderr)
    return jsonify({'results': results, 'results2': results2, 'verbs': verbs})
