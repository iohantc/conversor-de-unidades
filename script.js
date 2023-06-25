// Inicialização do objeto conversoes que contém todas as funções de conversão para cada tipo de unidade em cada categoria
var conversoes = {
    // Cada propriedade do objeto é uma categoria de conversão (Comprimento, Peso, Temperatura)
    Comprimento: {
        // Dentro de cada categoria, temos tipos de unidade específicos (Metros, Centimetros, Polegadas)
        Metros: {
            // Para cada unidade, temos funções de conversão para todas as outras unidades na mesma categoria. Isso se repete em todas as outras categorias
            Metros: function (valor) { return valor },
            Centimetros: function (valor) {
                return valor * 100;
            },
            Polegadas: function (valor) {
                return valor * 39.37;
            },
        },
        Centimetros: {
            Centimetros: function (valor) { return valor },
            Metros: function (valor) {
                return valor / 100;
            },
            Polegadas: function (valor) {
                return valor / 2.54;
            },
        },
        Polegadas: {
            Polegadas: function (valor) { return valor },
            Metros: function (valor) {
                return valor / 39.37;
            },
            Centimetros: function (valor) {
                return valor * 2.54;
            },
        },
    },

    Peso: {
        Quilogramas: {
            Quilogramas: function (valor) { return valor },
            Gramas: function (valor) {
                return valor * 1000;
            },
            Libras: function (valor) {
                return valor * 2.20462;
            },
        },
        Gramas: {
            Gramas: function (valor) { return valor },
            Quilogramas: function (valor) {
                return valor / 1000;
            },
            Libras: function (valor) {
                return valor * 0.00220462;
            },
        },
        Libras: {
            Libras: function (valor) { return valor },
            Quilogramas: function (valor) {
                return valor / 2.20462;
            },
            Gramas: function (valor) {
                return valor * 453.592;
            },
        },
    },

    Temperatura: {
        Celsius: {
            Celsius: function (valor) { return valor },
            Fahrenheit: function (valor) {
                return (valor * 9 / 5) + 32;
            },
            Kelvin: function (valor) {
                return valor + 273.15;
            },
        },
        Fahrenheit: {
            Fahrenheit: function (valor) { return valor },
            Celsius: function (valor) {
                return (valor - 32) * 5 / 9;
            },
            Kelvin: function (valor) {
                return (valor - 32) * 5 / 9 + 273.15;
            },
        },
        Kelvin: {
            Kelvin: function (valor) { return valor },
            Celsius: function (valor) {
                return valor - 273.15;
            },
            Fahrenheit: function (valor) {
                return (valor - 273.15) * 9 / 5 + 32;
            },
        },
    },
};

// Quando o valor do elemento com id 'categoria' muda, atualiza as opções de unidades disponíveis
document.getElementById("categoria").addEventListener('change', function() {
    // Pega o valor da categoria selecionada
    var categoria = this.value;
    // Encontra os elementos drop-down para as unidades de conversão inicial e final
    var opcoes1 = document.getElementById("opcoes1");
    var opcoes2 = document.getElementById("opcoes2");

    // Limpa as opções anteriores
    opcoes1.innerHTML = '';
    opcoes2.innerHTML = '';

    // Para cada unidade na categoria selecionada, adiciona uma opção para a unidade aos elementos do select
    for (var unidade in conversoes[categoria]) {
        opcoes1.options.add(new Option(unidade, unidade));
        opcoes2.options.add(new Option(unidade, unidade));
    }
});

// Função para converter uma unidade para outra quando o formulário é submetido
function converter(event) {
    // Impede que o formulário seja submetido normalmente, o que recarregaria a página
    event.preventDefault();

    // Pega os valores dos campos do formulário
    var categoria = document.getElementById("categoria").value;
    var numero = parseFloat(document.getElementById("numero").value);
    var tipoInicial = document.getElementById("opcoes1").value;
    var tipoFinal = document.getElementById("opcoes2").value;

    // Verifica se o que foi pedido está dentro da categoria. 
    // 'categoria in conversoes' verifica se a categoria escolhida (por exemplo, Comprimento, Peso, Temperatura) existe no objeto 'conversoes'.
    // 'tipoInicial in conversoes[categoria]' verifica se a unidade inicial escolhida (por exemplo, Metros, Quilogramas, Celsius) existe na categoria selecionada no objeto 'conversoes'.
    // 'tipoFinal in conversoes[categoria][tipoInicial]' verifica se a unidade final escolhida (por exemplo, Centimetros, Gramas, Fahrenheit) é uma unidade válida para a conversão da unidade inicial na categoria escolhida.
    if (categoria in conversoes && tipoInicial in conversoes[categoria] && tipoFinal in conversoes[categoria][tipoInicial]) {
        resultado.style.backgroundColor = "#FFB491"; // Altera a cor de fundo
        resultado.style.borderColor = "#001845"; // Altera a cor da borda
        resultado.style.animation = "mostrar 1s forwards"; // Aplica a animação
        resultado.innerHTML = `${numero} ${tipoInicial} equivale a: ${conversoes[categoria][tipoInicial][tipoFinal](numero)} ${tipoFinal}.`
    } else {
        resultado.style.backgroundColor = "#FFB491"; // Altera a cor de fundo
        resultado.style.borderColor = "#001845"; // Altera a cor da borda
        resultado.style.animation = "mostrar 1s forwards"; // Aplica a animação
        resultado.innerHTML =`Erro!\nVerifique se ${tipoInicial} e ${tipoFinal}\nSão da categoria: ${categoria}` // Retorna erro caso o usuário, de alguma maneira mágica, consiga pedir para converter um tipo incompatível
    }
}
