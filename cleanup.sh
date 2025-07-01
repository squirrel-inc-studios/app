#!/bin/bash

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${YELLOW}🧹 Starting cleanup process...${NC}"
echo ""

# Store the current directory
ROOT_DIR=$(pwd)

# Function to clean a directory
clean_directory() {
    local dir=$1
    echo -e "${YELLOW}Cleaning: $dir${NC}"
    
    # Remove node_modules
    if [ -d "$dir/node_modules" ]; then
        echo "  - Removing node_modules..."
        rm -rf "$dir/node_modules"
    fi
    
    # Remove .next directories (Next.js build cache)
    if [ -d "$dir/.next" ]; then
        echo "  - Removing .next cache..."
        rm -rf "$dir/.next"
    fi
    
    # Remove dist directories (build output)
    if [ -d "$dir/dist" ]; then
        echo "  - Removing dist..."
        rm -rf "$dir/dist"
    fi
    
    # Remove .turbo directories (Turborepo cache)
    if [ -d "$dir/.turbo" ]; then
        echo "  - Removing .turbo cache..."
        rm -rf "$dir/.turbo"
    fi
}

# Clean root directory
echo -e "${GREEN}Step 1: Cleaning root directory${NC}"
clean_directory "$ROOT_DIR"

# Remove pnpm lock file from root
if [ -f "$ROOT_DIR/pnpm-lock.yaml" ]; then
    echo "  - Removing pnpm-lock.yaml..."
    rm -f "$ROOT_DIR/pnpm-lock.yaml"
fi

echo ""

# Clean all apps
echo -e "${GREEN}Step 2: Cleaning apps${NC}"
for app in apps/*; do
    if [ -d "$app" ]; then
        clean_directory "$app"
    fi
done

echo ""

# Clean all packages
echo -e "${GREEN}Step 3: Cleaning packages${NC}"
for package in packages/*; do
    if [ -d "$package" ]; then
        clean_directory "$package"
    fi
done

echo ""

# Clear pnpm store (optional - uncomment if you want to clear the global pnpm cache)
# echo -e "${GREEN}Step 4: Clearing pnpm store${NC}"
# pnpm store prune

# Reinstall dependencies
echo -e "${GREEN}Step 4: Reinstalling dependencies${NC}"
echo "Running: pnpm install"
pnpm install

echo ""

# Build all packages to ensure everything is working
echo -e "${GREEN}Step 5: Building all packages${NC}"
echo "Running: pnpm build"
pnpm build

echo ""
echo -e "${GREEN}✨ Cleanup complete!${NC}"
echo ""
echo "Summary:"
echo "  - Removed all node_modules directories"
echo "  - Removed all build artifacts (.next, dist)"
echo "  - Removed all cache directories (.turbo)"
echo "  - Removed pnpm-lock.yaml"
echo "  - Reinstalled all dependencies"
echo "  - Rebuilt all packages"
echo ""
echo -e "${YELLOW}You may want to run 'pnpm dev' to start development servers.${NC}"