def downloadExcel(path, data_frame):

  excel_path = path
  data_frame.to_excel(excel_path, index=False)

  # Display the resulting DataFrame
  return f"DataFrame saved to {excel_path}"