// Function to create the notification
function createNotification() {
  chrome.notifications.create({
    type: 'basic',
    iconUrl: 'images/icon48.png',
    title: 'Mindfulness Reminder',
    message: 'Take a moment to be mindful and present.',
  });
}

// Function to set the alarm based on the reminder time
function setAlarm(reminderTime) {
  // Clear all existing alarms
  chrome.alarms.clearAll();

  // Create a new alarm with the updated reminder time as the delay
  chrome.alarms.create({ delayInMinutes: reminderTime });
}

// Load the stored reminder time and set up the initial alarm
chrome.storage.sync.get(['reminderTime'], function (result) {
  const selectedTime = parseInt(result.reminderTime) || 5; // Convert to number and default to 5 minutes if not set

  // Create an initial alarm with a 5-minute period
  chrome.alarms.create({ periodInMinutes: 5 });

  // Set the alarm delay based on the user's selected time
  setAlarm(selectedTime);
});

// Listen for the alarm trigger and show the notification
chrome.alarms.onAlarm.addListener(() => {
  createNotification();
});

// Listen for messages from the popup script
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  if (message.action === 'disableNotifications') {
    // Implement your logic to disable notifications here
    // You can use a boolean variable to track the notification state
    // For example, set `notificationsEnabled` to `false`
    notificationsEnabled = false;
    // Optionally, provide feedback to the user or handle any cleanup
    // For example, you can clear existing notifications
    chrome.notifications.clear('notificationId', function () {
      // Notification cleared
    });
  }
});
