#### Prerequisites

Have foundry installed on your machine

## Why this is needed

```
Failed to execute transaction: Execution reverted with reason: UserOperation reverted during simulation with reason: 0x.
Request Arguments:
callData:     0x541d63c8000000....000
```

Have you ever encountered this generic userop error? It is a pain to debug because the call could include a number of different transactions to different contracts.

This script is a quick way to debug the calldata and simulate the userop and get exact revert reason and which transaction is causing the issue.

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
const MULTISEND_ADDRESS = "0xA238CBeb142c10Ef7Ad8442C6D1f9E89e07e7761";

export const encodeMultiSendTransactions = (
    transactions: MultiSendTransaction[]
) => {
    return concat(
        transactions.map(({ op, to, value, data }) =>
            encodePacked(
                ["uint8", "address", "uint256", "uint256", "bytes"],
                [op, to, value ?? 0n, BigInt(size(data)), data as `0x${string}`]
            )
        )
    );
};

const multisendCalldata encodeFunctionData({
        abi: MultiSendContractABI,
        functionName: "multiSend",
        args: [encodeMultiSendTransactions(transactions)],
})

console.log(multisendCalldata, "raw calldata");
```
