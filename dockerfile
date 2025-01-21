### FROM base ##################################
FROM node:20-alpine3.20 AS base
ARG ENV_MODE
ARG PORT

ENV NODE_ENV=${ENV_MODE}
ENV PORT=${PORT}

RUN echo NODE_ENV: ${NODE_ENV}
RUN echo PORT: ${PORT}

### FROM builder ##################################
FROM base AS builder

# make directory
WORKDIR /workspace/playfab-agent

# Installation of essential basic tools(alpine linux package manager)
RUN apk add --no-cache \
	tzdata \
	git \
	openssh-client \
	dos2unix \
	openssl \
	libc6-compat \
	build-base \
	python3

RUN cp /usr/share/zoneinfo/Asia/Seoul /etc/localtime

COPY . .

RUN chmod +x gen-schema.sh
RUN dos2unix gen-schema.sh

# npm install
RUN npm install --production=false --platform=linux --arch=x64 sharp

# prisma generate
#RUN npx prisma generate --schema=./prisma/docker/mysql/account.prisma
#RUN npx prisma generate --schema=./prisma/docker/mysql/log.prisma
RUN sh gen-schema.sh

# run build 
RUN npm run build 

RUN ls -al

### FROM runner ##################################
FROM base AS runner

WORKDIR /workspace/gmtool

RUN apk add --no-cache \ 
	openssl \
	libc6-compat \
	libssl3 \
	libstdc++

# 필요한 Prisma 파일 복사
COPY --from=builder /workspace/playfab-agent/.next/standalone ./
COPY --from=builder /workspace/playfab-agent/.next/static ./.next/static
COPY --from=builder /workspace/playfab-agent/public ./public
COPY --from=builder /workspace/playfab-agent/certificates ./certificates

RUN mv .env.production .env

RUN echo "#!/bin/sh" > ./start.sh && \
	echo "echo \"NODE_ENV: \${NODE_ENV}\"" >> ./start.sh && \
	echo "node server.js" >> ./start.sh && \
	chmod +x ./start.sh

EXPOSE ${PORT}

CMD ["./start.sh"]
