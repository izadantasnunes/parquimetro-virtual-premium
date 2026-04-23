class Parquimetro {
  constructor(valor) {
    this.valor = Number(valor);
  }

  calcularTempo() {
    if (this.valor < 1) {
      return {
        valido: false,
        mensagem: "Valor insuficiente. O valor mínimo é R$ 1,00."
      };
    }

    if (this.valor >= 3) {
      return {
        valido: true,
        tempo: 120,
        troco: this.valor - 3
      };
    }

    if (this.valor >= 1.75) {
      return {
        valido: true,
        tempo: 60,
        troco: this.valor - 1.75
      };
    }

    return {
      valido: true,
      tempo: 30,
      troco: this.valor - 1
    };
  }
}

const inputValor = document.getElementById("valor");
const botaoCalcular = document.getElementById("calcular");
const resultado = document.getElementById("resultado");

function formatarMoeda(valor) {
  return valor.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL"
  });
}

function calcularParquimetro() {
  const valorDigitado = inputValor.value;
  const parquimetro = new Parquimetro(valorDigitado);
  const calculo = parquimetro.calcularTempo();

  resultado.classList.remove("sucesso", "erro");

  if (!valorDigitado || Number(valorDigitado) <= 0) {
    resultado.textContent = "Digite um valor válido para continuar.";
    resultado.classList.add("erro");
    return;
  }

  if (!calculo.valido) {
    resultado.textContent = calculo.mensagem;
    resultado.classList.add("erro");
    return;
  }

  resultado.innerHTML = `Tempo liberado: ${calculo.tempo} minutos<br>Troco: ${formatarMoeda(calculo.troco)}`;
  resultado.classList.add("sucesso");
}

botaoCalcular.addEventListener("click", calcularParquimetro);

inputValor.addEventListener("keyup", function (evento) {
  if (evento.key === "Enter") {
    calcularParquimetro();
  }
});
