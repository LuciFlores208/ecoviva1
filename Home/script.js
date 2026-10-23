function mensagem() {
    alert("🌱 Obrigado por fazer parte do EcoViva!");
}

function copiarEmail() {
    const email = document.getElementById("email").textContent;

    navigator.clipboard.writeText(email)
        .then(() => {
            alert("📋 E-mail copiado!");
        })
        .catch(() => {
            alert("❌ Não foi possível copiar o e-mail.");
        });
}

// Menu responsivo da navegação
const nav = document.querySelector("nav");

if (nav && !document.getElementById("menu-toggle")) {
    const botaoMenu = document.createElement("button");

    botaoMenu.id = "menu-toggle";
    botaoMenu.className = "menu-toggle";
    botaoMenu.type = "button";
    botaoMenu.setAttribute("aria-label", "Abrir menu");
    botaoMenu.setAttribute("aria-expanded", "false");
    botaoMenu.innerHTML = `
        <span></span>
        <span></span>
        <span></span>
    `;

    const lista = nav.querySelector("ul");

    if (lista) {
        lista.id = "nav-links";
        nav.appendChild(botaoMenu);

        botaoMenu.addEventListener("click", () => {
            const aberto = lista.classList.toggle("menu-aberto");

            botaoMenu.classList.toggle("ativo", aberto);
            botaoMenu.setAttribute("aria-expanded", aberto);
            botaoMenu.setAttribute(
                "aria-label",
                aberto ? "Fechar menu" : "Abrir menu"
            );
        });

        lista.querySelectorAll("a").forEach(link => {
            link.addEventListener("click", () => {
                lista.classList.remove("menu-aberto");
                botaoMenu.classList.remove("ativo");
                botaoMenu.setAttribute("aria-expanded", "false");
                botaoMenu.setAttribute("aria-label", "Abrir menu");
            });
        });
    }
}