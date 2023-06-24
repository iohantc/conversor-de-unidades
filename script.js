var conversoes = {
    Comprimento: {
        Metros: {
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

document.getElementById("categoria").addEventListener('change', function() {
    var categoria = this.value;
    var opcoes1 = document.getElementById("opcoes1");
    var opcoes2 = document.getElementById("opcoes2");

    opcoes1.innerHTML = '';
    opcoes2.innerHTML = '';

    for (var unidade in conversoes[categoria]) {
        opcoes1.options.add(new Option(unidade, unidade));
        opcoes2.options.add(new Option(unidade, unidade));
    }
});

function converter(event) {
    event.preventDefault();

    var categoria = document.getElementById("categoria").value;
    var numero = parseFloat(document.getElementById("numero").value);
    var tipoInicial = document.getElementById("opcoes1").value;
    var tipoFinal = document.getElementById("opcoes2").value;

    if (categoria in conversoes && tipoInicial in conversoes[categoria] && tipoFinal in conversoes[categoria][tipoInicial]) {
        saidaTexto.innerHTML = `${numero} ${tipoInicial} equivale a: ${conversoes[categoria][tipoInicial][tipoFinal](numero)} ${tipoFinal}.`
    } else {
        saidaTexto.innerHTML =`Erro!\nVerifique se ${tipoInicial} e ${tipoFinal}\nSão da categoria: ${categoria}`
    }
}

var saidaTexto = document.getElementById("saidaTexto");
