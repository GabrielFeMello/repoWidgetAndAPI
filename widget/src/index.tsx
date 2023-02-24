
import App from './App';
import './index.css';
import ReactDOM from 'react-dom/client';
import React from 'react';
import dotenv from 'dotenv'
dotenv.config();

const urlParams = new URLSearchParams(window.location.search);
const user_id = Number(urlParams.get('user_id'));
const organization_id = Number(urlParams.get('organization_id'));

let diffHours = null
const answerLaterStorage = localStorage.getItem(`@Tiflux::${organization_id}_${user_id}_AnswerLater_At`)

if (answerLaterStorage){
  const last_date: any = new Date(Number(answerLaterStorage))
  const new_date: any = new Date(Date.now())

  const diffTime = Math.abs(new_date - last_date);
  diffHours = Math.ceil(diffTime / (1000 * 60 * 60)); 
  if (diffHours < 24){
    window.postMessage("event=closeiframe", "*")
    // window.parent.close()
    window.parent.postMessage("event=closeiframe", "*")
    window.parent.parent.postMessage("event=closeiframe", "*")
  }
} 

console.log("AQUI É O DIFF", diffHours === null || diffHours < 24)

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
if (diffHours === null || diffHours >= 24) {
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
} else {
  root.render(
    <React.StrictMode><></></React.StrictMode>
  );
}