let botao = document.getElementById('btnLogar');

botao.addEventListener('click', function logar() {
  let pegaUsuario = document.getElementById('usuario').value;
  let pegaSenha = document.getElementById('senha').value;

  fetch('http://localhost:3333/users')
    .then(response => response.json())
    .then(usuarios => {
      let usuarioEncontrado = usuarios.find(usuario => usuario.email === pegaUsuario && usuario.password === pegaSenha);

      if (usuarioEncontrado) {
        // Redirecionar para a rota /home
        window.location.href = '/home';
      } else {
        alert('Email ou senha inválidos!');
      }
    })
    .catch(error => {
      console.error('Erro ao realizar a requisição:', error);
    });
});
