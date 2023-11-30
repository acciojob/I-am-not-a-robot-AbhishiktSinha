//your code here
const imageDB = [];

for (let index = 0; index < 6; index++) {
    let image = document.createElement("img");
    if (index < 5) {
        image.className = `img${index + 1}`;
    }
    else {
        image.className = `img${getRandom1to5()}`;
    }
    image.setAttribute("data-index", `${index}`);

    imageDB.push({
        img: image,
        selected: false,
        printed: false
    });
}

function getRandom1to5() {
    // Math.floor(Math.random() * (n) + 1)
    /* Math.random gives values from 0 inclusive to 1 exclusive
         Math.floor(math.random() * x), gives values from 0 to x-1
        Math.floor(math.random() * (x+1)) gives values from 0 to x
          Math.floor(math.random() * (x)) + 1  : gives values from 1 to x
        */
    return (Math.floor(Math.random() * 5) + 1);
}
function getRandom0to5() {
    return (Math.floor(Math.random() * 6));
}

// alert (imageDB[5].img.className);

const imageContainer = document.querySelector(".flex");
let repetitions = 0;
displayImages();

function displayImages() {
    // pick random indices and print images at those indices in the imageDB
    // to avoid picking the same index twice, verify uniqeness by checking the printed key of each imageDB object

    while (imageContainer.childElementCount < 6) {

        const index = getRandom0to5();
        const imageObject = imageDB[index];

        if (imageObject.printed) {
            continue;
        }

        const imageElement = imageDB[index].img;

        imageContainer.appendChild(imageElement);

        imageObject.printed = true;

    }

}

let countSelected = 0;
imageContainer.addEventListener("click", (event) => {

    if (event.target.tagName === 'IMG') {

        event.target.classList.toggle("selected");

        // get that image object and toggle selected
        const imageObject = imageDB[event.target.getAttribute("data-index")];
        imageObject.selected = !imageObject.selected;

        console.log(imageObject);

        if (imageObject.selected) { countSelected++; }
        else {
            countSelected--;
        }
    }

    // if none selected ------> go to state 1
    if (countSelected == 0) {
        state1();
    }

    // if at least 1 selected ---> go to state 2
    if (countSelected == 1) {
        state2();
    }

    // if 2 selected --------> go to state 3
    if (countSelected == 2) {
        state3();
    }

    // if more than 2 selected ---> go to state 2 
    if (countSelected > 2) {
        state2();
    }
})

const buttonsList = document.querySelectorAll(".buttons-container >button");
const resetButton = buttonsList[0];
const verifyButton = buttonsList[1];
const displayTextContainer = document.querySelector("#para");

resetButton.addEventListener("click", state1);
verifyButton.addEventListener("click", humanTest);

function state1() {

    // unselect all images
    countSelected = 0;
    
    imageDB.forEach((object)=>{
        const imageElement = object.img;
        if(imageElement.classList.contains("selected")) {
            imageElement.classList.remove("selected");
        }
        object.selected = false;
    })

    for (let button of buttonsList) {
        if (!button.classList.contains("hide")) {
            button.classList.add("hide");
        }
    }

    displayTextContainer.innerText = '';
    if(!displayTextContainer.classList.contains("hide")) {
        displayTextContainer.classList.add("hide");
    }
}

function state2() {
    if(resetButton.classList.contains("hide")) {
        resetButton.classList.remove("hide");
    }

    if(!verifyButton.classList.contains("hide")) {
        verifyButton.classList.add("hide");
    }
}

function state3() {
    if(verifyButton.classList.contains("hide")) {
        verifyButton.classList.remove("hide")
    }
}

let selected1, selected2;

function humanTest() {
    verifyButton.classList.add("hide");

    selected1 = imageDB.find( (element)=>{
        return (element.selected === true);
    }).img;
    selected2 = imageDB.find( (element)=> {
        return ( (element.selected == true) && (element.img != selected1) )
    }).img;

    let displayText;
    if(selected1.className === selected2.className) {
        displayText = 'You are a human. Congratulations!';
    }
    else {
        displayText = "We can't verify you as a human. You selected the non-identical tiles";
    }
    displayTextContainer.innerText = displayText;
    displayTextContainer.classList.toggle("hide");
}