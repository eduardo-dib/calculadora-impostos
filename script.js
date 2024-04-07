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

    var aliquotaNominal = (temFolha === "sim" && percentualFolha > 28) ?
        (receita <= 180000 ? 6 :
            (receita <= 360000 ? 11.2 :
                (receita <= 720000 ? 13.5 :
                    (receita <= 1800000 ? 16 :
                        (receita <= 3600000 ? 21 :
                            (receita <= 4800000 ? 33 : 33)))))) :
        (receita <= 180000 ? 15 :
            (receita <= 360000 ? 18 :
                (receita <= 720000 ? 19.5 :
                    (receita <= 1800000 ? 22 :
                        (receita <= 3600000 ? 25.5 :
                            (receita <= 4800000 ? 28.5 : 30.5))))));

    var deducaoParcela = (temFolha === "sim" && percentualFolha > 28) ?
        (receita <= 180000 ? 0 :
            (receita <= 360000 ? 9360 :
                (receita <= 720000 ? 17640 :
                    (receita <= 1800000 ? 35640 :
                        (receita <= 3600000 ? 125640 : 648000))))) :
        (receita <= 180000 ? 0 :
            (receita <= 360000 ? 4500 :
                (receita <= 720000 ? 9900 :
                    (receita <= 1800000 ? 17100 :
                        (receita <= 3600000 ? 62100 : 540000)))));

    var deducaoEfetiva = (receita * deducaoParcela) / 100;
    var impostoDevido = receita * (aliquotaNominal / 100) - deducaoEfetiva;

    return impostoDevido;
}


function calcularImpostoLucroPresumido(receita) {
    var receitaTributavel = receita;
    const valorIrpj = receitaTributavel * (4.8/100);
    const valorCll= receitaTributavel * (2.88/100);
    const valorPis = receitaTributavel * (0.65/100);
    const valorCofins = receitaTributavel * (3/100);
    const somaTotal = valorIrpj + valorCll + valorPis + valorCofins;
    return somaTotal;
}

function calcularImpostoLucroPresumidoIssNormal(receita) {
    var receitaTributavel = receita;
    const valorIrpj = receitaTributavel * (4.8/100);
    const valorCll = receitaTributavel * (2.88/100);
    const valorPis = receitaTributavel * (0.65/100);
    const valorCofins = receitaTributavel * (3/100);
    const valorIss = receitaTributavel * (5/100);
    const somaTotal = valorIrpj + valorCll + valorPis + valorCofins + valorIss;
    return somaTotal;
}