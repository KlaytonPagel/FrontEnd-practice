let currentMode = 'light';
let modeButton = document.querySelector('#modeButton')
let intervalButton = document.querySelector('#intervalButton')
let intervalState = 'off'
let interval;
let text = document.getElementsByClassName('text')
let buttons = document.getElementsByClassName('buttons')

modeButton.onclick = changeStyleMode;
intervalButton.onclick = toggleInterval;

function changeStyleMode() {
    if (currentMode === 'dark'){
        document.body.style.background = "#ffffff";
        currentMode = "light";
        for (let i = 0; i < text.length; i++) {
            text[i].style.color = "#000000";
        }
        for (let i = 0; i < buttons.length; i++) {
            buttons[i].style.background = "#646464";
            buttons[i].style.color = "#ffffff";
        }
    }
    else if (currentMode === 'light') {
        currentMode = 'dark';
        document.body.style.background = "#27252a";
        for (let i = 0; i < text.length; i++) {
            text[i].style.color = "#ffffff";
        }
        for (let i = 0; i < buttons.length; i++) {
            buttons[i].style.background = "#ffffff";
            buttons[i].style.color = "#000000";
        }
    }
}
function toggleInterval() {
    if (intervalState === 'off'){
        intervalState = 'on'
        interval = setInterval(changeStyleMode, 50)
    }
    else {
        intervalState = 'off'
        clearTimeout(interval)
        currentMode = 'light'
        changeStyleMode()
    }
}
