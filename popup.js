$(document).ready(() => {
    // Load the toggle state from Chrome storage
    chrome.storage.sync.get(['toggleButtons'], (result) => {
        if (result.toggleButtons) {
            $('#toggle-buttons').prop('checked', result.toggleButtons);
            $('.dot').css('transform', 'translateX(100%)');
        } else {
            $('.dot').css('transform', 'translateX(0)');
        }
    });

    // Update the toggle state in Chrome storage when the switch is toggled
    $('#toggle-buttons').change(() => {
        const toggleState = $('#toggle-buttons').is(':checked');
        chrome.storage.sync.set({ toggleButtons: toggleState }, () => {
            console.log('Toggle state saved:', toggleState);
            // Send a message to the content script about the toggle state change
            chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
                chrome.tabs.sendMessage(tabs[0].id, { toggleButtons: toggleState });
            });
        });

        // Move the toggle dot
        if (toggleState) {
            $('.dot').css('transform', 'translateX(100%)');
        } else {
            $('.dot').css('transform', 'translateX(0)');
        }
    });

    // Example button action
    $('#action-button').click(() => {
        alert('Button clicked!');
    });
});

document.addEventListener('DOMContentLoaded', () => {
    function logToneSelect() {
        const toneSelect = document.getElementById('toneSelect');
        if (toneSelect.value) {
            const selectedTone = toneSelect.value;
            console.log('Selected Tone:', selectedTone);
            chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
                chrome.tabs.sendMessage(tabs[0].id, { action: "logToneSelect", tone: selectedTone });
            });
        } else {
            console.log('toneSelect element not found');
        }
    }

    // Log tone select on page load
    logToneSelect();

    // Add event listener to log tone select on change
    const toneSelect = document.getElementById('toneSelect');
    if (toneSelect) {
        toneSelect.addEventListener('change', logToneSelect);
    }
});

document.addEventListener('DOMContentLoaded', () => {
    function logResponseType() {
        const responseType = document.getElementById('responseType');
        if (responseType.value) {
            const selectedResponseType = responseType.value;
            console.log('Selected Response Type:', selectedResponseType);
            chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
                chrome.tabs.sendMessage(tabs[0].id, { action: "logResponseType", responseType: selectedResponseType });
            });
        } else {
            console.log('responseType element not found');
        }
    }

    // Log tone select on page load

    logResponseType();

    const responseType = document.getElementById('responseType');
    if (responseType) {
        responseType.addEventListener('change', logResponseType);
    }
});

document.addEventListener('DOMContentLoaded', () => {
    function logESig() {
        const eSig = document.getElementById('eSig');
        if (eSig.value) {
            const selectedESig = eSig.value;
            console.log('Selected Tone:', selectedESig); // This will log in the popup's console
            chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
                chrome.tabs.sendMessage(tabs[0].id, { action: "logESig", eSig: selectedESig });
            });
        } else {
            console.log('selectedESig element not found');
        }
    }

    // Log tone select on page load
    logESig();

    // Add event listener to log tone select on change
    const eSigSelect = document.getElementById('eSig');
    if (eSigSelect) {
        console.log('esig change detected')
        eSigSelect.addEventListener('input', logESig);
    }

    // Log the selected tone at regular intervals
    setInterval(logESig, 5000); // Logs every 5 seconds
});

document.addEventListener('DOMContentLoaded', () => {
    function logAdditionalInfo() {
        const additionalInfoSelect = document.getElementById('additionalInfo');
        if (additionalInfoSelect.value) {
            const selectedAdditionalInfo = additionalInfoSelect.value;
            console.log('Selected Additional Info:', selectedAdditionalInfo); // This will log in the popup's console
            chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
                chrome.tabs.sendMessage(tabs[0].id, { action: "logAdditionalInfo", additionalInfo: selectedAdditionalInfo });
            });
        } else {
            console.log('additionalInfoSelect element not found');
        }
    }

    // Log tone select on page load
    logAdditionalInfo();

    // Add event listener to log tone select on change
    const additionalInfoSelect = document.getElementById('additionalInfo');
    if (additionalInfoSelect) {
        additionalInfoSelect.addEventListener('input', logAdditionalInfo);
    }
    setInterval(logAdditionalInfo, 5000);
});

document.addEventListener('DOMContentLoaded', () => {
    const toneSelect = document.getElementById('toneSelect');
    const responseType = document.getElementById('responseType');

    const eSigSelect = document.getElementById('eSig');
    const additionalInfoSelect = document.getElementById('additionalInfo');

    // Load saved values from localStorage
    if (localStorage.getItem('toneSelect')) {
        console.log('first')
        toneSelect.value = localStorage.getItem('toneSelect');
    }
    if (localStorage.getItem('responseType')) {
        console.log('first')
        responseType.value = localStorage.getItem('responseType');
    }

    if (localStorage.getItem('eSig')) {
        eSigSelect.value = localStorage.getItem('eSig');
    }

    if (localStorage.getItem('additionalInfo')) {
        additionalInfoSelect.value = localStorage.getItem('additionalInfo');
    }

    // Save toneSelect value to localStorage when changed
    toneSelect.addEventListener('change', () => {
        localStorage.setItem('toneSelect', toneSelect.value);
    });

    // Save responseType value to localStorage when changed
    responseType.addEventListener('change', () => {
        localStorage.setItem('responseType', responseType.value);
    });

    eSigSelect.addEventListener('input', () => {
        localStorage.setItem('eSig', eSigSelect.value);
    });
    additionalInfoSelect.addEventListener('input', () => {
        localStorage.setItem('additionalInfo', additionalInfoSelect.value);
    });
});

