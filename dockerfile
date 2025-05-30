FROM node:18

WORKDIR /app

COPY package*.json ./

RUN apt-get update && apt-get install -y openssl

RUN npm install

COPY . .

# Jalankan prisma generate setelah semua file disalin
RUN npx prisma generate

EXPOSE 3000

CMD ["npm", "start"]
