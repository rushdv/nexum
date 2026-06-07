FROM node:20-alpine AS frontend-build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:20-alpine AS backend
WORKDIR /app
COPY backend/package*.json ./
RUN npm ci --omit=dev
COPY backend/ .
COPY --from=frontend-build /app/dist ./public
RUN mkdir -p uploads
EXPOSE 5000
CMD ["node", "src/server.js"]
