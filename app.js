/**
 * Stores the list of kittens
 * @type {Kitten[]}
 */
let kittens = []
let affection = 5
let mood = ""
/**
 * Called when submitting the new Kitten Form
 * This method will pull data from the form
 * use the provided function to give the data an id
 * you can use robohash for images
 * https://robohash.org/<INSERTCATNAMEHERE>?set=set4
 * then add that data to the kittens list.
 * Then reset the form
 */
function addKitten(event) {
  event.preventDefault()
  let form = event.target
  let kitten = {
    id: generateId(),
    name:form.name.value,
    mood:"tolerant",
    affection: 5,
  }
  let kittenName = form.name.value
  if(kittens.some(kitten => kitten.name == kittenName)){
     alert("choose a differnt name")
     return
  }
  
kittens.push(kitten)
  saveKittens()
form.reset()
drawKittens()
}
/**
 * Converts the kittens array to a JSON string then
 * Saves the string to localstorage at the key kittens
 */
function saveKittens() {
window.localStorage.setItem("kittens", JSON.stringify(kittens))
drawKittens()
}
/**
 * Attempts to retrieve the kittens string from localstorage
 * then parses the JSON string into an array. Finally sets
 * the kittens array to the retrieved array
 */
function loadKittens() {
  let kittensData = JSON.parse(window.localStorage.getItem("kittens"))
  if(kittensData){
    kittens = kittensData
  }
  }
/**
 * Draw all of the kittens to the kittens element
 */
function drawKittens() {
 loadKittens()
 let kittenElem = document.getElementById("kittens")
 let kittensTemplate = "" 
 kittens.forEach((kitten, i) => {
   if (kitten.mood === "gone"){
    kittensTemplate +=`
    <div class="og kitten ${kitten.mood} text-light">
      <img class="kitten" src="https://robohash.org/${kitten.name}?set=set4&size=150x150">
      <div class="d-flex justify-content-center">Name: ${kitten.name}</div>
      <div class="d-flex justify-content-center">Mood: ${kitten.mood}</div>
      <div class="d-flex justify-content-center">Affection: ${kitten.affection}</div>
      <button id="petBtn" disabled class="btn-cancel m-1" onclick="pet('${kitten.id}')">Pet kitty</button>
      <button id="nipBtn" disabled class="m-1"  onclick="catnip('${kitten.id}')">Catnip</button>
      <div class="d-flex justify-content-center"><button class="btn-cancel m-1" onclick="removeKitten(${i})">Delete Kitten</div>
      </div>
    </div>
  `
   }
   else{
  kittensTemplate +=`
  <div class="og kitten ${kitten.mood} text-light">
    <img class="kitten" src="https://robohash.org/${kitten.name}?set=set4&size=150x150">
    <div class="d-flex justify-content-center">Name: ${kitten.name}</div>
    <div class="d-flex justify-content-center">Mood: ${kitten.mood}</div>
    <div class="d-flex justify-content-center">Affection:${kitten.affection}</div>
    <button id="petBtn" class="btn-cancel m-1" onclick="pet('${kitten.id}')">Pet kitty</button>
    <button id="nipBtn" class="m-1"  onclick="catnip('${kitten.id}')">Catnip</button>
    <div class="d-flex justify-content-center"><button class="btn-delete m-1" onclick="removeKitten(${i})">Delete Kitten</div>
    </div>
    </div>
`
   }
})
kittenElem.innerHTML = kittensTemplate
}
/**
 * Find the kitten in the array by its id
 * @param {string} id
 * @return {Kitten}
 */
function findKittenById(id) {
  return kittens.find(k => k.id == id);
}
/**
 * Find the kitten in the array of kittens
 * Generate a random Number
 * if the number is greater than .7
 * increase the kittens affection
 * otherwise decrease the affection
 * save the kittens
 * @param {string} id
 */
function pet(id) {
let curKitten = findKittenById(id)
let randomNumber = Math.random()
if (randomNumber > .7){
  curKitten.affection++;
  setKittenMood(curKitten)
  saveKittens()
}
else curKitten.affection--;
setKittenMood(curKitten)
saveKittens()
}
/**
 * Find the kitten in the array of kittens
 * Set the kitten's mood to tolerant
 * Set the kitten's affection to 5
 * save the kittens
 * @param {string} id
 */
function catnip(id) {
  let curKitten = findKittenById(id)
  curKitten.affection = 5;
  curKitten.mood = "tolerant"
  saveKittens()
}
/**
 * Sets the kittens mood based on its affection
 * Happy > 6, Tolerant <= 5, Angry <= 3, Gone <= 0
 * @param {Kitten} kitten
 */
function setKittenMood(kitten) {
document.getElementById("kittens").classList.remove(kitten.mood)
  if(kitten.affection >= 6){kitten.mood = "happy"}
  if (kitten.affection <= 5){kitten.mood = "tolerant"}
  if (kitten.affection <= 3){kitten.mood = "angry"}
  if (kitten.affection <= 0){kitten.mood = "gone"}
document.getElementById("kittens").classList.add(kitten.mood)
saveKittens()
}
function getStarted() {
  document.getElementById("welcome").remove();
  drawKittens();
}
/**
 * Defines the Properties of a Kitten
 * @typedef {{id: string, name: string, mood: string, affection: number}} Kitten
 */
/**
 * Used to generate a random string id for mocked
 * database generated Id
 * @returns {string}
 */
function generateId() {
  return (
    Math.floor(Math.random() * 10000000) +
    "-" +
    Math.floor(Math.random() * 10000000)
  );
}
function removeKitten(i){
kittens.splice(i,1)
refreshKittens()
} 
  function refreshKittens(){
    localStorage.setItem("kittens",JSON.stringify(kittens))
    drawKittens();
  }