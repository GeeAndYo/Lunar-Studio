document.addEventListener("DOMContentLoaded", () => {

  // helper: klik elemen -> pindah halaman
  function go(selector, target) {
    const el = document.querySelector(selector);
    if (el) {
      el.style.cursor = "pointer";
      el.addEventListener("click", () => {
        window.location.href = target;
      });
    }
  }

  // HEADER NAVIGATION (SEMUA HALAMAN)
  go(".lunar-studio, .title-lunar-studio", "index.html");
  go(".beranda, .title-beranda", "index.html");
  go(".katalog, .title-katalog, .katalog-2", "katalog.html");
  go(".pesan, .title-pesan", "pesan.html");
  go(".tracking, .title-tracking", "tracking.html");
  go(".kontak, .title-kontak", "kontak.html");

  // LOGIN & DAFTAR (HEADER)
  go(".button-login, .text", "login.html");
  go(".button-daftar, .text-2", "daftar.html");

  // KATALOG (kategori utama)
  go(".rectangle .title", "template.html");          // Template siap pakai
  go(".rectangle-3 .title-4", "custom.html");        // Design custom
  go(".rectangle-5 .title-6", "paketumkm.html");     // Paket UMKM
  go(".rectangle-7 .title-8", "paketmahasiswa.html");// Paket Mahasiswa

  // TEMPLATE PAGE
  go(".rectangle-3a", "kontak.html"); // Chat Whatsapp
  go(".rectangle-3c", "pesan.html");  // Coba Pesan

  // CUSTOM PAGE
  go(".button-mulai-project, .button-23, .button-31", "pesan.html");

  // PAKET MAHASISWA
  go(".button-55, .button-63", "pesan.html");

  // PAKET UMKM
  go(".button-43, .button-50, .button-5d", "pesan.html");

  // PESAN → CHECKOUT
  go(".checkout-button", "checkout.html");

  // CHECKOUT → PEMBAYARAN
  go(".button-27", "pembayaran.html");

  // PEMBAYARAN → TRACKING
  go(".confirm-payment", "tracking.html");

  // TRACKING
  go(".button-4", "tracking.html");

  // KONTAK
  go(".button-17", () => {
    alert("Pesan berhasil dikirim ✨");
  });

});
