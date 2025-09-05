const TENDERLY_USER = "Johanna";
const TENDERLY_PROJECT = "testinggnosis";
const TENDERLY_ACCESS_TOKEN = "YOUR_ACCESS_TOKEN";

const SAFE_ADDRESS = "0x158a0EC28264d37b6471736f29e8F68F0C927ed5";

const transactions = [
  {
    to: "0x31f4840227a69741838b50025d1728A577807790",
    data: "0xde0e9a3e00000000000000000000000000000000000000000000000007c2fe8b38d9001c",
  },
  {
    to: "0x7147a7405fcfe5cfa30c6d5363f9f357a317d082",
    data: "0xde0e9a3e00000000000000000000000000000000000000000000000000590a83550776e4",
  },
  {
    to: "0xa0ea681f5685bfa6857d776b5acbf3d51bbecc9a",
    data: "0xde0e9a3e0000000000000000000000000000000000000000000000008dd7ffe29f9ca9fd",
  },
  {
    to: "0xc12C1E50ABB450d6205Ea2C3Fa861b3B834d13e8",
    data: "0x0d22d9b50000000000000000000000000000000000000000000000000000000000000080000000000000000000000000000000000000000000000000000000000000028000000000000000000000000000000000000000000000000000000000000004e000000000000000000000000000000000000000000000000000000000000005e0000000000000000000000000000000000000000000000000000000000000000f0000000000000000000000000afd8899bca011bb95611409f09c8efbf6b169cf000000000000000000000000158a0ec28264d37b6471736f29e8f68f0c927ed5000000000000000000000000185b136887f01e03f2e5d7a16fe9b5a577fec8e30000000000000000000000001aca75e38263c79d9d4f10df0635cc6fcfe6f02600000000000000000000000036fad3df6d61060f285061f74d26eab2b514addb0000000000000000000000003c3112b3dd7bfe0417648884789bb87870fec10c0000000000000000000000007dd9f44c7f1a6788221a92305f9e7ea790675e9b0000000000000000000000007e09438a61ba64b2866b5fefb350146f93db7959000000000000000000000000809ef3df3ef5cb2bb6381cecbaec4d17c0c1dff700000000000000000000000086533d1ada8ffbe7b6f7244f9a1b707f7f3e239b0000000000000000000000009fcb0762941bb27f8d93fabda5e8b96c1ba4d188000000000000000000000000bf57dc790ba892590c640dc27b26b2665d30104f000000000000000000000000c74bee90f4d49a9fd67803b36dc82911b11a5302000000000000000000000000dd94518d7ac055fc7313b588e5264c9e0ae841a0000000000000000000000000f1091ed8a6f72a27f97969818ba29031aa6e58bf00000000000000000000000000000000000000000000000000000000000000090000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000003e705e8fed7000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000063b71c707fdcb000000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000063b71c707fdcb00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000006378ab291b4a30000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000e8d4a510000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000e8d4a510000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000e8d4a510000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000e8d4a510000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000e8d4a51000000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000006000000000000000000000000000000000000000000000000000000000000000a0000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000003600090001000000060000000b0001000b0001000300010000000200010008000a00080005000c0005000d0007000d0004000e0004000000000000000000000000",
  },
  {
    to: "0xc12C1E50ABB450d6205Ea2C3Fa861b3B834d13e8",
    data: "0xaabd695400000000000000000000000086533d1ada8ffbe7b6f7244f9a1b707f7f3e239b000000000000000000000000000000000000000000000000000000d5c0cba0b20000000000000000000000000000000000000000000000000000000000000001",
  },
  {
    to: "0xc12C1E50ABB450d6205Ea2C3Fa861b3B834d13e8",
    data: "0xaabd69540000000000000000000000001aca75e38263c79d9d4f10df0635cc6fcfe6f026000000000000000000000000000000000000000000000000000000274ef264560000000000000000000000000000000000000000000000000000000000000001",
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
