// Obtém o formulário pelo seu ID
const formulario = document.getElementById('formularioCadastro');

// Adiciona um "ouvinte" (listener) para o evento de 'submit' (envio) do formulário
formulario.addEventListener('submit', function(event) {
    // 1. Previne o comportamento padrão de envio do formulário (que recarregaria a página)
    event.preventDefault(); 
    
    // 2. Chama a função de validação
    const ehValido = validarFormulario();
    
    // 3. Verifica o resultado da validação
    if (ehValido) {
        alert('Formulário enviado com sucesso! (Simulação de envio)');
        // Aqui você faria o envio real dos dados para o servidor (ex: fetch, axios)
        // formulario.submit(); // Se não fosse para prevenir o padrão
        formulario.reset(); // Limpa o formulário após sucesso
    } else {
        alert('Por favor, corrija os erros no formulário.');
    }
});

// Função principal de validação
function validarFormulario() {
    let valido = true;
    
    // 1. Validação do campo Nome
    const inputNome = document.getElementById('nome');
    const erroNome = document.querySelector('[data-erro="nome"]');
    
    // Verifica se o campo está vazio
    if (inputNome.value.trim() === '') {
        exibirErro(inputNome, erroNome, 'O campo Nome é obrigatório.');
        valido = false;
    } 
    // Verifica o tamanho mínimo
    else if (inputNome.value.trim().length < 3) {
        exibirErro(inputNome, erroNome, 'O nome deve ter no mínimo 3 caracteres.');
        valido = false;
    }
    else {
        // Se válido, limpa o erro
        limparErro(inputNome, erroNome);
    }
    
    // 2. Validação do campo Email
    const inputEmail = document.getElementById('email');
    const erroEmail = document.querySelector('[data-erro="email"]');
    
    // Verifica se o campo está vazio
    if (inputEmail.value.trim() === '') {
        exibirErro(inputEmail, erroEmail, 'O campo Email é obrigatório.');
        valido = false;
    } 
    // Validação básica de formato de email (Regex simples)
    else if (!validarFormatoEmail(inputEmail.value.trim())) {
        exibirErro(inputEmail, erroEmail, 'Por favor, insira um email válido (ex: seu@dominio.com).');
        valido = false;
    }
    else {
        // Se válido, limpa o erro
        limparErro(inputEmail, erroEmail);
    }

    return valido;
}

// Função auxiliar para exibir a mensagem de erro
function exibirErro(inputElemento, spanErro, mensagem) {
    inputElemento.classList.add('invalido'); // Adiciona classe para borda vermelha
    spanErro.textContent = mensagem;
    spanErro.style.display = 'block'; // Mostra a mensagem de erro
}

// Função auxiliar para limpar a mensagem de erro
function limparErro(inputElemento, spanErro) {
    inputElemento.classList.remove('invalido'); // Remove a classe de erro
    spanErro.textContent = '';
    spanErro.style.display = 'none'; // Esconde a mensagem de erro
}

// Função auxiliar para validar o formato do email
function validarFormatoEmail(email) {
    // Expressão Regular (Regex) para validação básica de email
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regexEmail.test(email);
}

// Interatividade: Limpar erro ao digitar (melhoria de UX)
const campos = document.querySelectorAll('.campo input');
campos.forEach(input => {
    input.addEventListener('input', function() {
        // Chama a validação completa ao digitar (pode ser pesado) ou uma limpeza básica
        validarFormulario(); 
        // Alternativa mais simples: apenas remover a classe 'invalido'
        // if (input.classList.contains('invalido')) {
        //     input.classList.remove('invalido');
        //     document.querySelector(`[data-erro="${input.id}"]`).style.display = 'none';
        // }
    });
});