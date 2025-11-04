export function getSentryContext(request: Request) {
  return {
    user: {
      ip_address: request.headers.get('cf-connecting-ip') || 'unknown',
    },
    fingerprint: [request.headers.get('cf-ray') || 'unknown'],
    extra: {
      url: request.url,
      method: request.method,
      headers: Object.fromEntries(request.headers),
      body: request.body,
    },
  };
}
