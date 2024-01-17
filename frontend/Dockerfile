# Use a imagem Node.js Alpine como base
FROM node:20-alpine

#Instalando yarn
RUN apk add --no-cache yarn

WORKDIR /

COPY /printerview /app

# Defina o diretório de trabalho no contêiner
WORKDIR /app

#Instala as dependências do projeto
#RUN npm install

#Otimizador final de imagem Next
#npm i sharp

# Exponha a porta utilizada pelo seu aplicativo
EXPOSE 3000

# Comando padrão para manter o contêiner em execução
CMD ["yarn", "run", "start"]
