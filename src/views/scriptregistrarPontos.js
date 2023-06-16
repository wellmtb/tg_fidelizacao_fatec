// Modal
const modal = document.getElementById('myModal');
const salesForm = document.getElementById('salesForm');
const closeButton = document.getElementsByClassName('close')[0];

closeButton.addEventListener('click', closeModal);
window.addEventListener('click', outsideClick);

function closeModal() {
  modal.style.display = 'none';
  salesForm.removeEventListener('submit', registerSale);
  resetForm();
}

function outsideClick(e) {
  if (e.target == modal) {
    closeModal();
  }
}

function openModal(customer) {
  document.getElementById('name').value = customer.name;
  document.getElementById('email').value = customer.email;
  document.getElementById('cpf').value = customer.cpf;
  document.getElementById('tel').value = customer.tel;

  modal.style.display = 'block';
}

function registerSale(e) {
  e.preventDefault();
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const cpf = document.getElementById('cpf').value;
  const tel = document.getElementById('tel').value;
  const option = document.querySelector('input[name="option"]:checked').value;

  fetch('/trocarPontos', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ name, email, cpf, tel, option })

    
  })
    .then(response => {
      if (response.status === 201) {
        console.log('Pontos Trocados com Sucesso');
        closeModal();
        resetForm();
      } else {
        throw new Error('Erro ao Trocar Pontos');
      }
    })
    .catch(error => {
      console.error(error);
      alert('Erro ao registrar a venda. Por favor, tente novamente mais tarde.');
    });
}

function resetForm() {
  salesForm.reset();
}

function searchCustomers() {
  const searchInput = document.getElementById('searchInput').value;
  const url = `http://localhost:3333/customers?search=${encodeURIComponent(searchInput)}`;
  fetch(url)
    .then(response => response.json())
    .then(customers => displayCustomers(customers))
    .catch(error => console.error('Erro na busca de clientes:', error));
}

function displayCustomers(customers) {
  const customerTableBody = document.querySelector('#customerTable tbody');
  customerTableBody.innerHTML = '';

  if (customers.length === 0) {
    const tableRow = customerTableBody.insertRow();
    const tableCell = tableRow.insertCell();
    tableCell.colSpan = 5;
    tableCell.textContent = 'Nenhum cliente encontrado.';
    return;
  }

  customers.forEach(customer => {
    const tableRow = customerTableBody.insertRow();
    const nameCell = tableRow.insertCell();
    const emailCell = tableRow.insertCell();
    const phoneCell = tableRow.insertCell();
    const cpfCell = tableRow.insertCell();
    const actionCell = tableRow.insertCell();

    nameCell.textContent = customer.name;
    emailCell.textContent = customer.email;
    phoneCell.textContent = customer.tel;
    cpfCell.textContent = customer.cpf;

    const actionButton = document.createElement('button');
    actionButton.textContent = 'Registrar Venda';
    actionButton.id = 'buttonRegistrarVenda';
    actionButton.addEventListener('click', () => openModal(customer));
    actionButton.addEventListener('click', () => {
      salesForm.addEventListener('submit', registerSale);
    });
    actionCell.appendChild(actionButton);
  });
}

document.addEventListener('DOMContentLoaded', function() {
  const searchButton = document.getElementById('searchButton');
  searchButton.addEventListener('click', searchCustomers);
});
