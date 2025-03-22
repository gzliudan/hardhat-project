# Hardhat Project

This project demonstrates how to use Hardhat.

## Install

```shell
git clone https://github.com/gzliudan/hardhat-project
cd hardhat-project
yarn
yarn clean
cp sample.env .env
# set DEPLOYER_PRIVATE_KEY in .env
vi .env
```

## Test

```shell
yarn test
yarn test:local
yarn test:xdcdev
yarn test:apothem
```

## Deploy

deploy contracts according to your network:

```shell
yarn deploy:local
yarn deploy:xdcdev
yarn deploy:apothem
yarn deploy:xinfin
```

## Verify

verify contracts according to your network:

```shell
yarn verify:xdcdev
yarn verify:apothem
yarn verify:xinfin
```
