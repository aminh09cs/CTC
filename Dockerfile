# Stage 1: Build
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files
COPY package.json package-lock.json ./

# Install dependencies (legacy-peer-deps for React 19 + MSAL)
RUN npm ci --legacy-peer-deps

# Copy source
COPY . .

# Build (env vars can be overridden at build time for different environments)
ARG VITE_AZURE_APP_CLIENT_ID
ARG VITE_AZURE_APP_TENANT_ID
ARG VITE_AZURE_APP_AUTHORITY
ARG VITE_APP_URL
ARG VITE_APP_REDIRECT_URI

ENV VITE_AZURE_APP_CLIENT_ID=$VITE_AZURE_APP_CLIENT_ID
ENV VITE_AZURE_APP_TENANT_ID=$VITE_AZURE_APP_TENANT_ID
ENV VITE_AZURE_APP_AUTHORITY=$VITE_AZURE_APP_AUTHORITY
ENV VITE_APP_URL=$VITE_APP_URL
ENV VITE_APP_REDIRECT_URI=$VITE_APP_REDIRECT_URI

RUN npm run build

# Stage 2: Serve with nginx
FROM nginx:alpine

# Copy custom nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy built files from builder
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
