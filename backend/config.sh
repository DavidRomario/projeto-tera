docker-compose up -d
docker exec -ti backend_backend_1 sh -c "cd seeders && node insertProducts.js"