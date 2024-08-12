// Get the reminder time input and current time display elements
const reminderTimeInput = document.getElementById('reminder-time');
const currentTimeDisplay = document.getElementById('current-time');

// Load the stored reminder time and update the UI
chrome.storage.sync.get(['reminderTime'], function(result) {
  const storedTime = parseFloat(result.reminderTime) || 5;
  reminderTimeInput.value = storedTime;
  currentTimeDisplay.textContent = storedTime;
});

reminderTimeInput.addEventListener('input', function() {
  const selectedTime = parseFloat(reminderTimeInput.value);
  currentTimeDisplay.textContent = selectedTime;
});

// Listen for changes to the range slider input
reminderTimeInput.addEventListener('change', function() {
  const selectedTime = parseFloat(reminderTimeInput.value);
  currentTimeDisplay.textContent = selectedTime;

  // Save the selected time to storage
  chrome.storage.sync.set({ reminderTime: selectedTime });

  // Update alarm
  setAlarm(selectedTime);
});

// Set up the alarm
function setAlarm(reminderTime) {
  chrome.alarms.clearAll(() => {
    chrome.alarms.create('reminder', {
      periodInMinutes: reminderTime
    });
  });
}

// Handle alarm triggers and create notifications
chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === 'reminder') {
    createNotification();
  }
});

// Function to create the notification
function createNotification() {
  chrome.notifications.create({
    type: 'basic',
    iconUrl: 'images/mindful_original.png',
    title: 'Mindfulness Reminder',
    message: 'Take a deep breath and focus on the present moment.'
  });
}
