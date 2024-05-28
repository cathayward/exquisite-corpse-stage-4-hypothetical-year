let gameState = 'intro'; // Initial state of the game
let backgrounds = {}; // Object to store background images for each state
let locations = { // Object to store the text and next states for each location
    'intro': {
        text: "let me set the scene... \nyou are someone so very important \nbut... you feel as if you don't have enough power \nso you make some decisions \n let's see how this goes... \n \nhit 'a' to begin",
        next: {'a': 'a'}
    },
    'a': {
        text: "would you look at this beautiful mountain range \nwhat a shame you decided to start burning it down \nit is just so important that you develop this land \ninto something bigger \nsomething better \nsomething  MUCH more lucrative \n \nso... what are we going to do next oh powerful one? \n \npress 'b' to keep it burning \nor press 'c' for a little bit of manual deforestation",
        next: {'b': 'b', 'c': 'c'}
    },
    'b': {
        text: "oh... so you decided to let it burn \nthat was definitely a choice... \num wow ok \nwould you look at that sky \nthere's no way that can be good \nwell i guess you might as well keep going... \npress 'd' to see what happens if it keeps burning \nor press 'e' for some deforestation i guess",
        next: {'d': 'd', 'e': 'e'}
    },
    'c': {
        text: "ok!!! well you've definitely done something!!! \ni guess..? \ni hope you're sure about this \noh what's that? it's still burning... \npress 'i' to try and stop the spread \nor if you really want... \npress 'j' to let the blaze continue",
        next: {'i': 'i', 'j': 'j'}
    },
    'd': {
        text: "WOW would you look at that!!! \ni wonder how much smoke that is \ni wonder if anyone was hiking there.. \nnow that would be unfortunate wouldn't it \noh what's that? you've got chemicals to dump? \nmight as well at this point.. \npress 'f' to dump your chemicals my friend",
        next: {'f': 'f'}
    },
    'e': {
        text: "ok yea. yea this is fine for sure. not too bad right? \noh... would you look at that... there fire never stopped... \ntime to press 'g' to see what you've done",
        next: {'g': 'g'}
    },
    'f': {
        text: "oh my god wow. that's.. something.. \nwhat on earth was in those 'chemicals' \nbut you've done it!!! \nyou have succesfully killed the forest!!! \nnice job!!! \nyou're gonna have to hit the button to try again my friend...",
    },
    'g': {
        text: "it's a little hard to breathe up here \nbut you're rich it's fine \nno need to worry about anyone else right? \nthey should've left when you asked them to \nyou did ask them right? \nwell... it's too late now either way \npress 'h' to watch the blaze burn",
        next: {'h': 'h'}
    },
    'h': {
        text:"oh would you look at that!! \na beautiful sunset!! \nwhat do you mean that's not a sunset? \nTHAT'S YOUR FIRE!!!??? \nhow could you... the forest... it's doomed... \ntime to hit the button if you really want to give it another go",
    },
    'i': {
        text: "it's almost beautiful... \nthe absolutely overwhelming plume of smoke \ncertainly wouldn't want to be anywhere near that \nthat's for sure \nlets try pressing 'l' to see what you're going to do next",
        next: {'l': 'l'}
    },
    'j': {
        text: "what a lovely shade of orange \nit almost matches the vitirol in your soul \nsorry.. too far... but... \ni mean look at what YOU did \nwouldn't that be considered going a little further... \nyou want to what?? \nallow nuclear activity here??? \nwhat happened to the development??? \ni mean what power do i really have \npress 'k' if you really want to go through with this",
        next: {'k': 'k'}
    },
    'k': {
        text: "HOLY SHIT WHAT THE FUCK HAPPENED???? \nnow that's definitely a first for me \num congratulations for that??? i guess?? \nwell at least your little plot of land is well and truly down the shitter \nand all of the locals had to evacuate \ni really hope it was worth it... \ni would encourage you to hit the button to give this another go... \nfor me?",
    },
    'l': {
        text: "um what??? is that even possible??? \nsurely not right??? how did you.. \nhow did you even manage this..? \ni'm honestly shocked \nand i don't say that a lot \ni know what some of 'you' are capable of \nwell i say let it burn \nlet's press 'm' to keep this party going what do you say?",
        next: {'m': 'm'}
    },
    'm': {
        text: "i think.. if you take a step back... \nit's not that bad right?? \nright??? \noh who am i kidding \nyou've only gone and fucked it up \ni never expected any less from you asshole \nawww did i hurt your feelings? \nyou wanna try again? \nif it will stop your damn whining \nhit the button when you're ready",
    },
};

let resetButton; // Button to reset the game
let displayText = ''; // Text to be displayed
let textIndex = 0; // Current index of the character being displayed
let textSpeed = 2; // Speed of text display
let textCounter = 0; // Counter to control the speed of text display
let textComplete = false; // Flag to indicate if the text is fully displayed

function preload() {
    for (let i = 1; i <= 15; i++) {
        backgrounds[`b${i}`] = loadImage(`images/b${i}.png`); // Load background images
    }

    font = loadFont('type.ttf'); // Load font

    backgrounds['intro'] = backgrounds['b1'];
    backgrounds['a'] = backgrounds['b2'];
    backgrounds['b'] = backgrounds['b5'];
    backgrounds['c'] = backgrounds['b3'];
    backgrounds['d'] = backgrounds['b11'];
    backgrounds['e'] = backgrounds['b10'];
    backgrounds['f'] = backgrounds['b14'];
    backgrounds['g'] = backgrounds['b12'];
    backgrounds['h'] = backgrounds['b13'];
    backgrounds['i'] = backgrounds['b4'];
    backgrounds['j'] = backgrounds['b6'];
    backgrounds['k'] = backgrounds['b8'];
    backgrounds['l'] = backgrounds['b7'];
    backgrounds['m'] = backgrounds['b9'];
}

function setup() {
    createCanvas(windowWidth, windowHeight); // Create canvas that fills the window
    textAlign(LEFT, CENTER); // Set text alignment
    textSize(30); // Set text size
    fill(245, 208, 122); // Set text color
    strokeWeight(3); // Set stroke weight for text
    stroke(0); // Set stroke color for text
    textFont(font); // Set the font
    resetButton = createButton('do you really want to try again?'); // Create reset button
    resetButton.position(windowWidth / 2 - 100, windowHeight - 100); // Position the reset button
    resetButton.mousePressed(resetGame); // Set mousePressed event for reset button
    resetButton.hide(); // Hide the reset button initially
}

function draw() {
    image(backgrounds[gameState], 0, 0, windowWidth, windowHeight); // Display background image

    // Display the text letter by letter
    if (!textComplete) {
        if (textCounter % textSpeed === 0 && textIndex < locations[gameState].text.length) {
            displayText += locations[gameState].text.charAt(textIndex); // Add next character to displayText
            textIndex++;
        }
        if (textIndex >= locations[gameState].text.length) {
            textComplete = true; // Text is fully displayed
            // Show reset button only at end states
            if (!locations[gameState].next) {
                resetButton.show(); // Show reset button if there are no next states
            }
        }
        textCounter++;
    }

    let textX = 50;
    let textY = 50;
    text(displayText, textX, textY, windowWidth - 100, windowHeight - 100); // Display text
}

function keyPressed() {
    if (textComplete) {
        let next = locations[gameState].next ? locations[gameState].next[key] : null; // Get next state based on key pressed
        if (next) {
            gameState = next; // Update gameState to next state
            displayText = ''; // Reset displayText
            textIndex = 0; // Reset textIndex
            textComplete = false; // Set textComplete to false
            textCounter = 0; // Reset textCounter
            resetButton.hide(); // Hide reset button
        }
    }
}

function resetGame() {
    gameState = 'intro'; // Reset gameState to 'intro'
    displayText = ''; // Reset displayText
    textIndex = 0; // Reset textIndex
    textComplete = false; // Set textComplete to false
    textCounter = 0; // Reset textCounter
    resetButton.hide(); // Hide reset button
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight); // Resize canvas when window is resized
    resetButton.position(windowWidth / 2 - 100, windowHeight - 100); // Reposition reset button
}
