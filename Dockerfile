FROM rust:1 AS builder
WORKDIR /app
COPY . .

RUN apt-get -y update && apt-get -y upgrade
RUN apt-get install -y sqlite3 libsqlite3-dev

ENV DATABASE_URL="sqlite:/app/database/dev/database.sqlite"
RUN cargo build --release

FROM ubuntu:latest as runner
WORKDIR /app
COPY ./wordlist.txt ./wordlist.txt
COPY ./Rocket.toml ./Rocket.toml
COPY --from=builder /app/target/release/cs_coursework /usr/local/bin/webapp
ENV DATABASE_URL="sqlite:/app/database/dev/database.sqlite"
CMD [ "webapp" ]