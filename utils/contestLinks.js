function normalizeUrl(url) {
  if (!url || typeof url !== "string") {
    return null;
  }

  if (/^https?:\/\//i.test(url)) {
    return url;
  }

  if (url.startsWith("/")) {
    return `https://ctftime.org${url}`;
  }

  return `https://${url}`;
}

function getContestLinks(event) {
  const officialUrl = normalizeUrl(event.url);
  const ctftimeUrl = normalizeUrl(
    event.ctftime_url || (event.id ? `/event/${event.id}` : null)
  );

  const links = [];

  if (officialUrl) {
    links.push(`[Contest site](${officialUrl})`);
  }

  if (ctftimeUrl && ctftimeUrl !== officialUrl) {
    links.push(`[CTFtime](${ctftimeUrl})`);
  }

  if (!links.length) {
    return "";
  }

  return `Links: ${links.join(" | ")}\n`;
}

module.exports = { getContestLinks };
