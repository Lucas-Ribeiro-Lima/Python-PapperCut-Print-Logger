from flask import Flask, request
from flask_cors import CORS
from functions import extractCSV, excel, authentication

app = Flask(__name__)
CORS(app)

@app.route("/",  methods=["GET"])
def printer_view():
  return "<h1>Printer View</h1>"


@app.route("/getDataframe", methods=["GET"])
def get_dataframe():
  authorization = request.headers.get('Authorization')
  authentication.validateLogin(authorization)
  #Argumentos de paramêtro
  ano = request.args.get('ano')
  mes = request.args.get('mes')
  #Dataframe
  response = extractCSV.to_dataframe(ano, mes)
  return response


@app.route("/getDataframe/download", methods=["GET"])
def download_dataframe():
  authorization = request.headers.get('Authorization')
  authentication.validateLogin(authorization)
  #Argumentos de paramêtro
  ano = request.args.get('ano')
  mes = request.args.get('mes')
  response = excel.download_excel(ano, mes)
  return response

@app.route("/login", methods=["GET"])
def handle_authentication():
  username = request.args.get('username')
  passwd = request.args.get('password')
  response = authentication.handleLogin(username, passwd)
  return response



if __name__ == "__main__":
    app.run(debug=True)