# Copy all files to container
# Install npm dependencies
# Build React app
# Serve at localhost:8000
FROM node:12.2.0-alpine AS builder
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

FROM node:12.2.0-alpine
WORKDIR /app
COPY --from=builder /app/build .
RUN npm install serve
ENV PATH /app/node_modules/.bin:$PATH
CMD ["serve", "-p", "8000", "-s", "."]