const cards = document.querySelectorAll('.card')
const status = document.querySelectorAll('.status')

for (let card of cards) {
    card.addEventListener("click", function () {
        const recipeId = card.getAttribute("id")
        window.location.href = `/main/recipes/${recipeId}`
    })
}

for (let stat of status) {
    stat.addEventListener("click", function () {
        const text = stat.innerText
        const stat_content = stat.getAttribute('id')
        
        if (text == 'Esconder') {
            if (stat_content == "ingredients-list") {
                document.getElementById("ingredients").style.display = "none"
            } else if (stat_content == "preparation-list") {
                document.getElementById("preparation").style.display = "none"
            } else {
                document.getElementById("add-info").style.display = "none"
            }
            stat.innerHTML = "Mostrar"
        } else {
            if (stat_content == "ingredients-list") {
                document.getElementById("ingredients").style.display = "initial"
            } else if (stat_content == "preparation-list") {
                document.getElementById("preparation").style.display = "initial"
            } else {
                document.getElementById("add-info").style.display = "initial"
            }
            stat.innerHTML = "Esconder"
        }
        
    })
}

document.querySelector(".add-ingredient").addEventListener("click", function addIngredients() {
    const ingredients = document.querySelector("#ingredients");
    const fieldContainer = document.querySelectorAll(".ingredient");

    const newField = fieldContainer[fieldContainer.length - 1].cloneNode(true);

    if (newField.children[0].value == "") return false;

    newField.children[0].value = "";
    ingredients.appendChild(newField);
    
})

document.querySelector(".add-step").addEventListener("click", function addSteps() {
    const ingredients = document.querySelector("#steps");
    const fieldContainer = document.querySelectorAll(".prepare");

    const newField = fieldContainer[fieldContainer.length - 1].cloneNode(true);

    if (newField.children[0].value == "") return false;

    newField.children[0].value = "";
    ingredients.appendChild(newField);
    
})