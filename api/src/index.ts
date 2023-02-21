import app from './app';
require('dotenv').config();

console.log("URL",process.env.RUN_PORT)
app.listen(process.env.RUN_PORT);

export default app