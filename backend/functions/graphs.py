import plotly.express as px

def show_graphs_plotly(data_frame):
  # Group by 'Date', calculate the sum of 'Total'
  total_pages_by_date = data_frame.groupby('Date')['Total'].sum().reset_index()

  # Group by User and Printer, calculate the sum of Total
  user_printer_totals = data_frame.groupby(['User', 'Printer'])['Total'].sum().reset_index()

  # Group by Printer, calculate the sum of Total
  printer_totals = data_frame.groupby('Printer')['Total'].sum().reset_index()

  # Create a bar plot with Plotly Express for user and printer totals
  bar_user_printer_totals = px.bar(user_printer_totals, x='User', y='Total', color='Printer', title='Total Pages Printed by User and Printer')
  bar_user_printer_totals.show()

  bar_printer_totals = px.bar(printer_totals, x='Printer', y='Total', title='Total Pages Printed by Printer')
  bar_printer_totals.show()