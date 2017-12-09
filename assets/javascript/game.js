// Set all variables and inital values


(function($) {
    // Non-DOM-ready-required code here (scope-safe)
    $(function() {

        var playerChoices = [
            { "fighter": "maccready", "attack": "25", "hp": "180" },
            { "fighter": "mama_murphy", "attack": "8", "hp": "120" },
            { "fighter": "piper", "attack": "20", "hp": "150" },
            { "fighter": "vault_tec", "attack": "5", "hp": "100" }
        ];

    const game = {
        characters: [
            {
                name: "hobbit",
                attack_power: 5,
                health: 100,
            },
            {
                name: "orc",
                attack_power: 25,
                health: 180,
            },
            {
                name: "elf",
                attack_power: 8,
                health: 120,
            },
            {
                name: "dwarf",
                attack_power: 20,
                health: 150,
            }
        ],
        sub_win: 0,
        user_character: "",
        opponent_character: "",

        init() {
            this.dom_cache();
            this.event_binding();
            this.init_stats();
            this.ta_instructions();

        },
        dom_cache() {
            this.$info_zone = $('#match-info');
            this.$enemy_zone = $('#enemy-zone');
            this.$player_zone = $('#attack-player-zone');
            this.$opponent_zone = $('#attack-oponent-zone');
            this.$hobbit_power = $('#hobbit').find('span.power');
            this.$hobbit_health = $('#hobbit').find('span.health');
            this.$orc_power = $('#orc').find('span.power');
            this.$orc_health = $('#orc').find('span.health');
            this.$elf_power = $('#elf').find('span.power');
            this.$elf_health = $('#elf').find('span.health');
            this.$dwarf_power = $('#dwarf').find('span.power');
            this.$dwarf_health = $('#dwarf').find('span.health');
        },
        event_binding() {
            this.$info_zone.on('click', '.character', this.set_character.bind(this));   // User choose character from the info-zone
            this.$enemy_zone.on('click', '.character', this.set_opponent.bind(this));   // User choose oponent from the enemy-zone
            this.$info_zone.on('click', 'button#attack', this.attacking.bind(this)); // Attack opponent by clicking Attack button
            this.$info_zone.on('click', 'button#restart', this.restart);
        },
        init_stats() {
            this.$hobbit_health.html(this.characters[0].health);
            this.$hobbit_power.html(this.characters[0].attack_power);
            this.$orc_health.html(this.characters[1].health);
            this.$orc_power.html(this.characters[1].attack_power);
            this.$elf_health.html(this.characters[2].health); 
            this.$elf_power.html(this.characters[2].attack_power);
            this.$dwarf_health.html(this.characters[3].health);
            this.$dwarf_power.html(this.characters[3].attack_power);
        },
        set_character(e) {  // User choose player
            const playerHTML = e.currentTarget; 
            const enemiesHTML = $(e.currentTarget).siblings();
            this.$player_zone.append(playerHTML); // Move the clicked player (chosen) to the attack zone
            this.$enemy_zone.append(enemiesHTML); // Move the non-clicked characters to the enemy zone
            this.$info_zone.html(`<h1>Choose your opponent from the bottom`);   // Update instructions
        },
        set_opponent(e){ // User choose oponent
            this.$opponent_zone.append(e.currentTarget);  // move it to the attacking zone
            this.$info_zone.html(`<button type="button" id="attack">ATTACK</button>`);    // Update the instructions
        },
        attacking(e){
            this.user_character = this.$player_zone.find('.character').attr('id'); // Get the ID of the user's character
            this.opponent_character = this.$opponent_zone.find('.character').attr('id'); // Get the ID of the opponents's character
            let indexOf_opponent = 0; // Create a variable to hold the opponents index in the characters array
            
            // Obtaining the opponent's index in the character's array to be identy it
            this.characters.forEach( a => { // Loop through the character's array of objects
                if(a.name == this.opponent_character) {  // if the value of the property "name" of the current character object matches the opponent's ID
                    indexOf_opponent = this.characters.indexOf(a);  // Get the location of that particular "character's object" in the character's array
                }
            });
            // Actually "hitting"... Updating stats in the array. Player's power and opponent's health
            this.characters.forEach( b => { // Loop through the character's array again
                if(b.name == this.user_character) {  // if the value of the property "name" of the current character object matches the player's ID
                    this.characters[indexOf_opponent].health -= b.attack_power; // Reduce the opponent's health by the player's attack power amount
                    b.attack_power *= 2; // double the players attack power
                    this.init_stats();  // Display updated stats
                    this.check_win(indexOf_opponent);   // Check if after the hit, the opponent still has energy or if it ran out of energy and the player won
                }

            });
        },
        check_win(indexOf_opponent){    //Check if after the hit, the opponent still has energy or if it ran out of energy and the player won
            if( this.characters[indexOf_opponent].health < 0 ){ // If opponent ran out of health
                this.$info_zone.html(`<h1>You won! Pick your next opponent</h1>`); // Inform the user
                this.sub_win++; // Update partial win counter.
                this.$opponent_zone.find('.character').remove(); // Remove the character from the screen
                if( this.sub_win == (this.characters.length - 1) ){ // If user beat all opponents   
                    this.$info_zone.html(`<h1>You Won!!!<br><br><button type="button" id="restart">RESTART</button></h1>`);    // Display winning message
                }
            } 
            else {  // If opponent still has health, get hit.
                this.get_hit();
            }

        },
        get_hit(){  
            //const user_character = this.$player_zone.find('.character').attr('id'); // Get the ID of the user's character
            this.opponent_character = this.$opponent_zone.find('.character').attr('id'); // Get the ID of the opponents's character
            let indexOf_user = 0; // Create a variable to hold the opponents index in the characters array
            
            // Obtaining the users's index in the character's array to be identy it
            this.characters.forEach( a => { // Loop through the character's array of objects
                if(a.name == this.user_character) {  // if the value of the property "name" of the current character object matches the user's ID
                    indexOf_user = this.characters.indexOf(a);  // Get the location of that particular "character's object" in the character's array
                }
            });
            // Actually "getting hit"... Updating stats in the array. Player's power and opponent's health
            this.characters.forEach( b => { // Loop through the character's array again
                if(b.name == this.opponent_character) {  // if the value of the property "name" of the current character object matches the player's ID
                    this.characters[indexOf_user].health -= b.attack_power; // Reduce the users's health by the opponents's attack power amount
                    this.init_stats();  // Display updated stats
                    this.check_lose(indexOf_user);   // Check if after the hit, the user still has energy or if it ran out of energy and lose the game
                }

            });
        },
        check_lose(indexOf_user){
            if( this.characters[indexOf_user].health < 0 ){ // If user ran out of health
                this.$info_zone.html(`<h1>You Lost<br>Game Over!<br><br><button type="button" id="restart">RESTART</button></h1>`); // Inform the user
            }
        },
        restart(){
            location.reload();
        },
        ta_instructions(){
            console.log(`If you want to lose, pick the Hobbit as your player and the Orc as your first opponent`);
            console.log(`I think all other choices will result in a win`);
        }
    }

    game.init();




    });
})(jQuery); 