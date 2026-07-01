/* ==========================================================================
   MENU DATA (SEASON 9 SPECIALTIES - SIMPLE FRIENDLY LANGUAGE)
   ========================================================================== */
const menuItems = [
  {
    id: 1,
    name: "Tandoori Paneer Tikka",
    category: "starters",
    price: 220,
    description: "Soft cottage cheese cubes grilled with fresh vegetables. Jain option available!",
    diet: "veg",
    jain: true,
    image: "assets/paneer_tikka.png",
    popular: true
  },
  {
    id: 2,
    name: "Dal Fry Special",
    category: "mains",
    price: 160,
    description: "Popular yellow lentils cooked with butter and mild spices. A customer favorite!",
    diet: "veg",
    jain: true,
    image: "assets/dal_fry.png",
    popular: true
  },
  {
    id: 3,
    name: "Garlic Naan",
    category: "breads",
    price: 60,
    description: "Warm clay-oven bread topped with garlic and fresh butter.",
    diet: "veg",
    jain: false,
    image: "assets/garlic_naan.png",
    popular: true
  },
  {
    id: 4,
    name: "Saffron Veg Biryani",
    category: "mains",
    price: 220,
    description: "Aromatic rice cooked with fresh vegetables, spices, and paneer.",
    diet: "veg",
    jain: true,
    image: "assets/veg_biryani.png",
    popular: false
  },
  {
    id: 5,
    name: "Mango Lassi",
    category: "drinks",
    price: 90,
    description: "Creamy mango yogurt drink, served chilled with nuts on top.",
    diet: "veg",
    jain: true,
    image: "assets/mango_lassi.png",
    popular: true
  },
  {
    id: 6,
    name: "Veg Lollipop",
    category: "starters",
    price: 180,
    description: "Crispy veggie balls tossed in a sweet and spicy sauce.",
    diet: "veg",
    jain: false,
    image: "assets/paneer_tikka.png", // fallback visual asset
    popular: false
  },
  {
    id: 7,
    name: "Thai Red Curry with Rice",
    category: "mains",
    price: 260,
    description: "Mildly sweet coconut curry loaded with fresh vegetables, served with rice.",
    diet: "veg",
    jain: false,
    image: "assets/veg_biryani.png", // fallback visual asset
    popular: true
  },
  {
    id: 8,
    name: "Mexican Spicy Soup",
    category: "starters",
    price: 120,
    description: "Tasty tomato soup with sweet corn, peppers, and crispy tortilla chips.",
    diet: "veg",
    jain: true,
    image: "assets/dal_fry.png", // fallback visual asset
    popular: false
  },
  {
    id: 9,
    name: "Butter Paneer Masala",
    category: "mains",
    price: 240,
    description: "Soft cottage cheese in a sweet, rich, and creamy butter tomato gravy.",
    diet: "veg",
    jain: true,
    image: "assets/paneer_tikka.png", // fallback visual asset
    popular: true
  },
  {
    id: 10,
    name: "Laccha Paratha",
    category: "breads",
    price: 50,
    description: "Crisp layered wheat bread baked in our clay oven.",
    diet: "veg",
    jain: false,
    image: "assets/garlic_naan.png", // fallback visual asset
    popular: false
  },
  {
    id: 11,
    name: "Butter Roti",
    category: "breads",
    price: 30,
    description: "Whole wheat flatbread baked in the clay oven with fresh butter.",
    diet: "veg",
    jain: true,
    image: "assets/garlic_naan.png", // fallback visual asset
    popular: false
  },
  {
    id: 12,
    name: "Masala Chaas",
    category: "drinks",
    price: 50,
    description: "Refreshing spiced buttermilk served cold. Perfect for hot days!",
    diet: "veg",
    jain: true,
    image: "assets/mango_lassi.png", // fallback visual asset
    popular: false
  }
];

// Shopping Cart State
let cart = [];

/* ==========================================================================
   INITIALIZATION & EVENT LISTENERS
   ========================================================================== */
document.addEventListener("DOMContentLoaded", () => {
  // Update Business Hours Status
  updateBusinessStatus();
  setInterval(updateBusinessStatus, 60000); // Check status every minute

  // Render menu items
  renderMenu(menuItems);

  // Initialize Navbar Scrolled state
  window.addEventListener("scroll", handleNavbarScroll);

  // Setup Mobile Nav Toggle
  setupMobileNav();

  // Setup Menu Filters (Category + Dietary + Search)
  setupMenuFilters();

  // Setup Review Carousel
  setupReviewCarousel();

  // Setup Cart Interactivity
  setupCart();
});

/* ==========================================================================
   DYNAMIC BUSINESS STATUS (Ahmedabad Hours)
   ========================================================================== */
function updateBusinessStatus() {
  const statusContainer = document.getElementById("liveStatus");
  if (!statusContainer) return;

  const now = new Date();
  const currentHour = now.getHours();
  const currentMinute = now.getMinutes();
  const currentTimeDecimal = currentHour + currentMinute / 60;

  // Season 9 hours:
  // Lunch: 11:30 AM to 3:30 PM (11.5 to 15.5)
  // Dinner: 6:30 PM to 11:00 PM (18.5 to 23.0)
  
  let isOpen = false;
  let statusHTML = "";

  const isLunchTime = (currentTimeDecimal >= 11.5 && currentTimeDecimal < 15.5);
  const isDinnerTime = (currentTimeDecimal >= 18.5 && currentTimeDecimal < 23.0);

  if (isLunchTime || isDinnerTime) {
    isOpen = true;
    const closingTime = isLunchTime ? "3:30 PM" : "11:00 PM";
    statusHTML = `
      <span class="status-indicator"></span>
      <span class="status-text">🟢 Open Now (Closes at ${closingTime})</span>
    `;
    statusContainer.className = "live-status open";
  } else {
    isOpen = false;
    let openingTime = "11:30 AM";
    
    if (currentTimeDecimal >= 15.5 && currentTimeDecimal < 18.5) {
      openingTime = "6:30 PM today";
    } else if (currentTimeDecimal >= 23.0) {
      openingTime = "11:30 AM tomorrow";
    } else {
      openingTime = "11:30 AM today";
    }

    statusHTML = `
      <span class="status-indicator"></span>
      <span class="status-text">🔴 Closed Now (Opens at ${openingTime})</span>
    `;
    statusContainer.className = "live-status closed";
  }

  statusContainer.innerHTML = statusHTML;
}

/* ==========================================================================
   NAVBAR & MOBILE TOGGLE
   ========================================================================== */
function handleNavbarScroll() {
  const navbar = document.getElementById("navbar");
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
}

function setupMobileNav() {
  const mobileToggle = document.getElementById("mobileToggle");
  const navMenu = document.getElementById("navMenu");
  const navbar = document.getElementById("navbar");

  mobileToggle.addEventListener("click", () => {
    navMenu.classList.toggle("open");
    const isOpen = navMenu.classList.contains("open");
    navbar.classList.toggle("menu-open", isOpen);
    mobileToggle.innerHTML = isOpen ? '<i class="fa-solid fa-xmark"></i>' : '<i class="fa-solid fa-bars"></i>';
    // Lock body scrolling when mobile menu is open
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  // Close nav on link click (mobile view)
  const navLinks = document.querySelectorAll(".nav-menu .nav-link");
  navLinks.forEach(link => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("open");
      navbar.classList.remove("menu-open");
      mobileToggle.innerHTML = '<i class="fa-solid fa-bars"></i>';
      document.body.style.overflow = '';
    });
  });

  // Active Link Highlighter on scroll
  window.addEventListener("scroll", () => {
    let current = "";
    const sections = document.querySelectorAll("section");
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 150;
      if (window.scrollY >= sectionTop) {
        current = section.getAttribute("id");
      }
    });

    const headerLinks = document.querySelectorAll(".nav-link");
    headerLinks.forEach(link => {
      link.classList.remove("active");
      if (link.getAttribute("href").substring(1) === current) {
        link.classList.add("active");
      }
    });
  });
}

/* ==========================================================================
   MENU RENDERING & FILTERING
   ========================================================================== */
function renderMenu(items) {
  const menuGrid = document.getElementById("menuGrid");
  if (!menuGrid) return;

  if (items.length === 0) {
    menuGrid.innerHTML = `
      <div class="empty-menu-state" style="grid-column: 1 / -1; text-align: center; padding: 40px; color: var(--color-text-light);">
        <i class="fa-solid fa-face-frown" style="font-size: 2.5rem; margin-bottom: 12px; color: var(--color-primary);"></i>
        <p>No dishes found. Try a different search word!</p>
      </div>
    `;
    return;
  }

  menuGrid.innerHTML = items.map(item => {
    const isJainBadge = item.jain ? `<span class="diet-badge jain"><i class="fa-solid fa-circle-notch"></i> Jain Option</span>` : "";
    const vegBadge = `<span class="diet-badge veg"><i class="fa-solid fa-leaf"></i> Veg</span>`;
    const dietBadge = isJainBadge ? `${vegBadge} ${isJainBadge}` : vegBadge;
    
    return `
      <div class="menu-item-card" data-category="${item.category}">
        <div class="menu-item-image">
          <img src="${item.image}" alt="${item.name}">
          <div class="badges-container">
            ${dietBadge}
          </div>
          <span class="price-badge">₹${item.price}</span>
        </div>
        <div class="menu-item-info">
          <div class="menu-item-header">
            <h3 class="menu-item-title">${item.name}</h3>
          </div>
          <p class="menu-item-desc">${item.description}</p>
          <div class="menu-item-footer">
            <button class="btn-add-cart" onclick="addToCart(${item.id})">
              <i class="fa-solid fa-plus"></i> Add to Order
            </button>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

function setupMenuFilters() {
  const categoryBtns = document.querySelectorAll(".category-btn");
  const dietBtns = document.querySelectorAll(".diet-btn");
  const innerSearch = document.getElementById("innerSearchInput");
  const heroSearch = document.getElementById("menuSearchInput");
  const heroSearchBtn = document.getElementById("btnSearch");

  let activeCategory = "all";
  let activeDiet = "all";
  let searchQuery = "";

  function applyFilters() {
    let filtered = menuItems;

    // 1. Category Filter
    if (activeCategory !== "all") {
      filtered = filtered.filter(item => item.category === activeCategory);
    }

    // 2. Dietary Filter (Veg / Jain)
    if (activeDiet === "veg") {
      filtered = filtered.filter(item => item.diet === "veg");
    } else if (activeDiet === "jain") {
      filtered = filtered.filter(item => item.jain === true);
    }

    // 3. Search Query Filter
    if (searchQuery.trim() !== "") {
      const q = searchQuery.toLowerCase();
      filtered = filtered.filter(item => 
        item.name.toLowerCase().includes(q) || 
        item.description.toLowerCase().includes(q)
      );
    }

    renderMenu(filtered);
  }

  // Category Selector Buttons
  categoryBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      categoryBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      activeCategory = btn.getAttribute("data-category");
      applyFilters();
    });
  });

  // Dietary Buttons
  dietBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      dietBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      activeDiet = btn.getAttribute("data-diet");
      applyFilters();
    });
  });

  // Inner Menu Search
  innerSearch.addEventListener("input", (e) => {
    searchQuery = e.target.value;
    applyFilters();
  });

  // Hero Search Input Linkage
  if (heroSearch && heroSearchBtn) {
    heroSearchBtn.addEventListener("click", () => {
      searchQuery = heroSearch.value;
      innerSearch.value = searchQuery;
      document.getElementById("menu").scrollIntoView({ behavior: "smooth" });
      applyFilters();
    });

    heroSearch.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        searchQuery = heroSearch.value;
        innerSearch.value = searchQuery;
        document.getElementById("menu").scrollIntoView({ behavior: "smooth" });
        applyFilters();
      }
    });
  }
}

/* ==========================================================================
   SHOPPING CART LOGIC
   ========================================================================== */
function setupCart() {
  const cartToggle = document.getElementById("cartToggle");
  const cartClose = document.getElementById("cartClose");
  const cartModal = document.getElementById("cartModal");

  cartToggle.addEventListener("click", () => {
    cartModal.classList.add("open");
    renderCartItems();
  });

  cartClose.addEventListener("click", () => {
    cartModal.classList.remove("open");
  });

  cartModal.addEventListener("click", (e) => {
    if (e.target === cartModal) {
      cartModal.classList.remove("open");
    }
  });
}

window.addToCart = function(itemId) {
  const item = menuItems.find(i => i.id === itemId);
  if (!item) return;

  const existing = cart.find(cartItem => cartItem.id === itemId);
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ ...item, quantity: 1 });
  }

  updateCartCounter();
  showCartToast(item.name);
};

function updateCartCounter() {
  const counter = document.getElementById("cartCount");
  const totalQty = cart.reduce((acc, item) => acc + item.quantity, 0);
  counter.textContent = totalQty;

  counter.classList.add("bump");
  setTimeout(() => counter.classList.remove("bump"), 300);
}

function showCartToast(itemName) {
  const toast = document.createElement("div");
  toast.className = "cart-toast";
  toast.innerHTML = `
    <i class="fa-solid fa-circle-check text-green"></i>
    <span>Added ${itemName} to order</span>
  `;
  document.body.appendChild(toast);
  
  setTimeout(() => toast.classList.add("show"), 10);
  setTimeout(() => {
    toast.classList.remove("show");
    setTimeout(() => toast.remove(), 300);
  }, 2500);
}

function renderCartItems() {
  const container = document.getElementById("cartItemsList");
  const totalVal = document.getElementById("cartTotalVal");
  if (!container) return;

  if (cart.length === 0) {
    container.innerHTML = `<p class="empty-cart-message">Your cart is empty. Add delicious meals from the menu!</p>`;
    totalVal.textContent = "₹0";
    return;
  }

  container.innerHTML = cart.map(item => `
    <div class="cart-item-row">
      <div class="cart-item-img">
        <img src="${item.image}" alt="${item.name}">
      </div>
      <div class="cart-item-details">
        <div class="cart-item-name">${item.name}</div>
        <div class="cart-item-price">₹${item.price * item.quantity}</div>
      </div>
      <div class="cart-item-qty">
        <div class="qty-btn" onclick="adjustQty(${item.id}, -1)">-</div>
        <div class="qty-val">${item.quantity}</div>
        <div class="qty-btn" onclick="adjustQty(${item.id}, 1)">+</div>
      </div>
    </div>
  `).join('');

  const subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  totalVal.textContent = `₹${subtotal}`;
}

window.adjustQty = function(itemId, amount) {
  const item = cart.find(i => i.id === itemId);
  if (!item) return;

  item.quantity += amount;
  if (item.quantity <= 0) {
    cart = cart.filter(i => i.id !== itemId);
  }

  updateCartCounter();
  renderCartItems();
};

/* ==========================================================================
   REVIEWS CAROUSEL SLIDER
   ========================================================================== */
function setupReviewCarousel() {
  const track = document.getElementById("reviewTrack");
  const dots = document.querySelectorAll(".carousel-dots .dot");
  if (!track || dots.length === 0) return;

  dots.forEach(dot => {
    dot.addEventListener("click", () => {
      dots.forEach(d => d.classList.remove("active"));
      dot.classList.add("active");
      
      const index = parseInt(dot.getAttribute("data-index"));
      track.style.transform = `translateX(-${33.333 * index}%)`;
    });
  });

  // Auto scroll carousel every 8 seconds
  let currentIndex = 0;
  setInterval(() => {
    currentIndex = (currentIndex + 1) % 3;
    dots[currentIndex].click();
  }, 8000);
}

// Inline Toast CSS injection
const toastStyles = document.createElement("style");
toastStyles.innerHTML = `
  .cart-toast {
    position: fixed;
    bottom: 30px;
    left: 30px;
    background-color: var(--color-secondary);
    color: var(--color-white);
    padding: 16px 24px;
    border-radius: var(--border-radius-sm);
    box-shadow: var(--shadow-lg);
    display: flex;
    align-items: center;
    gap: 12px;
    z-index: 3000;
    font-weight: 500;
    transform: translateY(100px);
    opacity: 0;
    transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    border-left: 4px solid var(--color-primary);
  }
  .cart-toast.show {
    transform: translateY(0);
    opacity: 1;
  }
  .cart-count.bump {
    transform: scale(1.3);
  }
`;
document.head.appendChild(toastStyles);
