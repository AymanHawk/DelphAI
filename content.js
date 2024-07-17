$(document).ready(() => {
  let emailContents = ""; // Global variable to store captured email contents

  // Function to add buttons
  function addButtons() {
    const targetClass = "OTADH xukFz";
    const targetDiv = $(`div.${targetClass.replace(/ /g, ".")}`);
    if (targetDiv.length) {
      // Create a wrapper div
      const wrapperDiv = $('<div id="custom-button-wrapper"></div>');

      // SVG icons (empty strings for now)
      const svgIcon1 = ``;
      const svgIcon2 = ``;

      // Create Generate button with onclick function
      const generateButton = $("<button>")
        .html("Generate " + svgIcon1)
        .addClass(
          "bg-blue-600 text-white px-2 py-1 m-0 mr-2 rounded inline-flex items-center"
        )
        .click(() => {
          simulateClick().then(() =>
            captureEmailContents().then((contents) => callOllamaApi(contents))
          );
        }); // Add click event to capture emails and call API

      // Create Improve button with onclick function
      const improveButton = $("<button>")
        .html("Improve " + svgIcon2)
        .addClass(
          "bg-green-600 text-white px-2 py-1 m-0 mr-2 rounded inline-flex items-center"
        )
        .click(() => {
          simulateClick().then(() =>
            captureEmailContents().then((contents) => callImproveApi(contents))
          );
        });

      const captureButton = $("<button>")
        .html("Capture Emails")
        .addClass(
          "bg-red-500 text-white px-2 py-1 m-0 mr-2 rounded inline-flex items-center"
        )
        .click(() => {
          simulateClick().then(() => captureEmailContents());
        });
      // Create dropdown button structure
      const btnWrapper = $("<div>").addClass(
        "btnwrapper inline-flex items-center"
      );
      const btnLeft = $("<button>")
        .attr("id", "btnleft")
        .addClass("btn font-semibold")
        .text("Tester")
        .click(() => {
          alert("Tester Clicked");
        });
      const btnDivider = $("<div>")
        .attr("id", "btndivider")
        .addClass("dropdown");
      const btnRight = $("<button>").attr("id", "btnright").addClass("btn mr-2")
        .html(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
      <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
    </svg>
  `); // Added SVG for dropdown icon
      const dropdownContent = $("<div>").addClass("dropdown-content");
      const option1 = $("<a>").attr("href", "#").text("Professional");
      const option2 = $("<a>").attr("href", "#").text("Informal");
      const option3 = $("<a>").attr("href", "#").text("Silly");

      dropdownContent.append(option1, option2, option3);
      btnDivider.append(btnRight, dropdownContent);
      btnWrapper.append(btnLeft, btnDivider);

      // Append buttons to the wrapper div
      wrapperDiv.append(
        btnWrapper,
        generateButton,
        improveButton,
        captureButton
      );

      // Append the wrapper div to the target div
      targetDiv.append(wrapperDiv);

      console.log("Buttons with SVG icons added to the target div.");
    } else {
      console.log("Target div not found, retrying...");
      setTimeout(addButtons, 100); // Retry after 1 second
    }
  }

  // Function to remove buttons
  function removeButtons() {
    const wrapperDiv = $("#custom-button-wrapper");
    if (wrapperDiv.length) {
      wrapperDiv.remove();
      console.log("Buttons removed from the target div.");
    }
  }

  // Function to simulate clicks
  function simulateClick() {
    return new Promise((resolve) => {
      const emailElements = $("div.WWy1F.WWy1F"); // Select the email elements
      let index = 0;

      function clickElement() {
        if (index < emailElements.length) {
          const emailElement = $(emailElements[index]);
          emailElement.click(); // Simulate click
          index++;
          setTimeout(clickElement, 100); // Adjust the delay as needed
        } else {
          resolve();
        }
      }

      clickElement();
    });
  }

  // Function to capture email contents
  function captureEmailContents() {
    return new Promise((resolve) => {
      setTimeout(() => {
        // Initial delay to ensure all elements are fully loaded
        const emailContainers = $("div.WWy1F.WWy1F"); // Select the email elements
        emailContents = ""; // Reset emailContents before capturing

        emailContainers.each((index, element) => {
          const emailContent = $(element)
            .find('div[aria-label="Message body"]')
            .text();
          emailContents += `Email ${
            index + 1
          } content: ${emailContent.trim()}\n`;
        });

        console.log("Captured email contents:", emailContents);
        resolve(emailContents);
      }, 100); // Delay to ensure content is loaded after clicks
    });
  }

  const JSONformat = {
    tone: "Professional",
    recipientName: "Ayman Haque",
    recipientEmail: "ahaque2002@gmail.com",
    suggestedResponse:
      "Hey Jared, I hope you're doing well. I wanted to follow up on the email I sent you last week. Please let me know if you have any updates. Best Regards, Ayman Haque",
  };

  const sampleResponses = {
    examples: [
      {
        tone: "Professional",
        recipientName: "Jane Doe",
        recipientEmail: "jane.doe@example.com",
        suggestedResponse:
          "Hi Jane, Thank you for your email. I appreciate the update and will follow up with the team. Best Regards, John Smith",
      },
      {
        tone: "Informal",
        recipientName: "Tom",
        recipientEmail: "tom@example.com",
        suggestedResponse:
          "Hey Tom, Got your email. Thanks for the heads-up. I'll get back to you soon. Cheers, Alex",
      },
      {
        tone: "Professional",
        recipientName: "Emily",
        recipientEmail: "emily@example.com",
        suggestedResponse:
          "Dear Emily, I hope this message finds you well. Thank you for your inquiry. I will look into the matter and revert shortly. Sincerely, Michael",
      },
    ],
  };

  // Function to call the local API for generating response
  function callOllamaApi(contents) {
    fetch("http://localhost:11434/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "llama3",
        messages: [
          {
            role: "system",
            content: `You respond to emails using the email thread as context. The email thread will be provided to you and you will respond as if you are the email recipient. You only return responses as JSON. The response you will return will be in this format: ${JSONformat}. These are some example responses: ${
              sampleResponses || "Not Provided Yet"
            } And your response will be in this tone ${JSONformat.tone}`,
          },
          {
            role: "user",
            content: contents, // Pass the captured email contents here
          },
        ],
        stream: false,
        format: "json",
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Network response was not ok ${response.statusText}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log("API response:", data);
        if (data && data.message && data.message.content) {
          // Ensure the response is in the expected format
          updateEmailContent(data.message.content); // Update the email content with the API response
        } else {
          console.error("Unexpected API response format:", data);
        }
      })
      .catch((error) => {
        console.error("Error calling API:", error);
      });
  }

  // Function to call the local API for improving response
  function callImproveApi(contents) {
    fetch("http://localhost:11434/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "llama3",
        messages: [
          {
            role: "system",
            content:
              "You are an assistant that improves the quality of email responses. I will pass the entire thread's separate emails as context and you will use that to provide an improved version of the response. You only respond with the improved response you generate, nothing else.",
          },
          {
            role: "user",
            content: contents, // Pass the captured email contents here
          },
        ],
        stream: false,
        // format: 'json'
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Network response was not ok ${response.statusText}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log("API response:", data);
        if (data && data.message && data.message.content) {
          // Ensure the response is in the expected format
          updateEmailContent(data.message.content); // Update the email content with the API response
        } else {
          console.error("Unexpected API response format:", data);
        }
      })
      .catch((error) => {
        console.error("Error calling API:", error);
      });
  }

  // Function to update email content div
  function updateEmailContent(content) {
    $("div.elementToProof").text(content);
  }

  // Check the initial toggle state and add buttons if enabled
  chrome.storage.sync.get(["toggleButtons"], (result) => {
    if (result.toggleButtons) {
      addButtons();
    } else {
      console.log("Buttons are toggled off.");
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
  const tailwindLink = document.createElement("link");
  tailwindLink.rel = "stylesheet";
  tailwindLink.href =
    "https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css";
  document.head.appendChild(tailwindLink);
});
