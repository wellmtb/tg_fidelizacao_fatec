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