async function registerPeriodicNewsCheck() {
  const registration = await navigator.serviceWorker.ready;
  try {
    await registration.periodicSync.register('fetch-news', {
      minInterval= 0,
    });
  } catch {
    console.log('Periodic Sync could not be registered!');
  }
}
