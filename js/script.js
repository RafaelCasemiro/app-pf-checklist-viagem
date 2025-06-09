

const form = document.querySelector(".cursoForm");
const inputItem = document.querySelector(".idItem");
const inputMarca = document.querySelector(".idMarca");
const inputQtd = document.querySelector(".idQtd");
const tabela = document.querySelector(".lista");
let itens = JSON.parse(localStorage.getItem("viagemItens")) || [];

function salvarLocalStorage() {
  localStorage.setItem("viagemItens", JSON.stringify(itens));
}

function renderTabela() {
  let tabelaHTML = `
    <tr class="linha">
      <th class="Top">Item</th>
      <th class="Top">Marca</th>
      <th class="Top">Quantidade</th>
      <th class="Top">Ações</th>
    </tr>
  `;
  
  itens.forEach((item, index) => {
    const statusIcon = item.status === "pronto" ? "✅" : "❌";
    
    tabelaHTML += `
      <tr class="linha">
        <td class="coisa">${item.nome}</td>
        <td class="coisa">${item.marca}</td>
        <td class="coisa">${item.qtd}</td>
        <td class="acao">
          <span style="font-size: 20px;">${statusIcon}</span>
          <button class="atualiza" onclick="marcarPronto(${index})">Atualizar</button>
          <button class="remove" onclick="removerItem(${index})">Excluir</button>
        </td>
      </tr>
    `;
  });
  
  tabela.innerHTML = tabelaHTML;
}

function itemExiste(nome) {
  return itens.some(i => i.nome.toLowerCase() === nome.toLowerCase());
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  
  const nome = inputItem.value.trim();
  const marca = inputMarca.value.trim();
  const qtd = inputQtd.value.trim();
  
  if (nome.length < 2) {
    alert("O nome do item deve ter pelo menos 2 caracteres.");
    return;
  }
  
  if (itemExiste(nome)) {
    alert("Item já foi adicionado.");
    return;
  }
  
  const novoItem = {
    nome,
    marca,
    qtd,
    status: "pendente"
  };
  
  itens.push(novoItem);
  salvarLocalStorage();
  renderTabela();
  
  inputItem.value = "";
  inputMarca.value = "";
  inputQtd.value = "";
});

window.marcarPronto = (index) => {
  // Alterna entre "pronto" e "pendente"
  itens[index].status = itens[index].status === "pronto" ? "pendente" : "pronto";
  salvarLocalStorage();
  renderTabela();
};

window.removerItem = (index) => {
  if (confirm("Deseja remover este item da lista?")) {
    itens.splice(index, 1);
    salvarLocalStorage();
    renderTabela();
  }
};

renderTabela();
