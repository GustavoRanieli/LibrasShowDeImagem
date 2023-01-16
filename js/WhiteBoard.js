
const word = document.querySelector('#word')
    function clipboard(){
        let words = document.querySelectorAll('span')
        words.forEach(e => {
            word.value = e.innerHTML
            var copyText = word;
            localStorage.setItem('board', copyText.value);
    
            window.location.href = '/'
        }) 
    }
    
    function reset(){
        window.location.href = "/"
    }

    function librys(){
        const libryValue = document.querySelector('#inputLayer')
        const btSubmit = document.querySelector('#btSubmit')

        btSubmit.addEventListener('click', () => {
            localStorage.setItem('libry', libryValue.value)
            window.location.href = '/'
        })
    }