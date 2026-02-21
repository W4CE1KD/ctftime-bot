const axios = require("axios");

const BASE_URL = "https://ctftime.org/api/v1/events/";

// FIX → browser headers (CTFtime blocks default axios)
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

// UPCOMING EVENTS
async function getUpcoming() {
  const start = getUnixTime(0);
  const finish = getUnixTime(30);

  const res = await api.get(
    `${BASE_URL}?limit=100&start=${start}&finish=${finish}`
  );

  return res.data;
}

// LIVE EVENTS
async function getLive() {
  const now = getUnixTime(0);

  const res = await api.get(
    `${BASE_URL}?limit=100&start=${now - 86400}&finish=${now + 86400}`
  );

  return res.data.filter(
    e => now >= e.start && now <= e.finish
  );
}

module.exports = { getUpcoming, getLive };
