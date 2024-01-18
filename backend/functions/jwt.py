import jwt
import os

secret_key = os.environ.get('SECRET_KEY')

def create_jwt(payload):
  encoded = jwt.encode(payload, secret_key, algorithm='HS256')
  return encoded

def decode_jwt(jwtPayload):
  decoded = jwt.decode(jwtPayload, secret_key, algorithms=['HS256'])
  return decoded