// Use "input()" to input a line from the user
// Use "input(str)" to print some text before requesting input
// You will need this in the following stages
const input = require('sync-input')







// let nOfCups = Number(input("Write how many cups of coffee you will need:"))
// if (possibleCups === nOfCups){
//   console.log("Yes, I can make that amount of coffee")
// } else if(possibleCups > nOfCups) {
//   console.log(`Yes, I can make that amount of coffee (and even ${possibleCups-nOfCups} more than that)`)
//
// } else {
//   console.log(`No, I can make only ${possibleCups} cups of coffee`)
// }


let coffeeMachineInfo = {"availableWater": 400, "availableMilk": 540, "availableBeans": 120,
                              "availableCups": 9, "availableCash": 550}
let coffeeInformation = {"1": {"necessaryWater": 250, "necessaryMilk": 0, "necessaryBeans": 16, "price": 4},
                              "2": {"necessaryWater": 350, "necessaryMilk": 75, "necessaryBeans": 20, "price": 7},
                              "3": {"necessaryWater": 200, "necessaryMilk": 100, "necessaryBeans": 12, "price": 6}
                              }

function checkResources(coffeType) {
    if (Math.floor(coffeeMachineInfo.availableWater / coffeeInformation[coffeType].necessaryWater) < 1) {return "water"}
    if (Math.floor(coffeeMachineInfo.availableMilk / coffeeInformation[coffeType].necessaryMilk) < 1) {return "milk"}
    if (Math.floor(coffeeMachineInfo.availableBeans / coffeeInformation[coffeType].necessaryBeans) < 1) {return "beans"}
    if (coffeeMachineInfo.availableCups < 1) {return "cups"}
    return false;
}
function display() {
  console.log(`The coffee machine has:
${coffeeMachineInfo.availableWater} ml of water
${coffeeMachineInfo.availableMilk} ml of milk
${coffeeMachineInfo.availableBeans} g of coffee beans
${coffeeMachineInfo.availableCups} disposable cups
$${coffeeMachineInfo.availableCash} of money`)
}

function buy(){
  let typeOfCoffe = input("What do you want to buy? 1 - espresso, 2 - latte, 3 - cappuccino, back - to main menu: ")
  if (typeOfCoffe === "back") { return}
  let missingResource = checkResources(typeOfCoffe)
  if (missingResource) {
    console.log(`Sorry, not enough ${missingResource}!`);
    return;
  } else {
    console.log("I have enough resources, making you a coffee!");
  }
  coffeeMachineInfo.availableWater -= coffeeInformation[typeOfCoffe].necessaryWater
  coffeeMachineInfo.availableMilk -= coffeeInformation[typeOfCoffe].necessaryMilk
  coffeeMachineInfo.availableBeans -= coffeeInformation[typeOfCoffe].necessaryBeans
  coffeeMachineInfo.availableCups -= 1
  coffeeMachineInfo.availableCash += coffeeInformation[typeOfCoffe].price
}

function fill(){
  coffeeMachineInfo.availableWater += Number(input("Write how many ml of water you want to add: "))
  coffeeMachineInfo.availableMilk += Number(input("Write how many ml of milk you want to add: "))
  coffeeMachineInfo.availableBeans += Number(input("Write how many grams of coffee beans you want to add: "))
  coffeeMachineInfo.availableCups += Number(input("Write how many disposable cups you want to add: "))
}

function take(){
  console.log(`I gave you $${coffeeMachineInfo.availableCash}`)
  coffeeMachineInfo.availableCash = 0
}


let run = true
while (run === true){
  let action = input("Write action (buy, fill, take, remaining, exit): ")
  switch (action) {
    case "buy":
      buy()
      break;
    case "fill":
      fill()
      break;
    case "take":
      take()
      break;
    case "remaining":
      display()
      break;
    case "exit":
      run = false
      break;
  }
}

