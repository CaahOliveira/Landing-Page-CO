function getProjects() {
    const urlGitHub = 'https://api.github.com/users/CaahOliveira/repos';
    const loadingElement = document.getElementById('loading');
    const listElement = document.getElementById('my-projects-list');

    if (loadingElement) {
        loadingElement.style.display = 'block'; // Mostra o elemento de carregamento
    }

    fetch(urlGitHub, {
        method: 'GET',
    })
    .then((response) => {
        if (!response.ok) {
            throw new Error(`Erro na requisição: ${response.statusText}`);
        }
        return response.json();
    })
    .then((data) => {
        if (loadingElement) {
            loadingElement.style.display = 'none'; // Esconde o elemento de carregamento
        }
        showProjects(data);
    })
    .catch((error) => {
        console.error('Erro ao buscar projetos:', error);
        if (loadingElement) {
            loadingElement.style.display = 'none'; // Esconde o elemento de carregamento em caso de erro
        }
    });
}

function showProjects(data) {
    const listElement = document.getElementById('my-projects-list');

    if (!listElement) {
        console.error('Elemento de lista não encontrado!');
        return;
    }

    // Limpa a lista antes de adicionar novos projetos
    listElement.innerHTML = '';

    data.forEach((project) => {
        const a = document.createElement('a');
        a.href = project.clone_url;
        a.target = '_blank';
        a.title = project.description || 'Sem descrição';
        const linkText = document.createTextNode(project.name);
        a.appendChild(linkText);

        const li = document.createElement('li'); // Adiciona o link em um item de lista
        li.appendChild(a);
        listElement.appendChild(li);
    });
}

// Chama a função para buscar os projetos
getProjects();
