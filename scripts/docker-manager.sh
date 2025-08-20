#!/bin/bash

# Scratch GUI Docker Manager Script
# Sử dụng: ./scripts/docker-manager.sh [command]

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

print_header() {
    echo -e "${BLUE}================================${NC}"
    echo -e "${BLUE}  Scratch GUI Docker Manager${NC}"
    echo -e "${BLUE}================================${NC}"
}

# Function to check if Docker is running
check_docker() {
    if ! docker info > /dev/null 2>&1; then
        print_error "Docker is not running. Please start Docker and try again."
        exit 1
    fi
}

# Function to check if Docker Compose is available
check_docker_compose() {
    if ! command -v docker-compose &> /dev/null && ! docker compose version &> /dev/null; then
        print_error "Docker Compose is not available. Please install Docker Compose and try again."
        exit 1
    fi
}

# Function to get docker-compose command
get_docker_compose_cmd() {
    if command -v docker-compose &> /dev/null; then
        echo "docker-compose"
    else
        echo "docker compose"
    fi
}

# Function to start development environment
start_dev() {
    print_status "Starting development environment..."
    COMPOSE_CMD=$(get_docker_compose_cmd)
    $COMPOSE_CMD up --build -d
    print_status "Development environment started!"
    print_status "Access the application at: http://localhost:8601"
    print_status "View logs with: $COMPOSE_CMD logs -f scratch-gui"
}

# Function to stop development environment
stop_dev() {
    print_status "Stopping development environment..."
    COMPOSE_CMD=$(get_docker_compose_cmd)
    $COMPOSE_CMD down
    print_status "Development environment stopped!"
}

# Function to start production environment
start_prod() {
    print_status "Starting production environment..."
    COMPOSE_CMD=$(get_docker_compose_cmd)
    $COMPOSE_CMD -f docker-compose.prod.yml up --build -d
    print_status "Production environment started!"
    print_status "Access the application at: http://localhost"
    print_status "View logs with: $COMPOSE_CMD -f docker-compose.prod.yml logs -f scratch-gui-prod"
}

# Function to stop production environment
stop_prod() {
    print_status "Stopping production environment..."
    COMPOSE_CMD=$(get_docker_compose_cmd)
    $COMPOSE_CMD -f docker-compose.prod.yml down
    print_status "Production environment stopped!"
}

# Function to build production
build_prod() {
    print_status "Building production application..."
    COMPOSE_CMD=$(get_docker_compose_cmd)
    $COMPOSE_CMD run --rm scratch-gui-build
    print_status "Production build completed!"
    print_status "Build files are available in ./build and ./dist directories"
}

# Function to show logs
show_logs() {
    local service=${2:-"scratch-gui"}
    print_status "Showing logs for service: $service"
    COMPOSE_CMD=$(get_docker_compose_cmd)
    $COMPOSE_CMD logs -f $service
}

# Function to show status
show_status() {
    print_status "Checking container status..."
    COMPOSE_CMD=$(get_docker_compose_cmd)
    echo ""
    echo "Development Environment:"
    $COMPOSE_CMD ps
    echo ""
    echo "Production Environment:"
    $COMPOSE_CMD -f docker-compose.prod.yml ps
}

# Function to clean up
cleanup() {
    print_warning "This will remove all containers, images, and volumes. Are you sure? (y/N)"
    read -r response
    if [[ "$response" =~ ^([yY][eE][sS]|[yY])$ ]]; then
        print_status "Cleaning up Docker resources..."
        COMPOSE_CMD=$(get_docker_compose_cmd)
        $COMPOSE_CMD down --rmi all --volumes --remove-orphans
        $COMPOSE_CMD -f docker-compose.prod.yml down --rmi all --volumes --remove-orphans
        docker system prune -f
        print_status "Cleanup completed!"
    else
        print_status "Cleanup cancelled."
    fi
}

# Function to show help
show_help() {
    print_header
    echo "Usage: $0 [COMMAND]"
    echo ""
    echo "Commands:"
    echo "  start-dev     Start development environment"
    echo "  stop-dev      Stop development environment"
    echo "  start-prod    Start production environment"
    echo "  stop-prod     Stop production environment"
    echo "  build-prod    Build production application"
    echo "  logs [SERVICE] Show logs (default: scratch-gui)"
    echo "  status        Show container status"
    echo "  cleanup       Clean up all Docker resources"
    echo "  help          Show this help message"
    echo ""
    echo "Examples:"
    echo "  $0 start-dev"
    echo "  $0 logs scratch-gui"
    echo "  $0 cleanup"
}

# Main script logic
main() {
    check_docker
    check_docker_compose

    case "${1:-help}" in
        start-dev)
            start_dev
            ;;
        stop-dev)
            stop_dev
            ;;
        start-prod)
            start_prod
            ;;
        stop-prod)
            stop_prod
            ;;
        build-prod)
            build_prod
            ;;
        logs)
            show_logs "$@"
            ;;
        status)
            show_status
            ;;
        cleanup)
            cleanup
            ;;
        help|--help|-h)
            show_help
            ;;
        *)
            print_error "Unknown command: $1"
            echo ""
            show_help
            exit 1
            ;;
    esac
}

# Run main function with all arguments
main "$@"
