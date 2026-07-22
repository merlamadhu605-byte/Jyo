// ===============================
// Happy 21st Birthday Website
// script.js - Part 1
// ===============================

// Sections
const loading = document.getElementById("loading");
const welcome = document.getElementById("welcome");
const balloonSection = document.getElementById("balloonSection");
const unlock = document.getElementById("unlock");
const photoSection = document.getElementById("photoSection");
const letterSection = document.getElementById("letterSection");
const messageSection = document.getElementById("messageSection");

// Buttons
const startBtn = document.getElementById("startBtn");
const showPhoto = document.getElementById("showPhoto");
const openLetter = document.getElementById("openLetter");
const readLetter = document.getElementById("readLetter");
const replay = document.getElementById("replay");

// Elements
const balloonContainer = document.getElementById("balloonContainer");
const counter = document.getElementById("counter");

// Balloon Settings
const TOTAL_BALLOONS = 21;
let popped = 0;

const colors = [
    "red",
    "blue",
    "green",
    "yellow",
    "purple"
];

// Hide all sections
function hideAll() {

    welcome.style.display = "none";
    balloonSection.style.display = "none";
    unlock.style.display = "none";
    photoSection.style.display = "none";
    letterSection.style.display = "none";
    messageSection.style.display = "none";

}

// Welcome after loader
window.onload = () => {

    setTimeout(() => {

        hideAll();

        welcome.style.display = "flex";
        welcome.classList.add("fade");

    },3000);

};

// Start Button
startBtn.onclick = () => {

    hideAll();

    balloonSection.style.display = "flex";
    balloonSection.classList.add("fade");

    createBalloons();

};

// Create Balloons
function createBalloons(){

    balloonContainer.innerHTML="";

    popped = 0;

    counter.innerHTML = "0 / 21";

    for(let i=0;i<TOTAL_BALLOONS;i++){

        const balloon = document.createElement("div");

        balloon.classList.add("balloon");

        balloon.classList.add(
            colors[Math.floor(Math.random()*colors.length)]
        );

        balloon.style.left =
            Math.random()*90 + "%";

        balloon.style.animationDuration =
            (8 + Math.random()*8) + "s";

        balloon.style.animationDelay =
            (Math.random()*3) + "s";

        balloon.onclick = () => popBalloon(balloon);

        balloonContainer.appendChild(balloon);

    }

}

// Pop Balloon
function popBalloon(balloon){

    if(balloon.classList.contains("done"))
        return;

    balloon.classList.add("done");

    balloon.style.transition="0.25s";

    balloon.style.transform="scale(1.6)";

    balloon.style.opacity="0";

    setTimeout(()=>{

        balloon.remove();

    },250);

    popped++;

    counter.innerHTML =
        popped + " / " + TOTAL_BALLOONS;

    createConfetti(
        event.clientX,
        event.clientY
    );

    if(popped===TOTAL_BALLOONS){

        setTimeout(unlockSurprise,1000);

    }

}

// Unlock
function unlockSurprise(){

    hideAll();

    unlock.style.display="flex";

    unlock.classList.add("fade");

}

// Reveal Photo
showPhoto.onclick=()=>{

    hideAll();

    photoSection.style.display="flex";

    photoSection.classList.add("fade");

};

// Open Envelope Screen
openLetter.onclick=()=>{

    hideAll();

    letterSection.style.display="flex";

    letterSection.classList.add("fade");

};

// Letter Screen
readLetter.onclick=()=>{

    hideAll();

    messageSection.style.display="flex";

    messageSection.classList.add("fade");

    startTyping();

};

// Replay
replay.onclick=()=>{

    location.reload();

};

// Simple Confetti
function createConfetti(x,y){

    for(let i=0;i<20;i++){

        const p=document.createElement("div");

        p.style.position="fixed";
        p.style.left=x+"px";
        p.style.top=y+"px";
        p.style.width="8px";
        p.style.height="8px";
        p.style.borderRadius="50%";
        p.style.background=
            colors[Math.floor(Math.random()*colors.length)];

        p.style.pointerEvents="none";
        p.style.zIndex="999";

        document.body.appendChild(p);

        const dx=(Math.random()-0.5)*220;
        const dy=(Math.random()-0.5)*220;

        p.animate([
            {
                transform:"translate(0,0)",
                opacity:1
            },
            {
                transform:`translate(${dx}px,${dy}px)`,
                opacity:0
            }
        ],{
            duration:900,
            easing:"ease-out"
        });

        setTimeout(()=>p.remove(),900);

    }

}
// =======================================
// PART 2
// Premium Fireworks Engine
// =======================================

const canvas = document.getElementById("fireworks");
const ctx = canvas.getContext("2d");

let fireworks = [];
let particles = [];

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

resizeCanvas();
window.addEventListener("resize", resizeCanvas);

class Firework {

    constructor() {

        this.x = Math.random() * canvas.width;
        this.y = canvas.height;

        this.targetY = 100 + Math.random() * 250;

        this.color = `hsl(${Math.random()*360},100%,60%)`;

        this.speed = 6 + Math.random() * 3;

        this.exploded = false;

    }

    update() {

        if(!this.exploded){

            this.y -= this.speed;

            ctx.beginPath();

            ctx.arc(this.x,this.y,3,0,Math.PI*2);

            ctx.fillStyle=this.color;

            ctx.fill();

            if(this.y <= this.targetY){

                this.explode();

                this.exploded=true;

            }

        }

    }

    explode(){

        for(let i=0;i<80;i++){

            particles.push(new Particle(
                this.x,
                this.y,
                this.color
            ));

        }

    }

}

class Particle{

    constructor(x,y,color){

        this.x=x;

        this.y=y;

        this.color=color;

        this.radius=Math.random()*3+1;

        this.speedX=(Math.random()-0.5)*10;

        this.speedY=(Math.random()-0.5)*10;

        this.alpha=1;

        this.gravity=0.05;

    }

    update(){

        this.x+=this.speedX;

        this.y+=this.speedY;

        this.speedY+=this.gravity;

        this.alpha-=0.015;

        ctx.globalAlpha=this.alpha;

        ctx.beginPath();

        ctx.arc(this.x,this.y,this.radius,0,Math.PI*2);

        ctx.fillStyle=this.color;

        ctx.fill();

        ctx.globalAlpha=1;

    }

}

function animateFireworks(){

    ctx.clearRect(0,0,canvas.width,canvas.height);

    fireworks.forEach((f,index)=>{

        f.update();

        if(f.exploded){

            fireworks.splice(index,1);

        }

    });

    particles.forEach((p,index)=>{

        p.update();

        if(p.alpha<=0){

            particles.splice(index,1);

        }

    });

    requestAnimationFrame(animateFireworks);

}

animateFireworks();

function startFireworks(){

    setInterval(()=>{

        fireworks.push(new Firework());

    },450);

}


// =======================================
// Floating Hearts
// =======================================

function floatingHearts(){

    setInterval(()=>{

        const heart=document.createElement("div");

        heart.className="heart";

        heart.innerHTML=["❤️","","","",""][Math.floor(Math.random()*5)];

        heart.style.left=Math.random()*100+"vw";

        heart.style.animationDuration=(5+Math.random()*5)+"s";

        heart.style.fontSize=(20+Math.random()*25)+"px";

        document.body.appendChild(heart);

        setTimeout(()=>{

            heart.remove();

        },10000);

    },600);

}

floatingHearts();


// =======================================
// Sparkle Stars
// =======================================

function sparkles(){

    setInterval(()=>{

        const star=document.createElement("div");

        star.innerHTML="✨";

        star.style.position="fixed";

        star.style.left=Math.random()*100+"vw";

        star.style.top=Math.random()*100+"vh";

        star.style.fontSize=(10+Math.random()*20)+"px";

        star.style.opacity="0";

        star.style.transition="1.5s";

        document.body.appendChild(star);

        setTimeout(()=>{

            star.style.opacity="1";

        },50);

        setTimeout(()=>{

            star.style.opacity="0";

        },1000);

        setTimeout(()=>{

            star.remove();

        },1600);

    },350);

}

sparkles();


// =======================================
// Start Fireworks Automatically
// when photo is revealed
// =======================================

showPhoto.addEventListener("click",()=>{

    startFireworks();

});


// ========================================
// PART 3
// Typewriter + Photo Reveal + Final Effects
// ========================================

// Birthday Message
const birthdayMessage = `Hi Jyo!

Happy Birthday pandi pilla 

Sanskrit sir chaala manchi pani chesaru 2021 September 16 Ninnu naa pakkana kurchomani.

Neeku gruthu undho ledho aaroju nenu lunch ki veg biryani teesukuvacha. Nee lunch naatho share chesukunnav and naa lunch ni neetho share chesukunna.

Lunch share chesukovadam daggara nundi eeroju dark secrets kooda share chesukuney stage ki vellindhi mana journey.

Happy Birthday my 5 years gorgeous 

Maturity aney oka subject Naa life loki vachaka, inni years nuvvey ekkuva unnav rah Naa life lo!

Mana love language ento telsa?

Morning lechi nappati nundi night padukuney varaku iddaraki iddaram roast chesukuntuney untam...

Idhey mana love language! 

Gossips lo manalni minchi vallu leru rah 

Hope our friendship never dies 🥺❤️

Once again...

 Happy 21st Birthday Jyothamma ❤️`;

const typewriter = document.getElementById("typewriter");

let index = 0;

function startTyping(){

    typewriter.innerHTML = "";

    index = 0;

    typeMessage();

}

function typeMessage(){

    if(index < birthdayMessage.length){

        const ch = birthdayMessage.charAt(index);

        if(ch=="\n")
            typewriter.innerHTML += "<br>";
        else
            typewriter.innerHTML += ch;

        index++;

        typewriter.scrollTop = typewriter.scrollHeight;

        setTimeout(typeMessage,35);

    }

}

// ============================
// Photo Animation
// ============================

const photo = document.getElementById("birthdayPhoto");

showPhoto.addEventListener("click",()=>{

    photo.style.transform="scale(.6)";
    photo.style.opacity="0";

    setTimeout(()=>{

        photo.style.transition="1.2s ease";

        photo.style.transform="scale(1)";

        photo.style.opacity="1";

        photo.style.boxShadow="0 0 60px rgba(255,215,0,.8)";

    },300);

});

// ============================
// Glowing Background
// ============================

setInterval(()=>{

    document.body.style.background=
    `linear-gradient(
    ${Math.random()*360}deg,
    #080814,
    #1a1a55,
    #2b0b45,
    #0d0d22
    )`;

},5000);

// ============================
// Floating Sparkles
// ============================

setInterval(()=>{

    const s=document.createElement("div");

    s.innerHTML="✨";

    s.style.position="fixed";

    s.style.left=Math.random()*100+"vw";

    s.style.top=Math.random()*100+"vh";

    s.style.fontSize=(10+Math.random()*25)+"px";

    s.style.pointerEvents="none";

    s.style.opacity="0";

    s.style.transition="2s";

    document.body.appendChild(s);

    setTimeout(()=>{

        s.style.opacity="1";

    },50);

    setTimeout(()=>{

        s.style.opacity="0";

    },1500);

    setTimeout(()=>{

        s.remove();

    },2200);

},250);

// ============================
// Replay
// ============================

replay.addEventListener("click",()=>{

    location.reload();

});

// ============================
// Congratulations
// ============================

console.log(" Happy Birthday Jyothamma ❤️");
