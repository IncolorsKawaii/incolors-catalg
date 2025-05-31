import { renderCartSidebar } from './cartSidebar.js';


// Función para mostrar toast
function showToast(msg) {
  const toast = document.createElement('div');
  toast.textContent = msg;
  toast.className = "toast";
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 2500);
}

// Función para añadir producto al carrito
function addToCart(product) {
  const cart = JSON.parse(localStorage.getItem("cart") || "[]");
  const existing = cart.find(p => p.slug === product.slug);

  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  renderCartSidebar();
  confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
  showToast("🎀 Producto agregado!");
  renderCartSidebar();
  

}
document.dispatchEvent(new CustomEvent("cartUpdated"));
// Delegar clicks en botones de añadir al carrito
document.addEventListener("DOMContentLoaded", () => {
  document.body.addEventListener("click", (event) => {
    const btn = event.target.closest("[data-add-to-cart]");
    if (btn) {
      try {
        const product = JSON.parse(btn.dataset.product);
        addToCart(product);
        renderCartSidebar();
      } catch (err) {
        console.error("Error al procesar producto:", err);
      }
    }
  });

  
});

