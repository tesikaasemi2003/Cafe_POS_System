// ========================= T&T Cafe POS - Smart Animations =========================

/* ------------------------------------------------------------------ *
 *  flyToCart(sourceEl, emoji)
 *  Animates an emoji orb flying from the clicked item card to the
 *  order panel header (or mobile cart button).
 * ------------------------------------------------------------------ */
export function flyToCart(sourceEl, emoji = '☕') {
    const src    = sourceEl.getBoundingClientRect();
    const target = document.getElementById('op-head') || document.getElementById('mob-order-btn');
    if (!target) return;
    const dst = target.getBoundingClientRect();

    // Delta from source centre → destination centre
    const dx = (dst.left + dst.width  / 2) - (src.left + src.width  / 2);
    const dy = (dst.top  + dst.height / 2) - (src.top  + src.height / 2);

    const orb = document.createElement('div');
    orb.className = 'cart-fly-orb';
    orb.textContent = emoji;
    orb.style.cssText = `
        left: ${src.left + src.width  / 2 - 13}px;
        top:  ${src.top  + src.height / 2 - 13}px;
        --fx:  ${dx}px;
        --fy:  ${dy}px;
    `;
    document.body.appendChild(orb);
    orb.addEventListener('animationend', () => orb.remove());
}

/* ------------------------------------------------------------------ *
 *  rippleCard(cardEl)
 *  Adds a ripple burst effect on the item card.
 * ------------------------------------------------------------------ */
export function rippleCard(cardEl) {
    const old = cardEl.querySelector('.cart-ripple');
    if (old) old.remove();
    const r = document.createElement('div');
    r.className = 'cart-ripple';
    cardEl.appendChild(r);
    r.addEventListener('animationend', () => r.remove());
}

/* ------------------------------------------------------------------ *
 *  popBadge(badgeEl)
 *  Makes the qty badge "bounce" into view.
 * ------------------------------------------------------------------ */
export function popBadge(badgeEl) {
    badgeEl.classList.remove('new');
    void badgeEl.offsetWidth; // reflow
    badgeEl.classList.add('new');
}

/* ------------------------------------------------------------------ *
 *  flashQty(qnumEl)
 *  Pulses the quantity number when changed in the order panel.
 * ------------------------------------------------------------------ */
export function flashQty(qnumEl) {
    qnumEl.classList.remove('qty-flash');
    void qnumEl.offsetWidth;
    qnumEl.classList.add('qty-flash');
}

/* ------------------------------------------------------------------ *
 *  popTotal(grandEl)
 *  Makes the grand total pop whenever it changes.
 * ------------------------------------------------------------------ */
export function popTotal() {
    const el = document.getElementById('op-grand');
    if (!el) return;
    el.classList.remove('popping');
    void el.offsetWidth;
    el.classList.add('popping');
    el.addEventListener('animationend', () => el.classList.remove('popping'), { once: true });
}

/* ------------------------------------------------------------------ *
 *  popCartBadge()
 *  Makes the mobile cart count badge bounce.
 * ------------------------------------------------------------------ */
export function popCartBadge() {
    const el = document.getElementById('mob-cart-count');
    if (!el) return;
    el.classList.remove('badge-pop');
    void el.offsetWidth;
    el.classList.add('badge-pop');
    el.addEventListener('animationend', () => el.classList.remove('badge-pop'), { once: true });
}

/* ------------------------------------------------------------------ *
 *  placeOrderLoading(on)
 *  Toggles the shimmer loading state on the place-order button.
 * ------------------------------------------------------------------ */
export function placeOrderLoading(on) {
    const btn = document.getElementById('btn-place-order');
    if (!btn) return;
    btn.classList.toggle('loading', on);
    btn.textContent = on ? '⏳ Processing…' : '✅ Place Order';
}

/* ------------------------------------------------------------------ *
 *  showThankYou(order)
 *  Renders an animated thank-you overlay with receipt mini & confetti.
 * ------------------------------------------------------------------ */
export function showThankYou(order, onClose) {
    // Build receipt rows
    const rows = order.items.map(i => `
        <div class="ty-receipt-row">
            <span>${i.icon || '☕'} ${i.name} ×${i.qty}</span>
            <span>Rs. ${(i.unitPrice * i.qty).toFixed(2)}</span>
        </div>`).join('');

    const overlay = document.createElement('div');
    overlay.id = 'thankyou-overlay';
    overlay.className = 'active';
    overlay.innerHTML = `
        <div class="ty-card">
            <div class="ty-icon-ring">✓</div>
            <div class="ty-title">Order Placed!</div>
            <div class="ty-sub">Thank you, <strong>${order.customerName}</strong> 🎉</div>
            <div class="ty-receipt-mini">
                <div style="font-weight:700;font-size:11px;color:var(--text-light);
                            text-transform:uppercase;letter-spacing:.8px;margin-bottom:8px;">
                    Order #${order.id}
                </div>
                ${rows}
                <div class="ty-receipt-row grand">
                    <span>TOTAL</span><span>Rs. ${order.total.toFixed(2)}</span>
                </div>
            </div>
            <button class="ty-btn" id="ty-close-btn">🏠 Back to Orders</button>
        </div>`;

    document.body.appendChild(overlay);
    launchConfetti();

    document.getElementById('ty-close-btn').addEventListener('click', () => {
        overlay.style.opacity = '0';
        overlay.style.transition = 'opacity .3s';
        setTimeout(() => {
            overlay.remove();
            stopConfetti();
            if (typeof onClose === 'function') onClose();
        }, 300);
    });
}

/* ------------------------------------------------------------------ *
 *  Confetti
 * ------------------------------------------------------------------ */
const CONFETTI_COLORS = ['#c8903a','#e53e3e','#48bb78','#f59e0b','#4299e1','#ed64a6','#f5f542'];
let _confettiStop = false;

function launchConfetti() {
    _confettiStop = false;
    const count = 70;
    for (let i = 0; i < count; i++) {
        setTimeout(() => {
            if (_confettiStop) return;
            const p = document.createElement('div');
            p.className = 'confetti-piece';
            const size  = Math.random() * 8 + 6;
            const color = CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)];
            const dur   = (Math.random() * 1.2 + 1).toFixed(2) + 's';
            const delay = (Math.random() * 0.6).toFixed(2) + 's';
            const rot   = (Math.random() * 720 - 360).toFixed(0) + 'deg';
            const fallH = (window.innerHeight + 40) + 'px';
            p.style.cssText = `
                width:${size}px; height:${size}px;
                background:${color};
                left:${Math.random()*100}vw;
                top:-20px;
                --dur:${dur}; --delay:${delay};
                --rot:${rot}; --fall-h:${fallH};
            `;
            document.body.appendChild(p);
            p.addEventListener('animationend', () => p.remove());
        }, i * 30);
    }
}

function stopConfetti() {
    _confettiStop = true;
    document.querySelectorAll('.confetti-piece').forEach(p => p.remove());
}

/* ------------------------------------------------------------------ *
 *  loginSuccessFlash()
 * ------------------------------------------------------------------ */
export function loginSuccessFlash() {
    const btn = document.getElementById('btn-signin');
    if (!btn) return;
    btn.textContent = '✓ Welcome!';
    btn.classList.add('login-success-flash');
    btn.addEventListener('animationend', () => btn.classList.remove('login-success-flash'), { once: true });
}