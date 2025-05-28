#### Prerequisites

Have foundry installed on your machine

# How to run simulation

- Add your ENV variables to the .env file (see .env.example)
- Copy your calldata from the Metri raw error in console
- Replace the selector (first 4 bytes) from `541d63c8` to `5229073f`
- Replace the target address with the address of the Metri Safe that is signing the transaction
- Run the script

```bash
source .env
forge script script/DebugCalldata.s.sol --rpc-url gnosis --etherscan-api-key ${GNOSIS_SCAN_KEY} -vvvv
```

## If you only have batch tx array list

If you are in the position where you have the batch tx array list, you can use the following script code to get the raw calldata for the entire batch userop.

```typescript
const MULTICALL_3_ADDRESS = "0xcA11bde05977b3631167028862bE2a173976CA11";

const multicallData = encodeFunctionData({
  abi: multicall3Abi,
  functionName: "aggregate3Value",
  args: [
    //where transactions is the array of transactions to be executed in sequence
    transactions.map((tx) => ({
      target: tx.to,
      allowFailure: false,
      value: tx.value ?? 0n,
      callData: tx.data,
    })),
  ],
});

console.log(multicallData, "raw calldata");
```
