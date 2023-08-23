// Aguarda o DOM ser totalmente carregado antes de executar o código
document.addEventListener("DOMContentLoaded", () => {
  // Obtém todos os contêineres de mídia
  const mediaContainers = document.querySelectorAll(".media-container");

  // Itera sobre cada contêiner de mídia
  mediaContainers.forEach((container) => {
    // Obtém a imagem de visualização, a mídia e o título
    const imagePreview = container.querySelector(".image-preview");
    const mediaPreview = container.querySelector(".media-preview");

    // Variáveis para rastrear se o preview está sendo reproduzido e se o modal está aberto
    let isPreviewPlaying = false;
    let isModalOpen = false;

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

    // Função para abrir o modal com o vídeo completo
    function openModal() {
      if (!isModalOpen) {
        const modal = document.getElementById("videoModal");
        const fullVideo = document.getElementById("fullVideo");
        const closeModal = document.getElementById("closeModal");

        // Preencha a origem do vídeo completo
        const videoSrc = mediaPreview.querySelector("source").getAttribute("src");
        fullVideo.querySelector("source").setAttribute("src", videoSrc);
        fullVideo.load();

        // Exiba o modal
        modal.style.display = "block";
        isModalOpen = true;

        // Adicione um evento de clique ao botão de fechar o modal
        closeModal.addEventListener("click", () => {
          closeModalVideo();
        });

        // Feche o modal quando o usuário clicar fora dele
        window.addEventListener("click", (event) => {
          if (event.target === modal) {
            closeModalVideo();
          }
        });
      }
    }

    // Função para fechar o modal com o vídeo completo
    function closeModalVideo() {
      const modal = document.getElementById("videoModal");

      // Pare o vídeo completo e limpe a origem
      const fullVideo = document.getElementById("fullVideo");
      fullVideo.pause();
      fullVideo.querySelector("source").removeAttribute("src");
      fullVideo.load();

      // Oculte o modal
      modal.style.display = "none";
      isModalOpen = false;
    }

    // Adicione um evento de clique ao vídeo para abrir o modal
    mediaPreview.addEventListener("click", () => {
      openModal();
    });

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
