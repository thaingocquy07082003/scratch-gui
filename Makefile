# Scratch GUI Docker Makefile
# Sử dụng: make [target]

.PHONY: help start-dev stop-dev start-prod stop-prod build-prod logs status cleanup

# Default target
help:
	@echo "Scratch GUI Docker Management"
	@echo "============================"
	@echo ""
	@echo "Available targets:"
	@echo "  start-dev     - Start development environment"
	@echo "  stop-dev      - Stop development environment"
	@echo "  start-prod    - Start production environment"
	@echo "  stop-prod     - Stop production environment"
	@echo "  build-prod    - Build production application"
	@echo "  logs          - Show logs"
	@echo "  status        - Show container status"
	@echo "  cleanup       - Clean up all Docker resources"
	@echo "  help          - Show this help message"

# Development environment
start-dev:
	@echo "Starting development environment..."
	docker-compose up --build -d
	@echo "Development environment started!"
	@echo "Access the application at: http://localhost:8601"

stop-dev:
	@echo "Stopping development environment..."
	docker-compose down
	@echo "Development environment stopped!"

# Production environment
start-prod:
	@echo "Starting production environment..."
	docker-compose -f docker-compose.prod.yml up --build -d
	@echo "Production environment started!"
	@echo "Access the application at: http://localhost"

stop-prod:
	@echo "Stopping production environment..."
	docker-compose -f docker-compose.prod.yml down
	@echo "Production environment stopped!"

# Build production
build-prod:
	@echo "Building production application..."
	docker-compose run --rm scratch-gui-build
	@echo "Production build completed!"

# Logs
logs:
	@echo "Showing logs..."
	docker-compose logs -f scratch-gui

# Status
status:
	@echo "Development Environment:"
	@docker-compose ps
	@echo ""
	@echo "Production Environment:"
	@docker-compose -f docker-compose.prod.yml ps

# Cleanup
cleanup:
	@echo "Cleaning up Docker resources..."
	docker-compose down --rmi all --volumes --remove-orphans
	docker-compose -f docker-compose.prod.yml down --rmi all --volumes --remove-orphans
	docker system prune -f
	@echo "Cleanup completed!"

# Windows PowerShell compatible targets
start-dev-ps:
	@echo "Starting development environment..."
	docker compose up --build -d
	@echo "Development environment started!"
	@echo "Access the application at: http://localhost:8601"

stop-dev-ps:
	@echo "Stopping development environment..."
	docker compose down
	@echo "Development environment stopped!"

start-prod-ps:
	@echo "Starting production environment..."
	docker compose -f docker-compose.prod.yml up --build -d
	@echo "Production environment started!"
	@echo "Access the application at: http://localhost"

stop-prod-ps:
	@echo "Stopping production environment..."
	docker compose -f docker-compose.prod.yml down
	@echo "Production environment stopped!"

build-prod-ps:
	@echo "Building production application..."
	docker compose run --rm scratch-gui-build
	@echo "Production build completed!"

logs-ps:
	@echo "Showing logs..."
	docker compose logs -f scratch-gui

status-ps:
	@echo "Development Environment:"
	@docker compose ps
	@echo ""
	@echo "Production Environment:"
	@docker compose -f docker-compose.prod.yml ps

cleanup-ps:
	@echo "Cleaning up Docker resources..."
	docker compose down --rmi all --volumes --remove-orphans
	docker compose -f docker-compose.prod.yml down --rmi all --volumes --remove-orphans
	docker system prune -f
	@echo "Cleanup completed!"
