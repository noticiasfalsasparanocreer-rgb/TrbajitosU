const products = [];

const form = document.getElementById('product-form');
const tableBody = document.getElementById('product-table-body');
const yearElement = document.getElementById('year');

function formatCurrency(value) {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0
  }).format(value);
}

function renderProducts() {
  tableBody.innerHTML = '';

  if (!products.length) {
    const emptyRow = document.createElement('tr');
    emptyRow.className = 'empty-row';
    emptyRow.innerHTML = '<td colspan="3">Sin productos registrados</td>';
    tableBody.appendChild(emptyRow);
    return;
  }

  products.forEach(({ name, price, stock }) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${name}</td>
      <td>${formatCurrency(price)}</td>
      <td>${stock}</td>
    `;
    tableBody.appendChild(row);
  });
}

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const formData = new FormData(form);
  const name = formData.get('name').trim();
  const price = parseFloat(formData.get('price'));
  const stock = parseInt(formData.get('stock'), 10);

  if (!name || Number.isNaN(price) || Number.isNaN(stock)) {
    return;
  }

  products.push({ name, price, stock });
  renderProducts();
  form.reset();
  form.querySelector('#name').focus();
});

// Initialize year
yearElement.textContent = new Date().getFullYear();

// Initialize map
const map = L.map('map').setView([7.8939, -72.5078], 13);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

L.marker([7.8939, -72.5078])
  .addTo(map)
  .bindPopup('<strong>Ejemplo Tienda de Barrio</strong><br>Cúcuta, Colombia');

renderProducts();
