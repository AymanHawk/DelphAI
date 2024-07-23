$(document).ready(() => {
  let emailContents = ""; // Global variable to store captured email contents

  // Function to add buttons
  function addButtons() {
    const targetClass = "OTADH xukFz";
    const targetDiv = $(`div.${targetClass.replace(/ /g, ".")}`);
    if (targetDiv.length && !targetDiv.find("#custom-button-wrapper").length) {
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

      // Create Improve button with dropdown structure
      const btnWrapperImprove = $("<div>").addClass(
        "btnwrapper inline-flex items-center relative"
      );
      const btnLeftImprove = $("<button>")
        .attr("id", "btnleft-improve")
        .addClass("btn font-semibold")
        .text("Optimize")
        .click(() => {
          callImproveApi(); // Directly call the improved API function without simulating clicks or capturing email contents
        });

      const btnDividerImprove = $("<div>")
        .attr("id", "btndivider-improve")
        .addClass("dropdown relative");

      const btnRightImprove = $("<button>")
        .attr("id", "btnright-improve")
        .addClass("btn mr-2")
        .html(`
<i data-icon-name="ChevronDown" aria-hidden="true" class="ms-Icon root-89 css-288 ms-Button-icon ms-Button-menuIcon menuIcon-409 ms-Button-menuIcon menuIcon-162" style="font-family: controlIcons;"></i>
    `);

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
      btnWrapperImprove.append(btnLeftImprove, btnDividerImprove);

      const captureButton = $("<button>")
        .html("Stream")
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
        .text("Generate")
        .click(() => {
          simulateClick().then(() =>
            captureEmailContents().then((contents) => callOllamaApi(contents))
          );
        }); // Add click event to capture emails and call API
      const btnDivider = $("<div>")
        .attr("id", "btndivider")
        .addClass("dropdown relative");
      const btnRight = $("<button>").attr("id", "btnright").addClass("btn mr-2")
        .html(`
<i data-icon-name="ChevronDown" aria-hidden="true" class="ms-Icon root-89 css-288 ms-Button-icon ms-Button-menuIcon menuIcon-409 ms-Button-menuIcon menuIcon-162" style="font-family: controlIcons;"></i>
          `); // Added SVG for dropdown icon

      // Create the modal structure
      const modal = $("<div>").addClass("dropdown-modal hidden");
      const option1 = $("<button>")
        .addClass("dropdown-option")
        .text("Professional");
      const option2 = $("<button>")
        .addClass("dropdown-option")
        .text("Informal");
      const option3 = $("<button>").addClass("dropdown-option").text("Silly");

      modal.append(option1, option2, option3);

      btnDivider.append(btnRight, modal);
      btnWrapper.append(btnLeft, btnDivider);

      // Append buttons to the wrapper div
      wrapperDiv.append(
        btnWrapper,
        btnWrapperImprove, // Append the Improve button structure
        captureButton
      );

      // Append the wrapper div to the target div
      targetDiv.append(wrapperDiv);

      console.log("Buttons with SVG icons added to the target div.");

      // Add event listener to toggle modal visibility for Generate button
      btnRight.on("click", (e) => {
        e.stopPropagation();
        modal.toggleClass("hidden");
      });

      // Add event listener to toggle modal visibility for Improve button
      btnRightImprove.on("click", (e) => {
        e.stopPropagation();
        modalImprove.toggleClass("hidden");
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
    const selectedTone = localStorage.getItem('selectedTone') || 'Professional'; // Default to 'Professional' if not set
    console.log('Selected Tone from localStorage:', selectedTone);
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
            content: `You respond to emails in the perspective of the email recipient (whose name is Ayman Haque), by using the entire email thread as context. The email thread will be provided to you and you will respond as if you are the email recipient.`,
          },
          {
            role: "user",
            content: `Give me a rely to this email ${contents}. I am Ayman Haque, you will repsond back as if you are me in the tone of ${JSONformat.tone}. Only return the body, not the subject line and do not say "Here is my response" I only want the response itself.  And your response will be in this tone: ${selectedTone}. Silly means you are lack a bit of formality and are more gleefull than usual. You could include a joke, if you see fit and try to make the email more fun.`, // TODO make prompt for concise and accurate and make sure to mention 
          },
        ],
        stream: true,
        // format: "json",
      }),
    }).then((response) => {
      console.log(response);
      return response.body
    })
      .then((stream) => {
        const reader = stream.getReader();
        function readSteam() {
          reader.read().then(({ done, value }) => {
            if (done) {
              console.log('Stream completed');
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
      }).catch((error) => {
        console.error("Error calling API:", error);
      });
  }

  function streamOllamaApi(contents) {
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
            content: `You respond to emails in the perspective of the email recipient (whose name is Ayman Haque), by using the entire email thread as context. The email thread will be provided to you and you will respond as if you are the email recipient. And your response will be in this tone: ${JSONformat.tone}`,
          },
          {
            role: "user",
            content: `Give me a rely to this email ${contents}. I am Ayman Haque, you will repsond back as if you are me in the tone of ${JSONformat.tone}`, // TODO make prompt for concise and accurate and make sure to mention 
          },
        ],
        stream: true,
        // format: "json",
      }),
    }).then((response) => response.body)
      .then((stream) => {
        const reader = stream.getReader();
        function readStream() {
          reader.read().then(({ done, value }) => {
            if (done) {
              console.log('Stream completed');
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
        model: "llama3",
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
              console.log('Stream completed');
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
      }).catch((error) => {
        console.error("Error calling API:", error);
      });
  }

  const improvedResponseSample = [
    {
      incomingResponse: "Todya wIll be a good day.. i cant wait to get started !",
      improvedResponse: "Today will be a good day. I can't wait to get started!",
    },
    {
      incomingResponse: "Heyy, how are you doing. I hopee youre welll.",
      improvedResponse: "Hey, how are you doing? I hope you're well.",
    },
    {
      incomingResponse: "Whta is the plan for tomrrow? Let me know if I need to prepare anythng.",
      improvedResponse: "What is the plan for tomorrow? Let me know if I need to prepare anything.",
    },
  ];

  // Function to update email content div
  function updateEmailContent(content) {
    $("div.elementToProof").text(content);
  }

  function appendEmailContent(content) {

    if (`${content}`.includes('\n')) {
      content = `${content}`.replace(/\n/g, '<br>');
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

//capture local storage
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "logToneSelect") {
    console.log('Selected Tone:', request.tone);
    localStorage.setItem('selectedTone', request.tone);
  }
});


