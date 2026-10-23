const imagens = [
    "./africaEco1.jpg",
    "./asiaEco1.jpg",
    "./europaEco1.jpg",
    "./amazonia1.jpg",
    "./foto1.jpg",
    "./ods1.jpg",
    "./paises1.jpg"
];

let atual = 0;

const foto1 = document.getElementById("foto1");
const foto2 = document.getElementById("foto2");
const foto3 = document.getElementById("foto3");

const proximo = document.getElementById("proximo");
const anterior = document.getElementById("anterior");


function atualizarGaleria() {

    foto1.src = imagens[(atual - 1 + imagens.length) % imagens.length];

    foto2.src = imagens[atual];

    foto3.src = imagens[(atual + 1) % imagens.length];


    foto1.classList.remove("ativa");

    foto2.classList.add("ativa");

    foto3.classList.remove("ativa");
}


proximo.onclick = () => {

    atual = (atual + 1) % imagens.length;

    atualizarGaleria();

};


anterior.onclick = () => {

    atual = (atual - 1 + imagens.length) % imagens.length;


function mensagem() {
    alert("🌱 Obrigado por fazer parte do EcoViva!");
}

    atualizarGaleria();

};


atualizarGaleria();


/* TROCA AUTOMÁTICA DAS IMAGENS */

setInterval(() => {

    atual = (atual + 1) % imagens.length;

    atualizarGaleria();

}, 4000);


/* ABRIR IMAGEM AMPLIADA */

const modal = document.getElementById("modalImagem");
const imagemAberta = document.getElementById("imagemAberta");
const fechar = document.getElementById("fechar");

const fotos = [foto1, foto2, foto3];

fotos.forEach(foto => {
    foto.addEventListener("click", () => {
        imagemAberta.src = foto.src;
        imagemAberta.alt = foto.alt;

        modal.classList.add("aberta");
    });
});

// Fechar pelo X
fechar.onclick = () => {
    modal.classList.remove("aberta");
};

// Fechar clicando fora da imagem
modal.onclick = (evento) => {
    if (evento.target === modal) {
        modal.classList.remove("aberta");
    }
};


/* COPIAR E-MAIL */


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


/* MENU RESPONSIVO — MAPA */
const navMapa = document.querySelector("body > header > nav");

if (navMapa) {
    const logoMapa = navMapa.querySelector(".logo");
    const linksMapa = navMapa.querySelector("ul");

    if (logoMapa && linksMapa) {
        const telaCelular = window.matchMedia("(max-width: 640px)");
        let botaoMenu = null;

        function fecharMenuMapa() {
            linksMapa.classList.remove("menu-aberto");

            if (botaoMenu) {
                botaoMenu.textContent = "☰";
                botaoMenu.setAttribute("aria-expanded", "false");
                botaoMenu.setAttribute("aria-label", "Abrir menu");
            }
        }

        function configurarMenuMapa() {
            if (telaCelular.matches) {
                if (!botaoMenu) {
                    botaoMenu = document.createElement("button");
                    botaoMenu.type = "button";
                    botaoMenu.className = "menu-celular";
                    botaoMenu.textContent = "☰";
                    botaoMenu.setAttribute("aria-label", "Abrir menu");
                    botaoMenu.setAttribute("aria-expanded", "false");

                    logoMapa.insertAdjacentElement("afterend", botaoMenu);

                    botaoMenu.addEventListener("click", () => {
                        const aberto =
                            linksMapa.classList.toggle("menu-aberto");

                        botaoMenu.textContent = aberto ? "✕" : "☰";
                        botaoMenu.setAttribute(
                            "aria-expanded",
                            String(aberto)
                        );
                        botaoMenu.setAttribute(
                            "aria-label",
                            aberto ? "Fechar menu" : "Abrir menu"
                        );
                    });

                    linksMapa.querySelectorAll("a").forEach(link => {
                        link.addEventListener("click", fecharMenuMapa);
                    });
                }
            } else {
                fecharMenuMapa();

                if (botaoMenu) {
                    botaoMenu.remove();
                    botaoMenu = null;
                }
            }
        }

        configurarMenuMapa();
        telaCelular.addEventListener("change", configurarMenuMapa);
    }
}
