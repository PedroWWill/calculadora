const tela = document.querySelector('.tela');
const botoes = document.querySelectorAll('.botao button');

let expressao = "";

// Função auxiliar para checar se o valor é um operador matemático
const isOperador = (valor) => ['+', '-', '*', '/'].includes(valor);

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
            // Evita calcular se a expressão estiver vazia
            if(expressao === "") return;
            
            try {
                let contaFormatada = expressao.replace(/X/g, '*');
                
                // Se a expressão terminar com um operador (ex: "5+"), tira ele antes de calcular
                if(isOperador(contaFormatada.slice(-1))) {
                    contaFormatada = contaFormatada.slice(0, -1);
                }

                expressao = String(eval(contaFormatada));
                tela.textContent = expressao;
            } catch (erro) {
                tela.textContent = "Erro";
                expressao = "";
            }
        } 
        // Para qualquer outro botão (números e operadores)
        else {
            // VALIDAÇÃO DE ENTRADA: Bloquear múltiplos operadores consecutivos
            if (isOperador(valorBotao)) {
                // Se a tela estiver vazia, só permite o '-' (para números negativos)
                if (expressao === "") {
                    if (valorBotao !== '-') return;
                } else {
                    const ultimoCaracter = expressao.slice(-1);
                    // Se o último caractere digitado já for um operador
                    if (isOperador(ultimoCaracter)) {
                        // Substitui o operador anterior pelo novo, ao invés de duplicar
                        expressao = expressao.slice(0, -1) + valorBotao;
                        tela.textContent = expressao;
                        return; // Para a execução do clique aqui
                    }
                }
            }

            // Adiciona o valor à expressão e atualiza a tela
            expressao += valorBotao;
            tela.textContent = expressao;
        }
    });
});