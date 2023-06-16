// Script.js
let totalVendas = 0;
let totalPontos = 0;

document.getElementById('searchButton').addEventListener('click', searchCustomers);

function searchCustomers() {
  const searchInput = document.getElementById('searchInput').value;
  const url = `http://localhost:3333/sales?search=${encodeURIComponent(searchInput)}`;
  fetch(url)
    .then(response => response.json())
    .then(customers => consolidateData(customers))
    .then(consolidatedData => displayCustomers(consolidatedData))
    .catch(error => console.error('Erro na busca de clientes:', error));
}

function consolidateData(customers) {
  return new Promise((resolve, reject) => {
    totalVendas = 0;
    totalPontos = 0;
    const consolidatedData = customers.reduce((consolidated, current) => {
      const existingUser = consolidated.find(user => user.email === current.email);
      if (existingUser) {
        existingUser.totalCompras += parseFloat(current.valorVenda);
        existingUser.totalPontos += parseFloat(current.Pontos);
      } else {
        consolidated.push({
          name: current.name,
          email: current.email,
          tel: current.tel,
          cpf: current.cpf,
          totalCompras: parseFloat(current.valorVenda),
          totalPontos: parseFloat(current.Pontos)
        });
      }
      totalVendas += parseFloat(current.valorVenda);
      totalPontos += parseFloat(current.Pontos);
      return consolidated;
    }, []);
    resolve(consolidatedData);
  });
}

function displayCustomers(customers) {
  const customerTableBody = document.querySelector('#customerTable tbody');
  customerTableBody.innerHTML = '';

  if (customers.length === 0) {
    const tableRow = customerTableBody.insertRow();
    const tableCell = tableRow.insertCell();
    tableCell.colSpan = 6;
    tableCell.textContent = 'Nenhum cliente encontrado.';
    return;
  }

  customers.forEach(customer => {
    const tableRow = customerTableBody.insertRow();
    const nameCell = tableRow.insertCell();
    const emailCell = tableRow.insertCell();
    const phoneCell = tableRow.insertCell();
    const cpfCell = tableRow.insertCell();
    const totalSalesCell = tableRow.insertCell();
    const totalPointsCell = tableRow.insertCell();
    const actionCell = tableRow.insertCell();

    nameCell.textContent = customer.name;
    emailCell.textContent = customer.email;
    phoneCell.textContent = customer.tel;
    cpfCell.textContent = customer.cpf;
    totalSalesCell.textContent = formatCurrency(customer.totalCompras);
    totalPointsCell.textContent = formatThousands(customer.totalPontos);

    const actionButton = document.createElement('button');
    actionButton.textContent = 'Trocar Pontos';
    actionButton.addEventListener('click', () => openModal(customer));
    actionButton.addEventListener('click', () => {
      salesForm.addEventListener('submit', registerSale);
    });
    actionCell.appendChild(actionButton);
  });

  // Exibir totais no consolidado
  document.getElementById('totalVendas').textContent = `Total de Vendas: ${formatCurrency(totalVendas)}`;
  document.getElementById('totalPontos').textContent = `Total de Pontos: ${formatThousands(totalPontos)}`;
}

function updatePoints(customerId, points) {
  const customerTableBody = document.querySelector('#customerTable tbody');
  const rows = customerTableBody.getElementsByTagName('tr');
  for (let i = 0; i < rows.length; i++) {
    const row = rows[i];
    const customerIdCell = row.cells[3]; // Assuming the customerId is in the fourth column (index 3)
    if (customerIdCell.textContent === customerId) {
      const pointsCell = row.cells[5]; // Assuming the points column is the sixth column (index 5)
      pointsCell.textContent = formatThousands(points);
      break;
    }
  }
}

// Função para formatar um valor numérico como moeda (Reais)
function formatCurrency(value) {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
}

// Função para formatar um valor numérico com separação de milhares
function formatThousands(value) {
  return new Intl.NumberFormat('pt-BR').format(value);
}


function logout() {
  window.location.href = '/';
  console.log('Logout realizado');
}

