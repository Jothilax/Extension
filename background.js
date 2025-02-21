chrome.webNavigation.onCompleted.addListener((details) => {
    const url = new URL(details.url).hostname;
    chrome.storage.local.get([url], (data) => {
      const timeSpent = (data[url] || 0) + 1;
      chrome.storage.local.set({ [url]: timeSpent });
      fetch('http://localhost:5000/track', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url, timeSpent }),
      });
    });
  });