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


// MENU RESPONSIVO DA HOME — SEM ALTERAR O HTML

const navHome = document.querySelector("body > header > nav");

if (navHome) {
    const logoHome = navHome.querySelector(".logo");
    const linksHome = navHome.querySelector("ul");

    if (logoHome && linksHome) {
        const telaCelular = window.matchMedia("(max-width: 640px)");
        let botaoMenu = null;

        function fecharMenu() {
            linksHome.classList.remove("menu-aberto");

            if (botaoMenu) {
                botaoMenu.textContent = "☰";
                botaoMenu.setAttribute("aria-expanded", "false");
                botaoMenu.setAttribute("aria-label", "Abrir menu");
            }
        }

        function configurarMenu() {
            if (telaCelular.matches) {
                if (!botaoMenu) {
                    botaoMenu = document.createElement("button");

                    botaoMenu.type = "button";
                    botaoMenu.className = "menu-celular";
                    botaoMenu.textContent = "☰";
                    botaoMenu.setAttribute("aria-label", "Abrir menu");
                    botaoMenu.setAttribute("aria-expanded", "false");

                    logoHome.insertAdjacentElement("afterend", botaoMenu);

                    botaoMenu.addEventListener("click", () => {
                        const aberto =
                            linksHome.classList.toggle("menu-aberto");

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

                    linksHome.querySelectorAll("a").forEach((link) => {
                        link.addEventListener("click", fecharMenu);
                    });
                }
            } else {
                fecharMenu();

                if (botaoMenu) {
                    botaoMenu.remove();
                    botaoMenu = null;
                }
            }
        }

        configurarMenu();
        telaCelular.addEventListener("change", configurarMenu);
    }
}
