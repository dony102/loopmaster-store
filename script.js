// ===== License Store JavaScript =====

// WhatsApp number (ganti dengan nomor admin)
const WHATSAPP_NUMBER = '6287722635389'; // Format: 62xxxxxxxxxx

// ===== Package Selection =====
function selectPackage(duration, price) {
    const packageSelect = document.getElementById('package');
    const option = Array.from(packageSelect.options).find(opt =>
        opt.value.includes(duration)
    );
    if (option) {
        packageSelect.value = option.value;
    }

    // Scroll to order form
    document.getElementById('order').scrollIntoView({ behavior: 'smooth' });
}

// ===== Order Form Handler =====
document.getElementById('orderForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const username = document.getElementById('username').value.trim();
    const packageSelected = document.getElementById('package').value;
    const paymentMethod = document.getElementById('payment-method').value;

    // Validation
    if (!name) {
        alert('Mohon isi nama lengkap');
        return;
    }
    if (!username) {
        alert('Mohon isi username Telegram');
        return;
    }
    if (!packageSelected) {
        alert('Mohon pilih paket license');
        return;
    }
    if (!paymentMethod) {
        alert('Mohon pilih metode pembayaran');
        return;
    }

    // Build WhatsApp message
    const message = `🛒 *PESANAN LOOPMASTER PRO*

👤 *Nama:* ${name}
📱 *Telegram:* ${username}
📦 *Paket:* ${packageSelected}
💳 *Pembayaran:* ${paymentMethod}

Halo Admin, saya ingin membeli LoopMaster Pro. Mohon info rekening/QRIS untuk pembayaran. Setelah bayar, tolong invite saya ke grup private. Terima kasih! 🙏`;

    // Encode message for URL
    const encodedMessage = encodeURIComponent(message);

    // Open WhatsApp
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
});

// ===== FAQ Accordion =====
document.querySelectorAll('.faq-question').forEach(button => {
    button.addEventListener('click', function () {
        const faqItem = this.parentElement;
        const isActive = faqItem.classList.contains('active');

        // Close all FAQs
        document.querySelectorAll('.faq-item').forEach(item => {
            item.classList.remove('active');
        });

        // Open clicked FAQ if it wasn't active
        if (!isActive) {
            faqItem.classList.add('active');
        }
    });
});

// ===== Smooth Scroll for Anchor Links =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ===== Navbar Background on Scroll =====
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', function () {
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(15, 23, 42, 0.95)';
        navbar.style.backdropFilter = 'blur(10px)';
        navbar.style.boxShadow = '0 4px 6px -1px rgba(0,0,0,0.1)';
    } else {
        navbar.style.background = 'transparent';
        navbar.style.backdropFilter = 'none';
        navbar.style.boxShadow = 'none';
    }
});

// ===== Animation on Scroll =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Apply animation to cards
document.querySelectorAll('.feature-card, .price-card, .payment-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
});

console.log('🎬 LoopMaster Pro License Store loaded successfully!');
