document.addEventListener('DOMContentLoaded', function () {
    const reminderTimeInput = document.getElementById('reminder-time');
    const currentTimeDisplay = document.getElementById('current-time');
  
    // Load the stored reminder time and update the UI
    chrome.storage.sync.get(['reminderTime'], function (result) {
      const storedTime = result.reminderTime;
      if (storedTime !== undefined) {
        reminderTimeInput.value = storedTime;
        currentTimeDisplay.textContent = storedTime;
      } else {
        reminderTimeInput.value = 5; // Default to 5 minutes if not set
        currentTimeDisplay.textContent = '5';
      }
    });
  
    // Listen for changes to the range slider input
    reminderTimeInput.addEventListener('input', function () {
      const selectedTime = reminderTimeInput.value;
      currentTimeDisplay.textContent = selectedTime;
  
      // Save the selected time to storage when the slider is changed
      chrome.storage.sync.set({ reminderTime: selectedTime });
    });
  });
  