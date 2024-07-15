$(document).ready(() => {
    // Function to add buttons
    function addButtons() {
        const targetClass = "OTADH xukFz";
        const targetDiv = $(`div.${targetClass.replace(/ /g, '.')}`);
        if (targetDiv.length) {
            // Create a wrapper div
            const wrapperDiv = $('<div id="custom-button-wrapper"></div>');

            // SVG icons (empty strings for now)
            const svgIcon1 = ``;
            const svgIcon2 = ``;

            // Create buttons with SVG icons
            const button1 = $('<button>')
                .html('Generate ' + svgIcon1)
                .addClass('bg-blue-500 text-white px-2 py-1 m-0 rounded inline-flex items-center')
                .click(() => callLocalApi()); // Add click event to call API

            const button2 = $('<button>')
                .html('Improve ' + svgIcon2)
                .addClass('bg-green-500 text-white px-2 py-1 m-0 rounded inline-flex items-center');

            const captureButton = $('<button>')
                .html('Capture Emails')
                .addClass('bg-red-500 text-white px-2 py-1 m-0 rounded inline-flex items-center')
                .click(() => captureEmailContents());

            // Append buttons to the wrapper div
            wrapperDiv.append(button1, button2, captureButton);

            // Append the wrapper div to the target div
            targetDiv.append(wrapperDiv);

            console.log('Buttons with SVG icons added to the target div.');
        } else {
            console.log('Target div not found, retrying...');
            setTimeout(addButtons, 1000); // Retry after 1 second
        }
    }

    // Function to remove buttons
    function removeButtons() {
        const wrapperDiv = $('#custom-button-wrapper');
        if (wrapperDiv.length) {
            wrapperDiv.remove();
            console.log('Buttons removed from the target div.');
        }
    }

    // Function to capture email contents
    function captureEmailContents() {
        // Select the email content divs
        const emailContainers = $('div.WWy1F.WWy1F'); // Updated to select the specific email containers
        emailContainers.each((index, element) => {
            // Find the actual email content within each container
            const emailContent = $(element).find('div[aria-label="Message body"]').text(); // Adjust the selector based on the actual content structure
            console.log(`Email ${index + 1} content:`, emailContent.trim());
        });
    }

    // Function to call the local API
    function callLocalApi() {
        fetch('http://localhost:11434/api/generate', {
            model: 'llama3',
            messages: [
                {
                    "role": "system",
                    "content": `These are the phishing example jsons. and these are the safe example jsons`
                },
            ],
            stream: false,
            format: `json`
        })
            .then(response => response.json())
            .then(data => {
                console.log('API response:', data);
            })
            .catch(error => {
                console.error('Error calling API:', error);
            });
    }

    // Check the initial toggle state and add buttons if enabled
    chrome.storage.sync.get(['toggleButtons'], (result) => {
        if (result.toggleButtons) {
            addButtons();
        } else {
            console.log('Buttons are toggled off.');
        }
    });

    // Listen for messages from the popup script
    chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
        if (request.toggleButtons) {
            addButtons();
        } else {
            removeButtons();
        }
    });

    // Inject Tailwind CSS dynamically
    const tailwindLink = document.createElement('link');
    tailwindLink.rel = 'stylesheet';
    tailwindLink.href = 'https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css';
    document.head.appendChild(tailwindLink);
});
