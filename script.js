//Variablar
const planetName = document.getElementById("planetName")
const latinName = document.getElementById("latinName")
const planetText = document.getElementById("planetText")
const circumInfo = document.getElementById("circumInfo")
const distanceInfo = document.getElementById("distanceInfo")
const maxTempInfo = document.getElementById("maxTempInfo")
const minTempInfo = document.getElementById("minTempInfo")
const moonsInfo = document.getElementById("moonsInfo")
const backToSolaris = document.getElementById("backToSolaris")

//DOM
//eventListener för att komma till huvudmeny 
backToSolaris.addEventListener("click", function(){
  mainPage.className ="showMain"
  infoPage.className ="hide"
})


//Function för att begära en nyckel!
async function getKey(){
  const response = await fetch('https://n5n3eiyjb0.execute-api.eu-north-1.amazonaws.com/keys', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'}
  });
  const data = await response.json();
  //Retunerar key värdet så att kunna använda den i nästa steg
  return data.key
}
getKey();

//Function för att hämta planeterna
async function getPlanet(){
  const key =await getKey();
  const response = await fetch('https://n5n3eiyjb0.execute-api.eu-north-1.amazonaws.com/bodies', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'x-zocom': key //värdet av getKey()
    }
  })
  const data =  await response.json ();

  //displayPlanet function som visar planetens info med hjälp av eventListener!
  function displayPlanet(planetData) {
    return function() {
      mainPage.className ="hide"
      infoPage.className ="showInfo"
      planetName.innerText = planetData.name
      latinName.innerText= planetData.latinName
      planetText.innerText = planetData.desc
      circumInfo.innerText = planetData.circumference + " Km"
      distanceInfo.innerText = planetData.distance + " Km"
      maxTempInfo.innerText = planetData.temp.day + " °C"
      minTempInfo.innerText = planetData.temp.night + " °C"
      //Ifall planeten saknar måne!
      if (planetData.moons == "") {
        moonsInfo.innerText = planetData.name + " har ingen måne!"
      } else{
      moonsInfo.innerText = planetData.moons.join(" - ")
      }
    }
  }

  //Hämtar alla "Section" och lagra de i en variabel!
  const planetHolders = document.querySelectorAll("section");

  //1-Loppa alla planeter och tilldelar varje planet (section) en eventListner med sitt index[i]
  //2-Kopplar funktionen displayPlanet med eventLisner så att den visar info om just den valde planet!
  for (let i = 0; i < data.bodies.length; i++) {
    planetHolders[i].addEventListener("click", displayPlanet(data.bodies[i]));
  }
}
getPlanet();