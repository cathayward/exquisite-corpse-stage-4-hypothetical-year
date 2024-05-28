let gameState = 'intro';
let backgrounds = {};
let locations = {
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

let resetButton;
let displayText = '';
let textIndex = 0;
let textSpeed = 2;
let textCounter = 0;
let textComplete = false;

function preload() {
    for (let i = 1; i <= 15; i++) {
        backgrounds[`b${i}`] = loadImage(`images/b${i}.png`);
    }

    font = loadFont('type.ttf');

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
    createCanvas(windowWidth, windowHeight);
    textAlign(LEFT, CENTER);
    textSize(30);
    fill(245, 208, 122);
    strokeWeight(3);
    stroke(0);
    textFont(font);
    resetButton = createButton('do you really want to try again?');
    resetButton.position(windowWidth / 2 - 100, windowHeight - 100);
    resetButton.mousePressed(resetGame);
    resetButton.hide();
}

function draw() {
    image(backgrounds[gameState], 0, 0, windowWidth, windowHeight); // Ensure background image fits the entire canvas

    // Display the text letter by letter
    if (!textComplete) {
        if (textCounter % textSpeed === 0 && textIndex < locations[gameState].text.length) {
            displayText += locations[gameState].text.charAt(textIndex);
            textIndex++;
        }
        if (textIndex >= locations[gameState].text.length) {
            textComplete = true;
            // Show reset button only at end states
            if (!locations[gameState].next) {
                resetButton.show();
            }
        }
        textCounter++;
    }

    let textX = 50;
    let textY = 50;
    text(displayText, textX, textY, windowWidth - 100, windowHeight - 100); // Ensure text fits within the canvas
}

function keyPressed() {
    if (textComplete) {
        let next = locations[gameState].next ? locations[gameState].next[key] : null;
        if (next) {
            gameState = next;
            displayText = '';
            textIndex = 0;
            textComplete = false;
            textCounter = 0;
            resetButton.hide();
        }
    }
}

function resetGame() {
    gameState ='intro';
    displayText = '';
    textIndex = 0;
    textComplete = false;
    textCounter = 0;
    resetButton.hide();
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    resetButton.position(windowWidth / 2 - 100, windowHeight / 2 + 170);
}
