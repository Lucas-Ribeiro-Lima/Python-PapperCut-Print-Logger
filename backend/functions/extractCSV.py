import os
import pandas as pd

def to_dataframe(ano, mes):
  try:
    #Variaveis
    folder_path=f'/app/data/{ano}/{mes}'
    file_list = os.listdir(folder_path)

    tables = []
    for file in file_list:
      file_path = os.path.join(folder_path, file)
      table = pd.read_csv(file_path, encoding="ISO-8859-1", skiprows=2, 
                          delimiter=",",
                          names=["DateTime",  "User", "Pages", "Copies", "Printer", "Document Name", "Client",
                                  "Paper Size", "Language", "Height", "Width", "Duplex", "Grayscale", "Size", "Null"])
      
      table["Document Name"] = table["Document Name"].fillna("Não especificado")

      # Split the 'DateTime' column into 'Date' and 'Time' without removing any values
      table[['Date', 'Time']] = table['DateTime'].str.extract(r'(\d{4}-\d{2}-\d{2}) (\d{2}:\d{2}:\d{2})')

      # Convert 'Date' column to datetime format
      table['Date'] = pd.to_datetime(table['Date'])

      #Making the total count
      table['Total'] = table['Pages'] * table['Copies']

      #Drop inutil columns
      table = table.drop(columns=["DateTime", "Time", "Paper Size", "Height", "Width", "Duplex", "Grayscale", "Size", "Language", "Null"]) 

      # Reorder columns
      table = table[['Date', 'User', 'Pages', 'Copies', 'Total', 'Printer', 'Document Name', 'Client']]

      #Appeding to the result data frame
      tables.append(table)
    
    data_frame = pd.concat(tables, ignore_index=True)
    
    data_frame = data_frame.to_json(orient='records')

    return data_frame
  
  except Exception as e:
    raise ValueError({e})
