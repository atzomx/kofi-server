For run locally we need a run mongodb and redis container

```
docker-compose up -d -f docker-compose-install.yml
```

- `-d` means **detached**

## Mongo DB URL Local

```
mongodb://localhost:27017/kofi-database
```

## Redis URL Local

```
localhost:6379
```

## Build only the app

```
docker build -t kofi-app-prod .
```

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

## Run seed

`npx cross-env NODE_ENV=dev ts-node -r tsconfig-paths/register ./src/tests/scripts/seed.ts`
