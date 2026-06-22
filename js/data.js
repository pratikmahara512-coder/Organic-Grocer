// ============================================
// GreenRoots – Shared Data & Utilities
// ============================================

const products = [
  { id: 1, name: "Heirloom Tomatoes", category: "Vegetables", price: 5.99, unit: "500g", emoji: "🍅", desc: "Richly flavoured mixed heirloom varieties, grown without pesticides.", nutrition: "Calories 18kcal · Vit C 23mg · Lycopene 3.7mg per 100g" },
  { id: 2, name: "Baby Spinach", category: "Vegetables", price: 3.99, unit: "120g", emoji: "🥬", desc: "Tender, dark-leaf baby spinach. Great raw or lightly wilted.", nutrition: "Calories 23kcal · Iron 2.7mg · Vit K 483µg per 100g" },
  { id: 3, name: "Broccoli", category: "Vegetables", price: 4.49, unit: "head (~450g)", emoji: "🥦", desc: "Dense, dark-green crowns from certified organic farms in the Blue Mountains.", nutrition: "Calories 34kcal · Vit C 89mg · Folate 63µg per 100g" },
  { id: 4, name: "Carrots (bunch)", category: "Vegetables", price: 3.29, unit: "bunch ~6", emoji: "🥕", desc: "Sweet, crunchy loose-leaf carrots with tops. Grown in Hunter Valley soil.", nutrition: "Calories 41kcal · Vit A 835µg · Fibre 2.8g per 100g" },
  { id: 5, name: "Red Capsicum", category: "Vegetables", price: 2.99, unit: "each", emoji: "🫑", desc: "Sweet red capsicums, perfect for roasting, stuffing or snacking.", nutrition: "Calories 31kcal · Vit C 128mg · Vit B6 0.3mg per 100g" },
  { id: 6, name: "Kale (curly)", category: "Vegetables", price: 3.49, unit: "200g", emoji: "🥗", desc: "Robust, earthy curly kale. Excellent in smoothies, chips or stir-fries.", nutrition: "Calories 49kcal · Vit K 817µg · Calcium 135mg per 100g" },
  { id: 7, name: "Pink Lady Apples", category: "Fruit", price: 6.49, unit: "1kg bag", emoji: "🍎", desc: "Crisp, tangy-sweet organic Pink Ladies from orchards near Orange, NSW.", nutrition: "Calories 52kcal · Vit C 4.6mg · Fibre 2.4g per 100g" },
  { id: 8, name: "Bananas", category: "Fruit", price: 4.99, unit: "bunch ~6", emoji: "🍌", desc: "Organic Cavendish bananas. Naturally ripened, no ethylene gas treatment.", nutrition: "Calories 89kcal · Potassium 358mg · Vit B6 0.4mg per 100g" },
  { id: 9, name: "Lemons", category: "Fruit", price: 2.99, unit: "bag of 5", emoji: "🍋", desc: "Thin-skinned, juicy organic lemons from Mildura. Zesty and fragrant.", nutrition: "Calories 29kcal · Vit C 53mg · Citric acid 5.5g per 100g" },
  { id: 10, name: "Strawberries", category: "Fruit", price: 7.99, unit: "250g punnet", emoji: "🍓", desc: "Sweet, full-flavoured organic strawberries. No synthetic fertilisers.", nutrition: "Calories 32kcal · Vit C 59mg · Manganese 0.4mg per 100g" },
  { id: 11, name: "Organic Oats", category: "Pantry", price: 5.49, unit: "500g", emoji: "🌾", desc: "Rolled oats from certified organic grain. Perfect for porridge and baking.", nutrition: "Calories 389kcal · Protein 17g · Beta-glucan 4g per 100g" },
  { id: 12, name: "Raw Honey", category: "Pantry", price: 12.99, unit: "400g jar", emoji: "🍯", desc: "Cold-extracted Australian wildflower honey. No heating or additives.", nutrition: "Calories 304kcal · Antioxidants · Enzymes preserved" },
  { id: 13, name: "Coconut Oil", category: "Pantry", price: 9.99, unit: "250ml", emoji: "🥥", desc: "Virgin, cold-pressed organic coconut oil. Ideal for cooking and baking.", nutrition: "Calories 862kcal · MCTs 55% · Lauric acid 47% per 100g" },
  { id: 14, name: "Brown Rice", category: "Pantry", price: 4.99, unit: "1kg", emoji: "🍚", desc: "Whole grain organic brown rice. Nutty flavour, higher in fibre than white rice.", nutrition: "Calories 370kcal · Fibre 3.5g · Magnesium 143mg per 100g" },
  { id: 15, name: "Full Cream Milk", category: "Dairy", price: 3.99, unit: "1L", emoji: "🥛", desc: "Certified organic, full-cream milk from pasture-raised cows.", nutrition: "Calories 61kcal · Calcium 113mg · Protein 3.2g per 100ml" },
  { id: 16, name: "Greek Yoghurt", category: "Dairy", price: 5.99, unit: "500g", emoji: "🫙", desc: "Thick, creamy organic Greek yoghurt. High in protein, live cultures.", nutrition: "Calories 97kcal · Protein 9g · Calcium 110mg per 100g" },
];

// ---- Cart utilities ----
function getCart() {
  try { return JSON.parse(localStorage.getItem('gr_cart') || '[]'); } catch { return []; }
}

function saveCart(cart) {
  localStorage.setItem('gr_cart', JSON.stringify(cart));
  updateCartBadge();
}

function addToCart(productId) {
  const cart = getCart();
  const idx = cart.findIndex(i => i.id === productId);
  if (idx > -1) { cart[idx].qty += 1; } else { cart.push({ id: productId, qty: 1 }); }
  saveCart(cart);
  showToast('Added to cart 🛒');
}

function updateCartBadge() {
  const cart = getCart();
  const total = cart.reduce((s, i) => s + i.qty, 0);
  document.querySelectorAll('#cartCount').forEach(el => el.textContent = total);
}

function showToast(msg) {
  const t = document.createElement('div');
  t.textContent = msg;
  t.style.cssText = 'position:fixed;bottom:1.5rem;right:1.5rem;background:#2d6a4f;color:#fff;padding:.75rem 1.25rem;border-radius:100px;font-size:.9rem;font-weight:600;z-index:9999;box-shadow:0 4px 16px rgba(0,0,0,.2);animation:slideIn .3s ease';
  document.body.appendChild(t);
  setTimeout(() => t.remove(), 2500);
}

// ---- Product card HTML ----
function productCard(p) {
  return `
    <div class="product-card">
      <div class="product-card__img">${p.emoji}</div>
      <div class="product-card__body">
        <div class="product-card__category">${p.category}</div>
        <div class="product-card__name">${p.name}</div>
        <div class="product-card__desc">${p.desc}</div>
        <div class="product-card__footer">
          <div class="product-card__price">$${p.price.toFixed(2)} <small style="font-size:.75rem;font-weight:400;color:#5a5a5a">/ ${p.unit}</small></div>
          <button class="product-card__add" onclick="addToCart(${p.id})">+ Add</button>
        </div>
      </div>
    </div>`;
}

// Inject toast keyframe
const style = document.createElement('style');
style.textContent = '@keyframes slideIn{from{transform:translateY(20px);opacity:0}to{transform:translateY(0);opacity:1}}';
document.head.appendChild(style);
