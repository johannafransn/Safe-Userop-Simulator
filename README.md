#### Prerequisites

Have foundry installed on your machine

### How to run simulation

- Add your ENV variables to the .env file (see .env.example)
- Copy your calldata from the Metri raw error in console
- Replace the selector (first 4 bytes) from `541d63c8` to `5229073f`
- Replace the target address with the address of the Metri Safe that is signing the transaction
- Run the script

```bash
source .env
forge script script/DebugCalldata.s.sol --rpc-url gnosis --etherscan-api-key ${GNOSIS_SCAN_KEY} -vvvv
```
