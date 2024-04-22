/*
Cuando se carga por primera vez pide la lista completa de pokemones
*/

let ALL_POKEMON = []
async function init() {
    // Obtener la lista de Pokémon
    ALL_POKEMON = await (await fetch('https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0')).json()
    //for(let i = 0; i < pokemon.results.length; i++){
    for (let i = 0; i < 18; i++) {
        let item = await (await fetch(ALL_POKEMON.results[i].url)).json()

        // Dibujar el elemento
        createPokemon(item, i)
    }

    // Agregar eventos para filtrado
    let lis = document.querySelectorAll('ul li')
    lis.forEach(li => {
        li.addEventListener('click', filterAndGetType)
    })
}

async function filterAndGetType(event){
    let type = Array.from(event.currentTarget.classList).pop()
    let pokemonList = await ( await fetch(`https://pokeapi.co/api/v2/type/${type}`)).json()
    let i = 0
    for(let item of pokemonList.pokemon){
        let pokemon = await (await (fetch(item.pokemon.url))).json()
        createPokemon(pokemon, i)
        i++
    }
}

function createPokemon(item, i){
    let allPokemon = document.getElementById('allPokemon')
    if(i == 0) allPokemon.innerHTML = ''
    let container = document.createElement('div')
    container.classList.add('pokemon')

    // Crear el summary
    let summary = document.createElement('div')
    summary.classList.add('summary')

    // Crear elementos del summary
    let numero = document.createElement('div')
    numero.classList.add('numero')
    numero.textContent = item.id.toString().padStart(3, '0')

    let img = document.createElement('img')
    img.src = item.sprites.other["official-artwork"].front_default
    img.alt = item.name

    // Agregar los elementos al summary
    summary.appendChild(numero)
    summary.append(img)

    // Crear el info
    let info = document.createElement('div')
    info.classList.add('info')

    // Agregar elementos del info
    let btnSound = document.createElement('button')
    btnSound.classList.add('sound')
    let iconSound = document.createElement('i')
    iconSound.classList.add('fa-solid', 'fa-volume-high')
    
    let nombre = document.createElement('div')
    nombre.classList.add('nombre')
    let pokeId = document.createElement('div')
    pokeId.classList.add('pokeId')
    pokeId.textContent = item.id.toString().padStart(3, '0')
    let spanName = document.createElement('span')
    spanName.textContent = item.name

    let types = document.createElement('div')
    types.classList.add('types')
    let spanTypes = item.types.map(u => {
        let spanChild = document.createElement('span')
        spanChild.classList.add('type', u.type.name)
        spanChild.textContent = u.type.name
        return spanChild
    })

    let stats = document.createElement('div')
    stats.classList.add('stats')
    let spanHeight = document.createElement('span')
    spanHeight.classList.add('type')
    spanHeight.textContent = item.height + 'm'
    let spanWeight = document.createElement('span')
    spanWeight.classList.add('type')
    spanWeight.textContent = item.weight + 'Kg'

    // Agregar los hijos a sus padres
    btnSound.appendChild(iconSound)
    nombre.append(pokeId, spanName)
    types.append(...spanTypes)
    stats.append(spanHeight, spanWeight)
    info.append(btnSound, nombre, types, stats)

    // Crear el árbol completo con los elementos
    container.append(summary, info)
    allPokemon.appendChild(container)
}

init()