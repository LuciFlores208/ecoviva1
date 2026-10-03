let biblioteca = [];

let tipoSelecionado = "Todos";
let statusSelecionado = "Todos";


// =========================
// CARREGAR OS JSONs
// =========================

Promise.all([
    fetch("pBiblioteca.json").then(r => r.json()),
    fetch("pNoticias.json").then(r => r.json()),
    fetch("pTutoriais.json").then(r => r.json())
])

.then(([bibliotecaDados, noticiasDados, tutoriaisDados]) => {

    biblioteca = [
        ...bibliotecaDados,
        ...noticiasDados,
        ...tutoriaisDados
    ];

    const statusSalvos = JSON.parse(
        localStorage.getItem("bibliotecaStatus") || "{}"
    );
    
    biblioteca.forEach(item => {
        const statusSalvo =
            statusSalvos[`${item.tipo}_${item.id}`];
    
        if (statusSalvo) {
            item.status = statusSalvo;
        }
    });

    renderizarCards();

})

.catch(erro => {
    console.log("Erro ao carregar os arquivos:", erro);
});


// =========================
// BUSCA
// =========================

document.addEventListener("DOMContentLoaded", () => {

    const campoBusca = document.getElementById("busca");

    campoBusca.addEventListener("input", () => {

        renderizarCards();

    });

});


// =========================
// FILTRAR POR TIPO
// =========================

function filtrarTipo(tipo) {

    tipoSelecionado = tipo;

    document
        .querySelectorAll("[data-tipo]")
        .forEach(botao => {

            botao.classList.remove("ativo");

        });

    const botaoSelecionado =
        document.querySelector(`[data-tipo="${tipo}"]`);

    if (botaoSelecionado) {

        botaoSelecionado.classList.add("ativo");

    }

    renderizarCards();
}


// =========================
// FILTRAR POR STATUS
// =========================

function filtrarStatus(status) {

    statusSelecionado = status;

    document
        .querySelectorAll("[data-status]")
        .forEach(botao => {

            botao.classList.remove("ativo");

        });

    const botaoSelecionado =
        document.querySelector(`[data-status="${status}"]`);

    if (botaoSelecionado) {

        botaoSelecionado.classList.add("ativo");

    }

    renderizarCards();
}


// =========================
// RENDERIZAR CARDS
// =========================

function renderizarCards() {

    const container = document.getElementById("cards");

    if (!container) return;


    // Layout dos tutoriais

    if (tipoSelecionado === "Tutorial") {

        container.classList.add("tutoriais");

    } else {

        container.classList.remove("tutoriais");

    }


    const campoBusca =
        document.getElementById("busca");

    const textoBusca =
        campoBusca.value.toLowerCase();


    container.innerHTML = "";


    // FILTROS

    const resultados = biblioteca.filter(item => {

        const buscaValida =
            item.titulo
                .toLowerCase()
                .includes(textoBusca);


        const tipoValido =
            tipoSelecionado === "Todos"

                ? item.tipo !== "Noticia"

                : item.tipo === tipoSelecionado;


        const statusValido =
            statusSelecionado === "Todos" ||

            (item.status &&
             item.status === statusSelecionado);


        return buscaValida &&
               tipoValido &&
               statusValido;

    });


    // SEM RESULTADOS

    if (resultados.length === 0) {

        container.innerHTML = `
            <p class="sem-resultados">
                Nenhum resultado encontrado.
            </p>
        `;

        return;
    }


    // CRIAR CARDS

    let html = "";

    resultados.forEach(item => {


        // =========================
        // NOTÍCIAS
        // =========================

        if (item.tipo === "Noticia") {

            html += `

                <a
                    class="card-noticia"
                    href="${item.link}"
                    target="_blank"
                    rel="noopener noreferrer">

                    <img
                        src="${item.imagem}"
                        loading="lazy"
                        decoding="async"
                        alt="${item.titulo}">

                    <h3>
                        ${item.titulo}
                    </h3>

                    <p>
                        Clique para acessar o portal
                    </p>

                </a>

            `;

        }


        // =========================
        // TUTORIAIS
        // =========================

        else if (item.tipo === "Tutorial") {

            html += `

                <div class="card-tutorial">

                    <a
                        class="tutorial-link"
                        href="${item.link}"
                        target="_blank"
                        rel="noopener noreferrer">

                        <div class="video-circle">
                            <span>▶</span>
                        </div>

                        <h3>
                            ${item.titulo}
                        </h3>

                    </a>


                    <div class="status-card">

                        <label>
                            Status:
                        </label>

                        <select onchange="alterarStatus(${item.id}, this)"> 
                        <option value="" ${!item.status ? "selected" : ""}> Selecione... </option> 
                        <option value="Quero ler" ${item.status === "Quero ler" ? "selected" : ""}> Quero ler </option> 
                        <option value="Lendo" ${item.status === "Lendo" ? "selected" : ""}> Lendo </option> 
                        <option value="Lido" ${item.status === "Lido" ? "selected" : ""}> Lido </option> 
                        </select>

                    </div>

                </div>

            `;

        }


        // =========================
        // ARTIGOS E LIVROS
        // =========================

        else {

            html += `

                <div class="card">

                    ${
                        item.imagem

                        ? `
                            <img
                                src="${item.imagem}"
                                loading="lazy"
                                decoding="async"
                                alt="${item.titulo}">
                        `

                        : `
                            <div class="sem-imagem">
                                📄
                            </div>
                        `
                    }


                    <div class="card-conteudo">

                        <h3>
                            ${item.titulo}
                        </h3>


                        <p>
                            ${item.descricao}
                        </p>


                        <div class="tipo">
                            ${item.tipo}
                        </div>


                        <div class="status-card">

                            <label>
                                Status:
                            </label>

                            <select onchange="alterarStatus(${item.id}, this)"> 
                            <option value="" ${!item.status ? "selected" : ""}> Selecione... </option> 
                            <option value="Quero ler" ${item.status === "Quero ler" ? "selected" : ""}> Quero ler </option> 
                            <option value="Lendo" ${item.status === "Lendo" ? "selected" : ""}> Lendo </option> 
                            <option value="Lido" ${item.status === "Lido" ? "selected" : ""}> Lido </option> 
                            </select>

                        </div>


                        <button
                            class="btn-abrir"
                            onclick="window.open('${item.arquivo}', '_blank')">

                            Abrir arquivo

                        </button>

                    </div>

                </div>

            `;

        }

    });

    container.innerHTML = html;

}


// =========================
// ALTERAR STATUS
// =========================

function alterarStatus(idLivro, select) {

    const livro = biblioteca.find(
        item => item.id === idLivro
    );

    if (!livro) return;

    // Recupera os status salvos
    const statusSalvos = JSON.parse(
        localStorage.getItem("bibliotecaStatus") || "{}"
    );

    const chave = `${livro.tipo}_${livro.id}`;

    // =========================
    // REMOVER STATUS
    // =========================

    if (select.value === "") {

        // Remove o status do item
        delete livro.status;

        // Remove o status do localStorage
        delete statusSalvos[chave];

        localStorage.setItem(
            "bibliotecaStatus",
            JSON.stringify(statusSalvos)
        );

        // Volta para "Selecione..."
        select.value = "";

        // Volta a aparência normal
        select.style.background = "#E9ECEF";

        return;
    }

    // =========================
    // SALVAR STATUS
    // =========================

    livro.status = select.value;

    statusSalvos[chave] = select.value;

    localStorage.setItem(
        "bibliotecaStatus",
        JSON.stringify(statusSalvos)
    );

    // =========================
    // CORES
    // =========================

    if (select.value === "Lido") {

        select.style.background = "#D8F3DC";

    } else if (select.value === "Lendo") {

        select.style.background = "#FFF3BF";

    } else if (select.value === "Quero ler") {

        select.style.background = "#E9ECEF";
    }
}


// =========================
// COPIAR E-MAIL
// =========================

function copiarEmail() {

    const email =
        document.getElementById("email").textContent;

    navigator.clipboard.writeText(email)

        .then(() => {

            alert("📋 E-mail copiado!");

        })

        .catch(() => {

            alert("❌ Não foi possível copiar o e-mail.");

        });

}

