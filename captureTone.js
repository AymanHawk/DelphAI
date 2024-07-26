document.addEventListener('DOMContentLoaded', (event) => {
    const toneSelect = document.getElementById('toneSelect');

    // Function to log and store the selected tone
    function logAndStoreSelectedTone() {
        const selectedTone = toneSelect.value;
        localStorage.setItem('selectedTone', selectedTone);
        console.log('Selected Tone:', selectedTone);
    }

    // Log and store the selected tone on page load
    logAndStoreSelectedTone();

    // Add event listener to log and store the selected tone on change
    toneSelect.addEventListener('change', logAndStoreSelectedTone);

    // Log the selected tone at regular intervals
    setInterval(logAndStoreSelectedTone, 500); // Logs every 5 seconds
});
