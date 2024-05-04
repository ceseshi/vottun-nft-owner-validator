// This script makes a POST request to the Vottun web3 Core API to obtain the address of the owner of an NFT, given the contract address, network ID, and token ID.
// It uses environment variables to handle authentication credentials. The script compares the obtained address with a user-provided address and returns if they match.

require('dotenv').config(); // Load environment variables from .env
const axios = require('axios');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const defaultNetworkId = 80002;
const defaultTokenId = 1;
const nft721SpecsId = 3;

// Function to make the POST request to the API
async function getNftOwner(contractAddress, networkId, tokenId) {
    const params = {
        contractAddress: contractAddress,
        contractSpecsId: parseInt(nft721SpecsId),
        blockchainNetwork: parseInt(networkId),
        method: "ownerOf",
        params: [parseInt(tokenId)]
    };

    const config = {
        headers: {
            'Authorization': `Bearer ${process.env.AUTH_TOKEN}`,
            'x-application-vkn': process.env.APP_VKN
        }
    };

    try {
        const response = await axios.post('https://api.vottun.tech/core/v1/evm/transact/view', params, config);
        const returnedAddress = response.data[0];
        return returnedAddress;
    } catch (error) {
        console.error('Error making the request:', error.message + ' (' + error.response ? error.response.data.message : 'No response data' + ')');
        return null;
    }
}

// Prompt user for parameters
rl.question('Enter blockchain network ID [80002]: ', (networkId) => {
    networkId = networkId.trim() || defaultNetworkId;

    rl.question('Enter NFT contract address: ', (contractAddress) => {

        rl.question('Enter NFT token ID [1]: ', (tokenId) => {
            tokenId = tokenId.trim() || defaultTokenId;

            rl.question('Enter user address to check: ', async (userAddress) => {

                // Get NFT owner
                const returnedAddress = await getNftOwner(contractAddress, networkId, tokenId);

                if (returnedAddress && returnedAddress.toLowerCase() === userAddress.toLowerCase()) {
                    console.log("Success: The user is the owner of the NFT");
                } else if (returnedAddress !== null) {
                    console.log("Fail: The user is not the owner of the NFT");
                }

                rl.close();
            });
        });
    });
});