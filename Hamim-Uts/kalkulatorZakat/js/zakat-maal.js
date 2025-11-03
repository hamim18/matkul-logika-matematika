import { hitungZakatEmas } from './zakat-emas.js';
import { hitungZakatPertanian } from './zakat-pertanian.js';
import { hitungZakatPenghasilan } from './zakat-penghasilan.js';
// Ambil elemen utama
const jenisZakat = document.getElementById('jenisZakat');
const inputContainer = document.getElementById('inputContainer');
const hitungBtn = document.getElementById('hitungBtn');
const hasilEl = document.getElementById('hasil');
const nominalZakatEl = document.getElementById('nominalZakat');
const argumenLogisEl = document.getElementById('argumenLogis');
const hukumLogikaEl = document.getElementById('hukumLogika');

// Fungsi untuk menampilkan input sesuai jenis zakat
function tampilkanInput() {
    const jenis = jenisZakat.value;
    inputContainer.innerHTML = ''; // kosongkan container dulu

    if (jenis === 'emas') {
        inputContainer.innerHTML = `
            <label>Jumlah Emas (gram):</label>
            <input type="number" id="emas" value="0"><br><br>
            <label>Lama Kepemilikan (tahun):</label>
            <input type="number" id="haul" value="0"><br><br>
        `;
    }else if (jenis === 'pertanian') {
    inputContainer.innerHTML = `
        <label>Pilih Jenis Pertanian:</label><br>
        <input type="checkbox" class="jenisPertanian" value="padi"> Padi
        <input type="checkbox" class="jenisPertanian" value="sayur"> Sayur
        <input type="checkbox" class="jenisPertanian" value="rempah"> Rempah
        <input type="checkbox" class="jenisPertanian" value="buah"> Buah<br><br>
        <div id="detailPertanian"></div>`;

    const cekJenis = document.querySelectorAll('.jenisPertanian');
    const detailContainer = document.getElementById('detailPertanian');

    cekJenis.forEach(c => {
        c.addEventListener('change', () => {
            // Jika dicentang → tambahkan input hasil panen & irigasi untuk jenis tersebut
            if (c.checked) {
                const jenis = c.value;
                const formId = `form-${jenis}`;

                // Hindari duplikasi jika sudah ada form jenis yang sama
                if (!document.getElementById(formId)) {
                    const formHTML = `
                        <div id="${formId}" class="form-pertanian">
                            <h4>${jenis.charAt(0).toUpperCase() + jenis.slice(1)}</h4>
                            <label>Hasil panen ${jenis} (kg):</label>
                            <input type="number" id="hasil-${jenis}" value="0"><br>
                            <label>Irigasi:</label>
                            <input type="checkbox" id="irigasi-${jenis}"> Irigasi Buatan (tidak diceklis = alami)
                            <hr>
                        </div>
                    `;
                    detailContainer.insertAdjacentHTML('beforeend', formHTML);
                }
            } else {
                // Jika uncheck → hapus form input untuk jenis itu
                const jenis = c.value;
                const formEl = document.getElementById(`form-${jenis}`);
                if (formEl) formEl.remove();
            }
        });
    });
    } else if (jenis === 'penghasilan') {
        inputContainer.innerHTML = `
            <label>Pilih periode:</label><br>
            <input type="radio" name="periode" value="bulanan" checked> Bulanan
            <input type="radio" name="periode" value="tahunan"> Tahunan<br><br>
            <label>Gaji per bulan (Rp):</label>
            <input type="number" id="gaji" value="0"><br><br>
            <label>Pengeluaran per bulan (Rp):</label>
            <input type="number" id="pengeluaran" value="0"><br><br>
        `;
    }
}

// Panggil tampilkanInput saat dropdown berubah
jenisZakat.addEventListener('change', tampilkanInput);

// Fungsi hitung zakat sesuai jenis
function hitungZakat() {
    const jenis = jenisZakat.value;

    hasilEl.innerText = '';
    nominalZakatEl.innerText = '';
    argumenLogisEl.innerText = '';
    hukumLogikaEl.innerText = '';

    if (jenis === 'emas') {
        // Memanggil fungsi dari zakat-emas.js (akan dibuat)
        hitungZakatEmas();
    } else if (jenis === 'pertanian') {
        // Memanggil fungsi dari zakat-pertanian.js (akan dibuat)
        hitungZakatPertanian();
    } else if (jenis === 'penghasilan') {
        // Memanggil fungsi dari zakat-penghasilan.js (akan dibuat)
        hitungZakatPenghasilan();
    } else {
        alert('Pilih jenis zakat terlebih dahulu!');
    }
}

// Event listener tombol hitung
hitungBtn.addEventListener('click', hitungZakat);

// Panggil tampilkanInput sekali saat load untuk mengosongkan container
window.addEventListener('DOMContentLoaded', tampilkanInput);
