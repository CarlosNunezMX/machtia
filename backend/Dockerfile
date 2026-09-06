FROM oven/bun:alpine as base
WORKDIR /opt/machtia

FROM alpine:latest as runner
RUN apk add --no-cache gcompat libstdc++

FROM base as install
RUN mkdir -p /tmp/dev
COPY package.json bun.lock /tmp/dev/
RUN cd /tmp/dev && bun install --frozen-lockfile

FROM install as build
COPY --from=install /tmp/dev/node_modules node_modules
COPY . .

ENV NODE_ENV=production
RUN bun run build

FROM runner as release
WORKDIR /opt/machtia
COPY --from=build /opt/machtia/build/www .

EXPOSE 3000/tcp
CMD [ "/opt/machtia/app" ]
