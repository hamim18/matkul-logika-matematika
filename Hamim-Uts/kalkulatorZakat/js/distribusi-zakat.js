// distribusi-zakat.js - Logika Distribusi Zakat dengan Himpunan dan Proporsi

// Definisi Himpunan Universal Mustahik (8 golongan)
const HIMPUNAN_MUSTAHIK = [
    {
        id: 'fakir',
        nama: 'Fakir',
        emoji: '1️⃣',
        deskripsi: 'Orang yang tidak memiliki harta dan tenaga untuk memenuhi kebutuhan pokok',
        prioritas: 1
    },
    {
        id: 'miskin',
        nama: 'Miskin',
        emoji: '2️⃣',
        deskripsi: 'Orang yang memiliki harta/penghasilan tetapi tidak cukup',
        prioritas: 1
    },
    {
        id: 'amil',
        nama: 'Amil',
        emoji: '3️⃣',
        deskripsi: 'Pengurus zakat',
        prioritas: 2
    },
    {
        id: 'muallaf',
        nama: 'Muallaf',
        emoji: '4️⃣',
        deskripsi: 'Orang yang baru masuk Islam',
        prioritas: 2
    },
    {
        id: 'riqab',
        nama: 'Riqab',
        emoji: '5️⃣',
        deskripsi: 'Memerdekakan budak/korban trafficking',
        prioritas: 3
    },
    {
        id: 'gharim',
        nama: 'Gharim',
        emoji: '6️⃣',
        deskripsi: 'Orang berutang',
        prioritas: 2
    },
    {
        id: 'fisabilillah',
        nama: 'Fi Sabilillah',
        emoji: '7️⃣',
        deskripsi: 'Di jalan Allah (dakwah, pendidikan)',
        prioritas: 2
    },
    {
        id: 'ibnusabil',
        nama: 'Ibnu Sabil',
        emoji: '8️⃣',
        deskripsi: 'Musafir yang kehabisan bekal',
        prioritas: 3
    }
];

// Ambil total zakat dari localStorage atau URL parameter
let totalZakatMaal = 0;

// Coba ambil dari URL parameter
const urlParams = new URLSearchParams(window.location.search);
const zakatParam = urlParams.get('total');

if (zakatParam) {
    totalZakatMaal = parseFloat(zakatParam);
    // Simpan ke variabel global untuk digunakan
    sessionStorage.setItem('totalZakatMaal', totalZakatMaal);
} else {
    // Coba ambil dari sessionStorage
    const savedZakat = sessionStorage.getItem('totalZakatMaal');
    if (savedZakat) {
        totalZakatMaal = parseFloat(savedZakat);
    }
}

// Tampilkan total zakat
document.getElementById('totalZakatDisplay').innerText = `Rp ${totalZakatMaal.toLocaleString('id-ID')}`;

// Event listeners untuk checkbox
const checkboxes = document.querySelectorAll('.mustahik-checkbox');
checkboxes.forEach(cb => {
    cb.addEventListener('change', function() {
        const item = document.getElementById(`item-${this.value}`);
        if (this.checked) {
            item.classList.add('selected');
        } else {
            item.classList.remove('selected');
        }
    });
});

// Fungsi untuk menghitung distribusi
function hitungDistribusi() {
    const hasilDiv = document.getElementById('hasilDistribusi');
    const logikaDiv = document.getElementById('logikaHimpunan');
    
    // Reset hasil
    hasilDiv.innerHTML = '';
    logikaDiv.innerHTML = '';
    
    if (totalZakatMaal <= 0) {
        hasilDiv.innerHTML = `
            <div class="info-box" style="background-color: #ffebee; border-left-color: #f44336;">
                <h3>❌ Tidak Ada Zakat yang Akan Didistribusikan</h3>
                <p>Silakan hitung zakat maal terlebih dahulu di halaman sebelumnya.</p>
                <button class="btn-secondary" onclick="window.location.href='zakat-maal.html'">Kembali ke Zakat Maal</button>
            </div>
        `;
        return;
    }
    
    // Ambil mustahik yang dipilih (subset dari himpunan universal)
    const mustahikTerpilih = [];
    checkboxes.forEach(cb => {
        if (cb.checked) {
            const mustahik = HIMPUNAN_MUSTAHIK.find(m => m.id === cb.value);
            if (mustahik) {
                mustahikTerpilih.push(mustahik);
            }
        }
    });
    
    // Validasi: minimal 1 mustahik harus dipilih
    if (mustahikTerpilih.length === 0) {
        hasilDiv.innerHTML = `
            <div class="info-box" style="background-color: #ffebee; border-left-color: #f44336;">
                <h3>⚠️ Pilih Minimal 1 Mustahik</h3>
                <p>Anda harus memilih minimal satu golongan penerima zakat.</p>
            </div>
        `;
        return;
    }
    
    // Hitung jumlah mustahik terpilih
    const jumlahMustahik = mustahikTerpilih.length;
    
    // Hitung persentase per mustahik (pembagian merata)
    const persenPerMustahik = 100 / jumlahMustahik;
    
    // Hitung nominal per mustahik
    const nominalPerMustahik = totalZakatMaal / jumlahMustahik;
    
    // Buat array distribusi
    const distribusi = mustahikTerpilih.map(m => ({
        ...m,
        persentase: persenPerMustahik,
        nominal: nominalPerMustahik
    }));
    
    // Tampilkan hasil distribusi
    let hasilHTML = `
        <div class="hasil-distribusi">
            <h2>✅ Hasil Distribusi Zakat</h2>
            <p><b>Total Zakat:</b> Rp ${totalZakatMaal.toLocaleString('id-ID')}</p>
            <p><b>Jumlah Mustahik Terpilih:</b> ${jumlahMustahik} dari 8 golongan</p>
            <p><b>Persentase per Mustahik:</b> ${persenPerMustahik.toFixed(2)}%</p>
            <hr>
            <h3>📊 Rincian Distribusi:</h3>
    `;
    
    distribusi.forEach((d, index) => {
        hasilHTML += `
            <div class="distribusi-item">
                <div>
                    <span class="distribusi-nama">${d.emoji} ${d.nama}</span>
                    <br>
                    <small style="color: #666;">${d.deskripsi}</small>
                </div>
                <div style="text-align: right;">
                    <div style="font-size: 14px; color: #666;">${d.persentase.toFixed(2)}%</div>
                    <div class="distribusi-jumlah">Rp ${d.nominal.toLocaleString('id-ID')}</div>
                </div>
            </div>
        `;
    });
    
    hasilHTML += `
        <hr>
        <div style="background-color: #4caf50; color: white; padding: 15px; border-radius: 5px; text-align: center; margin-top: 15px;">
            <h3 style="color: white; margin: 5px 0;">Total Didistribusikan: Rp ${totalZakatMaal.toLocaleString('id-ID')}</h3>
            <p style="margin: 5px 0;">✓ Total persentase: 100% (Valid)</p>
        </div>
        </div>
    `;
    
    hasilDiv.innerHTML = hasilHTML;
    
    // Tampilkan Logika Himpunan dan Kombinasi
    tampilkanLogikaHimpunan(mustahikTerpilih, distribusi);
}

// Fungsi untuk menampilkan logika himpunan
function tampilkanLogikaHimpunan(mustahikTerpilih, distribusi) {
    const logikaDiv = document.getElementById('logikaHimpunan');
    
    const jumlahMustahik = mustahikTerpilih.length;
    const totalKombinasi = Math.pow(2, 8); // 2^8 = 256 kombinasi
    const kombinasiTerpilih = 1; // 1 kombinasi yang dipilih user
    
    // Hitung subset dan komplemen
    const himpunanUniversal = HIMPUNAN_MUSTAHIK.map(m => m.nama);
    const subsetTerpilih = mustahikTerpilih.map(m => m.nama);
    const komplemen = HIMPUNAN_MUSTAHIK
        .filter(m => !mustahikTerpilih.find(mt => mt.id === m.id))
        .map(m => m.nama);
    
    let logikaHTML = `
        <div class="logika-box">
            <h2>🧮 Logika Matematika: Himpunan, Kombinasi & Proporsi</h2>
            
            <h3>1️⃣ Teori Himpunan (Set Theory)</h3>
            <table class="logika-table">
                <tr>
                    <th>Konsep</th>
                    <th>Notasi</th>
                    <th>Nilai</th>
                </tr>
                <tr>
                    <td><b>Himpunan Universal (U)</b></td>
                    <td>U = {${himpunanUniversal.join(', ')}}</td>
                    <td>n(U) = 8 golongan</td>
                </tr>
                <tr>
                    <td><b>Subset Terpilih (A)</b></td>
                    <td>A = {${subsetTerpilih.join(', ')}}</td>
                    <td>n(A) = ${jumlahMustahik} golongan</td>
                </tr>
                <tr>
                    <td><b>Komplemen (A')</b></td>
                    <td>A' = {${komplemen.length > 0 ? komplemen.join(', ') : '∅ (himpunan kosong)'}}</td>
                    <td>n(A') = ${komplemen.length} golongan</td>
                </tr>
                <tr>
                    <td><b>Validasi</b></td>
                    <td>n(A) + n(A') = n(U)</td>
                    <td>${jumlahMustahik} + ${komplemen.length} = 8 ✓</td>
                </tr>
            </table>
            
            <p><b>Kesimpulan Himpunan:</b></p>
            <ul>
                <li>A ⊆ U (A adalah subset dari U) → <b>BENAR</b></li>
                <li>A ∪ A' = U (Gabungan A dan komplemennya = Universal) → <b>BENAR</b></li>
                <li>A ∩ A' = ∅ (Irisan A dan komplemennya = kosong) → <b>BENAR</b></li>
            </ul>
            <hr>
            
            <h3>2️⃣ Kombinatorika (Combinatorics)</h3>
            <p><b>Total Kemungkinan Kombinasi Mustahik:</b></p>
            <p>Dengan 8 golongan mustahik, total kombinasi yang mungkin adalah:</p>
            <p style="text-align: center; font-size: 18px; background-color: #fff; padding: 10px; border-radius: 5px;">
                <b>2<sup>8</sup> = ${totalKombinasi} kombinasi</b>
            </p>
            <p><i>(Setiap golongan bisa dipilih atau tidak dipilih = 2 pilihan per golongan)</i></p>
            
            <p><b>Kombinasi yang Anda Pilih:</b></p>
            <p>Memilih ${jumlahMustahik} dari 8 golongan dapat dihitung dengan rumus kombinasi:</p>
            <p style="text-align: center; font-size: 18px; background-color: #fff; padding: 10px; border-radius: 5px;">
                <b>C(8, ${jumlahMustahik}) = 8! / (${jumlahMustahik}! × ${8-jumlahMustahik}!)</b>
            </p>
            <p><b>Hasil:</b> Ada <b>${hitungKombinasi(8, jumlahMustahik)}</b> cara berbeda untuk memilih ${jumlahMustahik} golongan dari 8 golongan.</p>
            <hr>
            
            <h3>3️⃣ Proporsi dan Pembagian Logis</h3>
            <p><b>Metode Pembagian:</b> Pembagian Merata (Equal Distribution)</p>
            <p><b>Rumus Proporsi:</b></p>
            <div style="background-color: #fff; padding: 15px; border-radius: 5px; margin: 10px 0;">
                <p><b>Persentase per Mustahik:</b></p>
                <p style="text-align: center; font-size: 16px;">
                    P = 100% / n = 100% / ${jumlahMustahik} = <b>${(100/jumlahMustahik).toFixed(2)}%</b>
                </p>
                
                <p><b>Nominal per Mustahik:</b></p>
                <p style="text-align: center; font-size: 16px;">
                    N = Total Zakat / n = Rp ${totalZakatMaal.toLocaleString('id-ID')} / ${jumlahMustahik} = <b>Rp ${(totalZakatMaal/jumlahMustahik).toLocaleString('id-ID')}</b>
                </p>
            </div>
            
            <p><b>Validasi Total (Hukum Identitas):</b></p>
            <p>Σ Distribusi = Total Zakat</p>
            <p>${jumlahMustahik} × Rp ${(totalZakatMaal/jumlahMustahik).toLocaleString('id-ID')} = <b>Rp ${totalZakatMaal.toLocaleString('id-ID')} ✓</b></p>
            <hr>
            
            <h3>4️⃣ Logika Proposisional</h3>
            <table class="logika-table">
                <tr>
                    <th>Hukum Logika</th>
                    <th>Penerapan</th>
                    <th>Hasil</th>
                </tr>
                <tr>
                    <td><b>Konjungsi (AND)</b></td>
                    <td>Zakat valid jika: Total > 0 ∧ Mustahik ≥ 1</td>
                    <td>✓ BENAR</td>
                </tr>
                <tr>
                    <td><b>Disjungsi (OR)</b></td>
                    <td>Mustahik terpilih: ${subsetTerpilih.join(' ∨ ')}</td>
                    <td>✓ Salah satu/lebih dipilih</td>
                </tr>
                <tr>
                    <td><b>Implikasi (IF-THEN)</b></td>
                    <td>Jika dipilih ${jumlahMustahik} mustahik → masing-masing dapat ${(100/jumlahMustahik).toFixed(2)}%</td>
                    <td>✓ VALID</td>
                </tr>
                <tr>
                    <td><b>Hukum Identitas</b></td>
                    <td>Σ Persentase = 100%</td>
                    <td>✓ ${jumlahMustahik} × ${(100/jumlahMustahik).toFixed(2)}% = 100%</td>
                </tr>
                <tr>
                    <td><b>Hukum De Morgan</b></td>
                    <td>Tidak dipilih: ¬(${subsetTerpilih.join(' ∨ ')}) = ${komplemen.join(' ∧ ')}</td>
                    <td>✓ Komplemen benar</td>
                </tr>
            </table>
            <hr>
            
            <h3>5️⃣ Dalil Syariat Islam</h3>
            <div style="background-color: #e8f5e9; padding: 15px; border-radius: 5px; border-left: 5px solid #4caf50;">
                <p><b>QS. At-Taubah (9): 60</b></p>
                <blockquote style="font-style: italic; margin: 10px 0;">
                    "إِنَّمَا ٱلصَّدَقَٰتُ لِلۡفُقَرَآءِ وَٱلۡمَسَٰكِينِ وَٱلۡعَٰمِلِينَ عَلَيۡهَا وَٱلۡمُؤَلَّفَةِ قُلُوبُهُمۡ وَفِي ٱلرِّقَابِ وَٱلۡغَٰرِمِينَ وَفِي سَبِيلِ ٱللَّهِ وَٱبۡنِ ٱلسَّبِيلِۖ فَرِيضَةٗ مِّنَ ٱللَّهِۗ وَٱللَّهُ عَلِيمٌ حَكِيمٞ"
                </blockquote>
                <p><b>Artinya:</b> "Sesungguhnya zakat itu hanyalah untuk orang-orang fakir, orang miskin, amil zakat, yang dilunakkan hatinya (muallaf), untuk (memerdekakan) hamba sahaya, untuk (membebaskan) orang yang berutang, untuk jalan Allah, dan untuk orang yang sedang dalam perjalanan, sebagai kewajiban dari Allah. Allah Maha Mengetahui, Mahabijaksana."</p>
            </div>
            
            <p><b>Catatan Pembagian:</b></p>
            <ul>
                <li>Pembagian zakat kepada 8 golongan tidak harus merata di semua golongan</li>
                <li>Boleh mendistribusikan ke beberapa golongan saja sesuai kebutuhan</li>
                <li>Prioritas bisa disesuaikan dengan kondisi lokal dan kebutuhan mendesak</li>
                <li>Sistem ini menggunakan pembagian merata untuk kemudahan, tetapi dalam praktik bisa disesuaikan</li>
            </ul>
        </div>
    `;
    
    logikaDiv.innerHTML = logikaHTML;
}

// Fungsi untuk menghitung kombinasi C(n, r) = n! / (r! * (n-r)!)
function hitungKombinasi(n, r) {
    if (r > n) return 0;
    if (r === 0 || r === n) return 1;
    
    // Optimasi: C(n, r) = C(n, n-r)
    if (r > n - r) r = n - r;
    
    let result = 1;
    for (let i = 0; i < r; i++) {
        result *= (n - i);
        result /= (i + 1);
    }
    
    return Math.round(result);
}

// Event listener untuk tombol hitung
document.getElementById('hitungDistribusiBtn').addEventListener('click', hitungDistribusi);

// Hitung otomatis jika semua checkbox tercentang saat load
window.addEventListener('DOMContentLoaded', () => {
    // Auto-check jika total zakat > 0
    if (totalZakatMaal > 0) {
        // Bisa ditambahkan auto-suggestion di sini
    }
});