const d = document;
const socket = io();

socket.on('mensajes',(data)=>{
    chatRender(data)
})

const chatRender = (data) => {
    let chatHtml =
    data.map((m) =>`
    <div class='fila'>
       <strong id='person'> ${m.autor}</strong>
       <p id='msj'> ${m.texto}</p>
       <p id='time'> ${m.time} <p>
   </div>
    `).join(' ')
    d.getElementById('chatSection').innerHTML = chatHtml
   }

const EnviarMsj = () => {
    let autor = d.getElementById('mail').value;
    let texto = d.getElementById('text').value;
    let time = new Date()
    let msj = {autor,texto,time}
    if (autor && texto !== '' ){
        socket.emit('newMsj',msj)
    }
  }