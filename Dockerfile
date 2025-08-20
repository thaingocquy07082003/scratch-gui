# Sử dụng Node.js 18 LTS làm base image
FROM node:18-alpine

# Thiết lập thư mục làm việc
WORKDIR /app

# Cài đặt các dependencies cần thiết
RUN apk add --no-cache \
    python3 \
    make \
    g++ \
    git

# Copy package.json và package-lock.json
COPY package*.json ./

# Cài đặt dependencies (bao gồm dev dependencies để build)
RUN npm ci --ignore-scripts

# Copy source code
COPY . .

# Build ứng dụng
RUN npm run build

# Expose port 8601 (port mặc định của webpack dev server)
EXPOSE 8601

# Tạo user không phải root để chạy ứng dụng
RUN addgroup -g 1001 -S nodejs
RUN adduser -S scratch -u 1001

# Chuyển quyền sở hữu cho user scratch
RUN chown -R scratch:nodejs /app
USER scratch

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:8601/ || exit 1

# Command để chạy ứng dụng
CMD ["npm", "start"]
