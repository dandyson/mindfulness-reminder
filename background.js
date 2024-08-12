chrome.runtime.onInstalled.addListener(() => {
  // Load the stored reminder time and set up the initial alarm
  chrome.storage.sync.get(['reminderTime'], function (result) {
      const selectedTime = parseInt(result.reminderTime) || 5;
      setAlarm(selectedTime); // Set initial alarm
  });
});

// Set up the alarm
function setAlarm(reminderTime) {
  chrome.alarms.clearAll();
  chrome.alarms.create({ periodInMinutes: reminderTime });
}

// Handle alarm triggers
chrome.alarms.onAlarm.addListener(() => {
  createNotification();
});

// Function to create the notification
function createNotification() {
  chrome.notifications.create({
      type: 'basic',
      iconUrl: 'images/icon48.png',
      title: 'Mindfulness Reminder',
      message: 'Take a moment to be mindful and present.',
  });
}

// Listen for time update messages from popup.js
chrome.runtime.onMessage.addListener((message) => {
  if (message.action === 'updateReminderTime') {
      const newTime = parseInt(message.reminderTime);
      setAlarm(newTime);
  }
});
