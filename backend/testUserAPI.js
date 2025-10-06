// testApi.js
import axios from "axios";

const API_URL = "http://localhost:5000/api/users"; // ✅ Change port if needed

// Test signup
async function testSignup() {
  try {
    const res = await axios.post(`${API_URL}/signup`, {
      username: "TestUser",
      email: "testuser@example.com",
      password: "123456",
    });
    console.log("✅ Signup successful:", res.data);
  } catch (err) {
    if (err.response) {
      console.log("❌ Signup error:", err.response.data);
    } else {
      console.log("❌ Signup failed:", err.message);
    }
  }
}

// Test login
async function testLogin() {
  try {
    const res = await axios.post(`${API_URL}/login`, {
      email: "testuser@example.com",
      password: "123456",
    });
    console.log("✅ Login successful:", res.data);
  } catch (err) {
    if (err.response) {
      console.log("❌ Login error:", err.response.data);
    } else {
      console.log("❌ Login failed:", err.message);
    }
  }
}

// Run tests sequentially
(async () => {
  console.log("🚀 Testing signup...");
  await testSignup();

  console.log("\n🚀 Testing login...");
  await testLogin();
})();
