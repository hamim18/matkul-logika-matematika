// zakat-fitrah.js - Logika Zakat Fitrah sesuai Syariat Islam

const hitungBtn = document.getElementById('hitungBtn');
const hasilEl = document.getElementById('hasil');
const rincianZakatEl = document.getElementById('rincianZakat');
const statusPembayaranEl = document.getElementById('statusPembayaran');
const hukumLogikaEl = document.getElementById('hukumLogika');

// Nisab Zakat Fitrah: 1 sha' (2.5 kg atau 3.5 liter) per jiwa
const TAKARAN_PER_JIWA_KG = 2.5;
const TAKARAN_PER_JIWA_LITER = 3.5;

function hitungZakatFitrah() {
    hasilEl.innerText = '';
    rincianZakatEl.innerHTML = '';
    statusPembayaranEl.innerHTML = '';
    hukumLogikaEl.innerHTML = '';

    // Input data
    const jumlahJiwa = parseInt(document.getElementById('jumlahJiwa')?.value) || 0;
    const adaDewasa = document.getElementById('adaDewasa')?.checked || false;
    const adaAnak = document.getElementById('adaAnak')?.checked || false;
    const adaBayi = document.getElementById('adaBayi')?.checked || false;
    
    const jenisMakanan = document.querySelector('input[name="jenisMakanan"]:checked')?.value || 'beras';
    const hargaPerKg = parseFloat(document.getElementById('hargaPerKg')?.value) || 15000;
    
    const sudahBayar = document.getElementById('sudahBayar')?.checked || false;
    const waktuBayar = document.querySelector('input[name="waktuBayar"]:checked')?.value || 'akhir';

    let rincian = [];
    let hukumLogika = [];

    // Validasi input
    if (jumlahJiwa <= 0) {
        hasilEl.innerText = '❌ Input Tidak Valid';
        rincianZakatEl.innerHTML = '<p style="color: red;">Jumlah jiwa harus lebih dari 0. Mohon isi data dengan benar.</p>';
        hukumLogikaEl.innerHTML = `
            <b>Hukum Logika:</b>
            <ul>
                <li><b>Hukum Negasi</b>: Jika jumlah jiwa ≤ 0 → Input tidak valid → Tidak dapat menghitung zakat.</li>
            </ul>
        `;
        return;
    }

    // Hitung total zakat dalam kg dan rupiah
    const totalKg = jumlahJiwa * TAKARAN_PER_JIWA_KG;
    const totalRupiah = totalKg * hargaPerKg;

    // Pemetaan nama makanan
    const namaMakanan = {
        'beras': 'Beras',
        'gandum': 'Gandum',
        'kurma': 'Kurma',
        'sagu': 'Sagu',
        'uang': 'Uang (setara makanan pokok)'
    };

    // Status kategori keluarga
    let kategoriKeluarga = [];
    if (adaDewasa) kategoriKeluarga.push('Dewasa');
    if (adaAnak) kategoriKeluarga.push('Anak-anak');
    if (adaBayi) kategoriKeluarga.push('Bayi baru lahir');

    const kategoriText = kategoriKeluarga.length > 0 
        ? kategoriKeluarga.join(', ') 
        : 'Tidak ditentukan';

    // Analisis waktu pembayaran
    let statusWaktu = '';
    let hukumWaktu = '';
    
    if (waktuBayar === 'setelah') {
        statusWaktu = '⚠️ <span style="color: orange;"><b>TERLAMBAT</b></span> - Pembayaran setelah salat Id dianggap sebagai sedekah biasa, bukan zakat fitrah.';
        hukumWaktu = 'Hukum Implikasi: Jika waktu pembayaran setelah salat Id → maka bukan zakat fitrah yang sah → hanya dihitung sebagai sedekah.';
    } else if (waktuBayar === 'akhir') {
        statusWaktu = '✅ <span style="color: green;"><b>TEPAT WAKTU</b></span> - Waktu terbaik untuk membayar zakat fitrah (sebelum salat Id).';
        hukumWaktu = 'Hukum Konjungsi: Dibayar di akhir Ramadan DAN sebelum salat Id → zakat fitrah sah dan tepat waktu.';
    } else {
        statusWaktu = '✅ <span style="color: blue;"><b>BOLEH</b></span> - Diperbolehkan membayar zakat fitrah sejak awal Ramadan.';
        hukumWaktu = 'Hukum Disjungsi: Boleh dibayar di awal Ramadan ATAU pertengahan Ramadan ATAU akhir Ramadan (selama sebelum salat Id).';
    }

    // Rincian zakat
    rincian.push(`
        <h3>📋 Rincian Zakat Fitrah</h3>
        <table style="border-collapse: collapse; width: 100%; margin: 20px 0;">
            <tr style="background-color: #f0f0f0;">
                <td style="padding: 10px; border: 1px solid #ddd;"><b>Jumlah Jiwa</b></td>
                <td style="padding: 10px; border: 1px solid #ddd;">${jumlahJiwa} jiwa</td>
            </tr>
            <tr>
                <td style="padding: 10px; border: 1px solid #ddd;"><b>Kategori Anggota</b></td>
                <td style="padding: 10px; border: 1px solid #ddd;">${kategoriText}</td>
            </tr>
            <tr style="background-color: #f0f0f0;">
                <td style="padding: 10px; border: 1px solid #ddd;"><b>Jenis Makanan</b></td>
                <td style="padding: 10px; border: 1px solid #ddd;">${namaMakanan[jenisMakanan]}</td>
            </tr>
            <tr>
                <td style="padding: 10px; border: 1px solid #ddd;"><b>Takaran per Jiwa</b></td>
                <td style="padding: 10px; border: 1px solid #ddd;">${TAKARAN_PER_JIWA_KG} kg (1 sha')</td>
            </tr>
            <tr style="background-color: #f0f0f0;">
                <td style="padding: 10px; border: 1px solid #ddd;"><b>Harga per Kg</b></td>
                <td style="padding: 10px; border: 1px solid #ddd;">Rp ${hargaPerKg.toLocaleString('id-ID')}</td>
            </tr>
            <tr style="background-color: #e8f5e9;">
                <td style="padding: 10px; border: 1px solid #ddd;"><b>Total Zakat (kg)</b></td>
                <td style="padding: 10px; border: 1px solid #ddd;"><b>${totalKg} kg</b></td>
            </tr>
            <tr style="background-color: #e8f5e9;">
                <td style="padding: 10px; border: 1px solid #ddd;"><b>Total Zakat (Rp)</b></td>
                <td style="padding: 10px; border: 1px solid #ddd;"><b>Rp ${totalRupiah.toLocaleString('id-ID')}</b></td>
            </tr>
        </table>

        <p><i><b>Perhitungan:</b> ${jumlahJiwa} jiwa × ${TAKARAN_PER_JIWA_KG} kg = ${totalKg} kg</i></p>
        <p><i><b>Nilai dalam uang:</b> ${totalKg} kg × Rp ${hargaPerKg.toLocaleString('id-ID')} = Rp ${totalRupiah.toLocaleString('id-ID')}</i></p>
    `);

    // Status pembayaran
    let statusBayar = '';
    if (sudahBayar) {
        statusBayar = `
            <div style="background-color: #e8f5e9; padding: 15px; border-left: 5px solid #4caf50; margin: 20px 0;">
                <h3>✅ Status Pembayaran: SUDAH DIBAYAR</h3>
                <p><b>Waktu Pembayaran:</b> ${waktuBayar === 'awal' ? 'Awal Ramadan' : waktuBayar === 'tengah' ? 'Pertengahan Ramadan' : waktuBayar === 'akhir' ? 'Akhir Ramadan (sebelum salat Id)' : 'Setelah salat Id'}</p>
                <p>${statusWaktu}</p>
                <p><i>Semoga zakat Anda diterima oleh Allah SWT dan membawa berkah untuk Anda dan keluarga.</i></p>
            </div>
        `;
    } else {
        statusBayar = `
            <div style="background-color: #fff3cd; padding: 15px; border-left: 5px solid #ff9800; margin: 20px 0;">
                <h3>⚠️ Status Pembayaran: BELUM DIBAYAR</h3>
                <p><b>Total yang harus dibayar:</b> ${totalKg} kg ${namaMakanan[jenisMakanan]} atau Rp ${totalRupiah.toLocaleString('id-ID')}</p>
                <p><b>Batas waktu:</b> Sebelum salat Idul Fitri</p>
                <p><i>Segera tunaikan zakat fitrah Anda agar sah dan diterima oleh Allah SWT.</i></p>
            </div>
        `;
    }

    // Hukum Logika Matematika
    hukumLogika.push(`
        <h3>🧮 Hukum Logika Matematika dalam Zakat Fitrah</h3>
        <ul>
            <li>
                <b>Hukum Konjungsi (AND) - Syarat Wajib Zakat:</b>
                <br>Zakat fitrah wajib jika: Muslim <b>AND</b> Hidup saat Ramadan <b>AND</b> Memiliki kelebihan makanan.
                <br><i>Proposisi: P (Muslim) ∧ Q (Hidup di Ramadan) ∧ R (Ada kelebihan) → Wajib Zakat</i>
            </li>
            <br>
            <li>
                <b>Hukum Identitas - Takaran Tetap:</b>
                <br>Setiap jiwa = 1 sha' (2.5 kg). Jika ada 1 jiwa, maka zakat = 2.5 kg.
                <br><i>Jika P = P, maka hasil tetap konsisten (${jumlahJiwa} jiwa × 2.5 kg = ${totalKg} kg)</i>
            </li>
            <br>
            <li>
                <b>Hukum Implikasi - Waktu Pembayaran:</b>
                <br>${hukumWaktu}
                <br><i>Proposisi: Jika P (bayar sebelum salat Id) → Q (zakat sah); Jika ¬P (bayar setelah) → ¬Q (bukan zakat)</i>
            </li>
            <br>
            <li>
                <b>Hukum Disjungsi (OR) - Jenis Makanan:</b>
                <br>Zakat dapat dibayar dengan: Beras <b>OR</b> Gandum <b>OR</b> Kurma <b>OR</b> Sagu <b>OR</b> Uang setara.
                <br><i>Proposisi: P (Beras) ∨ Q (Gandum) ∨ R (Kurma) ∨ S (Sagu) ∨ T (Uang) → Valid</i>
            </li>
            <br>
            <li>
                <b>Hukum Universal - Berlaku untuk Semua:</b>
                <br>∀x (setiap Muslim yang hidup di bulan Ramadan → wajib zakat fitrah)
                <br><i>Zakat fitrah berlaku universal untuk semua Muslim, termasuk bayi yang baru lahir sebelum Idul Fitri.</i>
            </li>
            <br>
            <li>
                <b>Hukum Operasi Aritmatika dalam Logika:</b>
                <br>Total Zakat = Jumlah Jiwa × Takaran per Jiwa
                <br><i>${jumlahJiwa} × ${TAKARAN_PER_JIWA_KG} kg = ${totalKg} kg</i>
                <br>Total Rupiah = Total Kg × Harga per Kg
                <br><i>${totalKg} kg × Rp ${hargaPerKg.toLocaleString('id-ID')} = Rp ${totalRupiah.toLocaleString('id-ID')}</i>
            </li>
        </ul>

        <hr>
        <h4>📚 Dalil Syariat:</h4>
        <blockquote style="background-color: #f9f9f9; padding: 15px; border-left: 4px solid #006b4f; font-style: italic;">
            "Rasulullah SAW mewajibkan zakat fitrah satu sha' kurma atau satu sha' gandum atas setiap Muslim, merdeka atau budak, laki-laki atau perempuan, kecil atau besar." 
            <br><b>(HR. Bukhari & Muslim)</b>
        </blockquote>

        <p><b>Catatan Penting:</b></p>
        <ul>
            <li>1 sha' = ±2.5 kg atau ±3.5 liter (takaran zaman Nabi)</li>
            <li>Zakat fitrah wajib untuk SETIAP jiwa Muslim, termasuk bayi yang baru lahir sebelum Idul Fitri</li>
            <li>Boleh dibayar dengan makanan pokok atau uang setara harga makanan pokok</li>
            <li>Waktu pembayaran: sejak awal Ramadan hingga sebelum salat Id</li>
            <li>Jika dibayar setelah salat Id, hukumnya menjadi sedekah biasa</li>
        </ul>
    `);

    // Tampilkan hasil
    if (waktuBayar === 'setelah') {
        hasilEl.innerText = '⚠️ Pembayaran Terlambat (Sedekah)';
    } else {
        hasilEl.innerText = '✅ Wajib Zakat Fitrah';
    }
    
    rincianZakatEl.innerHTML = rincian.join('');
    statusPembayaranEl.innerHTML = statusBayar;
    hukumLogikaEl.innerHTML = hukumLogika.join('');
}

// Event listener
hitungBtn.addEventListener('click', hitungZakatFitrah);

// Hitung otomatis saat halaman dimuat
window.addEventListener('DOMContentLoaded', () => {
    hitungZakatFitrah();
});

// Update otomatis saat input berubah
document.getElementById('jumlahJiwa').addEventListener('input', hitungZakatFitrah);
document.getElementById('hargaPerKg').addEventListener('input', hitungZakatFitrah);

document.querySelectorAll('input[name="jenisMakanan"]').forEach(radio => {
    radio.addEventListener('change', hitungZakatFitrah);
});

document.querySelectorAll('input[name="waktuBayar"]').forEach(radio => {
    radio.addEventListener('change', hitungZakatFitrah);
});

document.getElementById('sudahBayar').addEventListener('change', hitungZakatFitrah);
document.getElementById('adaDewasa').addEventListener('change', hitungZakatFitrah);
document.getElementById('adaAnak').addEventListener('change', hitungZakatFitrah);
document.getElementById('adaBayi').addEventListener('change', hitungZakatFitrah);