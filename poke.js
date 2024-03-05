const pokeNombreInput= document.getElementById("pokeName");
const pokeNumero = document.getElementById("pokeNumero");
const pokeTipos= document.getElementById("pokeTipos");
const pokeStads = document.getElementById("pokeStads");
const pokeMovimientos = document.getElementById("pokeMovimientos");

const fetchPokemon = ()=>{
    let nombrePokemon = pokeNombreInput.value;
    nombrePokemon = nombrePokemon.toLowerCase();
    const url = `https://pokeapi.co/api/v2/pokemon/${nombrePokemon}`;    
    fetch(url).then((res)  =>{
        if (res.status != "200"){
            pokeImage("./pokemon-sad.gif");
            pokeNumero.innerHTML = "";
            pokeTipos.innerHTML = "";
            pokeMovimientos.innerHTML="";
            pokeStads.innerHTML="";
        }
        else{
            console.log(res);
            return res.json();
        }
    }).then((dataPokemon)=>{
        console.log(dataPokemon);
        let pokeImgURL = dataPokemon.sprites.front_default;
        let { stats, types, moves } = dataPokemon;
        pokeImage(pokeImgURL);
        pokeNumero.innerHTML = `No. ${dataPokemon.id}`;
        extraerPokeTipos(types);
        extraerMovimientos(moves);
        extraerPokeStad(stats);
        
    
        //console.log(pokeImgURL);
    })}

const extraerMovimientos = moves =>{
    pokeMovimientos.innerHTML = "";
    for(let i=0; i<45 ; i++){
       // console.log(moves);
        const moveTextElement = document.createElement("div");
        moveTextElement.textContent = moves[i].move.name;
        pokeMovimientos.appendChild(moveTextElement);
    }
}



const extraerPokeStad = stats =>{
    pokeStads.innerHTML="";
    stats.forEach(s =>{
        const statElement = document.createElement("div");
        const statElementName = document.createElement("div");
        const statElementAmount = document.createElement("div");
        statElementName.textContent = s.stat.name;
        statElementAmount.textContent = s.base_stat;
        statElement.appendChild(statElementName);
        statElement.appendChild(statElementAmount);
        pokeStads.appendChild(statElement);
    });

}


const extraerPokeTipos = types =>{
    pokeTipos.innerHTML="";
    types.forEach(t =>{
        const tipoElemento = document.createElement("div");
        tipoElemento.textContent = t.type.name;
        pokeTipos.appendChild(tipoElemento);
    });
}


const pokeImage = (url) =>{
    const pokeFoto = document.getElementById("pokeImg");
    pokeFoto.src = url;
}

//fetchPokemon();


