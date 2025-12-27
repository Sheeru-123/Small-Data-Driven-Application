// Orders Data
let orders = [
  { id: 1, customer: "Ravi", date: "2024-12-01", amount: 1200, status: "Pending" },
  { id: 2, customer: "Anita", date: "2024-12-05", amount: 3400, status: "Shipped" },
  { id: 3, customer: "Kiran", date: "2024-12-03", amount: 900, status: "Cancelled" },
  { id: 4, customer: "Meena", date: "2024-12-07", amount: 2200, status: "Pending" }
];

let currentSort = "";

// SPA Navigation
document.querySelectorAll(".nav-link").forEach(link => {
  link.addEventListener("click", e => {
    e.preventDefault();

    document.querySelectorAll(".nav-link").forEach(l => l.classList.remove("active"));
    link.classList.add("active");

    document.querySelectorAll(".section").forEach(sec => sec.classList.remove("active"));
    document.getElementById(link.dataset.section).classList.add("active");
  });
});

// Render Table
function renderTable(data) {
  const tbody = document.getElementById("ordersTable");
  tbody.innerHTML = "";

  data.forEach(order => {
    tbody.innerHTML += `
      <tr>
        <td>${order.id}</td>
        <td>${order.customer}</td>
        <td>${order.date}</td>
        <td>₹${order.amount}</td>
        <td>${order.status}</td>
      </tr>
    `;
  });
}

// Sorting
function sortTable(key) {
  orders.sort((a, b) => {
    if (key === "amount" || key === "id") return a[key] - b[key];
    return a[key].localeCompare(b[key]);
  });
  filterData();
}

// Filters
function filterData() {
  const search = document.getElementById("searchInput").value.toLowerCase();
  const status = document.getElementById("statusFilter").value;

  let filtered = orders.filter(order =>
    order.customer.toLowerCase().includes(search)
  );

  if (status !== "All") {
    filtered = filtered.filter(order => order.status === status);
  }

  renderTable(filtered);
}

document.getElementById("searchInput").addEventListener("input", filterData);
document.getElementById("statusFilter").addEventListener("change", filterData);

// Initial Load
renderTable(orders);