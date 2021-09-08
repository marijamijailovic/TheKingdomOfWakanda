## Wakanda Forever

# :page_facing_up: Description

An election dapp for the Kingdom of Wakanda to decide who will represent King T'Challa at future United Nation summits. 

Dapp has the following features:
  - A simple UI that allows Wakandans to register for voting, displays the candidates and allows Wakandans to vote.
  - A Smart Contract that keeps track of who voted for which candidates.
  - An ERC20 token required for voting (called WKND).
  - A local NodeJS Server that collects data from the blockchain.

Smart contract deployed on kovan testnet:
  - [https://kovan.etherscan.io/address/0xc4015ebe1189499793295d1968cd64961bf5f25b] (ERC20 wakanda token)
  - [https://kovan.etherscan.io/address/0x0e2ccfb803f0f6669909abe6a1617d0fb3317cd5] (Voting contract)
 
# :computer: Set up

Install hardhat:
  ```npm install --save-dev hardhat```

Compile contrats:
  ```navigate to smartcontract folder (cd smartcontract)```
  ```npx hardhat compile```

Create .env file in backend and smartcontract folder and set it up to own private values, there is .env.example as the example. Also, depending on the testnet network you choose, you will need to change the variables inside backend/contract/congif.js.

# :computer: Run application
  
Run node js server:
  ```navigate to backend folder(cd backend)```
  ```npm install```
  ```node app.js```
  
Run frontend:
  ```navigate to frontend folder(cd frontend)```
  ```npm install```
  ```npm start```

First go to /admin page to add candidates and delegator for voting, after that you could go to / and vote.
