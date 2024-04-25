import json
from flask import Flask, jsonify, request
from flask_cors import CORS
from functions import extractCSV, excel, authentication

app = Flask(__name__)
CORS(app)

@app.errorhandler(Exception)
def handle_exception(e):
    return 'Ocorreu um erro interno.', 500


@app.route("/",  methods=["GET"])
def printer_view():
  return "<h1>Printer View</h1>"


@app.route("/getDataframe", methods=["GET"])
def get_dataframe():
  authorization = request.headers.get('Authorization')
  user = authentication.validateLogin(authorization)
  #Argumentos de paramêtro
  ano = request.args.get('ano')
  mes = request.args.get('mes')
  #Dataframe
  if user is not None:
    try:
      response = extractCSV.to_dataframe(ano, mes)
      return response
    except FileNotFoundError:
      return jsonify({"message": "O arquivo CSV para o ano e mês especificados não pôde ser encontrado."}), 404
  else:
    return jsonify({"message": "Unauthorized"}), 401



@app.route("/getDataframe/download", methods=["GET"])
def download_dataframe():
  authorization = request.headers.get('Authorization')
  user = authentication.validateLogin(authorization)
  #Argumentos de paramêtro
  ano = request.args.get('ano')
  mes = request.args.get('mes')
  if user is not None:
    try:
      response = excel.download_excel(ano, mes)
      return response
    except FileNotFoundError:
      return jsonify({"message": "O arquivo CSV para o ano e mês especificados não pôde ser encontrado."}), 404
  else:
    return jsonify({"message": "Unauthorized"}), 401


@app.route("/login", methods=["GET"])
def handle_authentication():
  username = request.args.get('username')
  passwd = request.args.get('password')
  response = authentication.handleLogin(username, passwd)
  return response

@app.route("/getUser", methods=["GET"])
def getUser():
  authorization = request.headers.get("Authorization")
  if(authorization == None):
      return 401
  else:
    response = authentication.validateLogin(authorization)
    return jsonify(response)

if __name__ == "__main__":
    app.run()
    # from waitress import serve
    # serve(app, host="0.0.0.0", port=5000)