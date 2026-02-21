const axios = require("axios");

const BASE_URL = "https://ctftime.org/api/v1/events/";

const api = axios.create({
  headers: {
    "User-Agent":
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120 Safari/537.36",
    Accept: "application/json"
  }
});

function getUnixTime(offsetDays = 0) {
  return Math.floor(Date.now() / 1000) + offsetDays * 86400;
}

// UPCOMING
async function getUpcoming() {
  const start = getUnixTime(0);
  const finish = getUnixTime(30);

  const res = await api.get(
    `${BASE_URL}?limit=100&start=${start}&finish=${finish}`
  );

  return res.data;
}

// 🔥 PERFECT LIVE DETECTION
async function getLive() {
  const now = Math.floor(Date.now() / 1000);

  // fetch larger range (3 days back → 3 days forward)
  const res = await api.get(
    `${BASE_URL}?limit=200&start=${now - 259200}&finish=${now + 259200}`
  );

  return res.data.filter(e => {
    const start = Math.floor(new Date(e.start).getTime() / 1000);
    const finish = Math.floor(new Date(e.finish).getTime() / 1000);

    // allow 10 minute margin (API sync delay)
    return now >= start - 600 && now <= finish;
  });
}

module.exports = { getUpcoming, getLive };
