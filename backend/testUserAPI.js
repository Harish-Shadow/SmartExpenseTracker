import axios from "axios";

// Base URL of your backend
const API_URL = "http://localhost:5000/api/expenses";

// Replace this with a valid user_id from your database
const TEST_USER_ID = "1";

// ➕ Test Add Expense via API
async function testAddExpense() {
  try {
    // Note: POST goes to /add to match your routes
    const res = await axios.post(`${API_URL}/add`, {
      user_id: TEST_USER_ID,
      title: "Test Expense via API",
      amount: 500,
      category: "Food",
      date: "2025-10-07"
    });
    console.log("✅ Expense added via API:", res.data);
    return res.data[0].id; // Supabase insert returns an array
  } catch (err) {
    if (err.response) {
      console.error("❌ Add expense API error:", err.response.data);
    } else {
      console.error("❌ Add expense API failed:", err.message);
    }
  }
}

// 📋 Test Get Expenses via API
async function testGetExpenses() {
  try {
    const res = await axios.get(API_URL, {
      params: { user_id: TEST_USER_ID }
    });
    console.log("✅ Expenses fetched via API:");
    console.table(res.data);
  } catch (err) {
    if (err.response) {
      console.error("❌ Fetch expenses API error:", err.response.data);
    } else {
      console.error("❌ Fetch expenses API failed:", err.message);
    }
  }
}

// ❌ Test Delete Expense via API
async function testDeleteExpense(id) {
  try {
    const res = await axios.delete(`${API_URL}/${id}`);
    console.log("✅ Expense deleted via API (ID:", id, ")");
  } catch (err) {
    if (err.response) {
      console.error("❌ Delete expense API error:", err.response.data);
    } else {
      console.error("❌ Delete expense API failed:", err.message);
    }
  }
}

// Run all tests sequentially
(async () => {
  console.log("🚀 Testing Add Expense via API...");
  const expenseId = await testAddExpense();

  console.log("\n🚀 Fetching All Expenses via API...");
  await testGetExpenses();

  if (expenseId) {
    console.log("\n🚀 Testing Delete Expense via API...");
    await testDeleteExpense(expenseId);
  }
})();
