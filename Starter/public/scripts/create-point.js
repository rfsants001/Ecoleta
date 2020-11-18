function populateUfs(){
    const ufSelect = document.querySelector("select[name=uf]");

    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
        .then( res => res.json())
        .then( states => {
            for(state of states) {
                ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
            }
        } );
};

populateUfs();

function getCities(event){
    const citySelect = document.querySelector("[name=city]");
    const stateInput = document.querySelector("[name=state]");

    const ufValue = event.target.value;

    const indexOfSelectedState = event.target.selectedIndex;
    stateInput.value = event.target.options[indexOfSelectedState].text;

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`;

    citySelect.innerHTML = "<option value>Selecione a Cidade</option>";
    citySelect.disabled = false;

    fetch(url)
        .then( res => res.json())
        .then( cities => {
            for(city of cities) {
                citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
            }

            citySelect.disabled = false;
        } );

}

document
    .querySelector("select[name=uf]")
    .addEventListener("change", getCities);


// Itens de coleta

const itemsToCollect = document.querySelectorAll(".items-grid li");

for (item of itemsToCollect){
    item.addEventListener("click", handleSelectedItem);
}

const collectedItems = document.querySelector("input[name=items]");

let selectedItems = [];

function handleSelectedItem(event){
    const itemLi = event.target;

    //add or remove class
    itemLi.classList.toggle("selected");
    
    const itemId = itemLi.dataset.id;

    const alreadySelected = selectedItems.findIndex(item => item == itemId); //verifica se existe itens selecionado

    if(alreadySelected >= 0){ //se ja estiver selecionado
        const filteredItems = selectedItems.filter( item => item != itemId);
        selectedItems = filteredItems;
    } else { //se não estiver selecionado
        selectedItems.push(itemId)
    }

    collectedItems.value = selectedItems;
}