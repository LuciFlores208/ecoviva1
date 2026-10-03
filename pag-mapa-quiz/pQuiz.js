const perguntas = [
    {
        pergunta: "Pode jogar óleo na pia?",
        opcoes: [
            "Sim",
            "Não"
        ],
        correta: 1,
        explicacao:"Não jogue óleo na pia! Ele pode entupir os canos e sujar os rios, machucando os peixes e outros animais. Em vez disso, coloque o óleo em uma garrafa e leve para um lugar onde ele possa ser reciclado e transformado em outras coisas úteis."

    },

    {
        pergunta: "Vidros mal embalados representam um risco para os coletores e geram acidentes?",
        opcoes: [
            "Sim",
            "Não"
        ],
        correta: 0,
        explicacao:"Sim, vidros quebrados podem machucar as pessoas que recolhem o lixo. Por isso, é importante embrulhá-los bem em papel ou colocá-los em uma caixa para que ninguém se corte."
    },

    {
        pergunta: "A sustentabilidade abrange o ambiente, sociedade e economia.",
        opcoes: [
            "Verdadeiro",
            "Falso"
        ],
        correta: 0,
        explicacao:"Sustentabilidade é cuidar do planeta, das pessoas e do dinheiro. Significa proteger a natureza, ajudar as pessoas a viverem bem e usar o dinheiro de forma inteligente, para que tudo continue bem no futuro. É como cuidar de uma planta: você dá água, sol e cuida dela para que ela cresça forte e bonita!"
    },

    {
        pergunta: "Fenômeno responsável pelo aumento da temperatura da terra.",
        opcoes: [
            "Aquecimento Global",
            "Meio Ambiente",
            "Sustentabilidade"
        ],
        correta: 0,
        explicacao:"O aquecimento global é como se a Terra estivesse ficando com um 'cobertor' muito quente. Isso acontece porque gases, como a fumaça de carros e fábricas, ficam presos no céu e não deixam o calor sair. Assim, o planeta vai ficando cada vez mais quente, o que pode fazer mal para os animais, plantas e pessoas."
    },

    {
        pergunta: "Separar o lixo orgânico (restos de alimentos, papel sujo e lixo sanitário) dos resíduos sólidos (como plástico, vidro, papel, metal e embalagens longe vida), é a forma correta de separar o lixo.",
        opcoes: [
            "Sim, pois ajuda na reciclagem.",
            "Não, isso atrapalha a reciclagem."
        ],
        correta: 0,
        explicacao:"Sim! Separar o lixo é importante. Restos de comida e papel sujo são lixo orgânico e podem virar adubo. Plástico, vidro e metal são recicláveis e podem ser transformados em novas coisas. Separando direitinho, ajudamos a natureza e evitamos mais lixo nas ruas!"
    },

    {
        pergunta: "Uma das formas de colaborar com a preservação do meio ambiente é reduzir a produção de resíduos. Mas como?",
        opcoes: [
            "Optando pela compra de produtos com embalagens recicláveis.",
            "Reutilizando os materiais e objetos sempre que possível.",
            "Apoiando iniciativas de reciclagem.",
            "Todas estão corretas"
        ],
        correta: 3,
        explicacao:"Podemos ajudar o meio ambiente fazendo menos lixo! Podemos usar coisas velhas, como frascos, e separar o lixo entre restos de comida e recicláveis, como plástico e papel. É bom comprar produtos com menos embalagem e fazer algumas coisas em casa. Ao ir ao mercado, devemos levar nossas próprias sacolas e doar brinquedos e roupas que não usamos mais. Essas pequenas atitudes ajudam a deixar o planeta mais bonito!"
    },

    {
        pergunta: "O que melhor define sustentabilidade?",
        opcoes: [
            "Suprir necessidades do presente sem esgotar recursos para o futuro.",
            "Consumir muitos recursos.",
            "Não usar energias renováveis."
        ],
        correta: 0,
        explicacao:"Sustentabilidade é como cuidar do nosso planeta e das pessoas ao mesmo tempo. Isso significa usar os recursos da Terra, como água e árvores, de forma que não acabe com eles, para que as próximas gerações também possam usá-los. Também é importante que todas as pessoas tenham uma vida boa e feliz. Então, sustentabilidade é encontrar um jeito de viver bem agora e também ajudar quem vem depois de nós!"
    },

    {
        pergunta: "Qual das opções não é uma energia renovável?",
        opcoes: [
            "Hídrica",
            "Solar",
            "Gás natural",
            "Eólica"
        ],
        correta: 2,
        explicacao:"O gás natural não é uma energia renovável porque vem debaixo da terra e leva milhões de anos para se formar, como o carvão e o petróleo. Quando usamos o gás, ele pode acabar, e não conseguimos fazer mais rapidamente. Além disso, quando queimamos o gás, ele solta gases que podem fazer o planeta esquentar. Por isso, o gás natural é considerado um recurso que pode acabar, e não algo que se renova como a energia do sol ou do vento."
    },

    {
        pergunta: "O que são os Objetivos de Desenvolvimento Sustentável (ODS)?",
        opcoes: [
            "17 objetivos propostos pela ONU para melhorar o mundo.",
            "17 objetivos para construir novas indústrias de petróleo.",
            "25 objetivos para tirar notas melhores na escola."
        ],
        correta: 0,
        explicacao:"Os Objetivos de Desenvolvimento Sustentável (ODS) são 17 metas que os países do mundo criaram para fazer do planeta um lugar melhor até 2030. Eles querem acabar com a pobreza, garantir que todas as crianças possam ir à escola, cuidar da saúde de todos e proteger a natureza. Por exemplo, um dos objetivos é ter água limpa para beber e outro é garantir que meninos e meninas sejam tratados de forma igual. Esses objetivos ajudam as pessoas a trabalharem juntas para que todos tenham uma vida boa e feliz!"
    },

    {
        pergunta: "Quais produtos são mais sustentáveis?",
        opcoes: [
            "Produtos que se decompõe facilmente compostos por elementos orgânicos",
            "Produtos Químicos.",
            "Plástico"
        ],
        correta: 0,
        explicacao:"Produtos sustentáveis ajudam o planeta e as pessoas. Eles incluem alimentos orgânicos, produtos locais, embalagens recicláveis, roupas feitas de materiais ecológicos, produtos de limpeza sem químicos perigosos e energias renováveis, como solar e eólica. Usar bolsas reutilizáveis em vez de plásticos também é uma boa prática para cuidar do meio ambiente!"
    }
];


let perguntaAtual = 0;
let pontos = 0;


let perguntaTexto = document.getElementById("pergunta");
let botoesOpcoes = document.querySelectorAll(".opcao");
let botaoProximo = document.getElementById("proximo");
let caixaExplicacao = document.getElementById("explicacao");


function carregarPergunta() {

    let pergunta = perguntas[perguntaAtual];

    perguntaTexto.textContent = pergunta.pergunta;

    botaoProximo.style.display = "none";

    caixaExplicacao.style.display = "none";
    caixaExplicacao.textContent = "";

    botoesOpcoes.forEach((botao, index) => {

        if (index < pergunta.opcoes.length) {

            botao.style.display = "block";
            botao.textContent = pergunta.opcoes[index];

            botao.disabled = false;
            botao.style.background = "#81C784";
            botao.style.color = "black";
            botao.style.transform = "scale(1)";
            botao.style.fontWeight = "normal";

            botao.onclick = () => {
                verificarResposta(index);
            };

        } else {

            botao.style.display = "none";

        }

    });

}


function verificarResposta(resposta){

    let correta = perguntas[perguntaAtual].correta;


    botoesOpcoes.forEach((botao,index)=>{

        botao.disabled = true;


        if(index === correta){

            botao.style.background = "#2E7D32";
            botao.style.color = "white";
        
        }
        
        if(index === resposta){
        
            botao.style.transform = "scale(1.08)";
            botao.style.fontWeight = "bold";
        
            if(resposta !== correta){
        
                botao.style.background = "#D81B60";
                botao.style.color = "white";
        
            }
        
        }

    });


    if(resposta === correta){
        pontos++;
    }
    
    caixaExplicacao.textContent =
        perguntas[perguntaAtual].explicacao;
    
    caixaExplicacao.style.display = "block";
    
    botaoProximo.style.display = "inline-block";

}



botaoProximo.addEventListener("click", ()=>{


    perguntaAtual++;


    if(perguntaAtual < perguntas.length){

        carregarPergunta();

    }

    else{

        finalizarQuiz();

    }


});



function finalizarQuiz(){

    document.querySelector(".quiz-box").innerHTML = `
 
    <button class="botao-voltar" onclick="history.back()">←</button>

        <header>
            <h1>🌱 Resultado</h1>
        </header>


        <div class="introducao">

            <h2>Quiz finalizado!</h2>

            <p>
                Você acertou 
                <strong>${pontos}</strong>
                de 
                <strong>${perguntas.length}</strong>
                perguntas.
            </p>


            <button id="reiniciar">
                Reiniciar Quiz
            </button>

        </div>

    `;


    document.getElementById("reiniciar").addEventListener("click", reiniciarQuiz);

}

function reiniciarQuiz(){

    perguntaAtual = 0;
    pontos = 0;


    document.querySelector(".quiz-box").innerHTML = `

    <button class="botao-voltar" onclick="history.back()">←</button>
    
        <header>
            <h1>🌱 EcoQuiz</h1>
        </header>


        <div class="introducao">
            <p>Teste seus conhecimentos sobre sustentabilidade!</p>
        </div>


        <div class="pergunta-box">

            <h2 id="pergunta"></h2>

        </div>


        <div class="opcoes">

            <button class="opcao"></button>
            <button class="opcao"></button>
            <button class="opcao"></button>
            <button class="opcao"></button>

        </div>

        <div id="explicacao" class="explicacao"></div>

        <div class="acoes">

            <button id="proximo">
                Próxima
            </button>

        </div>

    `;


    // Atualiza os elementos novos criados
    perguntaTexto = document.getElementById("pergunta");
    botoesOpcoes = document.querySelectorAll(".opcao");
    botaoProximo = document.getElementById("proximo");
    caixaExplicacao = document.getElementById("explicacao");

    // adiciona novamente o evento do botão
    botaoProximo.addEventListener("click", () => {

        perguntaAtual++;

        if(perguntaAtual < perguntas.length){
            carregarPergunta();
        }
        else{
            finalizarQuiz();
        }

    });
carregarPergunta();

}
carregarPergunta();