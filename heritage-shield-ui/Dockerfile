FROM node:20-alpine

WORKDIR /app

# Copy package descriptors
COPY package*.json ./
RUN npm install

# Copy frontend source code
COPY . .

# Expose Vite development port
EXPOSE 5173

# Run Vite dev server with host binding
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]
