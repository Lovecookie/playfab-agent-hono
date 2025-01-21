@echo off

mkdir ssl

echo === docker stop nginx ===
docker stop nginx-proxy

echo === docker rm nginx ===
docker rm nginx-proxy

echo === execute container ===
docker run -d ^
	--name nginx-proxy ^
	--network app_network ^
	--env-file %cd%/../.env.production ^
	-p 18080:443 ^
	-v %cd%/nginx.conf:/etc/nginx/conf.d/default.conf ^
	-v %cd%/ssl:/etc/nginx/ssl ^
nginx:alpine