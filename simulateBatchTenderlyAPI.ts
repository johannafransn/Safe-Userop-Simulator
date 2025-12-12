const TENDERLY_USER = "Johanna";
const TENDERLY_PROJECT = "testinggnosis";
const TENDERLY_ACCESS_TOKEN = "YOUR_ACCESS_TOKEN";

const SAFE_ADDRESS = "0xc175a0c71f1eDA836ebbF3Ab0e32Fc8865FdEe91";

const transactions = [
  {
    to: "0x8F8B74fa13eaaff4176D061a0F98ad5c8E19c903",
    data: "0xb33dad6b000000000000000000000000a421f0375e5df3e803fbc3d6d48c0bf15178323d",
  },
  {
    to: "0xc12C1E50ABB450d6205Ea2C3Fa861b3B834d13e8",
    data: "0x75dcebc7000000000000000000000000a421f0375e5df3e803fbc3d6d48c0bf15178323d0000000000000000000000000000000000000000000000000000000000000000",
  },
];

async function simulateBundle() {
  console.log("Simulating bundle of transactions via Tenderly API...");

  // Format transactions for Tenderly API simulate-bundle
  const simulations = transactions.map((tx) => ({
    network_id: "100", // Gnosis Chain
    save: true,
    save_if_fails: true,
    simulation_type: "full",
    from: SAFE_ADDRESS,
    to: tx.to,
    input: tx.data,
    value: "0",
    estimate_gas: true,
  }));

  const apiPayload = {
    simulations: simulations,
  };

  try {
    const response = await fetch(
      `https://api.tenderly.co/api/v1/account/${TENDERLY_USER}/project/${TENDERLY_PROJECT}/simulate-bundle`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "X-Access-Key": TENDERLY_ACCESS_TOKEN,
        },
        body: JSON.stringify(apiPayload),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error("API request failed:");
      console.error("Status:", response.status);
      console.error("Status Text:", response.statusText);
      console.error("Response:", errorText);
      throw new Error(
        `API request failed: ${response.status} ${response.statusText}`
      );
    }

    const result = await response.json();

    if (result.error) {
      console.error("API error:", result.error);
      throw new Error(`API error: ${result.error.message}`);
    }

    return result.simulation_results;
  } catch (error) {
    console.error("Error in simulateBundle:", error);
    throw error;
  }
}

function formatWei(weiValue) {
  if (!weiValue) return "0";
  // Convert wei to a more readable format
  const wei = BigInt(weiValue);
  if (wei === 0n) return "0";

  const eth = Number(wei) / 1e18;
  if (eth < 0.001) {
    return `${Number(wei) / 1e9} gwei`;
  }
  return `${eth.toFixed(6)} ETH`;
}

(async () => {
  try {
    const results = await simulateBundle();

    console.log(`\nSimulation completed for ${results.length} transactions:\n`);

    results.forEach((result, index) => {
      console.log(`Transaction ${index + 1}:`);
      console.log(
        `  Status: ${result.transaction.status ? "SUCCESS" : "FAILED"}`
      );
      console.log(
        `  Gas Used: ${parseInt(result.transaction.gas_used).toLocaleString()}`
      );

      if (result.transaction.gas_price) {
        const gasPrice = BigInt(result.transaction.gas_price);
        const gasCost = gasPrice * BigInt(result.transaction.gas_used);
        console.log(`  Gas Price: ${formatWei(result.transaction.gas_price)}`);
        console.log(`  Gas Cost: ${formatWei(gasCost.toString())}`);
      }

      if (result.logs && result.logs.length > 0) {
        console.log(`  Events: ${result.logs.length} logs emitted`);
        result.logs.forEach((log, logIndex) => {
          if (log.name) {
            console.log(`    ${logIndex + 1}. ${log.name}()`);
          }
        });
      }

      if (result.asset_changes && result.asset_changes.length > 0) {
        console.log(`  Asset Changes:`);
        result.asset_changes.forEach((change, changeIndex) => {
          console.log(
            `    ${changeIndex + 1}. ${change.asset_info?.symbol || "Token"}: ${
              change.type
            } ${change.amount || change.raw_amount}`
          );
        });
      }

      if (result.balance_changes && result.balance_changes.length > 0) {
        console.log(`  Balance Changes:`);
        result.balance_changes.forEach((change, changeIndex) => {
          console.log(
            `    ${changeIndex + 1}. ${change.address}: ${formatWei(
              change.amount
            )}`
          );
        });
      }

      if (result.simulation && result.simulation.id) {
        console.log(
          `  Tenderly Link: https://dashboard.tenderly.co/${TENDERLY_USER}/${TENDERLY_PROJECT}/simulator/${result.simulation.id}`
        );
      }

      console.log("");
    });

    // Show total gas used
    const totalGas = results.reduce(
      (sum, result) => sum + parseInt(result.transaction.gas_used),
      0
    );
    console.log(`Total Gas Used: ${totalGas.toLocaleString()}`);

    // Show total cost if gas prices are available
    if (results[0]?.transaction?.gas_price) {
      const gasPrice = BigInt(results[0].transaction.gas_price);
      const totalCost = gasPrice * BigInt(totalGas);
      console.log(`Total Gas Cost: ${formatWei(totalCost.toString())}`);
    }
  } catch (err) {
    console.error("Error:", err);
  }
})();
