import { hitungZakatEmas } from './zakat-emas.js';
import { hitungZakatPertanian } from './zakat-pertanian.js';
import { hitungZakatPenghasilan } from './zakat-penghasilan.js';

// Elemen utama
const cekEmas = document.getElementById('cekEmas');
const cekPertanian = document.getElementById('cekPertanian');
const cekPenghasilan = document.getElementById('cekPenghasilan');
const inputContainer = document.getElementById('inputContainer');
const hitungBtn = document.getElementById('hitungBtn');
const hasilEl = document.getElementById('hasil');
const nominalZakatEl = document.getElementById('nominalZakat');
const argumenLogisEl = document.getElementById('argumenLogis');
const hukumLogikaEl = document.getElementById('hukumLogika');

// Kurs emas 2025
const KURS_EMAS = 2321000;

// --- FUNGSI TAMPILKAN INPUT ---
function tampilkanInput() {
  inputContainer.innerHTML = '';

  // === Emas ===
  if (cekEmas.checked) {
    inputContainer.insertAdjacentHTML('beforeend', `
      <div id="form-emas" class="form-section">
        <h3>💛 Zakat Emas</h3>
        <label>Jumlah Emas (gram):</label>
        <input type="number" id="emas" value="0"><br><br>
        <label>Lama Kepemilikan (tahun):</label>
        <input type="number" id="haul" value="0"><br><br>
        <hr>
      </div>
    `);
  }

  // === Pertanian ===
  if (cekPertanian.checked) {
    inputContainer.insertAdjacentHTML('beforeend', `
      <div id="form-pertanian" class="form-section">
        <h3>🌾 Zakat Pertanian</h3>
        <label>Pilih Jenis Pertanian:</label><br>
        <input type="checkbox" class="jenisPertanian" value="padi"> Padi
        <input type="checkbox" class="jenisPertanian" value="sayur"> Sayur
        <input type="checkbox" class="jenisPertanian" value="rempah"> Rempah
        <input type="checkbox" class="jenisPertanian" value="buah"> Buah<br><br>
        <div id="detailPertanian"></div>
        <hr>
      </div>
    `);

    const cekJenis = document.querySelectorAll('.jenisPertanian');
    const detailContainer = document.getElementById('detailPertanian');

    cekJenis.forEach(c => {
      c.addEventListener('change', () => {
        const jenis = c.value;
        const formId = `form-${jenis}`;

        if (c.checked && !document.getElementById(formId)) {
          const formHTML = `
            <div id="${formId}" class="form-pertanian-item">
              <h4>${jenis.charAt(0).toUpperCase() + jenis.slice(1)}</h4>
              <label>Hasil panen ${jenis} (kg):</label>
              <input type="number" id="hasil-${jenis}" value="0"><br>
              <label>Irigasi:</label>
              <input type="checkbox" id="irigasi-${jenis}"> Irigasi Buatan (tidak diceklis = alami)
              <hr>
            </div>
          `;
          detailContainer.insertAdjacentHTML('beforeend', formHTML);
        } else if (!c.checked) {
          const formEl = document.getElementById(formId);
          if (formEl) formEl.remove();
        }
      });
    });
  }

  // === Penghasilan ===
  if (cekPenghasilan.checked) {
    inputContainer.insertAdjacentHTML('beforeend', `
      <div id="form-penghasilan" class="form-section">
        <h3>💼 Zakat Penghasilan</h3>
        <label>Pilih Periode:</label><br>
        <input type="radio" name="periode" value="bulanan" checked> Bulanan
        <input type="radio" name="periode" value="tahunan"> Tahunan<br><br>
        <label>Gaji per bulan (Rp):</label>
        <input type="number" id="gaji" value="0"><br><br>
        <label>Pengeluaran per bulan (Rp):</label>
        <input type="number" id="pengeluaran" value="0"><br><br>
        <hr>
      </div>
    `);
  }
}

// Event listener untuk setiap checkbox
[cekEmas, cekPertanian, cekPenghasilan].forEach(cek => {
  cek.addEventListener('change', tampilkanInput);
});

// --- HITUNG TOTAL ZAKAT ---
function hitungZakat() {
  hasilEl.innerText = '';
  nominalZakatEl.innerHTML = '';
  argumenLogisEl.innerHTML = '';
  hukumLogikaEl.innerHTML = '';

  let totalZakatRp = 0;
  let logikaGabungan = [];
  let argumenGabungan = [];

  // === Emas ===
  let hasilEmas = null;
  if (cekEmas.checked) {
    hasilEmas = hitungZakatEmas();
    totalZakatRp += hasilEmas?.totalZakatRp || 0;

    const rincianEmas = hasilEmas?.rincian?.join("<hr>") || "Tidak ada zakat emas yang wajib.";
    argumenGabungan.push(`💛 ${rincianEmas}<hr>`);
    logikaGabungan.push(hasilEmas.hukumLogika || "Negasi/AND untuk emas.");
  }

  // === Pertanian ===
  let hasilPertanian = null;
  if (cekPertanian.checked) {
    hasilPertanian = hitungZakatPertanian();
    totalZakatRp += hasilPertanian?.totalZakatRp || 0;

    const rincianPertanian = hasilPertanian?.rincian?.join("<hr>") || 'Tidak ada hasil panen yang wajib zakat.';
    argumenGabungan.push(`🌾 ${rincianPertanian}<hr>`);
    logikaGabungan.push("Disjungsi (OR): salah satu jenis panen memenuhi nisab → wajib zakat.");
  }

  // === Penghasilan ===
  let hasilPenghasilan = null;
  if (cekPenghasilan.checked) {
    hasilPenghasilan = hitungZakatPenghasilan();
    totalZakatRp += hasilPenghasilan?.totalZakatRp || 0;

    const rincianPenghasilan = hasilPenghasilan?.rincian?.join("<hr>") || "Tidak ada zakat penghasilan yang wajib.";
    argumenGabungan.push(`💼 ${rincianPenghasilan}<hr>`);
    logikaGabungan.push(hasilPenghasilan.hukumLogika || "Negasi/Implikasi untuk penghasilan.");
  }

  // === HASIL AKHIR ===
  hasilEl.innerText = totalZakatRp > 0 ? "✅ Total Wajib Zakat" : "❌ Tidak Ada Zakat Wajib";
  nominalZakatEl.innerHTML = `💰 Total Zakat yang Harus Dibayar: <b>Rp ${totalZakatRp.toLocaleString('id-ID')}</b><hr>`;
  argumenLogisEl.innerHTML = argumenGabungan.join("<br>");
  hukumLogikaEl.innerHTML = `
    <b>Hukum Logika Gabungan:</b>
    <ul>
      ${logikaGabungan.map(l => `<li>${l}</li>`).join('')}
      <li>Konjungsi Total: Semua syarat benar → Wajib zakat total.</li>
      <li>Disjungsi Total: Salah satu jenis memenuhi syarat → sebagian wajib zakat.</li>
    </ul>
  `;
}

// Tombol Hitung
hitungBtn.addEventListener('click', hitungZakat);

// Inisialisasi awal
window.addEventListener('DOMContentLoaded', tampilkanInput);
