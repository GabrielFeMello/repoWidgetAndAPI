export const baseURL =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:3333'
    : `${window.location.origin}:3333`
