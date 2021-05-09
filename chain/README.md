# Develution Contracts

---

# Index 
* [Prerequisite Software](#prerequisite-software)
* [Compiling](#compiling)
* [Testing](#testing)
* [System Overview](#system-overview)

---

## Prerequisite Software

Please make sure you've installed the following before continuing:

- [Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)
- [Node.js](https://nodejs.org/en/download/)
- [Yarn](https://classic.yarnpkg.com/en/docs/install#mac-stable)
- [Docker](https://docs.docker.com/engine/install/)

Please ensure your `node` is on at least version `12.10.0`. This can be checked by running:
```
node -v
```

## Compiling 

To compile the contracts run:
```
yarn build
```

## Testing

In order to test the smart contracts, we need to make a local Optimism instance to run the tests on. Before following the instructions below, please ensure you have [docker installed and set up](https://docs.docker.com/engine/install/). It is recommended to use two terminals for the following in order to keep things readable. 

While techncially you should be able to run all these commands in one go, there tends to be timing issues and it is better to run them one by one.

// TODO make script with correct sequential execution

In your second terminal, run the following:
```sh
git clone git@github.com:ethereum-optimism/optimism.git
cd optimism
yarn install
yarn build
cd ops
docker-compose build
docker-compose up
```

This will take a while. 

Once the docker container is up, it should be spitting out logs constantly. 

Back in your first terminal you can now run:
```
yarn test
```

## System Overview

The Devolution DAO is built to be highly modular, with a hot swappable approach, meaning you will never have to "turn off" your DAO to upgrade it.

