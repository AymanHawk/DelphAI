// Create a script element
const script = document.createElement('script');
script.src = chrome.runtime.getURL('captureTone.js');
script.onload = function () {
  // Remove the script element after it has been executed
  this.remove();
};

// Append the script element to the document head
(document.head || document.documentElement).appendChild(script);
