# /storage/emulated/0/Documents/XenonCash/XenonCash/backend/Dockerfile
FROM node:18-alpine

WORKDIR /app

# Copie les fichiers
COPY package*.json ./
RUN npm install --production

COPY . .

# Port
EXPOSE 3001

# Commande de démarrage
CMD ["node", "server.js"]