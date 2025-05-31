// src/scripts/cartSidebar.js
export function renderCartSidebar() {
  const items = JSON.parse(localStorage.getItem("cart") || "[]");
  const container = document.getElementById("cart-items");
  const totalEl = document.getElementById("cart-total");

  if (!container || !totalEl) return;

  container.innerHTML = "";

  if (items.length === 0) {
    container.innerHTML = "<p>Tu carrito esta vacio 😿</p>";
    totalEl.textContent = "$0";
    return;
  }

  let total = 0;
  for (const item of items) {
  const el = document.createElement("div");
  el.className = "cart-item flex items-center gap-3 py-3 border-b border-pink-200";

  el.innerHTML = `
      <img src="${item.image}" alt="${item.title}" style="width:48px; height:48px; border-radius:0.75rem; object-fit:cover; border: 1px solid #f472b6;" />    <div class="flex-1">
      <p class="font-bold text-pink-600 text-sm">${item.title}</p>
      <p class="text-xs text-gray-600">Cantidad: ${item.quantity}</p>
      <p class="text-sm font-semibold text-pink-500">$${(item.price * item.quantity).toLocaleString()}</p>
    </div>
  `;

  container.appendChild(el);
  total += item.price * item.quantity;
  }
  totalEl.textContent = `$${total.toLocaleString()}`;
}
const goToCartBtn = document.getElementById("go-to-cart");
if (goToCartBtn) {
  goToCartBtn.onclick = () => {
    window.location.href = "/carrito";
  };
}
document.addEventListener("cartUpdated", () => {
  renderCartSidebar(); // ✅ Actualiza la interfaz sin importar si el sidebar esta visible o no
});