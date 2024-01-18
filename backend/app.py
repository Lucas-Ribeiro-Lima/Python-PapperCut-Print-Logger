import datetime
import os
from dotenv import load_dotenv
from flask import Flask, request
from flask_cors import CORS
from functions import extractCSV, excel, jwt

app = Flask(__name__)
CORS(app)

load_dotenv()
secret = os.environ.get('API_SECRET')


@app.route("/",  methods=["GET"])
def printer_view():
  return "<h1>Printer View</h1>"


@app.route("/getDataframe", methods=["GET"])
def get_dataframe():
  try:

    authorization = request.headers.get('Authorization')

    if (authorization == secret):
    #Argumentos de paramêtro
      ano = request.args.get('ano')
      mes = request.args.get('mes')
      #Dataframe
      response = extractCSV.to_dataframe(ano, mes)
      return response
    else:
      return "Não autorizado", 401
  
  except Exception as e:
    return f"Error: {str(e)}", 500


@app.route("/getDataframe/download", methods=["GET"])
def download_dataframe():
  try:
    authorization = request.headers.get('Authorization')

    if (authorization == secret):
      #Argumentos de paramêtro
      ano = request.args.get('ano')
      mes = request.args.get('mes')
      response = excel.download_excel(ano, mes)
      return response
    else:
      return "Não autorizado", 401
  
  except Exception as e:
    return f"Error fetching data: {str(e)}", 500
  

@app.route("/login", methods=["POST"])
def handle_authentication():
  payload = {
    'userID': request.json.get("userID"),
    'exp': (datetime.datetime.now() + datetime.timedelta(minutes=10)).timestamp()
  }
  response = jwt.create_jwt(payload)
  return response


@app.route("/authenticate", methods=["GET"])
def handle_testeauthentication():
  jwtAuthorization = request.headers.get("Authorization")
  response = jwt.decode_jwt(jwtAuthorization)
  return response



if __name__ == "__main__":
    app.run(debug=True)