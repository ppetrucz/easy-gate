FROM docker.io/node:17 AS web-builder
WORKDIR /easy-gate-web
COPY ./web .
RUN yarn install && yarn build

FROM docker.io/golang:1.18 AS go-builder
WORKDIR /easy-gate
COPY . .
COPY --from=web-builder ./easy-gate-web/build ./web/build
RUN make easy-gate

FROM scratch AS easy-gate
WORKDIR /etc/easy-gate
COPY ./assets/easy-gate.json .
WORKDIR /usr/bin
COPY --from=go-builder ./easy-gate/build/easy-gate .
ENTRYPOINT ["/usr/bin/easy-gate", "/etc/easy-gate/easy-gate.json"]