var startButton;
var stopButton;
var resetButton;
var countdown;
var numberInput;
var randomInput;

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    console.log('RECEIVED MESSAGE FROM BACKGROUD', request.comand)
    if (request.comand === 'updateTime') {
        countdown.innerHTML = `${request.value}`;
    }
})

document.addEventListener('DOMContentLoaded', function () {
    var quickSecElement = document.getElementsByClassName('quickSec');
    for (var element of quickSecElement) {
        element.onclick = function (item) {
            numberInput.value = item.target.dataset.time;
        }
    }

    startButton = document.getElementById('start');
    stopButton = document.getElementById('stop');
    resetButton = document.getElementById('reset');

    countdown = document.getElementById('secCountdown');
    numberInput = document.getElementById('numberInput');
    randomInput = document.getElementById('randomize');

    startButton.addEventListener('click', start, false);
    stopButton.addEventListener('click', stop, false);
    resetButton.addEventListener('click', reset, false);
}, false);

function start() {
    var time = parseInt(numberInput.value);
    countdown.innerHTML = time;

    chrome.runtime.sendMessage({
        comand: "start",
        value: time,
        randomize: randomInput.checked
    }, function (response) {
        if (response) {
            startButton.disabled = true;
            stopButton.disabled = false;
            resetButton.disabled = false;
        }
    });
}

function stop() {
    chrome.runtime.sendMessage({ comand: "stop" }, function (response) {
        if (response) {
            startButton.disabled = false;
            stopButton.disabled = true;
            resetButton.disabled = true;
        }
    });
}

function reset() {
    chrome.runtime.sendMessage({ comand: "reset" }, function (response) {
        if (response) {
            startButton.disabled = false;
            stopButton.disabled = true;
            resetButton.disabled = true;
        }
    });
}