# Report of deploy and verify

## 1. Verify result

### 1.1 Solidity v0.8.28 group

- Lock: [0x66D2b74BEcAED67B13002C7a4e5cFE366Ec3919D](https://testnet.xdcscan.com/address/0x66D2b74BEcAED67B13002C7a4e5cFE366Ec3919D#code)
- MhToken: [0x139D5ce9FA428c7cE76b368A7ef356Ee3eEFCD0b](https://testnet.xdcscan.com/address/0x139D5ce9FA428c7cE76b368A7ef356Ee3eEFCD0b#code)
- BlobBaseFee: [0x480A79D382A6444318a5E72B34CF4e0CbcB15100](https://testnet.xdcscan.com/address/0x480A79D382A6444318a5E72B34CF4e0CbcB15100#code)
- CustomError: [0x95194db2eAbD6852fC9Fa6caB88A03638Cb40fac](https://testnet.xdcscan.com/address/0x95194db2eAbD6852fC9Fa6caB88A03638Cb40fac#code)
- MCopy: [0x78df77d88481A064F816B7071310D978dd091ac0](https://testnet.xdcscan.com/address/0x78df77d88481A064F816B7071310D978dd091ac0#code)
- TransientStorage: [0x64193CbC11da8D2Fc36ea179a0E6Ff932d77661c](https://testnet.xdcscan.com/address/0x64193CbC11da8D2Fc36ea179a0E6Ff932d77661c#code)

### 1.2 Solidity v0.8.23 group

- TestCoin: [0xA109a4F5a66f1a325e52A0a33ca7C1c906946c4f](https://testnet.xdcscan.com/address/0xA109a4F5a66f1a325e52A0a33ca7C1c906946c4f#code)
- BaseFee: [0x8Ac979f1C1F1286524Fff0e4573d603aBf8421b0](https://testnet.xdcscan.com/address/0x8Ac979f1C1F1286524Fff0e4573d603aBf8421b0#code)
- Prevrandao: [0xE6D49260A3E377EC5846f5b0214d71332bCCF5A8](https://testnet.xdcscan.com/address/0xE6D49260A3E377EC5846f5b0214d71332bCCF5A8#code)
- Push0: [0x695B2bD9fb16522B43428009FC4075795C0b697A](https://testnet.xdcscan.com/address/0x695B2bD9fb16522B43428009FC4075795C0b697A#code)

## 2. Deploy information

Command:

```shell
yarn deploy:apothem
```

Output:

```text
yarn run v1.22.22
$ hardhat run --network apothem scripts/deploy-all.js

CHAIN_NAME = apothem, CHAIN_ID = 51, RPC = https://erpc.apothem.network

[2025-04-03 17:47:45] DO: Deploy lock(Lock) to apothem, args = [1743673725]
[2025-04-03 17:47:52] OK: lock(Lock) is deployed at 0x66D2b74BEcAED67B13002C7a4e5cFE366Ec3919D , block = 73464695 , hash = 0x70edd325582c65c4d146555f7decb52a60941fa13307dd678594641d89c09ede
[2025-04-03 17:47:52] OK: Write lock to file ./deploy/apothem.json

[2025-04-03 17:47:52] DO: Deploy mh_token(MhToken) to apothem, args = []
[2025-04-03 17:47:56] OK: mh_token(MhToken) is deployed at 0x139D5ce9FA428c7cE76b368A7ef356Ee3eEFCD0b , block = 73464697 , hash = 0xbc8e71de645d40adb943c0a4be73e9548971a8e8ea3d01c2b44f2ccb4e357362
[2025-04-03 17:47:56] OK: Write mh_token to file ./deploy/apothem.json

[2025-04-03 17:47:56] DO: Deploy test_coin(TestCoin) to apothem, args = ["Test Coin","TCT"]
[2025-04-03 17:47:59] OK: test_coin(TestCoin) is deployed at 0xA109a4F5a66f1a325e52A0a33ca7C1c906946c4f , block = 73464699 , hash = 0xe73075b933a40e42c850bd7337c900005e951a9cc1ee2443049d517b7a96555f
[2025-04-03 17:47:59] OK: Write test_coin to file ./deploy/apothem.json

[2025-04-03 17:47:59] DO: Deploy base_fee(BaseFee) to apothem, args = []
[2025-04-03 17:48:04] OK: base_fee(BaseFee) is deployed at 0x8Ac979f1C1F1286524Fff0e4573d603aBf8421b0 , block = 73464701 , hash = 0xe683647ea1e6a32fd36ab05b87a8400ad7c185650a1fcf5e9ac7258ad99e5d4d
[2025-04-03 17:48:04] OK: Write base_fee to file ./deploy/apothem.json

[2025-04-03 17:48:04] DO: Deploy prevrandao(Prevrandao) to apothem, args = []
[2025-04-03 17:48:08] OK: prevrandao(Prevrandao) is deployed at 0xE6D49260A3E377EC5846f5b0214d71332bCCF5A8 , block = 73464703 , hash = 0x9d920151e07451e4e335de6db126a1f98c3ef9fe986040ac76dab7bbb8335df8
[2025-04-03 17:48:08] OK: Write prevrandao to file ./deploy/apothem.json

[2025-04-03 17:48:08] DO: Deploy push0(Push0) to apothem, args = []
[2025-04-03 17:48:12] OK: push0(Push0) is deployed at 0x695B2bD9fb16522B43428009FC4075795C0b697A , block = 73464705 , hash = 0xab079f029a18af9d2888b173f2b0305df4cb26df154f2af070948f42ba6e3215
[2025-04-03 17:48:12] OK: Write push0 to file ./deploy/apothem.json

[2025-04-03 17:48:12] DO: Deploy blob_base_fee(BlobBaseFee) to apothem, args = []
[2025-04-03 17:48:15] OK: blob_base_fee(BlobBaseFee) is deployed at 0x480A79D382A6444318a5E72B34CF4e0CbcB15100 , block = 73464707 , hash = 0xf92aa126e09f53d55e1334ec5f0cffd00b2d385fad94a027f74b79964a4f743e
[2025-04-03 17:48:15] OK: Write blob_base_fee to file ./deploy/apothem.json

[2025-04-03 17:48:15] DO: Deploy custom_error(CustomError) to apothem, args = []
[2025-04-03 17:48:20] OK: custom_error(CustomError) is deployed at 0x95194db2eAbD6852fC9Fa6caB88A03638Cb40fac , block = 73464709 , hash = 0x5feceaa7013ecd5bcb7a1c3f6654616e9fbe240ed4a7af874d7aac5b1605f5ca
[2025-04-03 17:48:20] OK: Write custom_error to file ./deploy/apothem.json

[2025-04-03 17:48:20] DO: Deploy mcopy(MCopy) to apothem, args = []
[2025-04-03 17:48:23] OK: mcopy(MCopy) is deployed at 0x78df77d88481A064F816B7071310D978dd091ac0 , block = 73464711 , hash = 0x096af9379621b0d0480e2d3bd71666f20cb999cd0519209cbd83474f42c6c867
[2025-04-03 17:48:23] OK: Write mcopy to file ./deploy/apothem.json

[2025-04-03 17:48:23] DO: Deploy transient_storage(TransientStorage) to apothem, args = []
[2025-04-03 17:48:28] OK: transient_storage(TransientStorage) is deployed at 0x64193CbC11da8D2Fc36ea179a0E6Ff932d77661c , block = 73464713 , hash = 0xc65a742bccfeb5f89f9df579faf21c8cebe9bff08af80666a8816ee93f20c815
[2025-04-03 17:48:28] OK: Write transient_storage to file ./deploy/apothem.json

Done in 43.96s.
```
