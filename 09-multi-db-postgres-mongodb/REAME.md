# Criar uma rede para os containers
docker network create minha-rede

## ---- POSTGRES_DB
docker run \
    --name multi-db \
    --network minha-rede \
    -e POSTGRES_USER=juliorocha \
    -e POSTGRES_PASSWORD=minhasenhasecreta \
    -e POSTGRES_DB=heroes \
    -p 5432:5432 \
    -d postgres

docker run \
    --name adminer \
    --network minha-rede \
    -p 8080:8080 \
    -d adminer

## ---- MONGODB
docker run \
    --name mongodb \
    --network minha-rede \
    -p 27017:27017 \
    -e MONGO_INITDB_ROOT_USERNAME=admin \
    -e MONGO_INITDB_ROOT_PASSWORD=senhaadmin \
    -d mongo:4

docker run \
    --name mongoclient \
    --network minha-rede \
    -p 3000:3000 \
    -d mongoclient/mongoclient

# Esperar alguns segundos para o MongoDB iniciar antes de rodar o comando de criação do usuário
sleep 5

docker exec -it mongodb \
    mongo --host mongodb -u admin -p senhaadmin --authenticationDatabase admin \
    --eval "db.getSiblingDB('herois').createUser({user: 'juliorocha', pwd: 'minhasenhasecreta', roles: [{role: 'readWrite', db: 'herois'}]})"
