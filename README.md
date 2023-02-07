For run locally we need a database

```
docker-compose up -d
```

- `-d` means **detached**

## Mongo DB URL Local

```
mongodb://localhost:27017/kofi-database
```

## Redis setup

```
docker pull redis
```

run redis image with port 6379

## Getting Started

First, run the development server:

```bash
yarn install
yarn dev:start
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


## Tests Coverage
How to run tests with coverage?
`yarn test:coverage`

See folder `coverage/Icov-report/index.html`