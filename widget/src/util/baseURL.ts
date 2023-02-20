export const baseURL =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:3333' 
    : process.env.NODE_ENV === 'test' ? 'https://api-repo-widget.vercel.app' :`${window.location.origin}:3333`
