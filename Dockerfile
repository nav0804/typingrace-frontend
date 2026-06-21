# ==========================================
# Stage 1: Build the Angular App
# ==========================================
FROM node:20-alpine AS build
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm ci

# Copy the rest of the application code
COPY . .

# Build the application for production
RUN npm run build -- --configuration=production

# ==========================================
# Stage 2: Serve with Nginx
# ==========================================
FROM nginx:1.25-alpine

# Remove default nginx static assets
RUN rm -rf /usr/share/nginx/html/*

# Copy the compiled Angular files from Stage 1 
# NOTE: Replace 'typingrace-frontend' with the exact project name found in your angular.json file!
COPY --from=build /app/dist/typingrace-frontend /usr/share/nginx/html

# Copy our custom Nginx fallback routing configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose the standard port Railway routes traffic through
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]