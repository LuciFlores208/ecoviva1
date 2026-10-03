const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 3000;



const OLLAMA_URL = 'http://localhost:11434/api/chat';
const MODELO = 'llama3.2';


app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, '../frontend')));


app.get('/api/health', (req, res) => {
    res.json({
        status: 'online',
        message: '🦫 Capy está pronta para ajudar!',
        modelo: MODELO,
        timestamp: new Date().toISOString()
    });
});


app.post('/api/chat', async (req, res) => {

    const { pergunta } = req.body;

   

    if (!pergunta || pergunta.trim() === '') {
        return res.status(400).json({
            erro: 'Por favor, digite uma pergunta válida.'
        });
    }

    try {


        const contexto = `
Você é a Capy, uma capivara muito simpática e inteligente que trabalha no projeto EcoViva.

Você é especialista em:
- sustentabilidade
- meio ambiente
- ecologia
- preservação da natureza
- mudanças climáticas

CARACTERÍSTICAS:

- Fale de forma carinhosa e divertida, como uma capivara amigável.
- Use emojis 🦫🌿🌍 para tornar a conversa mais leve.
- Sempre comece com um cumprimento amigável.
- Dê respostas educativas e informativas.
- Ofereça dicas práticas de sustentabilidade quando possível.
- Seja positiva e encorajadora.
- Responda sempre em português brasileiro.

REGRAS:

1. Mantenha o foco em sustentabilidade e meio ambiente.
2. Se perguntarem sobre algo fora do tema, redirecione educadamente para sustentabilidade.
3. Use exemplos práticos do dia a dia.
4. Incentive ações positivas para o planeta.
5. Explique assuntos de maneira simples e fácil de entender.
6. Não invente informações.
7. Não diga que você é o Ollama. Você é a Capy.

PERGUNTA DO USUÁRIO:

${pergunta}
`;
        const respostaOllama = await fetch(OLLAMA_URL, {
            method: 'POST',

            headers: {
                'Content-Type': 'application/json'
            },

            body: JSON.stringify({
                model: MODELO,

                messages: [
                    {
                        role: 'user',
                        content: contexto
                    }
                ],

                stream: false,

                options: {
                    temperature: 0.9,
                    top_k: 40,
                    top_p: 0.95
                }
            })
        });

        if (!respostaOllama.ok) {

            const erroOllama = await respostaOllama.text();

            console.error('❌ Erro retornado pelo Ollama:');
            console.error(erroOllama);

            return res.status(500).json({
                erro: 'Não consegui conversar com o Ollama. Verifique se ele está funcionando.',
                detalhe: erroOllama
            });
        }


        const dados = await respostaOllama.json();

        const texto = dados.message?.content;

        if (!texto) {

            return res.status(500).json({
                erro: 'A Capy não conseguiu gerar uma resposta.'
            });
        }


        const respostaFormatada = texto.replace(/\n/g, '<br>');


        res.json({
            resposta: respostaFormatada,
            timestamp: new Date().toISOString()
        });

    } catch (error) {

        console.error('❌ Erro ao conectar com o Ollama:', error);

        let mensagemErro =
            'Desculpe, tive um probleminha técnico! 😅 Tente novamente.';

        if (
            error.code === 'ECONNREFUSED' ||
            error.message.includes('fetch failed')
        ) {

            mensagemErro =
                '🦫 Não consegui encontrar o Ollama! Verifique se o Ollama está aberto no seu computador.';
        }

        res.status(500).json({
            erro: mensagemErro,
            detalhe: error.message
        });
    }
});


app.use((req, res) => {

    res.status(404).json({
        erro: 'Rota não encontrada. Use /api/chat para enviar mensagens.'
    });

});

app.listen(PORT, () => {

    console.log('\n🦫 ==================================');
    console.log('   EcoViva - Capy está online!');
    console.log('==================================');
    console.log(`📍 Servidor: http://localhost:${PORT}`);
    console.log(`💬 Chat: http://localhost:${PORT}`);
    console.log(`📡 Health: http://localhost:${PORT}/api/health`);
    console.log(`🤖 Ollama: ${OLLAMA_URL}`);
    console.log(`🧠 Modelo: ${MODELO}`);
    console.log('==================================\n');

});
