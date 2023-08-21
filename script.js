// Aguarda o DOM ser totalmente carregado antes de executar o código
document.addEventListener("DOMContentLoaded", () => {
  // Obtém todos os contêineres de mídia
  const mediaContainers = document.querySelectorAll(".media-container");

  // Itera sobre cada contêiner de mídia
  mediaContainers.forEach((container) => {
    // Obtém a imagem de visualização e a mídia
    const imagePreview = container.querySelector(".image-preview");
    const mediaPreview = container.querySelector(".media-preview");

    // Variável para rastrear se o preview está sendo reproduzido
    let isPreviewPlaying = false;

    // Variável para controlar o tempo limite de visualização
    let timeout;

    // Evento que é acionado quando a mídia termina de reproduzir
    mediaPreview.addEventListener("ended", () => {
      stopPreview();
    });

    // Função para iniciar o preview da mídia
    function startPreview() {
      mediaPreview.style.display = "block";
      let startTime = 0; // Tempo padrão de início do preview

      if (mediaPreview.duration > 70) {
        startTime = 60; // Se a duração do vídeo for maior que 70 segundos, inicia a partir de 60 segundos
      } else if (mediaPreview.duration > 20) {
        startTime = 10; // Se a duração do vídeo for maior que 20 segundos, inicia a partir de 10 segundos
      }

      mediaPreview.currentTime = startTime;
      mediaPreview.play();
      isPreviewPlaying = true;
      imagePreview.style.display = "none";

      // Define um tempo limite para parar o preview após 10 segundos
      timeout = setTimeout(() => {
        stopPreview();
      }, 10000); // 10 segundos em milissegundos
    }

    // Função para parar o preview da mídia
    function stopPreview() {
      mediaPreview.style.display = "none";
      mediaPreview.pause();
      mediaPreview.currentTime = 0;
      isPreviewPlaying = false;
      imagePreview.style.display = "block";
    }

    // Evento quando o mouse entra no contêiner
    container.addEventListener("mouseenter", () => {
      if (!isPreviewPlaying) {
        startPreview();
      }
    });

    // Evento quando o mouse sai do contêiner
    container.addEventListener("mouseleave", () => {
      if (isPreviewPlaying) {
        // Cancela o tempo limite e para o preview
        clearTimeout(timeout);
        stopPreview();
      }
    });
  });
});
