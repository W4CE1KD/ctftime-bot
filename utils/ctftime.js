const axios = require("axios");

const BASE_URL = "https://ctftime.org/api/v1/events/";

function getUnixTime(offsetDays = 0) {
  return Math.floor(Date.now() / 1000) + offsetDays * 86400;
}

// UPCOMING EVENTS
async function getUpcoming() {
  const start = getUnixTime(0);
  const finish = getUnixTime(30);

  const res = await axios.get(
    `${BASE_URL}?limit=100&start=${start}&finish=${finish}`
  );

  return res.data;
}

// LIVE EVENTS
async function getLive() {
  const now = getUnixTime(0);

  const res = await axios.get(
    `${BASE_URL}?limit=100&start=${now - 86400}&finish=${now + 86400}`
  );

  return res.data.filter(
    e => now >= e.start && now <= e.finish
  );
}

module.exports = { getUpcoming, getLive };
