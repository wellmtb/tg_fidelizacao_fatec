// Obter elementos do DOM
var searchInput = document.getElementById('searchInput');
var searchButton = document.getElementById('searchButton');

// Adicionar evento de teclado ao campo de entrada de texto
searchInput.addEventListener('keydown', function(event) {
  // Verificar se a tecla pressionada é a tecla "Enter"
  if (event.key === 'Enter') {
    // Executar a função de pesquisa ao pressionar a tecla "Enter"
    searchCustomers();
  }
});

// Adicionar evento de clique ao botão de pesquisa
searchButton.addEventListener('click', searchCustomers);

// Função de pesquisa de clientes
function searchCustomers() {
  var searchValue = searchInput.value;
  // Lógica de pesquisa de clientes...
  console.log('Realizando pesquisa:', searchValue);
  // ...
}












// script.js
document.getElementById('searchButton').addEventListener('click', searchCustomers);

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
  const valorVenda = document.getElementById('valorVenda').value;

  fetch('http://localhost:3333/sales', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ name, email, cpf, tel, valorVenda })
  })
    .then(response => response.json())
    .then(data => {
      console.log('Venda registrada:', data);
      closeModal();
      resetForm();// Obter elementos do DOM
      var searchInput = document.getElementById('searchInput');
      var searchButton = document.getElementById('searchButton');
      
      // Adicionar evento de teclado ao campo de entrada de texto
      searchInput.addEventListener('keydown', function(event) {
        // Verificar se a tecla pressionada é a tecla "Enter"
        if (event.key === 'Enter') {
          // Executar a função de pesquisa ao pressionar a tecla "Enter"
          searchCustomers();
        }
      });
      
      // Adicionar evento de clique ao botão de pesquisa
      searchButton.addEventListener('click', searchCustomers);
      
      // Função de pesquisa de clientes
      function searchCustomers() {
        var searchValue = searchInput.value;
        // Lógica de pesquisa de clientes...
        console.log('Realizando pesquisa:', searchValue);
        // ...
      }
      // Simular um clique fora do modal para fechá-lo
      document.dispatchEvent(new Event('click'));
    })
    .catch(error => {
      console.error('Erro ao registrar a venda:', error);
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
  // Selecionar o formulário e o modal
  var form = document.getElementById('myForm');
  var modal = document.getElementById('myModal');

  // Adicionar um evento de envio ao formulário
  form.addEventListener('submit', function(event) {
    event.preventDefault(); // Impedir o envio do formulário

    // Obter os dados do formulário
    var email = document.getElementById('email').value;
    var phone = document.getElementById('phone').value;

    // Enviar os dados para o servidor (substitua essa parte pelo seu código de requisição POST)

    // Exibir o alerta com a mensagem de venda registrada
    alert('Venda registrada com sucesso!');

    // Fechar o modal
    modal.style.display = 'none';
  });
});
