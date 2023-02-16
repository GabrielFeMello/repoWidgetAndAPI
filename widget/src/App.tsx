import { useState } from 'react';
import './App.css';


function App() {
  const [message, setMessage] = useState<string>('')
  const [avaliation, setAvaliation] = useState<undefined|1|2|3|4|5|6|7|8|9|10>(undefined)
  const [miss, setMiss] = useState<boolean>(false)
  const local = document.location.href
  console.log(local)

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

  function sendAvaliation() {
    console.log("Mandar para api do banco de dados")
    setMiss(true)
  }


  return (
    <div className={`App${miss ? '-miss' :''}`}>

      {miss ? <div className={"App-header-gratefull"}>
        <p>Agradecemos sua avaliação!</p>
      </div> : <header className={"App-header"}>
        <p>Numa escala de 1 a 10, quanto você indicaria a Tiflux para alguém?</p>
        
        <div className="optionsCheck">
          {radioOptions.map((option:any)=>
            <button
              onClick={()=>{setAvaliation(option.value)}}
              className={'option_'+option.color+(avaliation=== option.value ? "Checked" : "")}
            >
              {option.value}
            </button>
          )}
        </div>

        <textarea placeholder='Deixe um comentário' rows={3} style={{}} className='textArea' value={message} onChange={(event)=>setMessage(event.target.value)} />

        <button disabled={message === '' || !avaliation} onClick={sendAvaliation} className="sendAvaliation">Enviar avaliação</button>
      </header>}
      <a className="copyFrame" onClick={()=>{navigator.clipboard.writeText(`<iframe style="z-index: 999999;border: none;position: fixed;bottom: 15px;height: 100vh;left: 0;width: 621px;right: 0;margin: auto;display: inline-table;background: transparent;" src="${local}"></iframe>`)}}>
        Copy iFrame Tag
      </a>
    </div>
  );
}

export default App;
