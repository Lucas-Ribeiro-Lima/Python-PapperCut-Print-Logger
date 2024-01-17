import json
import os
from dotenv import load_dotenv
from flask import Flask, request, jsonify
from flask_cors import CORS
from functions import extractCSV, excel

app = Flask(__name__)
CORS(app)

load_dotenv()
secret = os.environ.get('API_SECRET')


@app.route("/")
def hello_world():
  return "<h1>Printer View</h1>"


@app.route("/getDataframe")
def get_dataframe():
  try:

    authorization = request.headers.get('Authorization')

    # print(authorization)

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


@app.route("/getDataframe/download")
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
  

if __name__ == "__main__":
    from waitress import serve
    serve(app, host="0.0.0.0", port=5000)