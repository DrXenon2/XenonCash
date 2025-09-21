router.post('/send-batch', (req, res) => {
  const { subscriptions, payload } = req.body;
  const promises = subscriptions.map((sub) =>
    webpush.sendNotification(sub, JSON.stringify(payload))
  );
  Promise.all(promises)
    .then(() => res.status(200).json({ success: true }))
    .catch((err) => res.status(500).json({ error: err.message }));
});