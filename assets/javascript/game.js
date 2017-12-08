// Set all variables and inital values


(function($) {
    // Non-DOM-ready-required code here (scope-safe)
    $(function() {

    const game = {
        hobbit: {
            name: "Hobbit",
            attack_power: 5,
            counter_power: 10,
            health: 100,
            is_enemy: false,
            chosen: false,
        },
        orc: {
            name: "Orc",
            attack_power: 20,
            counter_power: 25,
            health: 50,
            is_enemy: false,
            chosen: false,
        },
        elf: {
            name: "Elf",
            attack_power: 10,
            counter_power: 15,
            health: 180,
            is_enemy: false,
            chosen: false,
        },
        dwarf: {
            name: "Dwarf",
            attack_power: 15,
            counter_power: 20,
            health: 150,
            is_enemy: false,
            chosen: false,
        },
        sub_win: 0,
        oponent_exists: false,
        user_choice: "",

        init() {
            this.dom_cache();
            this.event_binding();
        },
        dom_cache() {
            this.$character = $('.character'); // jQuery Array of character DOM elements
            this.$attack_zone = $('#attack-zone');
        },
        event_binding() {
            this.$character.on('click', this.user_character.bind(this));   //1. Listen for click events from user to choose character
        },
        user_character(e) {
            const playerHTML = e.currentTarget;
            this.user_choice = playerHTML.id; // Get the id from the clicked character and update the user choice var
            
            this.$attack_zone.append(playerHTML); // Append the clicked player to the attack zone

            for(const x in game){ // Loops through the game array 
                if(x == this.user_choice){ // If the current property matches the id from the chosen character
                    game[x].chosen = true; // change its "chosen" property to true
                }
            }
            const enemiesHTML = playerHTML.siblings(); //GET ALL THE OTHER PLAYERS AND MOVE THEM TO THE ENEMIES ZONE
            console.log(enemiesHTML);
            //$('#enemy-zone').append(enemiesHTML);




            
            //this.$attack_zone.append(playerHTML); // Move the players choice to the attack zone
            // Move all the rest to the enemy zone
            
            

        }
    
    
        
    //2. Choose your opponent 
        // onclick character.currentEnemy = true
        // oponentExists = true
        // move it to the attacking zone
    //3. Attack your oponent by clicking Attack button
        // function attack() {
        // if oponentExists {
            // increase users attack power (even if it's the 1st round it will work bc attack power = 0 on round 1)
            // reduce enemies health
            // if enemies health > 0 ? fire getHit() : increase subwin counter
            // if subwin counter == (charactersArr.length)-1 (you) ? win entire game and show restart button : getHit()
            // }
        //}else{display no oponents}
    //4. Get hit
        // function getHit(){
        // reduce users health
        // if user's health == 0 ? game over : attackOpenent()
        //}


    }

    game.init();




    });
})(jQuery); 