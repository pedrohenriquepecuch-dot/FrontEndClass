// 1. Pegando os elementos da página
const form = document.getElementById('form-tarefa');
const input = document.getElementById('input-tarefa');
const lista = document.getElementById('lista-tarefas');
const mensagem = document.getElementById('mensagem');


// 2. ADICIONAR TAREFA
form.addEventListener('submit', function (evento) {
    // Impede o form de recarregar a página
    evento.preventDefault();

    // Captura o texto do input (trim tira espaços do começo e do fim)
    const texto = input.value.trim();

    // Validação: não deixa adicionar tarefa vazia
    if (texto === '') {
        mensagem.textContent = 'Digite uma tarefa antes de adicionar.';
        input.focus();
        return;
    }
    mensagem.textContent = '';

    // Cria o <li> dinamicamente
    const li = document.createElement('li');
    li.title = 'Clique para remover';

    // (Opcional) checkbox dentro de um <span> para marcar como concluída
    const spanCheck = document.createElement('span');
    spanCheck.className = 'check';

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.setAttribute('aria-label', 'Marcar "' + texto + '" como concluída');
    spanCheck.appendChild(checkbox);

    // Define o conteúdo com o texto da tarefa.
    // textContent (e não innerHTML) evita que alguém injete HTML pelo input.
    const spanTexto = document.createElement('span');
    spanTexto.className = 'texto';
    spanTexto.textContent = texto;

    li.appendChild(spanCheck);
    li.appendChild(spanTexto);

    // Adiciona o <li> na <ul>
    lista.appendChild(li);

    // Limpa o input e devolve o foco para digitar a próxima
    input.value = '';
    input.focus();
});


// 3. REMOVER / CONCLUIR TAREFA — DELEGAÇÃO DE EVENTOS
// Em vez de colocar um listener em cada <li> (que nem existem quando a
// página carrega), colocamos UM listener só na <ul>, que sempre existe.
// Quando clicamos num <li>, o evento "sobe" (bubbling) até a <ul>, e o
// event.target diz em qual elemento o clique aconteceu de verdade.
lista.addEventListener('click', function (evento) {
    const alvo = evento.target;

    // Clique no checkbox: só marca/desmarca, não remove
    if (alvo.matches('input[type="checkbox"]')) {
        const li = alvo.closest('li');
        li.classList.toggle('concluida', alvo.checked);
        return;
    }

    // Clique em qualquer outra parte do <li>: remove do DOM.
    // closest() sobe até achar o <li>, mesmo que o clique tenha sido no <span>.
    const li = alvo.closest('li');
    if (li) {
        li.remove();
    }
});
