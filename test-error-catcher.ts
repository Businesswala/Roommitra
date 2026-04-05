import { dbCall } from "./src/lib/db-utils";

async function testErrorCatcher() {
  console.log("--- Testing Universal Error Handler ---");
  
  const { data, error } = await dbCall(async (prisma) => {
    console.log("Executing operation...");
    throw new Error("Simulated Database Connection Failure (Antigravity Test)");
  }, "Simulated Connection Test");

  if (error) {
    console.log("SUCCESS: Captured Error Message ->", error);
  } else {
    console.log("FAILED: No error captured. Data:", data);
  }
}

testErrorCatcher()
  .then(() => console.log("--- Test Complete ---"))
  .catch((e) => console.error("FATAL TEST ERROR:", e));
