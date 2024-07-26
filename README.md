# Delph@i - AI-Powered Email Companion

Delph@i is an intelligent email companion designed to enhance your email experience by leveraging AI to curate and improve your email responses.

## Features

- **Tone Selection**: Choose the tone of your email responses (Professional, Informal, Silly, Funny, etc.)
- **Response Type**: Select the type of response you want (formal, casual, etc.)
- **Email Signature**: Add and manage your email signature.
- **Additional Information**: Include any additional information you want in your emails.
- **Subscription Features**: Access to advanced features like Goofy tone and Sentiment Analysis.

## Prerequisites

- **Ollama**: Delph@i leverages open source LLM's via Ollama. Specifically, Delph@i was developed using llama3, so it is advised to use some version of llama for optimal results.

### Download and Install Ollama

1. Visit the Ollama website at [Ollama Official Site](https://www.ollama.com/).
2. Follow the instructions to download the Ollama package for your operating system.
3. Install Ollama by following the setup guide provided on the website for your given operating system.

### Download and Install llama3

1. After installing Ollama, open your terminal or command prompt.
2. Run the following command to install llama3:
    ```sh
    ollama install llama3
    ```
3. Ensure that llama3 is properly installed by checking the available models:
    ```sh
    ollama list
    ```
4. You should see llama3 listed among the available models. Native support for other models will come soon.
5. There are a few llama3 models available with different parameter counts such as **8b**, *70b*, and ***405b***. Downloading llama3: **8b** is advised, as larger parameter models will require a higher performing computer, since ollama runs locally on your computer.

## Project Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/yourusername/delphai.git
    ```
2. Navigate to the project directory:
    ```sh
    cd delphai
    ```
3. Load the extension in Chrome:
    1. Open Chrome and go to `chrome://extensions/`
    2. Enable "Developer mode" by clicking the toggle switch.
    3. Click the "Load unpacked" button and select the project directory.

## Usage

1. Open the extension by clicking on the Delph@i icon in the Chrome toolbar.
2. Select your desired tone from the dropdown menu.
3. Choose the response type and add your email signature and any additional information.
4. The extension will save your preferences and apply them to your email responses.

## Code Structure

### content.js

Handles saving and logging values from local storage and listens for messages from the background script or popup.

```javascript
// Function to log values from local storage
function logLocalStorageValues() {
    console.log("Tone Select:", localStorage.getItem("toneSelect"));
    console.log("Response Type:", localStorage.getItem("responseType"));
    console.log("Email Signature:", localStorage.getItem("eSig"));
    console.log("Additional Info:", localStorage.getItem("additionalInfo"));
}

// Log values initially when content script loads
logLocalStorageValues();

// Listen for messages from the background script or popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    console.log('REQUEST CLG ***', request);

    if (request.action === "logToneSelect") {
        console.log("Selected Tone:", request.tone);
        localStorage.setItem("toneSelect", request.tone);
    } else if (request.action === "logResponseType") {
        console.log("Selected Response Type:", request.responseType);
        localStorage.setItem("responseType", request.responseType);
    } else if (request.action === "logESig") {
        console.log("Selected eSig:", request.eSig);
        localStorage.setItem("eSig", request.eSig);
    } else if (request.action === "logAdditionalInfo") {
        console.log("Selected Additional Info:", request.additionalInfo);
        localStorage.setItem("additionalInfo", request.additionalInfo);
    }
});
