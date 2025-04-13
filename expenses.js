
const userId = localStorage.getItem('userId');

async function fetchExpenses() {
  const res = await fetch(`http://localhost:5000/api/expenses/${userId}`);
  const data = await res.json();
  const list = document.getElementById('expenseList');
  list.innerHTML = '<h3>All Expenses:</h3>' + data.map(e => `
    <div style="padding: 10px; border-bottom: 1px solid #ccc;">
      <strong>${e.title}</strong> - ₹${e.amount} <em>(${e.category})</em>
    </div>
  `).join('');
}

fetchExpenses();

document.getElementById('expenseForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const title = e.target.title.value;
  const amount = e.target.amount.value;
  const category = e.target.category.value;

  await fetch('http://localhost:5000/api/expenses', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userId, title, amount, category })
  });

  fetchExpenses();
  e.target.reset();
});
