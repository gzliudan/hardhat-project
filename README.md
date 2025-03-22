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
yarn compile
yarn test
```

## Test

Execute test tasks according to your network:

```shell
# for local net
yarn test:local

# for XDC devnet
yarn test:xdcdev

# for XDC testnet
yarn test:apothem

# for XDC mainet
test:xinfin
```

## Deploy

Deploy all contracts according to your network:

```shell
# for local devnet
yarn deploy:local

# for XDC devnet
yarn deploy:xdcdev

# for XDC testnet
yarn deploy:apothem

# for XDC mainet
yarn deploy:xinfin
```

## Verify

Verify all contracts according to your network:

```shell
# for XDC devnet
yarn verify:xdcdev

# for XDC testnet
yarn verify:apothem

# for XDC mainet
yarn verify:xinfin
```
