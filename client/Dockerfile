# Используем официальный образ Node.js для сборки
FROM node:18-alpine AS build

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем package.json и package-lock.json (если есть)
COPY package.json package-lock.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем весь проект
COPY . .

# Собираем приложение
RUN npm run build

# -------------------------------------------

# Используем Nginx для сервинга приложения
FROM nginx:alpine

# Копируем сборку React в директорию, обслуживаемую Nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Копируем кастомный Nginx конфиг
COPY nginx.conf /etc/nginx/nginx.conf

# Открываем порт 80
EXPOSE 80

# Запускаем Nginx
CMD ["nginx", "-g", "daemon off;"]
