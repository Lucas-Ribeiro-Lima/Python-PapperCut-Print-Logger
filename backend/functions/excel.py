from io import BytesIO
import pandas as pd
from flask import send_file
from functions import extractCSV

def download_excel(ano, mes):
  #Variavel
  excel_file = BytesIO()
  json_data = extractCSV.to_dataframe(ano, mes)

  data_frame = pd.DataFrame(json_data)

  data_frame.to_excel(excel_file, index=False)

  excel_file.seek(0)

  return send_file(excel_file, download_name="relatorio_impressao.xlsx", as_attachment=True)