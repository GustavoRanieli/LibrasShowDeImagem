const btGaleria = document.getElementById('btGaleria')
const btVideos = document.getElementById('btVideos')
const bt3D = document.getElementById('bt3D')
const iframeGaleria = document.getElementById('iframeGaleria')
const iframeVideo = document.getElementById('iframeVideo')
const WhiteBoard = document.getElementById('WhiteBoard')


// Cada botão vai ocultar divs diferentes, por isso mais de uma função
btGaleria.addEventListener('click', () => {
  iframeVideo.setAttribute('class', 'None')
  WhiteBoard.setAttribute('class', 'None')
  iframeGaleria.setAttribute('class', 'WhiteboardIframe')
});

btVideos.addEventListener('click', () => {
  iframeVideo.setAttribute('class', 'WhiteboardIframe')
  WhiteBoard.setAttribute('class', 'None')
  iframeGaleria.setAttribute('class', 'None')
});

bt3D.addEventListener('click', () => {
  iframeVideo.setAttribute('class', 'None')
  WhiteBoard.setAttribute('class', 'WhiteboardIframe')
  iframeGaleria.setAttribute('class', 'None')
});

// ===================================================================================
window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
const recognition = new SpeechRecognition()
const botao = document.getElementById('microfone');

recognition.interimResults = true;
recognition.lang = 'pt-br'
recognition.continuous = true

recognition.onresult = (e) => {
    const cor = e.results[0][0].transcript
    const resultado = cor.replace(/[.,?!\s]/g, '')    
    document.querySelector('#textInput').value =  resultado.toLowerCase()
    
      if( resultado == 'ok' ){
        console.log(resultado)
      }
}

// Ao clicar no botão escuta o microfone e altera a imagem
const record = function(botao){
    recognition.start()
        botao.style.backgroundImage = "url('/img/MicroStart.png')";

    setTimeout(() =>{
        recognition.stop()
            botao.style.backgroundImage = "url('/img/Micro.png')";
    }, 3000)
}

