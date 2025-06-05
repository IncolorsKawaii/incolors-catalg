// effects.js (con canvas-confetti)

// 🎉 Confeti desde canvas
export function showConfetti() {
  if (typeof confetti === "function") {
    confetti({
      particleCount: 100,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#ff80ab', '#ffb6c1', '#ffe4e1', '#ff4081']
    });
  }
}

// 🧁 Toast kawaii
export function showToast(message = "Producto agregado!") {
  const toast = document.createElement("div");
  toast.textContent = message;
  toast.style.position = "fixed";
  toast.style.top = "1.5rem";
  toast.style.left = "50%";
  toast.style.transform = "translateX(-50%)";
  toast.style.background = "#ffb6c1";
  toast.style.color = "#fff";
  toast.style.padding = "0.8rem 1.5rem";
  toast.style.borderRadius = "20px";
  toast.style.boxShadow = "0 4px 10px rgba(0,0,0,0.2)";
  toast.style.fontWeight = "bold";
  toast.style.zIndex = "10000";
  toast.style.animation = "fade-slide 2s ease forwards";

  document.body.appendChild(toast);

  setTimeout(() => {
    toast.remove();
  }, 2000);
}
