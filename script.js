function calcularImpostos() {
    var receita = parseFloat(document.getElementById("receita").value);
    var folha = parseFloat(document.getElementById("folha").value);
    var temFolha = document.getElementById("temFolha").value;

    var impostoSimplesNacional = calcularImpostoSimplesNacional(receita, folha, temFolha);
    var impostoLucroPresumido = calcularImpostoLucroPresumido(receita, folha);
    var impostoLucroPresumidoIssNormal = calcularImpostoLucroPresumidoIssNormal(receita);

    var resultado = document.getElementById("resultado");
    resultado.innerHTML = "Imposto Simples Nacional: R$ " + impostoSimplesNacional.toFixed(2) + "<br>";
    resultado.innerHTML += "Imposto Lucro Presumido ISS Fixo: R$ " + impostoLucroPresumido.toFixed(2) + "<br>";
    resultado.innerHTML += "Imposto Lucro Presumido ISS Normal: R$ " + impostoLucroPresumidoIssNormal.toFixed(2);
}

function calcularImpostoSimplesNacional(receita, folha, temFolha) {
    var percentualFolha = folha / receita * 100;

    var aliquotaNominal = 0;
    var deducaoParcela = 0;

    if (temFolha === "sim" && percentualFolha > 28) {
        if (receita <= 180000) {
            aliquotaNominal = 6;
            deducaoParcela = 0;
        } else if (receita > 180000 && receita <= 360000) {
            aliquotaNominal = 11.2;
            deducaoParcela = 9360;
        } else if (receita <= 720000) {
            aliquotaNominal = 13.5;
            deducaoParcela = 17640;
        } else if (receita <= 1800000) {
            aliquotaNominal = 16;
            deducaoParcela = 35640;
        } else if (receita <= 3600000) {
            aliquotaNominal = 21;
            deducaoParcela = 125640;
        } else if (receita <= 4800000) {
            aliquotaNominal = 33;
            deducaoParcela = 648000;
        } else {
            aliquotaNominal = 33;
            deducaoParcela = 648000;
        }
    } else {
        if (receita <= 180000) {
            aliquotaNominal = 15;
            deducaoParcela = 0;
        } else if (receita <= 360000) {
            aliquotaNominal = 18;
            deducaoParcela = 4500;
        } else if (receita <= 720000) {
            aliquotaNominal = 19.5;
            deducaoParcela = 9900;
        } else if (receita <= 1800000) {
            aliquotaNominal = 22;
            deducaoParcela = 17100;
        } else if (receita <= 3600000) {
            aliquotaNominal = 25.5;
            deducaoParcela = 62100;
        } else if (receita <= 4800000) {
            aliquotaNominal = 28.5;
            deducaoParcela = 540000;
        } else {
            aliquotaNominal = 30.5;
            deducaoParcela = 720000;
        }
    }

    var deducaoEfetiva = (receita * deducaoParcela) / 100;
    var impostoDevido = receita * (aliquotaNominal / 100) - deducaoEfetiva;

    return impostoDevido;
}

function calcularImpostoLucroPresumido(receita) {
    var receitaTributavel = receita;
    var valorIrpj = receitaTributavel * (4.8/100);
    var valorCll = receitaTributavel * (2.88/100);
    var valorPis = receitaTributavel * (0.65/100);
    var valorCofins = receitaTributavel * (3/100);
    var somaTotal = valorIrpj + valorCll + valorPis + valorCofins;
    return somaTotal;
}

function calcularImpostoLucroPresumidoIssNormal(receita) {
    var receitaTributavel = receita;
    var valorIrpj = receitaTributavel * (4.8/100);
    var valorCll = receitaTributavel * (2.88/100);
    var valorPis = receitaTributavel * (0.65/100);
    var valorCofins = receitaTributavel * (3/100);
    var valorIss = receitaTributavel * (5/100);
    var somaTotal = valorIrpj + valorCll + valorPis + valorCofins + valorIss;
    return somaTotal;
}