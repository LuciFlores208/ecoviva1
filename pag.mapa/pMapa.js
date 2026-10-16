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

