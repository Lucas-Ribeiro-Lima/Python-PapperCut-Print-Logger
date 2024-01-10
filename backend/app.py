import json
from flask import Flask, request
from flask_cors import CORS
from functions import extractCSV, excel

app = Flask(__name__)
CORS(app)

@app.route("/")
def hello_world():
  return "<h1>Printer View</h1>"


@app.route("/getDataframe")
def get_dataframe():
  #Argumentos de paramêtro
  ano = request.args.get('ano')
  mes = request.args.get('mes')
  #Dataframe
  data_frame = extractCSV.to_dataframe(ano, mes)
  data_frame = data_frame.to_json()
  response = json.loads(data_frame)

  return(response)


@app.route("/getDataframe/download")
def download_dataframe():
  #Argumentos de paramêtro
  ano = request.args.get('ano')
  mes = request.args.get('mes')
  response = excel.download_excel(ano, mes)
  return response

if __name__ == "__main__":
    app.run(debug=True)