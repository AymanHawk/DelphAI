$(document).ready(() => {
    let emailContents = ""; // Global variable to store captured email contents

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
                .addClass('bg-blue-500 text-white px-2 py-1 m-0 mr-2 rounded inline-flex items-center')
                .click(() => {
                    captureEmailContents().then(contents => callOllamaApi(contents));
                }); // Add click event to capture emails and call API

            const button2 = $('<button>')
                .html('Improve ' + svgIcon2)
                .addClass('bg-green-500 text-white px-2 py-1 m-0 mr-2 rounded inline-flex items-center');

            const captureButton = $('<button>')
                .html('Capture Emails')
                .addClass('bg-red-500 text-white px-2 py-1 m-0 mr-2 rounded inline-flex items-center')
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
        return new Promise((resolve) => {
            // Select the email content divs
            const emailContainers = $('div.WWy1F.WWy1F'); // Updated to select the specific email containers
            emailContents = ""; // Reset the global variable
            emailContainers.each((index, element) => {
                // Find the actual email content within each container
                const emailContent = $(element).find('div[aria-label="Message body"]').text(); // Adjust the selector based on the actual content structure
                emailContents += `Email ${index + 1} content: ${emailContent.trim()}\n`;
            });
            console.log('Captured email contents:', emailContents);
            resolve(emailContents);
        });
    }

    // Function to call the local API through CORS Anywhere proxy
    function callOllamaApi(contents) {
        fetch('http://localhost:11434/api/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                model: 'llama3',
                messages: [
                    {
                        role: 'system',
                        content: 'You are an assistant that provides potential responses to emails. I will pass the entire thread\'s separate emails as context and you will use that to determine what the response will be. You only respond with the actual suggested response you generate, nothing else.'
                    },
                    {
                        role: 'user',
                        content: contents // Pass the captured email contents here
                    }
                ],
                stream: false
                // format: 'json'
            })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Network response was not ok ${response.statusText}`);
            }
            return response.json();
        })
        .then(data => {
            console.log('API response:', data);
            if (data && data.message && data.message.content) { // Ensure the response is in the expected format
                updateEmailContent(data.message.content); // Update the email content with the API response
            } else {
                console.error('Unexpected API response format:', data);
            }
        })
        .catch(error => {
            console.error('Error calling API:', error);
        });
    }

    // Function to update email content div
    function updateEmailContent(content) {
        $('div.elementToProof').text(content);
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
