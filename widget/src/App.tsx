import { useState } from 'react';
import './App.css';
import { sendAvaliationToAPI } from './services/avaliation';


function App() {
  const [message, setMessage] = useState<string>('')
  const [avaliation, setAvaliation] = useState<undefined|1|2|3|4|5|6|7|8|9|10>(undefined)
  const [miss, setMiss] = useState<boolean>(false)
  const [loadingAnswer, setLoadingAnswer] = useState(false)

  const radioOptions = [
    {value: 1, color: 'red'},
    {value: 2, color: 'red'},
    {value: 3, color: 'red'},
    {value: 4, color: 'red'},
    {value: 5, color: 'red'},
    {value: 6, color: 'red'},
    {value: 7, color: 'yellow'},
    {value: 8, color: 'yellow'},
    {value: 9, color: 'green'},
    {value: 10, color: 'green'}
  ]

  async function sendAvaliation() {
    setLoadingAnswer(true)
    try {
      const queryString = window.location.search;
      const urlParams = new URLSearchParams(queryString);
      const user_id = Number(urlParams.get('user_id'));
      const organization_id = Number(urlParams.get('organization_id'));
      const client_id = Number(urlParams.get('client_id'));
      const {data} = await sendAvaliationToAPI(organization_id, user_id, client_id);
      console.log("RETURNED DATA", data)
      setMiss(true);
      setLoadingAnswer(false)
      setTimeout(()=>
      window.parent.postMessage("event=closeiframe", "*"), 8200)
    } catch(e:any) {
      setLoadingAnswer(false)
    }
  }


  return (
    <div className={`App${miss ? '-miss' :''}`}>

      {miss ? <div className={"App-header-gratefull"}>
        <p>Obrigado 🧡<br/>Temos um presente surpresa para você,<br/><a  rel="noreferrer" href="https://gifs.eco.br/wp-content/uploads/2021/07/lindos-gifs-de-flores-0.gif" target="_blank">clique aqui</a> para ver.</p>
      </div> : <header className={"App-header"}>
        <p>Numa escala de 1 a 10, quanto você indicaria a Tiflux para um amigo ou conhecido?</p>
        
        <div className="optionsCheck">
          {radioOptions.map((option:any, index: number)=>
            <button
              disabled={loadingAnswer}
              key={`button_${index}`}
              onClick={()=>{setAvaliation(option.value)}}
              className={'option_'+option.color+(avaliation=== option.value ? "Checked" : "")}
            >
              {option.value}
            </button>
          )}
        </div>

        <textarea 
              disabled={loadingAnswer} placeholder='Deixe um comentário (obrigatório)' rows={3} style={{}} className='textArea' value={message} onChange={(event)=>setMessage(event.target.value)} />

        <button id="npsAvaliationSent" disabled={message === '' || !avaliation || loadingAnswer} onClick={sendAvaliation} className="sendAvaliation">Enviar avaliação</button>
      </header>}
      {/* <a className="copyFrame" onClick={()=>{navigator.clipboard.writeText(`<iframe style="z-index: 999999;border: none;position: fixed;bottom: 15px;left: 0; height: 265px; width: 575px;right: 0;margin: auto;display: inline-table;background: transparent;" src="https://repo-widget-and-api.vercel.app/"></iframe>`)}}>
        Copy iFrame Tag
      </a> */}
      {/*
        <script> window.addEventListener("message", (event) => { console.log(event); if (event.data === "event=closeiframe") {var proxy_frame = document.getElementById('npsIframe'); proxy_frame.remove(); return;}; return;}, false);var organization_id = 1; var user_id = 1; var client_id = 1; var iframe = document.createElement('iframe'); iframe.style = 'z-index: 999999; border: none; position: fixed; bottom: 0px; top:0px; left: 0px; height: 100%; width: 100%; right: 0px; margin: auto; display: inline-table; background: rgba(0,0,0,0.4);'; iframe.src = 'https://repo-widget-and-api.vercel.app/?user_id='+user_id+'&organization_id='+organization_id+'&client_id='+client_id; iframe.id = 'npsIframe'; document.body.appendChild(iframe); </script>
        
      */}
    </div>
  );
}

export default App;
