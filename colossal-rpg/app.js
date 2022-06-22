const readline = require("readline-sync");
const userName = readline.question('Greetings Jedi! What is your name?');
console.log("\nWhat a great name! I was knew somebody named, " + userName + " but sadly they perished... lets hope the same doesnt happen to you!");
console.log(" Anyways " + userName + " we must be going the order needs our help!. \nAlong the way there will be a great number of enemies, collect the crystals they drop when you kill them!.");

// variables for hp,enemyhp,amount of crystals in your inventory, possible enemies and random enemy is a function that
// returns a random enemy from enemies
// math.random gives you a number between 0-1 , which is then multipled by the .length of the enemies array and math.floor is
// used to turn it into an integer
// for example: math.random rolls 0.1 which is then multiplied by enemies .length which is = to 3 and then math.floor will return the resulting
// 0.3 into 0 which will select clone trooper from the enemies array
// for example: math.random rolls 0.9 which is then multiplied by enemies .length which is = to 3 and then math.floor will return the resulting
// 2.7 into 2 which will select darth vader from the enemies array

let hp = 100 
let enemyHealth = 50
let enemyMaxDmg = 20
let playerMaxDmg = 50
let inventory = {crystals: 0}
let playerStats = "\n\nName: " + userName + "\nHealth:" + hp + "\nInventory:" + "You have collected " + inventory.crystals + " crystals."
const enemies = ["Clone trooper", "Darth Maul", "Darth Vader"]
let randomEnemy = () => enemies[Math.floor(Math.random() * enemies.length)];



function walk(){
    // storing the first key pressed by user as the variable willWalk
    let willWalk = readline.keyIn("\nWhat will you do?\n\n[w]Walk [p]Player Info [q]Quit\n", {limit: "wpq"})
    // chanceofAttack is equal to a random number from 0 to 100 
    let chanceOfAttack = Math.floor(Math.random() * 100)
    // the user has typed w and their health is greater than 0 and they have less than 3 crystals 
    if (willWalk === "w" && hp >= 0 && inventory.crystals < 3){
        // if we rolled between 33 and 100 we walk
        if (chanceOfAttack >= 33) {
            console.log("Your walk was uneventful.")
            walk()
        // if we rolled between 0 and 32 we fight
        } else {
            const enemy = randomEnemy()
            fight(enemy, enemyHealth)
        }
    } else if (willWalk === "p"){
        console.log(playerStats)
        walk()
    } else if (willWalk === "q"){
        gameOver()
    } else if (inventory.crystals === 3){
        console.log("Congratulations! You have used the power of friendship to win!.")
    }

}



function fight(enemy, enemyHp){
    let isFighting = true
    console.log( "\n" + enemy + " is in your way! What will you do?")
      
    // while hp is greater than o and enemyhp is greater than 0 the while loop will keep running
    while (hp > 0 && enemyHp > 0 && isFighting){
        let damageToEnemy = Math.floor(Math.random() * playerMaxDmg)
        let damageToUser = Math.floor(Math.random() * enemyMaxDmg)
        let receivedCrystal = 1
        let chanceOfEscape = Math.floor(Math.random() * 100);
        

        let willFight = readline.keyIn("\n[f]Fight \n[r]Run\n", {limit: "fr"})

        if(willFight === "f") {
            hp = hp - damageToUser;
            enemyHp = enemyHp - damageToEnemy;
            console.log(userName + ", your HP is now at " + hp)
            console.log("The enemy's HP is now " + enemyHp)
            console.log("You square up with " + enemy + ".")
            // the while loop will break because enemy hp is less than zero     
            if(enemyHp <= 0){
                inventory.crystals = inventory.crystals + receivedCrystal;
                console.log("You defeated " + enemy + " and received a crystal.")
                console.log("\nInventory:" + inventory.crystals)
            // you died the while loop will break because hp is less than zero
            } else if (hp <= 0) {
                console.log("\n" + enemy + " has killed you!")

            }
        } else if (willFight === "r"){
            // if we roll 50 to 100 we escape
            if (chanceOfEscape >= 50){
                console.log("Congratulations! You escaped and earned a crystal.")
                inventory.crystals = inventory.crystals + receivedCrystal;
            // we sucessfully ran away and were breaking the while loop by setting isFighting = false
                isFighting = false
            // if we roll 49 or less we dont escape
            } else if (chanceOfEscape < 50){
                console.log("\nNice try, but we can't outrun our problems that easily.")
                hp = hp - damageToUser
                console.log("While trying to run, " + enemy + " attacked you.")
                console.log(playerStats)

            }
        }
    }
    // fight loop is over and you didnt die so return to walking
    if (hp > 0) {
        walk()
    }
    // you died game over
    else {
        gameOver()
    }  
}

function gameOver(){
    console.log("\nGame Over")
}    

walk()













