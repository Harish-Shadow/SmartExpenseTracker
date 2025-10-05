import fetch from "node-fetch";

const API_URL = "http://localhost:5000/api/users"; // your backend port

// Helper function to make requests easily
async function request(endpoint, method = "GET", body = null, token = null) {
  const headers = { "Content-Type": "application/json" };
  if (token) headers["Authorization"] = `Bearer ${token}`;

  const res = await fetch(`${API_URL}${endpoint}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Request failed");
  return data;
}

async function runTests() {
  try {
    console.log("🧪 Starting tests...");

    // 1️⃣ SIGNUP
    console.log("\n➡️  Creating a new user...");
    const newUser = {
      username: "testuser",
      email: `test${Math.floor(Math.random() * 10000)}@mail.com`,
      password: "test1234",
    };
    const signupRes = await request("/signup", "POST", newUser);
    console.log("✅ Signup:", signupRes.message);

    // 2️⃣ LOGIN
    console.log("\n➡️  Logging in...");
    const loginRes = await request("/login", "POST", {
      email: newUser.email,
      password: newUser.password,
    });
    console.log("✅ Login:", loginRes.message);
    const token = loginRes.data.token;

    // 3️⃣ GET CURRENT USER
    console.log("\n➡️  Fetching user info...");
    const meRes = await request("/me", "GET", null, token);
    console.log("✅ Current user:", meRes.data.user);

    // 4️⃣ (Optional) DELETE USER – only if you created a route for it
    // console.log("\n➡️  Deleting user...");
    // await request(`/delete/${meRes.data.user.id}`, "DELETE", null, token);
    // console.log("✅ User deleted!");

    console.log("\n🎉 All tests completed successfully!");
  } catch (err) {
    console.error("❌ Test failed:", err.message);
  }
}

runTests();
