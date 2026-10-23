// IA FOI UTILIZADA AQUI!!!
// 1. Seleciona a tela da calculadora e todos os botões
const tela = document.querySelector('.tela');
const botoes = document.querySelectorAll('.botao button');

// Variável para guardar a expressão ou número atual
let expressao = "";

// 2. Passa por cada botão para "ouvir" quando ele for clicado
botoes.forEach(botao => {
    botao.addEventListener('click', () => {
        const valorBotao = botao.textContent;

        // Se o botão for 'C', limpa a tela
        if (valorBotao === 'C') {
            expressao = "";
            tela.textContent = "";
        } 
        // Se o botão for '=', calcula o resultado
        else if (valorBotao === '=') {
            try {
                // ATENÇÃO: Substituímos o 'X' por '*' para o JavaScript entender a multiplicação
                let contaFormatada = expressao.replace(/X/g, '*');
                
                // O eval calcula a string como código matemático (ex: "2+2")
                expressao = eval(contaFormatada);
                tela.textContent = expressao;
            } catch (erro) {
                tela.textContent = "Erro";
                expressao = "";
            }
        } 
        // Para qualquer outro botão (números e operadores), junta na tela
        else {
            expressao += valorBotao;
            tela.textContent = expressao;
        }
    });
});