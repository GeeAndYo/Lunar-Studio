document.addEventListener("DOMContentLoaded", () => {
  
  const publicPages = ['login.html', 'daftar.html', 'register.html'];
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  const userData = JSON.parse(localStorage.getItem('userData') || '{}');

  if (!isLoggedIn && !publicPages.includes(currentPage)) {
    window.location.replace('login.html'); 
    return;
  }

  if (isLoggedIn && publicPages.includes(currentPage)) {
    window.location.replace('index.html');
    return;
  }


  // HELPER FUNCTIONS
  function go(selector, target) {
    const elements = document.querySelectorAll(selector);
    elements.forEach(el => {
      if (el) {
        el.style.cursor = "pointer";
        
        const newEl = el.cloneNode(true);
        el.parentNode.replaceChild(newEl, el);
        
        newEl.addEventListener("click", (e) => {
          e.preventDefault();
          e.stopPropagation();
          
          if (typeof target === "function") {
            target();
          } else {
            window.location.href = target;
          }
        });
      }
    });
  }

  // HEADER NAVIGATION 
  go(".lunar-studio, .title-lunar-studio", "index.html");
  go(".beranda, .title-beranda", "index.html");
  go(".katalog, .title-katalog, .katalog-2", "katalog.html");
  go(".pesan, .title-pesan, .title-pesan", "pesan.html");
  go(".tracking, .title-tracking", "tracking.html");
  go(".kontak, .title-kontak", "kontak.html");

  // LOGIN & DAFTAR 
  const loginButtons = document.querySelectorAll('.button .button-login, .button .text');
  loginButtons.forEach(btn => {
    btn.style.cursor = "pointer";
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      window.location.href = "login.html";
    });
  });

  const daftarButtons = document.querySelectorAll('.button-1 .button-daftar, .button-2 .button-daftar, .button-1 .text-2, .button-2 .text-2');
  daftarButtons.forEach(btn => {
    btn.style.cursor = "pointer";
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      window.location.href = "daftar.html";
    });
  });

  const headerLoginBtn = document.querySelector('.flex-row .button, .flex-row-ff .button, .flex-row-bea .button, .flex-row-ecb .button, .flex-row-df .button');
  if (headerLoginBtn) {
    headerLoginBtn.addEventListener("click", (e) => {
      e.preventDefault();
      window.location.href = "login.html";
    });
  }

  const headerDaftarBtn = document.querySelector('.flex-row .button-1, .flex-row .button-2, .flex-row-ff .button-1, .flex-row-ff .button-2, .flex-row-bea .button-1, .flex-row-ecb .button-1, .flex-row-df .button-1');
  if (headerDaftarBtn) {
    headerDaftarBtn.addEventListener("click", (e) => {
      e.preventDefault();
      window.location.href = "daftar.html";
    });
  }

  // KATALOG NAVIGATION
  go(".rectangle .title", "template.html");
  go(".rectangle-3 .title-4", "custom.html");
  go(".rectangle-5 .title-6", "paketumkm.html");
  go(".rectangle-7 .title-8", "paketmahasiswa.html");

  // TEMPLATE PAGE
  go(".rectangle-3a", "kontak.html");
  go(".rectangle-3c", "pesan.html");

  // CUSTOM PAGE
  go(".button-mulai-project, .button-23, .button-31", "pesan.html");

  // PAKET MAHASISWA
  go(".button-55, .button-63", "pesan.html");

  // PAKET UMKM
  go(".button-43, .button-50, .button-5d", "pesan.html");

  // BERANDA - Button Mulai
  go(".button-2, .button-mulai", "katalog.html");

  // KONTAK
  go(".button-17", () => {
    alert("Pesan berhasil dikirim ✨");
  });

  
  // HALAMAN LOGIN 
  const loginForm = document.getElementById("loginForm");
  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();
      
      const email = document.querySelector('#loginForm input[type="email"]')?.value;
      const password = document.querySelector('#loginForm input[type="password"]')?.value;
      
      if (email && password) {
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userData', JSON.stringify({
          email: email,
          loginTime: new Date().toISOString()
        }));
        
        window.location.replace('index.html');
      } else {
        alert('Silakan isi email dan password');
      }
    });

    const daftarLinks = document.querySelectorAll('.title strong, a[href*="daftar"], a[href*="register"]');
    daftarLinks.forEach(link => {
      link.style.cursor = "pointer";
      link.addEventListener("click", (e) => {
        e.preventDefault();
        window.location.href = "daftar.html";
      });
    });
  }

  
  // HALAMAN DAFTAR/REGISTER 
  const registerForm = document.getElementById("registerForm");
  if (registerForm) {
    registerForm.addEventListener("submit", (e) => {
      e.preventDefault();
      
      const nama = document.querySelector('input[name="nama"], input[id*="nama"]')?.value;
      const email = document.querySelector('input[type="email"]')?.value;
      const password = document.querySelector('input[type="password"]')?.value;
      
      if (nama && email && password) {
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userData', JSON.stringify({
          nama: nama,
          email: email,
          registerTime: new Date().toISOString()
        }));
        
        window.location.replace('index.html');
      } else {
        alert('Silakan lengkapi semua field');
      }
    });

    const loginLinks = document.querySelectorAll('.title strong, a[href*="login"]');
    loginLinks.forEach(link => {
      link.style.cursor = "pointer";
      link.addEventListener("click", (e) => {
        e.preventDefault();
        window.location.href = "login.html";
      });
    });
  }

  // HALAMAN PESAN
  const orderForm = document.getElementById("orderForm");
  if (orderForm) {
    
    let selectedService = null;
    const serviceCards = document.querySelectorAll('.service-card');
    
    window.selectService = function(service) {
      selectedService = service;
      serviceCards.forEach(card => card.classList.remove('selected'));
      const selectedCard = document.querySelector(`[data-service="${service}"]`);
      if (selectedCard) selectedCard.classList.add('selected');
    };

    const fileInput = document.getElementById('fileReferensi');
    const fileNameDisplay = document.getElementById('fileName');
    if (fileInput && fileNameDisplay) {
      fileInput.addEventListener('change', (e) => {
        if (e.target.files.length > 0) {
          const fileNames = Array.from(e.target.files).map(f => f.name).join(', ');
          fileNameDisplay.textContent = fileNames;
        } else {
          fileNameDisplay.textContent = 'No file chosen';
        }
      });
    }

    const jumlahCetakanInput = document.getElementById('jumlahCetakan');
    const bahanSelect = document.getElementById('bahan');
    const pengirimanSelect = document.getElementById('metodePengiriman');
    
    function updatePrice() {
      const qty = parseInt(jumlahCetakanInput?.value) || 0;
      
      const designPrice = 50000;
      const cetakPrice = qty * 1500;
      const ongkirPrice = 10000;
      const total = designPrice + cetakPrice + ongkirPrice;
      
      if (document.getElementById('priceDesign')) {
        document.getElementById('priceDesign').textContent = `Rp ${designPrice.toLocaleString('id-ID')}`;
      }
      if (document.getElementById('priceCetak')) {
        document.getElementById('priceCetak').textContent = `Rp ${cetakPrice.toLocaleString('id-ID')}`;
      }
      if (document.getElementById('qtyDisplay')) {
        document.getElementById('qtyDisplay').textContent = qty;
      }
      if (document.getElementById('priceOngkir')) {
        document.getElementById('priceOngkir').textContent = `Rp ${ongkirPrice.toLocaleString('id-ID')}`;
      }
      if (document.getElementById('totalPrice')) {
        document.getElementById('totalPrice').textContent = `Rp ${total.toLocaleString('id-ID')}`;
      }
      
      localStorage.setItem('orderTotal', total);
    }
    
    if (jumlahCetakanInput) jumlahCetakanInput.addEventListener('input', updatePrice);
    if (bahanSelect) bahanSelect.addEventListener('change', updatePrice);
    if (pengirimanSelect) pengirimanSelect.addEventListener('change', updatePrice);

    window.handleOrder = function(event) {
      event.preventDefault();
      
      if (!selectedService) {
        alert('Silakan pilih jenis layanan (Design atau Cetak)');
        return;
      }
      
      const formData = {
        service: selectedService,
        kategori: document.getElementById('kategoriDesain')?.value,
        judul: document.getElementById('judulProyek')?.value,
        deskripsi: document.getElementById('deskripsi')?.value,
        jumlah: document.getElementById('jumlahCetakan')?.value,
        bahan: document.getElementById('bahan')?.value,
        pengiriman: document.getElementById('metodePengiriman')?.value,
        deadline: document.getElementById('deadline')?.value,
        total: localStorage.getItem('orderTotal') || '60000'
      };
      
      localStorage.setItem('orderData', JSON.stringify(formData));
      window.location.href = 'checkout.html';
    };

    orderForm.addEventListener("submit", (e) => {
      e.preventDefault();
      if (window.handleOrder) {
        window.handleOrder(e);
      }
    });
  }

  // HALAMAN CHECKOUT
  const checkoutForm = document.getElementById("checkoutForm");
  if (checkoutForm) {
    const orderData = JSON.parse(localStorage.getItem('orderData') || '{}');
    const orderTotal = localStorage.getItem('orderTotal') || '215000';
    
    const totalElements = document.querySelectorAll('.span-title-15, .title-23');
    totalElements.forEach(el => {
      if (el && orderTotal) {
        el.textContent = `Rp ${parseInt(orderTotal).toLocaleString('id-ID')}`;
      }
    });

    let selectedPaymentMethod = null;
    const paymentCards = document.querySelectorAll('.payment-method-card');
    
    window.selectPaymentMethod = function(method) {
      selectedPaymentMethod = method;
      paymentCards.forEach(card => card.classList.remove('selected'));
      const selectedCard = document.querySelector(`[data-method="${method}"]`);
      if (selectedCard) selectedCard.classList.add('selected');
    };

    window.handleSubmit = function(event) {
      event.preventDefault();
      
      if (!selectedPaymentMethod) {
        alert('Silakan pilih metode pembayaran');
        return;
      }
      
      const checkoutData = {
        namaLengkap: document.getElementById('namaLengkap')?.value,
        nomorTelepon: document.getElementById('nomorTelepon')?.value,
        alamatPengiriman: document.getElementById('alamatPengiriman')?.value,
        catatan: document.getElementById('catatan')?.value,
        paymentMethod: selectedPaymentMethod,
        orderData: orderData,
        total: orderTotal
      };
      
      localStorage.setItem('checkoutData', JSON.stringify(checkoutData));
      
      const orderId = `LS-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 99999)).padStart(5, '0')}`;
      localStorage.setItem('orderId', orderId);
      
      window.location.href = 'pembayaran.html';
    };

    checkoutForm.addEventListener("submit", (e) => {
      e.preventDefault();
      if (window.handleSubmit) {
        window.handleSubmit(e);
      }
    });
  }

  go(".button-27", () => {
    const form = document.getElementById('checkoutForm');
    if (form && window.handleSubmit) {
      const fakeEvent = { preventDefault: () => {} };
      window.handleSubmit(fakeEvent);
    }
  });

  
  // HALAMAN PEMBAYARAN
  const paymentForm = document.getElementById("paymentForm");
  if (paymentForm) {
    
    const checkoutData = JSON.parse(localStorage.getItem('checkoutData') || '{}');
    const orderId = localStorage.getItem('orderId') || 'LS-2025-00123';
    const total = checkoutData.total || '215000';
    
    const totalPaymentEl = document.getElementById('totalPayment');
    if (totalPaymentEl) {
      totalPaymentEl.textContent = `Rp ${parseInt(total).toLocaleString('id-ID')}`;
    }
    
    const orderIdEl = document.getElementById('orderId');
    if (orderIdEl) {
      orderIdEl.textContent = `Order ID: ${orderId}`;
    }

    const fileInput = document.getElementById('buktiPembayaran');
    const fileNameDisplay = document.getElementById('fileName');
    if (fileInput && fileNameDisplay) {
      fileInput.addEventListener('change', (e) => {
        if (e.target.files.length > 0) {
          fileNameDisplay.textContent = e.target.files[0].name;
        } else {
          fileNameDisplay.textContent = 'No file chosen';
        }
      });
    }

    window.handlePaymentConfirm = function(event) {
      event.preventDefault();
      
      const buktiFile = document.getElementById('buktiPembayaran')?.files[0];
      if (!buktiFile) {
        alert('Silakan upload bukti pembayaran');
        return;
      }
      
      const paymentData = {
        orderId: orderId,
        buktiPembayaran: buktiFile.name,
        timestamp: new Date().toISOString(),
        checkoutData: checkoutData
      };
      
      localStorage.setItem('paymentData', JSON.stringify(paymentData));
      
      alert('Pembayaran berhasil dikonfirmasi! ✨');
      window.location.href = 'tracking.html';
    };

    paymentForm.addEventListener("submit", (e) => {
      e.preventDefault();
      if (window.handlePaymentConfirm) {
        window.handlePaymentConfirm(e);
      }
    });
  }

  go(".confirm-payment", () => {
    const form = document.getElementById('paymentForm');
    if (form && window.handlePaymentConfirm) {
      const fakeEvent = { preventDefault: () => {} };
      window.handlePaymentConfirm(fakeEvent);
    }
  });

 
  // HALAMAN TRACKING
  const paymentData = JSON.parse(localStorage.getItem('paymentData') || '{}');
  if (paymentData && paymentData.orderId) {
    const trackingOrderId = document.querySelector('.order-id, #trackingOrderId');
    if (trackingOrderId) {
      trackingOrderId.textContent = paymentData.orderId;
    }
  }

  go(".button-4", "tracking.html");
});