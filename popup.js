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
        if (toneSelect) {
            const selectedTone = toneSelect.value;
            console.log('Selected Tone:', selectedTone); // This will log in the popup's console
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

    // Log the selected tone at regular intervals
    setInterval(logToneSelect, 5000); // Logs every 5 seconds
});

document.addEventListener('DOMContentLoaded', () => {
    const toneSelect = document.getElementById('toneSelect');
    const responseType = document.getElementById('responseType');

    // Load saved values from localStorage
    if (localStorage.getItem('toneSelect')) {
        toneSelect.value = localStorage.getItem('toneSelect');
    }
    if (localStorage.getItem('responseType')) {
        responseType.value = localStorage.getItem('responseType');
    }

    // Save toneSelect value to localStorage when changed
    toneSelect.addEventListener('change', () => {
        localStorage.setItem('toneSelect', toneSelect.value);
    });

    // Save responseType value to localStorage when changed
    responseType.addEventListener('change', () => {
        localStorage.setItem('responseType', responseType.value);
    });
});

