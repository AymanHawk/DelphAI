let sessionResponses = [];
let currentIndex = -1;

function updateCounter() {
  $('#counter-div').html(`${currentIndex + 1} / ${sessionResponses.length}`);
}
$(document).ready(() => {
  let emailContents = "";

  function addButtons() {
    const targetClass = "OTADH xukFz";
    const targetDiv = $(`div.${targetClass.replace(/ /g, ".")}`);
    if (targetDiv.length && !targetDiv.find("#custom-button-wrapper").length) {
      // Create a wrapper div
      const wrapperDiv = $('<div id="custom-button-wrapper" class="flex items-center space-x-2"></div>');

      // Create navigation buttons
      const leftButton = $('<button>')
        .addClass('bg-gray-100 hover:bg-gray-200 rounded-l-md mr-1')
        .html(`<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
    </svg>`);

      const rightButton = $('<button>')
        .addClass('bg-gray-100 hover:bg-gray-200 rounded-r-md')
        .html(`    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
    </svg>`);


      const outlookDropdownIcon = `<i data-icon-name="ChevronDown" aria-hidden="true" class="ms-Icon root-89 css-290 ms-Button-icon ms-Button-menuIcon menuIcon-385 ms-Button-menuIcon menuIcon-162" style="font-family: controlIcons;"></i>`
      const svgIcon1 = `
    <svg xmlns="http://www.w3.org/2000/svg" version="1.1" class="icon-style pt-1" viewBox="-5.0 -10.0 110.0 135.0">
      <path fill="white" d="m41.543 23.238 2.5078 6.9688c2.7891 7.7344 8.8789 13.824 16.613 16.613l6.9688 2.5078c0.62891 0.22656 0.62891 1.1172 0 1.3438l-6.9688 2.5078c-7.7344 2.7891-13.824 8.8789-16.613 16.613l-2.5078 6.9688c-0.22656 0.62891-1.1172 0.62891-1.3438 0l-2.5078-6.9688c-2.7891-7.7344-8.8789-13.824-16.613-16.613l-6.9688-2.5078c-0.62891-0.22656-0.62891-1.1172 0-1.3438l6.9688-2.5078c7.7344-2.7891 13.824-8.8789 16.613-16.613l2.5078-6.9688c0.22656-0.63281 1.1172-0.63281 1.3438 0z" />
      <path fill="white" d="m72.914 6.4922 1.2734 3.5273c1.4141 3.9141 4.4961 7 8.4141 8.4141l3.5273 1.2734c0.32031 0.11719 0.32031 0.56641 0 0.67969l-3.5273 1.2734c-3.9141 1.4141-7 4.4961-8.4141 8.4141l-1.2734 3.5273c-0.11719 0.32031-0.56641 0.32031-0.67969 0l-1.2734-3.5273c-1.4141-3.9141-4.4961-7-8.4141-8.4141l-3.5273-1.2734c-0.32031-0.11719-0.32031-0.56641 0-0.67969l3.5273-1.2734c3.9141-1.4141 7-4.4961 8.4141-8.4141l1.2734-3.5273c0.11328-0.32422 0.56641-0.32422 0.67969 0z" />
      <path fill="white" d="m72.914 66.406 1.2734 3.5273c1.4141 3.9141 4.4961 7 8.4141 8.4141l3.5273 1.2734c0.32031 0.11719 0.32031 0.56641 0 0.67969l-3.5273 1.2734c-3.9141 1.4141-7 4.4961-8.4141 8.4141l-1.2734 3.5273c-0.11719 0.32031-0.56641 0.32031-0.67969 0l-1.2734-3.5273c-1.4141-3.9141-4.4961-7-8.4141-8.4141l-3.5273-1.2734c-0.32031-0.11719-0.32031-0.56641 0-0.67969l3.5273-1.2734c3.9141-1.4141 7-4.4961 8.4141-8.4141l1.2734-3.5273c0.11328-0.32031 0.56641-0.32031 0.67969 0z" />
    </svg>`;

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

      // Create Improve button with dropdown structure
      const btnWrapperImprove = $("<div>").addClass(
        "btnwrapper inline-flex items-center relative"
      );
      const btnLeftImprove = $("<button>")
        .attr("id", "btnleft-improve")
        .addClass("btn font-semibold")
        // .text("Optimize")
        .html(svgIcon1 + "Optimize")
        .click(() => {
          callImproveApi(); // Directly call the improved API function without simulating clicks or capturing email contents
        });

      const btnDividerImprove = $("<div>")
        .attr("id", "btndivider-improve")
        .addClass("dropdown relative");

      const btnRightImprove = $("<button>")
        .attr("id", "btnright-improve")
        .addClass("btn mr-1").html(`${outlookDropdownIcon}`);

      // Create the modal structure for Improve button 
      const modalImprove = $("<div>").addClass("dropdown-modal hidden");
      const option1Improve = $("<button>")
        .addClass("dropdown-option")
        .text("Professional");
      const option2Improve = $("<button>")
        .addClass("dropdown-option")
        .text("Informal");
      const option3Improve = $("<button>")
        .addClass("dropdown-option")
        .text("Silly");

      modalImprove.append(option1Improve, option2Improve, option3Improve);

      btnDividerImprove.append(btnRightImprove, modalImprove);
      btnWrapperImprove.append(btnLeftImprove);

      const captureButton = $("<button>")
        .html("Generate w/o Stream") //TODO
        .addClass(
          "bg-red-500 text-white px-2 py-1 m-0 mr-2 rounded inline-flex items-center"
        )
        .click(() => {
          simulateClick().then(() => streamOllamaApi());
        });

      // Create dropdown button structure
      const btnWrapper = $("<div>").addClass(
        "btnwrapper inline-flex items-center relative"
      );
      const btnLeft = $("<button>")
        .attr("id", "btnleft")
        .addClass("btn font-semibold")
        .html(svgIcon1 + 'Generate')
        .click(() => {
          simulateClick().then(() =>
            captureEmailContents().then((contents) => callOllamaApi(contents))
          );
        }); // Add click event to capture emails and call API
      const btnDivider = $("<div>")
        .attr("id", "btndivider")
        .addClass("dropdown relative");
      const btnRight = $("<button>").attr("id", "btnright").addClass("btn mr-2")
        .html(``);

      // Create the modal structure
      const modal = $("<div>").addClass("dropdown-modal hidden");
      const option1 = $("<button>")
        .addClass("dropdown-option")
        .text("Professional");
      const option2 = $("<button>")
        .addClass("dropdown-option")
        .text("Informal");
      const option3 = $("<button>").addClass("dropdown-option").text("Silly");

    // Create counter div
    const counterDiv = $('<div id="counter-div" class="ml-2 p-2 flex"></div>');

      modal.append(option1, option2, option3);

      // btnDivider.append(btnRight, modal);
      btnWrapper.append(btnLeft);

      // Append buttons to the wrapper div
      wrapperDiv.append(
        btnWrapper,
        btnWrapperImprove, // Append the Improve button structure
        // captureButton
      );

      console.log("Buttons with SVG icons added to the target div.");

      function displayResponse(response) {
        console.log(sessionResponses);
        const emailContentDiv = $('div.elementToProof');
        if (emailContentDiv.length > 0) {
          emailContentDiv.html(response.replace(/\n/g, '<br>'));
        } else {
          console.error("Email content div not found.");
        }
      }

      wrapperDiv.append(leftButton, rightButton); //TODO add a position counter to the right of the buttons 
      targetDiv.append(wrapperDiv);

      console.log("Navigation buttons added to the target div.");

      leftButton.click(() => {
        if (currentIndex > 0) {
          currentIndex--;
          displayResponse(sessionResponses[currentIndex]);
          updateCounter();
        }
      });
  
      rightButton.click(() => {
        if (currentIndex < sessionResponses.length - 1) {
          currentIndex++;
          displayResponse(sessionResponses[currentIndex]);
          updateCounter();
        }
      });

      // Hide modal when clicking outside
      $(document).on("click", (e) => {
        if (!btnWrapper.is(e.target) && btnWrapper.has(e.target).length === 0) {
          modal.addClass("hidden");
        }
        if (
          !btnWrapperImprove.is(e.target) &&
          btnWrapperImprove.has(e.target).length === 0
        ) {
          modalImprove.addClass("hidden");
        }
      });

      updateCounter();
    } else {
      // console.log("Target div not found, retrying..."); //TODO check!!
      setTimeout(addButtons, 100); // Retry after 1 second
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
          emailContents += `Email ${index + 1
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

  const toneGuidlines = {
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

  function callOllamaApi(contents) {
    const selectedType = localStorage.getItem("responseType") || "NOT PICKED";
    console.log("Selected Tone from localStorage:", selectedType);
    const selectedTone = localStorage.getItem("toneSelect") || "NOT PICKED";
    console.log("Selected Length from localStorage:", selectedTone);
    const selectedESig = localStorage.getItem("eSig") || "";
    console.log("Selected eSig from localStorage:", selectedESig);
    const selectedAdditionalInfo = localStorage.getItem("additionalInfo") || "";
    console.log("Selected AdditionalInfo from localStorage:", selectedAdditionalInfo);

    fetch("http://localhost:11434/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "llama3.1",
        messages: [
          {
            role: "system",
            content: `You respond to emails in the perspective of the email recipient (whose name is Ayman Haque), by using the entire email thread as context. The email thread will be provided to you and you will respond as if you are the email recipient.`,
          },
          {
            role: "user",
            content: `Give me a rely to this email ${contents}. I am Ayman Haque, you will repsond back as if you are me in the tone of ${JSONformat.tone}. Only return the body, not the subject line and do not say "Here is my response" I only want the response itself.  And your response will be in this tone: ${selectedTone}. This is the email signature you will use, and make sure you include it at the end: ${selectedESig}. And this is any additional info you may need to know: ${selectedAdditionalInfo}. This is the response length type: ${selectedType}.`, // TODO make prompt for concise and accurate and make sure to mention
          },
        ],
        stream: true,
        // format: "json",
      }),
    })
      .then((response) => {
        console.log(response);
        updateEmailContent('');
        return response.body;
      })
      .then((stream) => {
        const reader = stream.getReader();
        let accumulatedResponse = "";
        function readSteam() {
          reader.read().then(({ done, value }) => {
            if (done) {
              console.log("Stream completed");
              sessionResponses.push(accumulatedResponse);
              currentIndex = sessionResponses.length - 1; // Move to the latest response
              displayResponse(sessionResponses[currentIndex]);
              updateCounter(); 
              return;
            }
            const chunk = new TextDecoder().decode(value);
            try {
              const JSONdata = JSON.parse(chunk);
              // const responseContent = JSONdata.message.content;
              try {
                accumulatedResponse += JSONdata.message.content
              } catch (error) {
                console.error('Capture Response Failed ->', error)
              }
              appendEmailContent(JSONdata.message.content);
              readSteam();
            } catch (error) {
              console.error("Error parsing JSON -> REDO* ", error)
              callOllamaApi(contents);
            }
          });
        }
        // updateEmailContent(''); //TODO why is this not working -> had to put in line 265 instead for now 
        readSteam();
      })
      .catch((error) => {
        console.error("Error calling API:", error);
      });
  }

  // Define helper functions for local storage
  function getStoredResponses() {
    const storedResponses = localStorage.getItem('responses');
    return storedResponses ? JSON.parse(storedResponses) : [];
  }

  function saveResponse(response) {
    const responses = getStoredResponses();
    responses.push(response);
    localStorage.setItem('responses', JSON.stringify(responses));
  }

  function logStoredResponses() {
    const responses = getStoredResponses();
    console.log("Stored Responses:", responses);
  }


  function streamOllamaApi(contents) {
    fetch("http://localhost:11434/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "llama3.1",
        messages: [
          {
            role: "system",
            content: `You respond to emails in the perspective of the email recipient (whose name is Ayman Haque), by using the entire email thread as context. The email thread will be provided to you and you will respond as if you are the email recipient. And your response will be in this tone: ${JSONformat.tone}`,
          },
          {
            role: "user",
            content: `Give me a rely to this email ${contents}. I am Ayman Haque, you will repsond back as if you are me in the tone of ${JSONformat.tone}.`, // TODO make prompt for concise and accurate and make sure to mention
          },
        ],
        stream: true,
        // format: "json",
      }),
    })
      .then((response) => response.body)
      .then((stream) => {
        const reader = stream.getReader();
        function readStream() {
          reader.read().then(({ done, value }) => {
            if (done) {
              console.log("Stream completed");
              return;
            }
            const chunk = new TextDecoder().decode(value);
            const JSONdata = JSON.parse(chunk);
            appendEmailContent(JSONdata.message.content);
            readStream(); // Continue reading the stream
          });
        }
        readStream();
      })
      .catch((error) => {
        console.error("Error calling API:", error);
      });
  }

  function callImproveApi() {
    const existingText = $("div.elementToProof").text(); // Capture the existing text in the div
    fetch("http://localhost:11434/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "llama3.1",
        messages: [
          {
            role: "system",
            content: `you are a grammar wizard. I will give you a series of words and you will correct its grammar, punctuation, capitalization, spelling, and anything else of that nature. You will return this corrected response and nothing else.`,
          },
          {
            role: "user",
            content: existingText,
          },
        ],
        stream: true,
      }),
    })
      .then((response) => response.body)
      .then((stream) => {
        const reader = stream.getReader();
        function readSteam() {
          reader.read().then(({ done, value }) => {
            if (done) {
              console.log("Stream completed");
              return;
            }
            const chunk = new TextDecoder().decode(value);
            const JSONdata = JSON.parse(chunk);
            appendEmailContent(JSONdata.message.content);
            readSteam(); // Continue reading the stream
          });
        }
        updateEmailContent('');
        readSteam();
      })
      .catch((error) => {
        console.error("Error calling API:", error);
      });
  }

  const improvedResponseSample = [
    {
      incomingResponse:
        "Todya wIll be a good day.. i cant wait to get started !",
      improvedResponse:
        "Today will be a good day. I can't wait to get started!",
    },
    {
      incomingResponse: "Heyy, how are you doing. I hopee youre welll.",
      improvedResponse: "Hey, how are you doing? I hope you're well.",
    },
    {
      incomingResponse:
        "Whta is the plan for tomrrow? Let me know if I need to prepare anythng.",
      improvedResponse:
        "What is the plan for tomorrow? Let me know if I need to prepare anything.",
    },
  ];

  // Function to update email content div
  function updateEmailContent(content) {
    $("div.elementToProof").text(content);
  }

  function appendEmailContent(content) {
    if (`${content}`.includes("\n")) {
      content = `${content}`.replace(/\n/g, "<br>");
    }
    $("div.elementToProof").append(content);
  }

  // Function to add mutation observer
  function observeThreadChanges() {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === "childList" && mutation.addedNodes.length > 0) {
          // Check if the added nodes include an email thread
          mutation.addedNodes.forEach((node) => {
            if (
              $(node).find(".OTADH.xukFz").length ||
              $(node).hasClass("OTADH xukFz")
            ) {
              addButtons();
            }
          });
        }
      });
    });

    const config = { childList: true, subtree: true };
    const targetNode = document.querySelector("body"); // Adjust this selector to the specific element that changes when switching threads

    if (targetNode) {
      observer.observe(targetNode, config);
    } else {
      console.log("Target node for mutation observer not found.");
    }
  }

  // Initial call to add buttons
  addButtons();

  // Start observing for thread changes
  observeThreadChanges();

  // Inject Tailwind CSS dynamically
  const tailwindLink = document.createElement("link");
  tailwindLink.rel = "stylesheet";
  tailwindLink.href =
    "https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css";
  document.head.appendChild(tailwindLink);
});

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

  console.log('REQUEST CLG ***', request)

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