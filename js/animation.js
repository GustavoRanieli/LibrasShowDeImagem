// Redirecionar ao clicar no bt 
document.addEventListener('DOMContentLoaded', () => {
  const librasPage = document.querySelector('#LibrasPage')
  let iframeGaleria = document.querySelector('#iframeGaleria');
  let iframeVideo = document.querySelector('#iframeVideo');
  let textInput = document.querySelector('#textInput');
  let liBryContent = localStorage.getItem('libry');

    librasPage.addEventListener('click', () => {
      window.location.href = '/libras'
    });

  const whiteboardPage = document.querySelector('#Manuscrit');

      whiteboardPage.addEventListener('click', () => {
        window.location.href = '/whiteboard'
      });

    if(liBryContent != ''){
      setTimeout(() => {
        iframeGaleria.setAttribute('src', `https://www.bing.com/images/search?q=${liBryContent}`);
        iframeVideo.setAttribute('src', `https://www.bing.com/videos/search?q=${liBryContent}`);
        textInput.value = liBryContent;

        localStorage.setItem('libry', '');
      }, 800);
      return
    }else{
      console.log('Libras vazio')
    };
})

// Pegando os input gerados e passando uma cor aleatorio para cada um
let nodeList = document.querySelectorAll('.Text')
let input = [...nodeList]
input.forEach(color);

function color(element, indice){
    for(i = 0; i <= indice; i++){
        let randomColor = Math.floor(Math.random()* 0x1000000).toString(16)
        element.style.color = '#' + randomColor
        element.style.border = 'transparent'
    }
}

// Para cada input criado, ao clicar executa um audio que vem da pasta
const caixaDeTexto = document.querySelectorAll('[silaba]'); // caixa de texto
const selectVoices = document.querySelector('select'); // lista de vozes

caixaDeTexto.forEach(elements => {
    elements.onclick = (e) => {
      let audio = new Audio(`../audio/${elements.value}.m4a`)
      audio.play()
    }
  }
);
