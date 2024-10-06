# Imagen base
FROM node:16

# Crear directorio de trabajo
WORKDIR /app

# Copiar package.json y package-lock.json
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar el código fuente
COPY . .

# Exponer el puerto 3002
EXPOSE 3002

# Iniciar la aplicación
CMD ["npm", "start"]
