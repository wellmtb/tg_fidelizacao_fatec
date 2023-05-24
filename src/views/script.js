
function enviarFormulario(event) {
  // Evitar o redirecionamento da página
  event.preventDefault();

  // Enviar o formulário
  // ...

  // Exibir mensagem de confirmação
  alert('O formulário foi enviado com sucesso.');

  // Limpar os campos do formulário
  var formulario = document.getElementById('RegistrarVenda');
  formulario.reset();
}

// Adicionar o evento de envio do formulário
var formulario = document.getElementById('RegistrarVenda');
formulario.addEventListener('submit', enviarFormulario);


 // Função para renderizar os dados na tabela
 function renderizarDados(dados) {
  var tabela = document.getElementById("dados-table").getElementsByTagName('tbody')[0];

  for (var i = 0; i < dados.length; i++) {
    var linha = tabela.insertRow(i);

    var celulaId = linha.insertCell(0);
    var celulaNome = linha.insertCell(1);
    var celulaCpf = linha.insertCell(2);
    var celulaTelefone = linha.insertCell(3);

    celulaId.innerHTML = dados[i].id;
    celulaNome.innerHTML = dados[i].nome;
    celulaCpf.innerHTML = dados[i].cpf;
    celulaTelefone.innerHTML = dados[i].tel;
  }
}
/*
// Fazer a requisição à API
fetch('http://localhost:3333/customers')
  .then(function(response) {
    return response.json();
  })
  .then(function(data) {
    // Chamar a função para renderizar os dados na tabela
    renderizarDados(data);
  })
  .catch(function(error) {
    console.log('Ocorreu um erro:', error);
  });



    function BuscarUsuario() {
      // Faz a requisição usando o fetch
      const url = 'http://localhost:3333/users'
      fetch(url)
        .then(function(response) {
          // Verifica se a resposta da requisição está ok
          if (response.ok) {
            // Converte a resposta para JSON
            return response.json();
          }
          // Em caso de erro, lança uma exceção
          throw new Error('Erro na requisição.');
        })
        .then(function(data) {
          // Manipula os dados retornados pela requisição
          console.log(data);
        })
        .catch(function(error) {
          // Trata qualquer erro ocorrido durante a requisição
          console.log(error);
        });
    }

    */
    document.getElementById('searchButton').addEventListener('click', searchUsers);

    function searchUsers() {
      const searchInput = document.getElementById('searchInput').value;
      const url = `https://localhost:3333/users?termo=${encodeURIComponent(searchInput)}`;
    
      fetch(url)
        .then(response => response.json())
        .then(users => displayUsers(users))
        .catch(error => console.error('Erro na busca de usuários:', error));
    }
    
    function displayUsers(users) {
      const userList = document.getElementById('userList');
      userList.innerHTML = '';
    
      if (users.length === 0) {
        const listItem = document.createElement('li');
        listItem.textContent = 'Nenhum usuário encontrado.';
        userList.appendChild(listItem);
        return;
      }
    
      users.forEach(user => {
        const listItem = document.createElement('li');
        listItem.textContent = `Nome: ${user.nome}, E-mail: ${user.email}, Telefone: ${user.tel}, CPF: ${user.cpf}`;
        userList.appendChild(listItem);
      });
    }