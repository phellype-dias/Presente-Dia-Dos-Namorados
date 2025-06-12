const dataInicio = new Date(2024, 3, 20, 15, 47, 0); // Maio = 4 (zero-based)

function atualizarContador() {
    const agora = new Date();

    let anos = agora.getFullYear() - dataInicio.getFullYear();
    let meses = agora.getMonth() - dataInicio.getMonth();
    let dias = agora.getDate() - dataInicio.getDate();
    let horas = agora.getHours() - dataInicio.getHours();
    let minutos = agora.getMinutes() - dataInicio.getMinutes();
    let segundos = agora.getSeconds() - dataInicio.getSeconds();

    if (segundos < 0) {
        segundos += 60;
        minutos--;
    }
    if (minutos < 0) {
        minutos += 60;
        horas--;
    }
    if (horas < 0) {
        horas += 24;
        dias--;
    }
    if (dias < 0) {
        // pega dias do mês anterior
        const mesAnterior = new Date(agora.getFullYear(), agora.getMonth(), 0);
        dias += mesAnterior.getDate();
        meses--;
    }
    if (meses < 0) {
        meses += 12;
        anos--;
    }

    const output = `${anos} anos, ${meses} meses, ${dias} dias, ` +
                   `${horas} horas, ${minutos} minutos e ${segundos} segundos`;
    const el = document.getElementById('contador');
    if (el) {
        el.textContent = output;
    }
}
atualizarContador();
setInterval(atualizarContador, 1000);

function iniciarTodosOsCarrosseis() {
  const carrosseis = document.querySelectorAll('[data-carousel]');

  carrosseis.forEach(carrossel => {
    const images = carrossel.querySelectorAll('.carousel-image');
    let index = 0;
    let total = images.length;

    const showImage = (i) => {
      images.forEach(img => img.classList.remove('selected'));
      images[i].classList.add('selected');
    };

    const next = () => {
      index = (index + 1) % total;
      showImage(index);
    };

    const prev = () => {
      index = (index - 1 + total) % total;
      showImage(index);
    };

    // Auto-play opcional
    let interval = setInterval(next, 5000);

    // Botões
    const btnNext = carrossel.querySelector('[data-carousel-next]');
    const btnPrev = carrossel.querySelector('[data-carousel-prev]');
    btnNext?.addEventListener('click', () => {
      next();
      reiniciarIntervalo();
    });
    btnPrev?.addEventListener('click', () => {
      prev();
      reiniciarIntervalo();
    });

    function reiniciarIntervalo() {
      clearInterval(interval);
      interval = setInterval(next, 5000);
    }
  });
}

window.addEventListener('load', iniciarTodosOsCarrosseis);
