// public/js/cart.js
import { renderCartSidebar } from "./cartSidebar.js";

document.addEventListener('DOMContentLoaded', () => {
  const cartButton = document.getElementById('cart-button');
  const sidebar = document.getElementById('cart-sidebar');
  const closeBtn = document.getElementById('close-cart');
  const focusableSelectors = 'a[href], button, textarea, input, select, [tabindex]:not([tabindex="-1"])';
  let focusableElements = [];
  let firstFocusableElement = null;
  let lastFocusableElement = null;

  function trapFocus(element) {
    focusableElements = element.querySelectorAll(focusableSelectors);
    if (focusableElements.length === 0) return;
    firstFocusableElement = focusableElements[0];
    lastFocusableElement = focusableElements[focusableElements.length - 1];
    firstFocusableElement.focus();
    element.addEventListener('keydown', handleFocusTrap);
  }

  function handleFocusTrap(e) {
    if (e.key !== 'Tab') return;
    if (e.shiftKey) {
      if (document.activeElement === firstFocusableElement) {
        e.preventDefault();
        lastFocusableElement.focus();
      }
    } else {
      if (document.activeElement === lastFocusableElement) {
        e.preventDefault();
        firstFocusableElement.focus();
      }
    }
  }

  function openCart() {
    sidebar.classList.add('show');
    cartButton.setAttribute('aria-expanded', 'true');
    trapFocus(sidebar);
    loadCart();
  }

  function closeCart() {
    sidebar.classList.remove('show');
    cartButton.setAttribute('aria-expanded', 'false');
    sidebar.removeEventListener('keydown', handleFocusTrap);
    cartButton.focus();
  }

  function loadCart() {
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    cartItems.innerHTML = '';
    if (cart.length === 0) {
      cartItems.innerHTML = '<p>Tu carrito esta vacio 😿</p>';
      cartTotal.textContent = '$0';
      return;
    }
    let total = 0;
    cart.forEach(item => {
      total += item.price * item.quantity;
      const div = document.createElement('div');
      div.innerHTML = `
        <div style="display:flex;align-items:center;margin-bottom:1rem;gap:0.5rem">
          <img src="${item.image}" style="width:60px;height:60px;border-radius:12px;object-fit:cover" alt="${item.title}" />
          <div style="flex:1">
            <strong>${item.title}</strong><br>
            <small>$${item.price} x ${item.quantity}</small>
          </div>
          <button aria-label="Eliminar ${item.title} del carrito" onclick="removeFromCart('${item.slug}')">🗑️</button>
        </div>`;
      cartItems.appendChild(div);
    });
    cartTotal.textContent = `$${total.toLocaleString('es-CO')}`;
  }

  window.removeFromCart = function(slug) {
    let cart = JSON.parse(localStorage.getItem('cart') || '[]');
    cart = cart.filter(p => p.slug !== slug);
    localStorage.setItem('cart', JSON.stringify(cart));
    loadCart();
  };

  // Listeners
  cartButton.addEventListener('click', openCart);
  cartButton.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      openCart();
    }
  });

  closeBtn.addEventListener('click', closeCart);
  closeBtn.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      closeCart();
    }
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && sidebar.classList.contains('show')) {
      closeCart();
    }
  });
});
