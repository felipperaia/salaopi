function toggleDescricao(button) {
    const descricao = button.nextElementSibling.nextElementSibling;
    const descricaoAberta = document.querySelectorAll('.descricao-servico');
    
    descricaoAberta.forEach(function(descricaoItem) {
        if (descricaoItem !== descricao) {
            descricaoItem.style.display = 'none';
        }
    });
    
    descricao.style.display = (descricao.style.display === 'block') ? 'none' : 'block';
}

document.addEventListener('click', function(event) {
    const descricaoItems = document.querySelectorAll('.descricao-servico');
    descricaoItems.forEach(function(descricao) {
        if (!descricao.contains(event.target) && !event.target.classList.contains('btn-servico')) {
            descricao.style.display = 'none';
        }
    });
});
