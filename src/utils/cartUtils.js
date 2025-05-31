// src/utils/cartUtils.js

export function addToCart(product) {
  const cart = JSON.parse(localStorage.getItem("cart") || "[]");
  const existing = cart.find((item) => item.slug === product.slug);

  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  showToast("🎉 ¡Añadido al carrito!");
}

export function showToast(message) {
  const toast = document.createElement("div");
  toast.className = "kawaii-toast";
  toast.textContent = message;
  document.body.appendChild(toast);

  setTimeout(() => {
    toast.remove();
  }, 3000);
}

// Estilo del toast
const style = document.createElement("style");
style.textContent = `
  .kawaii-toast {
    position: fixed;
    bottom: 2rem;
    right: 2rem;
    background-color: #ffc0cb;
    color: #fff;
    padding: 0.75rem 1.25rem;
    border-radius: 999px;
    font-weight: bold;
    box-shadow: 0 2px 8px rgba(0,0,0,0.15);
    z-index: 99999;
    animation: fadein 0.3s ease, fadeout 0.3s ease 2.7s;
  }
  @keyframes fadein {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }
  @keyframes fadeout {
    from { opacity: 1; transform: translateY(0); }
    to { opacity: 0; transform: translateY(10px); }
  }
`;
document.head.appendChild(style);

import confetti from "canvas-confetti";
export function showConfetti() {
  confetti({
    particleCount: 80,
    spread: 60,
    origin: { y: 0.6 },
  });
}
