import Tab from './tab.js';

var timer = 0;
var elapsedTime = 0;
var activeTabId;
var tabsData = new Array;

chrome.tabs.onActivated.addListener(function (activeInfo) {
    activeTabId = activeInfo.tabId;
    console.log('activeTabId', activeTabId)
    console.log('tabsData', tabsData);
    // let timeOutSeconds = null;
    // if (tabData && tabData[activeTabId])
    //     timeOutSeconds = secToMinSec(tabData[activeTabId].timeOutSeconds, false);
    // chrome.browserAction.setBadgeText({ text: timeOutSeconds });
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    console.log('request', request)

    if (request.comand === 'start') {
        var interval_id = start(activeTabId, request.value, request.randomize ?? false);
        setBadge('On');
        var tab = new Tab(activeTabId, request.value, request.comand, request.randomize, 'On', interval_id)
        console.log('tab', tab)
        console.log('tab get', tab.get(interval_id))
    }
    if (request.comand === 'stop') {
        console.log("stop Interval of tab ", tabsData[activeTabId])
        clearInterval(tabsData[activeTabId].interval_id);
        setBadge();
        updateCounter(0);
    }
    if (request.comand === 'reset') {
        console.log("reset Interval of tab ", tabsData[activeTabId])
        clearInterval(tabsData[activeTabId].interval_id);
        setBadge();
        updateCounter(0);
    }

    if (request.comand === 'log') {
        console.log('log from popup.js', request.log)
    }
    sendResponse(true)
})

function start(tabId, time, randomize) {
    timer = time;

    if (randomize) {
        timer = randomValue(3, time);
        updateCounter(timer);
    }

    return setInterval(function () {
        if (elapsedTime === timer - 1) {
            chrome.tabs.reload(tabId)
            console.log('refresh tab', tabId)
            elapsedTime = 0;
            if (randomize) {
                timer = randomValue(3, time);
            }
            updateCounter(timer);
        } else {
            elapsedTime += 1;
            updateCounter(timer - elapsedTime);
        }
    }, 1000);
}
/**
 * Aggiorna il counter nel popup.html
 * @param  {} value
 */
function updateCounter(value) {
    chrome.runtime.sendMessage({
        comand: 'updateTime',
        value: value
    });
}

function setBadge(text = '') {
    chrome.action.setBadgeText({ text: text });
}

function randomValue(min, max) {
    var random_value = Math.floor(Math.random() * (max - min + 1) + min);
    console.log('random_value', random_value)
    return random_value;
}