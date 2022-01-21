const pokeCard = document.getElementById('poke-card')
const pokeName = document.getElementById('poke-name')
const imgContainer = document.getElementById('img-container')
const pokeImg =document.getElementById('poke-img')
const pokeId = document.getElementById('poke-id')
const pokeTypes = document.getElementById('poke-types')
const pokeStats = document.getElementById('poke-stats')
const sad = document.getElementById('icono')

const typeColors = {
    electric: '#FFEA70',
    normal: '#B09398',
    fire: '#FF675C',
    water: '#0596C7',
    ice: '#AFEAFD',
    rock: '#999799',
    flying: '#7AE7C7',
    grass: '#4A9681',
    psychic: '#FFC6D9',
    ghost: '#561D25',
    bug: '#A2FAA3',
    poison: '#795663',
    ground: '#D2B074',
    dragon: '#DA627D',
    steel: '#1D8A99',
    fighting: '#2F2F2F',
    default: '#2A1A1F',
};

const searchPokemon = event =>{
    event.preventDefault();
    const { value } = event.target.pokemon;
    fetch(`https://pokeapi.co/api/v2/pokemon/${value.toLowerCase()}`)
        .then(data => data.json())
        .then(response => renderPokemonData(response))
        .catch(err => renderNotFound())
}
const renderPokemonData = data => {
    const sprite =  data.sprites.front_default;
    const { stats, types } = data;
    console.log(types[0].type.name)
    // console.log(type.type.name)
    
    let nombrePokemon = data.name;
    pokeName.textContent = nombrePokemon.toUpperCase();
    pokeImg.setAttribute('src', sprite);
    pokeId.textContent = `Nº ${data.id}`;

    setCardColor(types);
    renderPokemonTypes(types);
    renderPokemonStats(stats);
    changeColor(types);
}
const setCardColor = types => {
    const colorOne = typeColors[types[0].type.name];
    const colorTwo = types[1] ? typeColors[types[1].type.name] : typeColors.default;
    pokeImg.style.background =  `radial-gradient(${colorTwo} 33%, ${colorOne} 33%)`;
    pokeImg.style.backgroundSize = ' 5px 5px';
}
const renderPokemonTypes = types => {
    pokeTypes.innerHTML = '';
    types.forEach(type => {//en types busca a type
        const typeTextElement = document.createElement("div");
        console.log(type.type.name);//busca el nonmbre del tipo de pokemon y para su color
        typeTextElement.style.background = typeColors[type.type.name];
        typeTextElement.textContent = type.type.name;
        pokeTypes.appendChild(typeTextElement);
    });
}
const renderPokemonStats = stats => {
    pokeStats.innerHTML = '';
    stats.forEach(stat => {
        console.log(stat)
        const statElement = document.createElement("div");
        const statElementName = document.createElement("div");
        const statElementAmount = document.createElement("div");
        statElementName.textContent = stat.stat.name;
        statElement.style.fontWeight="bold"
        statElementName.style.color="skyblue"
        statElementAmount.textContent = stat.base_stat;
        console.log(stat.stat.name)
        statElement.appendChild(statElementName);
        statElement.appendChild(statElementAmount);
        pokeStats.appendChild(statElement);
       
    });

}
const renderNotFound = () => {
    pokeName.style.color="crimson"
    pokeName.textContent = 'Pokemon no  encontrado';
    sad.style.display="inline-block"
    pokeImg.src='./img/poke-shadow.png'
    pokeTypes.innerHTML = '';
    pokeStats.innerHTML = '';
    pokeId.textContent = '';
}
const changeColor = types =>{
    const colorOne = typeColors[types[0].type.name];
    pokeName.style.color=`${colorOne}`
   
        // stats.forEach(stat => {
        //     console.log(stat)
        //     const statElement = document.createElement("div");
        //     const statElementName = document.createElement("div");
        //     const statElementAmount = document.createElement("div");
        //     statElementName.textContent = stat.stat.name;
          
        //     statElementAmount.textContent = stat.base_stat;
        //     console.log(stat.stat.name)
        //     statElement.appendChild(statElementName);
        //     statElement.appendChild(statElementAmount);
        //     pokeStats.appendChild(statElement);
        // });
    
    
}