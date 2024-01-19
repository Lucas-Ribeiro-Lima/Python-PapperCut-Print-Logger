import os
from dotenv import load_dotenv
import datetime as dt
from functions import handleJwt

load_dotenv()
ADMIN_USER=os.environ.get('ADMIN_USER')
ADMIN_PASSWD=os.environ.get('ADMIN_PASSWD')


def handleLogin(username, passwd):
  if(username == ADMIN_USER and passwd == ADMIN_PASSWD):
    payload = {
      "userID": ADMIN_USER,
      "exp": dt.datetime.now(tz=dt.timezone.utc) + dt.timedelta(minutes=60),
      "avatar_url": f'https://github.com/{ADMIN_USER}.png'
    } 
    jwtResponse = handleJwt.create_jwt(payload)
    return jwtResponse
  else:
    return({"message": "invalid credentials"})
  

def validateLogin(jwt):
  jwtPayload = handleJwt.decode_jwt(jwt)
  return jwtPayload,