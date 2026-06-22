# ==========================================
# Stage 1: Build the Angular App
# ==========================================
FROM node:20-alpine AS build
WORKDIR /app

# Copy package files and install dependencies cleanly
COPY package*.json ./
RUN npm ci

# Copy the rest of the application code
COPY . .

# Build the application for production
RUN npm run build

# ==========================================
# Stage 2: Serve with Nginx
# ==========================================
FROM nginx:1.25-alpine

# Remove default nginx static assets
RUN rm -rf /usr/share/nginx/html/*

# Copy the compiled Angular files. 
# IMPORTANT: Modern Angular nests the output inside a 'browser' folder!
COPY --from=build /app/dist/typingrace-frontend/browser /usr/share/nginx/html

# Copy our custom Nginx fallback routing configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]