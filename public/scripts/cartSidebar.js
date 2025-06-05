// src/scripts/cartSidebar.js para agregar productos al carrito es la primer animacion
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
      <img src="${item.image}" alt="${item.title}" style="width:48px; height:48px; border-radius:0.75rem; object-fit:cover; border: 1px solid #f472b6;" />
      <div class="flex-1">
        <p class="font-bold text-pink-600 text-sm">${item.title}</p>
        <p class="text-xs text-gray-600">Cantidad: ${item.quantity}</p>
        <p class="text-sm font-semibold text-pink-500">$${(item.price * item.quantity).toLocaleString()}</p>
      </div>
      <button class="remove-btn" aria-label="Eliminar ${item.title} del carrito" data-slug="${item.slug}">🗑️</button>
    `;

    container.appendChild(el);
    total += item.price * item.quantity;
  }

  attachRemoveListeners();

  totalEl.textContent = `$${total.toLocaleString()}`;
}

function attachRemoveListeners() {
  const buttons = document.querySelectorAll('.remove-btn');
  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      const slug = btn.dataset.slug;
      removeFromCart(slug);
    });
  });
}

function removeFromCart(slug) {
  let cart = JSON.parse(localStorage.getItem("cart") || "[]");
  cart = cart.filter(item => item.slug !== slug);
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCartSidebar();
}

const goToCartBtn = document.getElementById("go-to-cart");
if (goToCartBtn) {
  goToCartBtn.onclick = () => {
    window.location.href = "/carrito";
  };
}

document.addEventListener("cartUpdated", () => {
  renderCartSidebar();
});
