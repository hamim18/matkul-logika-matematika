import { hitungZakatEmas } from './zakat-emas.js';
import { hitungZakatPerak } from './zakat-perak.js';
import { hitungZakatPertanian } from './zakat-pertanian.js';
import { hitungZakatPenghasilan } from './zakat-penghasilan.js';
import { hitungZakatUangSuratBerharga } from './zakat-uang-surat-berharga.js';
import { hitungZakatPerniagaan } from './zakat-perniagaan.js';
import { hitungZakatPeternakanPerikanan } from './zakat-peternakan-perikanan.js';
import { hitungZakatPertambangan } from './zakat-pertambangan.js';
import { hitungZakatRikaz } from './zakat-rikaz.js';

// Elemen utama
const cekEmas = document.getElementById('cekEmas');
const cekPerak = document.getElementById('cekPerak');
const cekPertanian = document.getElementById('cekPertanian');
const cekPenghasilan = document.getElementById('cekPenghasilan');
const cekUang = document.getElementById('cekUang');
const cekPerniagaan = document.getElementById('cekPerniagaan');
const cekPeternakan = document.getElementById('cekPeternakan');
const cekPertambangan = document.getElementById('cekPertambangan');
const cekRikaz = document.getElementById('cekRikaz');

const inputContainer = document.getElementById('inputContainer');
const hitungBtn = document.getElementById('hitungBtn');
const hasilEl = document.getElementById('hasil');
const nominalZakatEl = document.getElementById('nominalZakat');
const argumenLogisEl = document.getElementById('argumenLogis');
const hukumLogikaEl = document.getElementById('hukumLogika');

const KURS_EMAS = 2321000;
const KURS_PERAK = 15000;

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

  // === Perak ===
  if (cekPerak.checked) {
    inputContainer.insertAdjacentHTML('beforeend', `
      <div id="form-perak" class="form-section">
        <h3>⚪ Zakat Perak</h3>
        <label>Jumlah Perak (gram):</label>
        <input type="number" id="perak" value="0"><br><br>
        <label>Lama Kepemilikan (tahun):</label>
        <input type="number" id="haulPerak" value="0"><br><br>
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

  // === Uang & Surat Berharga ===
  if (cekUang?.checked) {
    inputContainer.insertAdjacentHTML('beforeend', `
      <div id="form-uang" class="form-section">
        <h3>💵 Zakat Uang & Surat Berharga</h3>
        <h4>Uang</h4>
        <label>Tunai (Rp):</label>
        <input type="number" id="tunai" value="0"><br>
        <label>Tabungan (Rp):</label>
        <input type="number" id="tabungan" value="0"><br>
        <label>Deposito (Rp):</label>
        <input type="number" id="deposito" value="0"><br><br>
        
        <h4>Investasi</h4>
        <label>Saham (Rp):</label>
        <input type="number" id="saham" value="0"><br>
        <label>Obligasi (Rp):</label>
        <input type="number" id="obligasi" value="0"><br>
        <label>Reksadana (Rp):</label>
        <input type="number" id="reksadana" value="0"><br><br>
        
        <h4>Surat Berharga Lainnya</h4>
        <label>Surat Tanah/Properti (Rp):</label>
        <input type="number" id="suratTanah" value="0"><br>
        <label>Lainnya (Rp):</label>
        <input type="number" id="lainnya" value="0"><br><br>
        
        <label>Lama Kepemilikan (tahun):</label>
        <input type="number" id="haulUang" value="0"><br><br>
        <hr>
      </div>
    `);
  }

  // === Perniagaan ===
  if (cekPerniagaan?.checked) {
    inputContainer.insertAdjacentHTML('beforeend', `
      <div id="form-perniagaan" class="form-section">
        <h3>🏪 Zakat Perniagaan</h3>
        <label>Nilai Barang Dagangan (Rp):</label>
        <input type="number" id="nilaiBarang" value="0"><br><br>
        <label>Uang Kas (Rp):</label>
        <input type="number" id="uangKas" value="0"><br><br>
        <label>Hutang Dagang (Rp):</label>
        <input type="number" id="hutang" value="0"><br><br>
        <label>Lama Usaha (tahun):</label>
        <input type="number" id="haulPerniagaan" value="0"><br><br>
        <hr>
      </div>
    `);
  }

  // === Peternakan & Perikanan ===
  if (cekPeternakan?.checked) {
    inputContainer.insertAdjacentHTML('beforeend', `
      <div id="form-peternakan" class="form-section">
        <h3>🐄 Zakat Peternakan & Perikanan</h3>
        <label>Pilih Jenis:</label><br>
        <input type="checkbox" class="jenisTernak" value="domba"> Domba/Kambing
        <input type="checkbox" class="jenisTernak" value="sapi"> Sapi/Kerbau
        <input type="checkbox" class="jenisTernak" value="unta"> Unta
        <input type="checkbox" class="jenisTernak" value="ikan"> Perikanan<br><br>
        <div id="detailTernak"></div>
        <hr>
      </div>
    `);

    const cekTernak = document.querySelectorAll('.jenisTernak');
    const detailTernak = document.getElementById('detailTernak');

    cekTernak.forEach(c => {
      c.addEventListener('change', () => {
        const jenis = c.value;
        const formId = `form-ternak-${jenis}`;

        if (c.checked && !document.getElementById(formId)) {
          let formHTML = '';
          if (jenis === 'ikan') {
            formHTML = `
              <div id="${formId}">
                <h4>🐟 Perikanan</h4>
                <label>Jumlah Ikan (kg):</label>
                <input type="number" id="jumlah-${jenis}" value="0"><br><br>
              </div>
            `;
          } else {
            const labelMap = { domba: 'Domba/Kambing', sapi: 'Sapi/Kerbau', unta: 'Unta' };
            formHTML = `
              <div id="${formId}">
                <h4>${labelMap[jenis]}</h4>
                <label>Jumlah (ekor):</label>
                <input type="number" id="jumlah-${jenis}" value="0"><br>
                <label>Lama Kepemilikan (tahun):</label>
                <input type="number" id="haul-${jenis}" value="0"><br><br>
              </div>
            `;
          }
          detailTernak.insertAdjacentHTML('beforeend', formHTML);
        } else if (!c.checked) {
          const formEl = document.getElementById(formId);
          if (formEl) formEl.remove();
        }
      });
    });
  }

  // === Pertambangan ===
  if (cekPertambangan?.checked) {
    inputContainer.insertAdjacentHTML('beforeend', `
      <div id="form-pertambangan" class="form-section">
        <h3>⛏️ Zakat Pertambangan</h3>
        <label>Nilai Hasil Tambang (Rp):</label>
        <input type="number" id="nilaiTambang" value="0"><br><br>
        <label>Biaya Produksi (Rp):</label>
        <input type="number" id="biayaProduksi" value="0"><br><br>
        <label>Jenis Usaha:</label><br>
        <input type="radio" name="jenisUsaha" value="ringan" checked> Ringan (modal kecil) → Zakat 20% dari hasil kotor<br>
        <input type="radio" name="jenisUsaha" value="berat"> Berat (modal besar) → Zakat 2.5% dari hasil bersih<br><br>
        <hr>
      </div>
    `);
  }

  // === Rikaz ===
  if (cekRikaz?.checked) {
    inputContainer.insertAdjacentHTML('beforeend', `
      <div id="form-rikaz" class="form-section">
        <h3>💎 Zakat Rikaz (Harta Temuan)</h3>
        <label>Jenis Harta Temuan:</label>
        <input type="text" id="jenisRikaz" placeholder="Mis: emas karun, perak antik, dll"><br><br>
        <label>Nilai Harta (Rp):</label>
        <input type="number" id="nilaiRikaz" value="0"><br><br>
        <p><i>Catatan: Zakat rikaz 20%, tanpa nisab & haul</i></p>
        <hr>
      </div>
    `);
  }
}

// Event listener untuk setiap checkbox
[cekEmas, cekPerak, cekPertanian, cekPenghasilan, cekUang, cekPerniagaan, cekPeternakan, cekPertambangan, cekRikaz].forEach(cek => {
  if (cek) cek.addEventListener('change', tampilkanInput);
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
  if (cekEmas.checked) {
    const hasilEmas = hitungZakatEmas();
    totalZakatRp += hasilEmas?.totalZakatRp || 0;
    const rincianEmas = hasilEmas?.rincian?.join("<hr>") || "Tidak ada zakat emas yang wajib.";
    argumenGabungan.push(`💛 ${rincianEmas}<hr>`);
    logikaGabungan.push(hasilEmas.hukumLogika || "Negasi/AND untuk emas.");
  }

  // === Perak ===
  if (cekPerak.checked) {
    const hasilPerak = hitungZakatPerak();
    totalZakatRp += hasilPerak?.totalZakatRp || 0;
    const rincianPerak = hasilPerak?.rincian?.join("<hr>") || "Tidak ada zakat perak yang wajib.";
    argumenGabungan.push(`⚪ ${rincianPerak}<hr>`);
    logikaGabungan.push(hasilPerak.hukumLogika || "Negasi/AND untuk perak.");
  }

  // === Pertanian ===
  if (cekPertanian.checked) {
    const hasilPertanian = hitungZakatPertanian();
    totalZakatRp += hasilPertanian?.totalZakatRp || 0;
    const rincianPertanian = hasilPertanian?.rincian?.join("<hr>") || 'Tidak ada hasil panen yang wajib zakat.';
    argumenGabungan.push(`🌾 ${rincianPertanian}<hr>`);
    logikaGabungan.push("Disjungsi (OR): salah satu jenis panen memenuhi nisab → wajib zakat.");
  }

  // === Penghasilan ===
  if (cekPenghasilan.checked) {
    const hasilPenghasilan = hitungZakatPenghasilan();
    totalZakatRp += hasilPenghasilan?.totalZakatRp || 0;
    const rincianPenghasilan = hasilPenghasilan?.rincian?.join("<hr>") || "Tidak ada zakat penghasilan yang wajib.";
    argumenGabungan.push(`💼 ${rincianPenghasilan}<hr>`);
    logikaGabungan.push(hasilPenghasilan.hukumLogika || "Negasi/Implikasi untuk penghasilan.");
  }

  // === Uang & Surat Berharga ===
  if (cekUang?.checked) {
    const hasilUang = hitungZakatUangSuratBerharga();
    totalZakatRp += hasilUang?.totalZakatRp || 0;
    const rincianUang = hasilUang?.rincian?.join("<hr>") || "Tidak ada zakat uang yang wajib.";
    argumenGabungan.push(`💵 ${rincianUang}<hr>`);
    logikaGabungan.push(hasilUang.hukumLogika || "Konjungsi untuk uang & surat berharga.");
  }

  // === Perniagaan ===
  if (cekPerniagaan?.checked) {
    const hasilPerniagaan = hitungZakatPerniagaan();
    totalZakatRp += hasilPerniagaan?.totalZakatRp || 0;
    const rincianPerniagaan = hasilPerniagaan?.rincian?.join("<hr>") || "Tidak ada zakat perniagaan yang wajib.";
    argumenGabungan.push(`🏪 ${rincianPerniagaan}<hr>`);
    logikaGabungan.push(hasilPerniagaan.hukumLogika || "Implikasi untuk perniagaan.");
  }

  // === Peternakan ===
  if (cekPeternakan?.checked) {
    const hasilPeternakan = hitungZakatPeternakanPerikanan();
    totalZakatRp += hasilPeternakan?.totalZakatRp || 0;
    const rincianPeternakan = hasilPeternakan?.rincian?.join("<hr>") || "Tidak ada zakat peternakan yang wajib.";
    argumenGabungan.push(`🐄 ${rincianPeternakan}<hr>`);
    logikaGabungan.push(hasilPeternakan.hukumLogika || "Konjungsi untuk peternakan.");
  }

  // === Pertambangan ===
  if (cekPertambangan?.checked) {
    const hasilPertambangan = hitungZakatPertambangan();
    totalZakatRp += hasilPertambangan?.totalZakatRp || 0;
    const rincianPertambangan = hasilPertambangan?.rincian?.join("<hr>") || "Tidak ada zakat pertambangan yang wajib.";
    argumenGabungan.push(`⛏️ ${rincianPertambangan}<hr>`);
    logikaGabungan.push(hasilPertambangan.hukumLogika || "Implikasi untuk pertambangan.");
  }

  // === Rikaz ===
  if (cekRikaz?.checked) {
    const hasilRikaz = hitungZakatRikaz();
    totalZakatRp += hasilRikaz?.totalZakatRp || 0;
    const rincianRikaz = hasilRikaz?.rincian?.join("<hr>") || "Tidak ada zakat rikaz.";
    argumenGabungan.push(`💎 ${rincianRikaz}<hr>`);
    logikaGabungan.push(hasilRikaz.hukumLogika || "Definitif untuk rikaz.");
  }

  // === HASIL AKHIR ===
  hasilEl.innerText = totalZakatRp > 0 ? "✅ Total Wajib Zakat" : "❌ Tidak Ada Zakat Wajib";
  nominalZakatEl.innerHTML = `💰 Total Zakat yang Harus Dibayar: <b>Rp ${totalZakatRp.toLocaleString('id-ID')}</b><hr>`;
  
  // Tambahkan tombol distribusi jika ada zakat yang wajib
  if (totalZakatRp > 0) {
    nominalZakatEl.innerHTML += `
      <div style="margin: 20px 0; text-align: center;">
        <button onclick="distribusiZakat(${totalZakatRp})" style="background-color: #2196f3; color: white; border: none; padding: 15px 30px; border-radius: 8px; cursor: pointer; font-weight: bold; font-size: 16px; box-shadow: 0 4px 6px rgba(0,0,0,0.2); transition: all 0.3s;">
          📊 Distribusi Zakat ke 8 Golongan Mustahik
        </button>
        <p style="margin-top: 10px; color: #666; font-size: 14px;">
          <i>Klik untuk mendistribusikan zakat kepada fakir, miskin, amil, muallaf, riqab, gharim, fi sabilillah, dan ibnu sabil</i>
        </p>
      </div>
    `;
  }
  
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

// Fungsi untuk navigasi ke halaman distribusi zakat
window.distribusiZakat = function(totalZakat) {
  // Simpan total zakat ke sessionStorage
  sessionStorage.setItem('totalZakatMaal', totalZakat);
  // Redirect ke halaman distribusi dengan parameter
  window.location.href = `distribusi-zakat.html?total=${totalZakat}`;
}