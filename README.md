# Vottun NFT Owner Verification Script

An Activity for the [Vottun Journey](https://community.vottun.io/).

This Node.js script is designed to verify the ownership of an ERC721 NFT, using the [Vottun](https://app.vottun.io/) web3 Core API. It retrieves the Ethereum address of an NFT owner based on the provided Contract address, Network ID and Token ID, and compares it to the provided User address.

The script uses environment variables to handle authentication securely.

## Prerequisites

- [Node.js](https://nodejs.org/)
- npm

## Installation

```bash
npm install
```

Create a .env file in the root directory of the project and add the following environment variables:
```plaintext
AUTH_TOKEN=Your_Vottun_Api_Key
APP_VKN=Your_Vottun_App_ID
```

## Usage
To run the script, navigate to the script's directory and execute the following command:

```bash
node nftownervalidator.js
```

Follow the prompts to enter the required parameters:

- Blockchain Network ID
- Contract Address
- Token ID to check
- User Address to check

The script will then make a POST request to the configured API endpoint and compare the returned Ethereum address with the user address provided. It will output whether the user is the owner of the NFT.