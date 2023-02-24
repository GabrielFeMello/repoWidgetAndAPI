import { useState } from 'react';
import './App.css';
import { answerNpsLater, noAnswerToNps, sendAvaliationToAPI } from './services/avaliation';

function App() {
  const [message, setMessage] = useState<string>('')
  const [avaliation, setAvaliation] = useState<undefined|1|2|3|4|5|6|7|8|9|10>(undefined)
  const [miss, setMiss] = useState<number>(0)
  const [loadingAnswer, setLoadingAnswer] = useState(false)

  const urlParams = new URLSearchParams(window.location.search);
  const user_id = Number(urlParams.get('user_id'));
  const organization_id = Number(urlParams.get('organization_id'));
  const is_admin = String(urlParams.get('is_admin')) === '1';
  const is_new_frontend = String(urlParams.get('is_new_frontend')) === "1";
  const research_id = Number(urlParams.get('research_id'));
  const link_to = `${urlParams.get('link_to')}`;

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
      await sendAvaliationToAPI(organization_id, user_id, is_admin, is_new_frontend, message, Number(avaliation), research_id);
      setMiss(1);
      setLoadingAnswer(false)
      setTimeout(()=>
        window.parent.postMessage("event=closeiframe", "*")
      , 8200)
    } catch(e:any) {
      setLoadingAnswer(false)
    }
  }

  function noAnswer() {
    noAnswerToNps(organization_id, user_id, is_admin, is_new_frontend, research_id)
    setMiss(3);
    setLoadingAnswer(false)
    setTimeout(()=>
      window.parent.postMessage("event=closeiframe", "*")
    , 2000)
  }

  function answerLater() {
    answerNpsLater(organization_id, user_id, is_admin, is_new_frontend, research_id)
    setMiss(2);
    setLoadingAnswer(false)
    localStorage.setItem(`@Tiflux::${organization_id}_${user_id}_AnswerLater_At`, `${Date.now()}`)
    setTimeout(()=>
      window.parent.postMessage("event=closeiframe", "*")
    , 3000)
    
  }


  return (
    <div className={`App${miss ? '-miss' :''}`}>

      {miss === 1 ?  
        <div className={"App-header-gratefull"}>
          <p>Obrigado 🧡<br/>Temos um presente surpresa para você,<br/><a  rel="noreferrer" href={link_to} target="_blank">clique aqui</a> para ver.</p>
        </div>
      : miss === 2 ? 
        <div className={"App-header-gratefull"}>
          <p>Tudo bem. Enviaremos uma nova<br/>pesquisa em breve</p>
        </div> 
      : miss === 3 ? 
        <div className={"App-header-gratefull"}>
          <p>Adradecemos sua colaboração 🧡</p>
        </div>
      : <header className={"App-header"}>
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

        <div id="otherAnswers">
          <button id="noAnswer" disabled={loadingAnswer} onClick={noAnswer} className="sendAvaliation">Não quero responder</button>

          <button id="answerLater" disabled={loadingAnswer} onClick={answerLater} className="sendAvaliation">Responder mais tarde</button>
        </div>
      </header>}
      {/* <a className="copyFrame" onClick={()=>{navigator.clipboard.writeText(`<iframe style="z-index: 999999;border: none;position: fixed;bottom: 15px;left: 0; height: 265px; width: 575px;right: 0;margin: auto;display: inline-table;background: transparent;" src="https://repo-widget-and-api.vercel.app/"></iframe>`)}}>
        Copy iFrame Tag
      </a> */}
      {/*
        <script> window.addEventListener("message", (event) => { console.log(event); if (event.data === "event=closeiframe") {var proxy_frame = document.getElementById('npsIframe'); proxy_frame.remove(); return;}; return;}, false);var organization_id = 1; var user_id = 1; var is_new_frontend = '1'; var is_admin = '1'; var research_id = 1; var iframe = document.createElement('iframe'); iframe.style = 'z-index: 999999; border: none; position: fixed; bottom: 0px; top:0px; left: 0px; height: 100%; width: 100%; right: 0px; margin: auto; display: inline-table; background: rgba(0,0,0,0.4);'; iframe.src = 'https://repo-widget-and-api.vercel.app/?user_id='+user_id+'&organization_id='+organization_id+'&is_admin='+is_admin+'&is_new_frontend='+is_new_frontend'&research_id='+research_id; iframe.id = 'npsIframe'; document.body.appendChild(iframe); </script>
        
      */}
    </div>
  );
}

export default App;
