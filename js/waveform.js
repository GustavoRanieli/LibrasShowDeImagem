// Código que peguei pronto para o efeito de ondas com o som
var canvas = document.getElementById('canvas');

navigator.mediaDevices = navigator.mediaDevices || ((navigator.mozGetUserMedia || navigator.webkitGetUserMedia) ? {
  getUserMedia: function (c) {
    return new Promise(function (y, n) {
      (navigator.mozGetUserMedia ||
        navigator.webkitGetUserMedia).call(navigator, c, y, n);
    });
  }
} : null);

if (!navigator.mediaDevices.getUserMedia) {
  tip.innerHTML = 'Microfone Desabilitado';
}

function startRecord(e) {
  var record = navigator.mediaDevices.getUserMedia({
    audio: true,
    video: false
  });
  record.then(function onSuccess(stream) {
    audioContext = window.AudioContext || window.webkitAudioContext || window.mozAudioContext || window.msAudioContext;
    try {
      context = new audioContext();
    } catch (e) {
      console.log('not support AudioContext');
    }

    audioInput = context.createMediaStreamSource(stream);
    var binaryData = [];
    binaryData.push(stream);
    microphone.src = window.URL.createObjectURL(new Blob(binaryData, { type: 'application/zip' }));
    microphone.onloadedmetadata = function (e) { };
    var analyser = context.createAnalyser();
    audioInput.connect(analyser);

    drawSpectrum(analyser);
  });
  record.catch(function (e) {
    tip.innerHTML = e.name;
  });
  var drawSpectrum = function (analyser) {
    // console.log(new Uint8Array(analyser.frequencyBinCount));
    var canvas = document.getElementById('canvas'),
    cwidth = canvas.width,
    cheight = canvas.height,
    meterWidth = 8,
    gap = 2,
    meterNum = cwidth / (meterWidth + gap),

    ctx = canvas.getContext('2d'),
    gradient = ctx.createLinearGradient(0, 0, 0, cheight);
    gradient.addColorStop(1, '#a467af');
    gradient.addColorStop(0.3, '#ff0');
    gradient.addColorStop(0, '#f00');
    ctx.fillStyle = gradient;
    var drawMeter = function () {
      var array = new Uint8Array(analyser.frequencyBinCount);
      analyser.getByteFrequencyData(array);

      var step = Math.round(array.length / meterNum);
      ctx.clearRect(0, 0, cwidth, cheight);
      for (var i = 0; i < meterNum; i++) {
        var value = array[i * step];

        ctx.fillRect(i * (meterWidth + gap), cheight - value, meterWidth, cheight);
      }
      requestAnimationFrame(drawMeter);
    }
    requestAnimationFrame(drawMeter);
  }
}

startRecord()