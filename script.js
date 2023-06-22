var conversoes = {
    Comprimento: {
        metros: {
            metros: function (valor) { return valor },
            centimetros: function (valor) {
                return valor * 100;
            },
            polegadas: function (valor) {
                return valor * 39.37;
            },
        },
        centimetros: {
            centimetros: function (valor) { return valor },
            metros: function (valor) {
                return valor / 100;
            },
            polegadas: function (valor) {
                return valor / 2.54;
            },
        },
        polegadas: {
            polegadas: function (valor) { return valor },
            metros: function (valor) {
                return valor / 39.37;
            },
            centimetros: function (valor) {
                return valor * 2.54;
            },
        },
    },

    Peso: {
        quilogramas: {
            quilogramas: function (valor) { return valor },
            gramas: function (valor) {
                return valor * 1000;
            },
            libras: function (valor) {
                return valor * 2.20462;
            },
        },
        gramas: {
            gramas: function (valor) { return valor },
            quilogramas: function (valor) {
                return valor / 1000;
            },
            libras: function (valor) {
                return valor * 0.00220462;
            },
        },
        libras: {
            libras: function (valor) { return valor },
            quilogramas: function (valor) {
                return valor / 2.20462;
            },
            gramas: function (valor) {
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
        alert(`${numero} ${tipoInicial} equivale a: ${conversoes[categoria][tipoInicial][tipoFinal](numero)} ${tipoFinal}.`)
    } else {
        alert(`Erro!\nVerifique se ${tipoInicial} e ${tipoFinal}\nSão da categoria: ${categoria}`);
    }
}

