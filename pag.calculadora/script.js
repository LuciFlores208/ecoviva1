const F = { carro:.21, onibus:.09, aviao:60, energia:.45, carne:5, vegetariano:1.5, roupa:30, eletronico:150 };
const $ = id => +document.getElementById(id).value || 0;

document.getElementById('form').addEventListener('submit', e => {
    e.preventDefault();

    const transporte  = $('carro')*F.carro + $('onibus')*F.onibus + $('aviao')*F.aviao;
    const energia     = $('energia') * F.energia;
    const alimentacao = ($('carne')*F.carne + $('vegetariano')*F.vegetariano) * 4.33;
    const consumo     = $('roupa')*F.roupa + $('eletronico')*F.eletronico/12;

    const mes = transporte + energia + alimentacao + consumo;
    const ano = mes * 12;
    const arvores = Math.ceil(ano / 20);

    const [impacto, classe] =
        mes < 200  ? ['Baixo', 'baixo'] :
        mes < 500  ? ['Médio', 'medio'] :
        mes < 1000 ? ['Alto', 'alto'] :
                     ['Muito Alto', 'muito-alto'];

    mes && Object.assign(document.getElementById('mes'),      { textContent: mes.toFixed(1) });
    Object.assign(document.getElementById('ano'),             { textContent: ano.toFixed(1) });
    Object.assign(document.getElementById('arvores'),         { textContent: arvores });
    Object.assign(document.getElementById('impacto'),         { textContent: impacto, className: `badge ${classe}` });

    const r = document.getElementById('resultado');
    r.style.display = 'block';
    r.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
});

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