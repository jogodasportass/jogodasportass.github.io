const nomeInput = document.getElementById("nome");
const premioEl = document.getElementById("mensagemPremio");
const audio = document.getElementById("backgroundMusic");
const musicIcon = document.getElementById("musicIcon");

const premios = [
  "💋 {nome}, você ganhou um BEIJO apaixonado!",
  "🎉 {nome}, um ENCONTRO especial te aguarda!",
  "🍫 {nome}, você merece uma noite doce e romântica!",
  "🌟 {nome}, você terá um momento mágico comigo!",
  "🔥 {nome}, prepare-se para uma noite inesquecível!",
  "🎁 {nome}, surpresa especial te espera!"
];

// Tenta tocar a música logo no carregamento
window.addEventListener("load", () => {
  audio.volume = 0.5;
  const playPromise = audio.play();
  if (playPromise !== undefined) {
    playPromise.catch(() => {
      // Se der erro, espera o primeiro clique do usuário
      document.body.addEventListener("click", () => {
        audio.play();
        musicIcon.textContent = "🔊";
      }, { once: true });
    });
  }
});

function toggleMusic() {
  if (audio.paused) {
    audio.play();
    musicIcon.textContent = "🔊";
  } else {
    audio.pause();
    musicIcon.textContent = "🔇";
  }
}

function iniciarQuiz() {
  const nome = nomeInput.value.trim();
  if (!nome) return alert("Digite seu nome!");
  localStorage.setItem("userName", nome);
  document.getElementById("inicio").classList.add("hidden");
  document.getElementById("quiz").classList.remove("hidden");
}

function mostrarPortas() {
  document.getElementById("quiz").classList.add("hidden");
  document.getElementById("portas").classList.remove("hidden");
  const lista = document.getElementById("listaPortas");
  lista.innerHTML = "";
  for (let i = 1; i <= 6; i++) {
    const porta = document.createElement("div");
    porta.className = "door";
    porta.innerText = `Porta ${i}`;
    porta.onclick = () => revelarPremio(i);
    lista.appendChild(porta);
  }
}

function revelarPremio(index) {
  const nome = localStorage.getItem("userName") || "Você";
  const premioTexto = premios[index - 1 % premios.length].replace("{nome}", nome);
  document.getElementById("portas").classList.add("hidden");
  document.getElementById("premio").classList.remove("hidden");
  premioEl.innerText = premioTexto;
  confetti({
    particleCount: 150,
    spread: 100,
    origin: { y: 0.6 },
    shapes: ['heart'],
    colors: ['#ff4d4d', '#ff9999', '#ffc0cb']
  });
}

particlesJS("particles-js", {
  particles: {
    number: { value: 50 },
    color: { value: "#ff4d4d" },
    shape: { type: "circle" },
    opacity: { value: 0.5 },
    size: { value: 5 },
    move: { enable: true, speed: 2 }
  }
});
