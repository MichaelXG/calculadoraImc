"use strict";

// Recarregar a configuração padrão ao mudar adulto/criança ou menino/menina
document
  .querySelectorAll('input[name="tipo-idade"], input[name="sexo"]')
  .forEach((input) => {
    input.addEventListener("change", () => {
      limparCampos(); // Limpa todos os campos
      // Gera as idades de 2 anos até 19 anos completos
      if (document.getElementById("idade-crianca").checked) {
        generateAges(19);
      }
    });
  });

// Função para limpar todos os campos e resultados
function limparCampos() {
  // Limpar elementos de resultado
  document.querySelector(".result-imc .imcs-wrapper .imc__entre").textContent =
    "";
  document.querySelector(".result-imc .imcs-wrapper .imc__point").textContent =
    "";
  document.querySelector(".result-imc .imcs-wrapper .imc__image").innerHTML =
    "";
  document.querySelector(
    ".result-imc .imcs-wrapper .imc__description"
  ).innerHTML = "";

  // Limpar campos de peso e altura
  const pesoInput = document.getElementById("peso-comum");
  const alturaInput = document.getElementById("altura-comum");
  if (pesoInput) {
    pesoInput.value = ""; // Limpar o campo de peso
  }
  if (alturaInput) {
    alturaInput.value = ""; // Limpar o campo de altura
  }

  // Resetar a seleção de idade para "Selecione a idade" (index 0)
  resetAgeSelection();
}

function resetAgeSelection() {
  const selectedSpan = document.querySelector("#img_age .selected");
  const ageOptions = document.querySelector("#age_options");

  // Clear selected age display text
  selectedSpan.textContent = "";

  // Clear the data-value in the parent element
  const ageLabel = document.querySelector("#age_label");
  ageLabel.dataset.value = "0"; // Reset to 0

  // Optionally clear any additional selection or styles if necessary
  const options = ageOptions.querySelectorAll(".option");
  options.forEach((option) => {
    option.classList.remove("selected"); // Remove any selected class
  });
}

// Limpar os campos automaticamente ao carregar a página
window.addEventListener("load", limparCampos);

// -----------

function atualizarMensagem() {
  // Obtém o elemento de mensagem
  const mensagem = document.getElementById("mensagem-idade");

  // Obtém o valor do input selecionado no grupo "tipo-idade"
  const tipoIdade = document.querySelector(
    'input[name="tipo-idade"]:checked'
  ).value;

  // Obtém os elementos que precisam ser ajustados
  const titulo = document.getElementById("titulo-imc");
  const imcCrianca = document.getElementById("imc-crianca");
  // const pesoAlturaComum = document.getElementById("peso-altura-comum");
  const resultIMCSection = document.querySelector(
    ".result-imc .imcs-wrapper .imc__point_result"
  ); // Exibe o texto do resultado
  const descriptionIMCSection = document.querySelector(
    ".result-imc .imcs-wrapper .imc__description_result"
  );

  // Atualiza a exibição com base no tipo de idade
  if (tipoIdade === "adulto") {
    mensagem.textContent = "Acima de 19 anos";
    titulo.textContent = "IMC para Adulto";
    imcCrianca.style.display = "none"; // Oculta o seletor de idade
    resultIMCSection.textContent = `seu IMC é:`; // Exibe o IMC com duas casas decimais
    descriptionIMCSection.style.display = "block";
  } else if (tipoIdade === "crianca") {
    mensagem.textContent = "Abaixo de 19 anos";
    titulo.textContent = "Z IMC para Criança";
    imcCrianca.style.display = "block"; // Mostra o seletor de idade
    resultIMCSection.textContent = `seu escore Z IMC é:`; // Exibe o IMC com duas casas decimais
    descriptionIMCSection.style.display = "none";
  }
}

// Chama a função para exibir a configuração padrão ao carregar a página
atualizarMensagem();

// Gera o seletor de idades para crianças
const idadeSelect = document.getElementById("age_options"); // Lista de opções no seletor personalizado

function generateAges(maxAge) {
  // Add the "Selecione a idade" option with index 0
  const selectOption = document.createElement("li");
  selectOption.className = "option";
  selectOption.dataset.value = "0"; // Index 0 for "Selecione a idade"
  selectOption.textContent = "";
  idadeSelect.appendChild(selectOption);

  // Generate ages from 1 year to maxAge
  for (let year = 1; year <= maxAge; year++) {
    if (year === maxAge) {
      const li = document.createElement("li");
      li.className = "option";
      li.dataset.value = `${year}`; // Valor do ano máximo
      li.textContent = `${year} ano${year > 1 ? "s" : ""}`;
      idadeSelect.appendChild(li);
      break;
    }

    for (let month = 0; month < 12; month++) {
      let optionText = `${year} ano${year > 1 ? "s" : ""}`;
      if (month > 0) {
        optionText += ` e ${month} mês${month > 1 ? "es" : ""}`;
      }

      // Calcular o índice como um número decimal
      const indexValue = year + month / 12;
      const li = document.createElement("li");
      li.className = "option";
      li.dataset.value = indexValue.toFixed(2); // Formatar para 2 casas decimais
      li.textContent = optionText;
      idadeSelect.appendChild(li);
    }
  }
}

// Atualiza a mensagem e o IMC ao alterar a idade
document.querySelector(".plus-icon").addEventListener("click", calcular);

var result;
function calcular() {
 
  // Obter valores de peso e altura
  const weight = parseFloat(document.getElementById("peso-comum").value);
  const height = parseFloat(document.getElementById("altura-comum").value);
  const isAdult = document.getElementById("idade-adulto").checked; // Verifica se é adulto
  const isBoy = document.getElementById("sexo-menino").checked; // Verifica se é
  const age = document.querySelector("#age_label").getAttribute("data-value");

  const resultIMCSection = document.querySelector(
    ".result-imc .imcs-wrapper .imc__point_result"
  ); // Exibe o texto do resultado
  const descriptionIMCSection = document.querySelector(
    ".result-imc .imcs-wrapper .imc__description_result"
  ); // Exibe a descrição

  descriptionIMCSection.textContent = `Como chegamos ao número acima: o índice de massa corporal 
  de um adulto é o seu peso em quilos (por exemplo, 80 kg), 
  dividido por sua altura ao quadrado (vamos imaginar, 1,80 m x 1,80 m).`;

  const resultSection = document.querySelector(
    ".result-imc .imcs-wrapper .imc__point"
  ); // Exibe o texto do IMC
  const descriptionSection = document.querySelector(
    ".result-imc .imcs-wrapper .imc__description"
  ); // Exibe a descrição
  const imageSection = document.querySelector(
    ".result-imc .imcs-wrapper .imc__image"
  ); // Área para exibir a imagem
  const entreSection = document.querySelector(
    ".result-imc .imcs-wrapper .imc__entre"
  ); // Exibe o intervalo de IMC

  // Validar os inputs
  if (isNaN(weight) || isNaN(height) || weight <= 0 || height <= 0) {
    resultIMCSection.textContent = "Erro: valores inválidos.";
    descriptionIMCSection.textContent =
      "Por favor, insira um peso e altura válidos.";
      result = false;
    return;
  } else {
    console.log("result", result);
    if (result) {
      const confirmReset = confirm(
        "Já existe um resultado na tela. Deseja limpar os campos e realizar um novo cálculo?"
      );
      if (confirmReset) {
        limparCampos();
        return; // Sair da função para que o usuário possa recomeçar
      } else {
        return; // Não faz nada e sai da função
      }
    }
  }

  // Calcular IMC
  const imc = calcularIMC(weight, height);
  const zimc = calcularZIMC(weight, height, age, isBoy);

  result = imc !== 0 && zimc !== 0;
  console.log("result: " + result);

  let entreText = "";
  let resultText = "";
  let description = "";
  let imageSrc = ""; // Variável para a imagem

  // Exibir categorias para adultos
  if (isAdult) {
    if (imc <= 18.5) {
      entreText = "18,5 ou menos";
      resultText = "Abaixo do normal";
      description =
        "Procure um médico. Algumas pessoas têm um baixo peso por características do seu organismo e tudo bem. Outras podem estar enfrentando problemas, como a desnutrição. É preciso saber qual é o caso.";
      if (isBoy) {
        imageSrc = "imc_06.png.webp"; // Imagem para IMC abaixo de 18.5
      } else {
        imageSrc = "imc_m_06.png.webp"; // Imagem para IMC abaixo de 18.5
      }
    } else if (imc <= 24.9) {
      entreText = "Entre 18,6 e 24,9";
      resultText = "Normal";
      description =
        "Que bom que você está com o peso normal! E o melhor jeito de continuar assim é mantendo um estilo de vida ativo e uma alimentação equilibrada.";
      if (isBoy) {
        imageSrc = "imc_05.png.webp"; // Imagem para IMC normal
      } else {
        imageSrc = "imc_m_05.png.webp"; // Imagem para IMC normal
      }
    } else if (imc <= 29.9) {
      entreText = "Entre 25,0 e 29,9";
      resultText = "Sobrepeso";
      description =
        "Ele é, na verdade, uma pré-obesidade e muitas pessoas nessa faixa já apresentam doenças associadas, como diabetes e hipertensão. Importante rever hábitos e buscar ajuda antes de, por uma série de fatores, entrar na faixa da obesidade pra valer.";
      if (isBoy) {
        imageSrc = "imc_04.png.webp"; // Imagem para IMC de sobrepeso
      } else {
        imageSrc = "imc_m_04.png.webp"; // Imagem para IMC de sobrepeso
      }
    } else if (imc <= 34.9) {
      entreText = "Entre 30,0 e 34,9";
      resultText = "Obesidade grau I";
      description =
        "Sinal de alerta! Chegou na hora de se cuidar, mesmo que seus exames sejam normais. Vamos dar início a mudanças hoje! Cuide de sua alimentação. Você precisa iniciar um acompanhamento com nutricionista e/ou endocrinologista.";
      if (isBoy) {
        imageSrc = "imc_03.png.webp"; // Imagem para obesidade grau I
      } else {
        imageSrc = "imc_m_03.png.webp"; // Imagem para obesidade grau I
      }
    } else if (imc <= 39.9) {
      entreText = "Entre 35,0 e 39,9";
      resultText = "Obesidade grau II";
      description =
        "Mesmo que seus exames aparentem estar normais, é hora de se cuidar, iniciando mudanças no estilo de vida com o acompanhamento próximo de profissionais de saúde.";
      if (isBoy) {
        imageSrc = "imc_02.png.webp"; // Imagem para obesidade grau II
      } else {
        imageSrc = "imc_m_02.png.webp"; // Imagem para obesidade grau II
      }
    } else {
      entreText = "Acima de 40,0";
      resultText = "Obesidade grau III";
      description =
        "Aqui o sinal é vermelho, com forte probabilidade de já existirem doenças muito graves associadas. O tratamento deve ser ainda mais urgente.";
      if (isBoy) {
        imageSrc = "imc_01.png.webp"; // Imagem para obesidade grau III
      } else {
        imageSrc = "imc_m_01.png.webp"; // Imagem para obesidade grau III
      }
    }
  } else {
    // Exibir categorias para crianças
    if (zimc < -2) {
      entreText = "Abaixo de -2";
      resultText = "Abaixo do normal";
      description =
        "Uma criança abaixo do peso precisa sempre de uma boa avaliação do pediatra, o qual deve em primeiro lugar excluir a suspeita de uma desnutrição. Mas lembre-se que existem famílias com essa característica: uma magreza constitucional que, no caso, é normal. Só o médico saberá dizer.";
      imageSrc = "imc_c_04.png.webp"; // Imagem para crianças abaixo do peso
    } else if (zimc >= -2 && zimc < +1) {
      entreText = "de -2 até abaixo de +1";
      resultText = "Peso normal";
      description =
        "Legal! Estar com peso dentro da faixa da normalidade é ponto positivo para o desenvolvimento infantil. Que essa criança continue assim, apredendo a saborear desde cedo refeições ricas em vegetais e sem o consumo rotineiro de alimentos lotados de açúcar, gordura e sal. Ah, também é importante brincar, correr, fazer muita atividade física.";
      imageSrc = "imc_c_03.png.webp"; // Imagem para crianças com peso normal
    } else if (zimc >= +1 && zimc < +2) {
      entreText = "+1 até abaixo de +2";
      resultText = "Sobrepeso";
      description =
        "É a fase inicial do excesso de peso, quando ainda é mais fácil para a criança, na medida em que ela cresce,estabelecer hábitos saudáveis e manter um estado nutricional mais adequado.. Para isso, como sempre, é preciso mudar a rotina de toda a família, com a ajuda do pediatra e de um nutricionista capaz de melhorar os hábitos alimentares da casa.";
      imageSrc = "imc_c_02.png.webp"; // Imagem para crianças com sobrepeso
    } else {
      entreText = "Acima de +2";
      resultText = "Obesidade";
      description = `Infelizmente, muitas vezes os pais nem acreditam nesse resultado, pois são tantos meninos e meninas acima do peso que todos estão se acostumando com esse padrão. Sem contar que, no passado, uma criança “forte" era tida como “müito saudável". Engano. O problema é sério e o certo é procurar orientação profissional para ajustar os hábitos de toda a família. Afinal, os adultos da casa são os maiores exemplos.`;
      imageSrc = "imc_c_01.png.webp"; // Imagem para crianças com obesidade
    }
  }

  // Exibir o resultado no HTML
  if (isAdult) {
    resultIMCSection.textContent = `seu IMC é: ${imc.toFixed(2)}`; // Exibe o IMC com duas casas decimais
    descriptionSection.textContent = description; // Exibe a descrição
  } else {
    resultIMCSection.textContent = `seu escore Z IMC é: ${zimc.toFixed(2)}`; // Exibe o IMC com duas casas decimais
    descriptionSection.textContent = description; // Exibe a descrição
  }

  // Exibir o intervalo de IMC
  resultSection.textContent = resultText;
  entreSection.textContent = entreText;

  // Exibir a imagem correspondente ao resultado
  imageSection.innerHTML = `<img src="./assets/${imageSrc}" alt="Resultado IMC">`; // Exibe a imagem
}

// Função para calcular o ZIMC ajustado
function calcularZIMC(peso, altura, idade, sexo) {
  // console.log("Iniciando cálculo de ZIMC...");

  // Validar entradas
  if (!peso || !altura || !idade || sexo == null) {
    console.error(
      "Todos os parâmetros (peso, altura, idade, sexo) são obrigatórios."
    );
    return null;
  }
  if (peso <= 0 || altura <= 0) {
    console.error("Peso e altura devem ser valores positivos.");
    return null;
  }

  // Acessar os coeficientes com base no sexo
  let coeficientes;
  // Selecionar os coeficientes com base no sexo
  try {
    coeficientes = JSON.parse(
      document.querySelector(
        sexo === true ? ".coeficientesM" : ".coeficientesF"
      ).value
    );
  } catch (error) {
    console.error("Erro ao carregar os coeficientes:", error.message);
    return;
  }

  // console.log("coeficientes", coeficientes);

  // Garantir que a idade esteja no intervalo válido
  if (idade < 1 || idade > coeficientes.length) {
    console.error(
      `Idade fora do intervalo permitido: ${idade}. Permitido: 1-${coeficientes.length}.`
    );
    return null;
  }

  // Obter os coeficientes para a idade fornecida
  const coeficiente = coeficientes[idade - 1]; // Ajuste para indexação do array
  // console.log(`Coeficientes para idade ${idade}:`, coeficiente);

  // Extrair os coeficientes
  const t = coeficiente[0]; // Potência
  const s = coeficiente[1]; // Fator de ajuste inicial
  const d = coeficiente[2]; // Desvio padrão

  // Calcular o IMC
  const imc = calcularIMC(peso, altura);
  // console.log(`IMC calculado: ${imc.toFixed(6)}`);

  // Passo 1: Calcular (IMC / s)
  const razao = imc / s;
  // console.log(`Razão (IMC / s): ${razao}`);

  // Passo 2: Elevar à potência t
  const potencia = Math.pow(razao, t);
  // console.log(`Potência calculada: ${potencia}`);

  // Passo 3: Subtrair 1 do resultado
  const ajuste = potencia;
  // console.log(`Ajuste (potência - 1): ${ajuste}`);

  // Passo 4: Calcular o divisor (t * d)
  const divisor = t * d;
  // console.log(`Divisor (t * d): ${divisor}`);

  // Passo 5: Calcular o ZIMC
  const zimc = ajuste / divisor;
  // console.log(`ZIMC calculado: ${zimc.toFixed(6)}`);

  return zimc;
}

// Função auxiliar para calcular o IMC
function calcularIMC(peso, altura) {
  return peso / (altura * altura);
}

// -----------
const pesoInput = document.getElementById("peso-comum");

// Função para formatar o valor do peso
pesoInput.addEventListener("input", () => {
  // Remove quaisquer caracteres que não sejam números ou ponto decimal
  let value = pesoInput.value.replace(/[^0-9.]/g, "");

  // Garante que exista apenas um ponto decimal
  const decimalParts = value.split(".");
  if (decimalParts.length > 2) {
    value = decimalParts[0] + "." + decimalParts.slice(1).join("");
  }

  // Se o valor inclui um ponto decimal, limita a uma casa decimal
  if (value.includes(".")) {
    const [integerPart, decimalPart] = value.split(".");
    // Limita o valor após o ponto decimal a uma casa
    value = `${integerPart}.${decimalPart.substring(0, 1)}`;
  }

  // Atualiza o valor do campo com o valor formatado
  pesoInput.value = value;
});

function height_mask(input) {
  // Remove espaços em branco e caracteres que não sejam números
  let valorLimpo = input.value.replace(/\D/g, "");

  // Garante que o valor tenha no máximo 4 dígitos
  valorLimpo = valorLimpo.substring(0, 4);

  // Aplica a máscara: Parte inteira e decimal
  if (valorLimpo.length >= 3) {
    const parteInteira = valorLimpo.slice(0, -2);
    const parteDecimal = valorLimpo.slice(-2);
    input.value = `${parteInteira}.${parteDecimal}`;
  } else {
    input.value = valorLimpo; // Exibe apenas o valor limpo até formar o formato esperado
  }
}
function weight_mask(input) {
  // Remove quaisquer caracteres que não sejam números
  let valorLimpo = input.value.replace(/\D/g, "");

  if (valorLimpo.length === 1) {
    // Um único dígito, apenas exibe o valor como está
    input.value = valorLimpo;
  } else if (valorLimpo.length === 2) {
    // Dois dígitos, insere o ponto no meio
    const parteInteira = valorLimpo.charAt(0);
    const parteDecimal = valorLimpo.charAt(1);
    input.value = `${parteInteira}.${parteDecimal}`;
  } else if (valorLimpo.length >= 3) {
    // Três ou mais dígitos, insere o ponto antes do último dígito
    const parteInteira = valorLimpo.slice(0, -1);
    const parteDecimal = valorLimpo.slice(-1);
    input.value = `${parteInteira}.${parteDecimal}`;
  } else {
    // Campo vazio
    input.value = "";
  }
}

// select

var util = {
    f: {
      addStyle: function (elem, prop, val, vendors) {
        var i, ii, property, value;
        if (!util.f.isElem(elem)) {
          elem = document.getElementById(elem);
        }
        if (!util.f.isArray(prop)) {
          prop = [prop];
          val = [val];
        }
        for (i = 0; i < prop.length; i += 1) {
          var thisProp = String(prop[i]),
            thisVal = String(val[i]);
          if (typeof vendors !== "undefined") {
            if (!util.f.isArray(vendors)) {
              vendors.toLowerCase() == "all"
                ? (vendors = ["webkit", "moz", "ms", "o"])
                : (vendors = [vendors]);
            }
            for (ii = 0; ii < vendors.length; ii += 1) {
              elem.style[vendors[i] + thisProp] = thisVal;
            }
          }
          thisProp = thisProp.charAt(0).toLowerCase() + thisProp.slice(1);
          elem.style[thisProp] = thisVal;
        }
      },
      cssLoaded: function (event) {
        var child = util.f.getTrg(event);
        child.setAttribute("media", "all");
      },
      events: {
        cancel: function (event) {
          util.f.events.prevent(event);
          util.f.events.stop(event);
        },
        prevent: function (event) {
          event = event || window.event;
          event.preventDefault();
        },
        stop: function (event) {
          event = event || window.event;
          event.stopPropagation();
        },
      },
      getPath: function (cb, args) {
        GLOBAL.path = window.location.href
          .split("masterdemolition")[1]
          .replace("inc.com/admin/", "")
          .replace("inc.com/admin", "")
          .replace("#!/", "")
          .replace("#!", "")
          .replace("#/", "")
          .replace("#", "");
        if (GLOBAL.path.indexOf("?") >= 0) {
          GLOBAL.path = GLOBAL.path.split("?")[0];
        }
        if (typeof cb !== "undefined") {
          typeof args !== "undefined" ? cb(args) : cb();
        } else {
          return GLOBAL.path;
        }
      },
      getSize: function (elem, prop) {
        return parseInt(elem.getBoundingClientRect()[prop], 10);
      },
      getTrg: function (event) {
        event = event || window.event;
        if (event.srcElement) {
          return event.srcElement;
        } else {
          return event.target;
        }
      },
      isElem: function (elem) {
        return util.f.isNode(elem) && elem.nodeType == 1;
      },
      isArray: function (v) {
        return v.constructor === Array;
      },
      isNode: function (elem) {
        return typeof Node === "object"
          ? elem instanceof Node
          : elem &&
              typeof elem === "object" &&
              typeof elem.nodeType === "number" &&
              typeof elem.nodeName === "string" &&
              elem.nodeType !== 3;
      },
      isObj: function (v) {
        return typeof v == "object";
      },
      replaceAt: function (str, index, char) {
        return str.substr(0, index) + char + str.substr(index + char.length);
      },
    },
  },
  form = {
    f: {
      init: {
        register: function () {
          console.clear(); // just cuz codepen
          var child,
            children = document.getElementsByClassName("field"),
            i;
          for (i = 0; i < children.length; i += 1) {
            child = children[i];
            util.f.addStyle(child, "Opacity", 1);
          }
          children = document.getElementsByClassName("psuedo_select");
          for (i = 0; i < children.length; i += 1) {
            child = children[i];
            child.addEventListener("click", form.f.select.toggle);
          }
        },
        unregister: function () {
          //just here as a formallity
          //call this to stop all ongoing timeouts are ready the page for some sort of json re-route
        },
      },
      select: {
        blur: function (field) {
          field.classList.remove("focused");
          var child,
            children = field.childNodes,
            i,
            ii,
            nested_child,
            nested_children;
          for (i = 0; i < children.length; i += 1) {
            child = children[i];
            if (util.f.isElem(child)) {
              if (child.classList.contains("deselect")) {
                child.parentNode.removeChild(child);
              } else if (child.tagName == "SPAN") {
                if (!field.dataset.value) {
                  util.f.addStyle(child, ["FontSize", "Top"], ["16px", "32px"]);
                }
              } else if (child.classList.contains("psuedo_select")) {
                nested_children = child.childNodes;
                for (ii = 0; ii < nested_children.length; ii += 1) {
                  nested_child = nested_children[ii];
                  if (util.f.isElem(nested_child)) {
                    if (nested_child.tagName == "SPAN") {
                      if (!field.dataset.value) {
                        util.f.addStyle(
                          nested_child,
                          ["Opacity", "Transform"],
                          [0, "translateY(24px)"]
                        );
                      }
                    } else if (nested_child.tagName == "UL") {
                      util.f.addStyle(
                        nested_child,
                        ["Height", "Opacity"],
                        [0, 0]
                      );
                    }
                  }
                }
              }
            }
          }
        },
        focus: function (field) {
          field.classList.add("focused");
          var bool = false,
            child,
            children = field.childNodes,
            i,
            ii,
            iii,
            nested_child,
            nested_children,
            nested_nested_child,
            nested_nested_children,
            size = 0;
          for (i = 0; i < children.length; i += 1) {
            child = children[i];
            util.f.isElem(child) && child.classList.contains("deselect")
              ? (bool = true)
              : null;
          }
          if (!bool) {
            child = document.createElement("div");
            child.className = "deselect";
            child.addEventListener("click", form.f.select.toggle);
            field.insertBefore(child, children[0]);
          }
          for (i = 0; i < children.length; i += 1) {
            child = children[i];
            if (
              util.f.isElem(child) &&
              child.classList.contains("psuedo_select")
            ) {
              nested_children = child.childNodes;
              for (ii = 0; ii < nested_children.length; ii += 1) {
                nested_child = nested_children[ii];
                if (
                  util.f.isElem(nested_child) &&
                  nested_child.tagName == "UL"
                ) {
                  size = 0;
                  nested_nested_children = nested_child.childNodes;
                  for (iii = 0; iii < nested_nested_children.length; iii += 1) {
                    nested_nested_child = nested_nested_children[iii];
                    if (
                      util.f.isElem(nested_nested_child) &&
                      nested_nested_child.tagName == "LI"
                    ) {
                      size += util.f.getSize(nested_nested_child, "height");
                      console.log("size: " + size);
                    }
                  }
                  util.f.addStyle(
                    nested_child,
                    ["Height", "Opacity"],
                    [size + "px", 1]
                  );
                }
              }
            }
          }
        },
        selection: function (child, parent) {
          var children = parent.childNodes,
            i,
            ii,
            nested_child,
            nested_children,
            time = 0,
            value;
          if (util.f.isElem(child) && util.f.isElem(parent)) {
            parent.dataset.value = child.dataset.value;
            value = child.innerHTML;
          }
          for (i = 0; i < children.length; i += 1) {
            child = children[i];
            if (util.f.isElem(child)) {
              if (child.classList.contains("psuedo_select")) {
                nested_children = child.childNodes;
                for (ii = 0; ii < nested_children.length; ii += 1) {
                  nested_child = nested_children[ii];
                  if (
                    util.f.isElem(nested_child) &&
                    nested_child.classList.contains("selected")
                  ) {
                    if (nested_child.innerHTML) {
                      time = 1e2;
                      util.f.addStyle(
                        nested_child,
                        ["Opacity", "Transform"],
                        [0, "translateY(24px)"],
                        "all"
                      );
                    }
                    setTimeout(
                      function (c, v) {
                        c.innerHTML = v;
                        util.f.addStyle(
                          c,
                          ["Opacity", "Transform", "TransitionDuration"],
                          [1, "translateY(0px)", ".1s"],
                          "all"
                        );
                      },
                      time,
                      nested_child,
                      value
                    );
                  }
                }
              } else if (child.tagName == "SPAN") {
                util.f.addStyle(child, ["FontSize", "Top"], ["12px", "8px"]);
              }
            }
          }
        },
        toggle: function (event) {
          util.f.events.stop(event);
          var child = util.f.getTrg(event),
            children,
            i,
            parent;
          switch (true) {
            case child.classList.contains("psuedo_select"):
            case child.classList.contains("deselect"):
              parent = child.parentNode;
              break;
            case child.classList.contains("options"):
              parent = child.parentNode.parentNode;
              break;
            case child.classList.contains("option"):
              parent = child.parentNode.parentNode.parentNode;
              form.f.select.selection(child, parent);
              break;
          }
          parent.classList.contains("focused")
            ? form.f.select.blur(parent)
            : form.f.select.focus(parent);
        },
      },
    },
  };

window.onload = form.f.init.register;
