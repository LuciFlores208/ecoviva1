const inputPergunta = document.getElementById('pergunta');
const btnEnviar = document.getElementById('enviar');
const areaResposta = document.getElementById('resposta');

async function enviarPergunta() {
    const pergunta = inputPergunta.value.trim();

    if (!pergunta) {
        areaResposta.innerHTML =
            '<span class="erro">❌ Por favor, digite uma pergunta.</span>';
        return;
    }

    btnEnviar.disabled = true;

    areaResposta.innerHTML =
        '<span class="loading">Capy está pensando...</span>';

    try {
        const response = await fetch('http://localhost:3000/api/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                pergunta: pergunta
            })
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(
                data.erro || 'Erro desconhecido ao conversar com a Capy.'
            );
        }

        areaResposta.innerHTML = data.resposta;

    } catch (error) {

        areaResposta.innerHTML =
            `<span class="erro">❌ ${error.message}</span>`;

        console.error('Erro no chat:', error);

    } finally {

        btnEnviar.disabled = false;

        inputPergunta.value = '';

        inputPergunta.focus();
    }
}

btnEnviar.addEventListener('click', enviarPergunta);

inputPergunta.addEventListener('keydown', (e) => {

    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        enviarPergunta();
    }

});

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


/* MENU RESPONSIVO PADRÃO ECOVIVA */

const navCapy = document.querySelector("body > header > nav");

if (navCapy) {
    const logoCapy = navCapy.querySelector(".logo");
    const linksCapy = navCapy.querySelector("ul");

    if (logoCapy && linksCapy) {
        const telaCelularCapy = window.matchMedia("(max-width: 640px)");
        let botaoMenuCapy = null;

        function fecharMenuCapy() {
            linksCapy.classList.remove("menu-aberto");

            if (botaoMenuCapy) {
                botaoMenuCapy.textContent = "☰";
                botaoMenuCapy.setAttribute("aria-expanded", "false");
                botaoMenuCapy.setAttribute("aria-label", "Abrir menu");
            }
        }

        function configurarMenuCapy() {
            if (telaCelularCapy.matches) {
                if (!botaoMenuCapy) {
                    botaoMenuCapy = document.createElement("button");
                    botaoMenuCapy.type = "button";
                    botaoMenuCapy.className = "menu-celular";
                    botaoMenuCapy.textContent = "☰";
                    botaoMenuCapy.setAttribute("aria-label", "Abrir menu");
                    botaoMenuCapy.setAttribute("aria-expanded", "false");

                    logoCapy.insertAdjacentElement("afterend", botaoMenuCapy);

                    botaoMenuCapy.addEventListener("click", () => {
                        const aberto = linksCapy.classList.toggle("menu-aberto");

                        botaoMenuCapy.textContent = aberto ? "✕" : "☰";
                        botaoMenuCapy.setAttribute("aria-expanded", String(aberto));
                        botaoMenuCapy.setAttribute(
                            "aria-label",
                            aberto ? "Fechar menu" : "Abrir menu"
                        );
                    });

                    linksCapy.querySelectorAll("a").forEach(link => {
                        link.addEventListener("click", fecharMenuCapy);
                    });
                }
            } else {
                fecharMenuCapy();

                if (botaoMenuCapy) {
                    botaoMenuCapy.remove();
                    botaoMenuCapy = null;
                }
            }
        }

        configurarMenuCapy();
        telaCelularCapy.addEventListener("change", configurarMenuCapy);
    }
}
