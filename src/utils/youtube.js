// Matches YouTube's actual video ID format: exactly 11 chars, letters/digits/-/_
const YOUTUBE_ID_REGEX = /^[a-zA-Z0-9_-]{11}$/;

export function isValidYoutubeId(id) {
  return typeof id === "string" && YOUTUBE_ID_REGEX.test(id);
}

export function extractYoutubeId(input) {
  if (!input) return null;
  const trimmed = input.trim();

  // Already a bare ID
  if (isValidYoutubeId(trimmed)) return trimmed;

  try {
    const url = new URL(trimmed);
    const fromQuery = url.searchParams.get("v");
    if (fromQuery && isValidYoutubeId(fromQuery)) return fromQuery;

    const fromPath = url.pathname.split("/").filter(Boolean).pop();
    if (fromPath && isValidYoutubeId(fromPath)) return fromPath;
  } catch {
    // not a URL, fall through
  }

  return null;
}