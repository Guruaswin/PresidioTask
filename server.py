from tkinter.tix import Select
from flask import Flask, jsonify, request, render_template
import sqlite3

conn = sqlite3.connect("database.sqlite3", check_same_thread=False)
cursor = conn.cursor()
app = Flask(__name__)

SELECT_QUERY = "select * from quiz"

def executeQuery(query):
    cursor.execute(query)
    conn.commit()

@app.route('/')
def index():
    return  render_template("index.html")

@app.route("/admin")
def admin():
    return render_template("admin.html")

@app.route("/user")
def user():
    return render_template("user.html")

@app.route("/signup", methods=["POST"])
def signup():
    d = dict(request.form)
    data = {"status":200}
    query = "INSERT INTO users VALUES ('%s', '%s')"%(d["username"], d["password"])
    executeQuery(query)
    return jsonify(data)

@app.route("/login", methods=["POST"])
def login():
    d = dict(request.form)
    query = "SELECT * FROM users WHERE username='%s' AND password='%s'"%(d["username"], d["password"])
    executeQuery(query)
    responseData = {"data":cursor.fetchall()}
    data = {"status":200 if len(responseData["data"]) == 1 else 404}
    return jsonify(data)

@app.route("/submitQuestions", methods=["POST"])
def storeQuestions():
    questions = request.json
    for question in questions:
        query = "INSERT INTO quiz (question, option1, option2, option3, answer) VALUES ('%s', '%s', '%s', '%s', %d)"%(question["question"], question["option1"], question["option2"], question["option3"], question["answer"])
        executeQuery(query)
    return jsonify({"status":200})

@app.route("/getQuestions", methods=["GET"])
def getQuestions():
    query = "SELECT question, option1, option2, option3 FROM quiz";
    executeQuery(query)
    responseData = {"data":cursor.fetchall(), "status":200}
    return jsonify(responseData);

app.run(debug=True)