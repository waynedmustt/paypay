# Description

PayPay Challenge web application built in Angular for front-end and NestJS for back-end.

# Running the Angular (Client) App

## Installation

```bash
$ npm install
```

## Running App
```bash
$ npm run start
```

## Test

```bash
# unit tests
$ npm run test or npm run test-headless

# linting
$ npm run lint
```

# Running the NestJS (Server) App

## Installation

```bash
$ npm install
```

## Database

Please `take note` you need to install PostgreSQL first to run the server.

```bash
# env
$ cp .env.example .env

# build
$ npm run build

# migration
$ npm run typeorm migration:run
```

## Running App
```bash
$ npm run start:dev
```

## Test

```bash
# unit tests
$ npm run test

# prettier code
$ npm run format
```
