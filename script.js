function trocarTela(id) {
  document.querySelectorAll('.screen').forEach(screen => {
    screen.classList.remove('active');
  });
  document.getElementById(id).classList.add('active');
}

function toggleSenha() {
  const senha = document.getElementById('senha');
  if (senha) {
    senha.type = senha.type === 'password' ? 'text' : 'password';
  }
}