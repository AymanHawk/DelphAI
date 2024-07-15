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
