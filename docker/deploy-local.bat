@echo off

echo === cd ../ ===
cd ..

echo === docker build -t gmtool:latest . ===
docker build ^
    --build-arg ENV_MODE=production ^
    --build-arg PORT=13000 ^
    -t gmtool:latest .

echo === docker stop gmtool ===
docker stop gmtool

echo === docker rm gmtool ===
docker rm gmtool

echo === execute container ===
docker run -d ^
    --name gmtool ^
    --network app_network ^
    -e ENV_MODE=production ^
    -e PORT=13000 ^
    gmtool:latest
	

echo === cd docker ===
cd docker
