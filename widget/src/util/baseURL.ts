console.log("NODE_ENV", process.env.NODE_ENV)
export const baseURL =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:3333' 
    : process.env.NODE_ENV === 'test' ? 'https://repo-widget-and-api-8184.vercel.app/' :`${window.location.origin}:3333`
