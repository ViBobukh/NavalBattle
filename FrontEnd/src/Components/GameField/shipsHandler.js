let clickHandler = false;
function eventHandler(event) {
    if(event.currentTarget.style.backgroundColor !== "pink" && clickHandler === false){
        event.currentTarget.style.backgroundColor = "pink";
        clickHandler = true;
    }else {
        event.currentTarget.style.backgroundColor = "white";
        clickHandler = false;
    }
    console.log(event.currentTarget, clickHandler)
}

export {eventHandler};