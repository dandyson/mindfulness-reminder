// Get the previous reminder time from storage
chrome.storage.sync.get(['reminderTime'], function(result) {
  const reminderTime = parseFloat(result.reminderTime) || 5; // default to 5 minutes if no previous setting

  // Set an alarm to create a notification at the specified interval
  chrome.alarms.create('reminder', {
    periodInMinutes: reminderTime
  });
});

// Listen for alarm events
chrome.alarms.onAlarm.addListener(function(alarm) {
  if (alarm.name === 'reminder') {
    chrome.notifications.create({
      type: 'basic',
      iconUrl: 'images/mindful_original.png',
      title: 'Mindfulness Reminder',
      message: 'Take a deep breath and focus on the present moment.'
    });
  }
});

// Listen for changes to the reminder time
chrome.storage.sync.onChanged.addListener(function(changes, namespace) {
  const newReminderTime = parseFloat(changes.reminderTime.newValue);

  // Remove all previous alarms
  chrome.alarms.clearAll();

  // Set a new alarm at the specified interval
  chrome.alarms.create('reminder', {
    periodInMinutes: newReminderTime
  });
});
