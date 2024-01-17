FROM python:3.10-alpine

WORKDIR /

COPY . /app

WORKDIR /app

# Instalação das dependências do projeto
RUN pip install --no-cache-dir \
    python-dotenv \
    pandas \
    Flask \
    Flask-CORS \
    plotly \
    waitress \
    openpyxl

EXPOSE 5000

CMD ["python", "app.py"]