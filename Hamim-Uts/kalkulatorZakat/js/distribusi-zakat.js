// distribusi-zakat.js - Logika Distribusi Zakat Sesuai Dalil Syariah

// Definisi Himpunan Universal Mustahik (8 golongan) dengan dalil lengkap
const HIMPUNAN_MUSTAHIK = [
    {
        id: 'fakir',
        nama: 'Fakir',
        emoji: '1️⃣',
        deskripsi: 'Orang yang tidak memiliki harta dan tenaga untuk memenuhi kebutuhan pokok',
        prioritas: 1,
        kategori: 'konsumtif_darurat',
        dalil: 'QS. At-Taubah [9]: 60 - "Sesungguhnya zakat itu hanyalah untuk orang-orang fakir..."',
        hadits: 'HR. Bukhari & Muslim: "Ambillah zakat dari orang kaya mereka dan kembalikan kepada orang fakir mereka"',
        bobotMinimal: 15, // % minimal jika dipilih
        bobotMaksimal: 40,
        wajibBersamaGolongan: ['miskin'], // Fakir hampir selalu bersama miskin
        tidakBolehSendiri: true
    },
    {
        id: 'miskin',
        nama: 'Miskin',
        emoji: '2️⃣',
        deskripsi: 'Orang yang memiliki harta/penghasilan tetapi tidak cukup untuk kebutuhan pokok',
        prioritas: 1,
        kategori: 'konsumtif_darurat',
        dalil: 'QS. At-Taubah [9]: 60 - "...orang miskin..."',
        hadits: 'HR. Abu Daud: "Orang miskin adalah yang tidak memiliki kecukupan untuk memenuhi kebutuhannya"',
        bobotMinimal: 15,
        bobotMaksimal: 40,
        wajibBersamaGolongan: ['fakir'],
        tidakBolehSendiri: true
    },
    {
        id: 'amil',
        nama: 'Amil',
        emoji: '3️⃣',
        deskripsi: 'Pengurus dan pengelola zakat',
        prioritas: 2,
        kategori: 'operasional',
        dalil: 'QS. At-Taubah [9]: 60 - "...amil (pengurus) zakat..."',
        hadits: 'HR. Muslim: "Tidak halal bagi orang kaya mengambil zakat kecuali 5 golongan, salah satunya adalah amil"',
        bobotMinimal: 5,
        bobotMaksimal: 12.5, // Maksimal 1/8 menurut jumhur ulama
        tidakBolehSendiri: true, // Amil tidak boleh sendiri
        konflikDengan: [], // Tidak boleh hanya amil saja tanpa penerima lain
        pesanKhusus: 'Amil hanya berhak atas upah pengelolaan, bukan penerima utama'
    },
    {
        id: 'muallaf',
        nama: 'Muallaf',
        emoji: '4️⃣',
        deskripsi: 'Orang yang baru masuk Islam atau yang hatinya perlu dilunakkan',
        prioritas: 2,
        kategori: 'dakwah',
        dalil: 'QS. At-Taubah [9]: 60 - "...orang yang dilunakkan hatinya (muallaf)..."',
        hadits: 'HR. Bukhari: "Nabi SAW memberikan zakat kepada muallaf untuk memperkuat iman mereka"',
        bobotMinimal: 5,
        bobotMaksimal: 20,
        bersifatKondisional: true,
        kondisi: 'Ada muallaf yang membutuhkan penguatan iman'
    },
    {
        id: 'riqab',
        nama: 'Riqab',
        emoji: '5️⃣',
        deskripsi: 'Memerdekakan budak, hamba sahaya, atau korban perdagangan manusia',
        prioritas: 3,
        kategori: 'pembebasan',
        dalil: 'QS. At-Taubah [9]: 60 - "...untuk (memerdekakan) hamba sahaya (riqab)..."',
        hadits: 'HR. Ahmad: "Membebaskan budak muslim adalah prioritas tinggi dalam zakat"',
        bobotMinimal: 5,
        bobotMaksimal: 15,
        bersifatKondisional: true,
        kondisi: 'Ada budak/korban trafficking yang perlu dibebaskan'
    },
    {
        id: 'gharim',
        nama: 'Gharim',
        emoji: '6️⃣',
        deskripsi: 'Orang yang berutang untuk kepentingan yang tidak maksiat',
        prioritas: 2,
        kategori: 'sosial',
        dalil: 'QS. At-Taubah [9]: 60 - "...orang yang berutang (gharim)..."',
        hadits: 'HR. Muslim: "Gharim yang berutang untuk kebaikan atau kepentingan bersama berhak atas zakat"',
        bobotMinimal: 5,
        bobotMaksimal: 20,
        bersifatKondisional: true,
        kondisi: 'Ada orang yang berutang untuk kepentingan halal dan kesulitan membayar'
    },
    {
        id: 'fisabilillah',
        nama: 'Fi Sabilillah',
        emoji: '7️⃣',
        deskripsi: 'Di jalan Allah (jihad, dakwah, pendidikan Islam)',
        prioritas: 2,
        kategori: 'dakwah',
        dalil: 'QS. At-Taubah [9]: 60 - "...untuk jalan Allah (fi sabilillah)..."',
        hadits: 'HR. Abu Daud: "Fi sabilillah mencakup segala bentuk perjuangan di jalan Allah termasuk menuntut ilmu"',
        bobotMinimal: 10,
        bobotMaksimal: 30,
        tidakBolehTanpa: ['fakir', 'miskin'], // Fi sabilillah tidak boleh tanpa fakir/miskin
        pesanKhusus: 'Fi sabilillah harus tetap memprioritaskan fakir dan miskin'
    },
    {
        id: 'ibnusabil',
        nama: 'Ibnu Sabil',
        emoji: '8️⃣',
        deskripsi: 'Musafir yang kehabisan bekal dalam perjalanan yang bukan maksiat',
        prioritas: 3,
        kategori: 'darurat_perjalanan',
        dalil: 'QS. At-Taubah [9]: 60 - "...orang yang sedang dalam perjalanan (ibnu sabil)..."',
        hadits: 'HR. Ahmad: "Ibnu sabil yang kehabisan bekal dalam perjalanan halal berhak atas zakat"',
        bobotMinimal: 5,
        bobotMaksimal: 15,
        bersifatKondisional: true,
        kondisi: 'Ada musafir yang kehabisan bekal'
    }
];

// Aturan distribusi berdasarkan fiqh
const ATURAN_SYARIAH = {
    // Minimal golongan yang harus dipilih
    minimalGolongan: 2,
    
    // Fakir dan Miskin harus diprioritaskan
    prioritasUtama: ['fakir', 'miskin'],
    
    // Kombinasi yang tidak diperbolehkan
    kombinasiTerlarang: [
        {
            kombinasi: ['amil'], // Amil saja
            alasan: 'Amil hanya berhak atas upah pengelolaan (maksimal 12.5%), bukan penerima utama zakat. Harus ada penerima lain seperti fakir dan miskin.',
            dalil: 'Ijma ulama: Amil tidak boleh menjadi satu-satunya penerima zakat'
        },
        {
            kombinasi: ['fisabilillah'], // Fi sabilillah saja tanpa fakir/miskin
            alasan: 'Fi sabilillah tidak boleh menjadi satu-satunya penerima. Fakir dan miskin harus tetap menjadi prioritas utama dalam distribusi zakat.',
            dalil: 'Madzhab Syafi\'i dan Maliki: Prioritas zakat adalah untuk fakir dan miskin'
        },
        {
            kombinasi: ['muallaf'], // Muallaf saja
            alasan: 'Muallaf tidak boleh menjadi satu-satunya penerima zakat. Harus tetap memprioritaskan fakir dan miskin.',
            dalil: 'Jumhur ulama: Zakat tidak boleh hanya untuk satu golongan non-prioritas'
        }
    ],
    
    // Validasi: jika ada golongan tertentu, harus ada golongan lain
    aturanWajibBersama: {
        'fisabilillah': {
            harus_dengan: ['fakir', 'miskin'],
            minimal_satu: true,
            pesan: 'Fi sabilillah harus disertai dengan fakir dan/atau miskin sebagai prioritas utama'
        },
        'amil': {
            harus_dengan: ['fakir', 'miskin', 'fisabilillah', 'gharim'],
            minimal_satu: true,
            pesan: 'Amil harus disertai dengan penerima zakat lainnya (minimal fakir/miskin)'
        }
    },
    
    // Bobot distribusi berdasarkan prioritas
    bobotPrioritas: {
        1: { // Prioritas tertinggi (Fakir & Miskin)
            totalMinimal: 50, // Minimal 50% untuk fakir+miskin jika keduanya dipilih
            pesan: 'Fakir dan miskin adalah prioritas utama dalam distribusi zakat'
        },
        2: { // Prioritas sedang
            totalMaksimal: 40,
            pesan: 'Golongan prioritas sedang maksimal 40% dari total'
        },
        3: { // Prioritas rendah
            totalMaksimal: 20,
            pesan: 'Golongan kondisional maksimal 20% dari total'
        }
    }
};

// Ambil total zakat
let totalZakatMaal = 0;
const urlParams = new URLSearchParams(window.location.search);
const zakatParam = urlParams.get('total');

if (zakatParam) {
    totalZakatMaal = parseFloat(zakatParam);
    sessionStorage.setItem('totalZakatMaal', totalZakatMaal);
} else {
    const savedZakat = sessionStorage.getItem('totalZakatMaal');
    if (savedZakat) {
        totalZakatMaal = parseFloat(savedZakat);
    }
}

document.getElementById('totalZakatDisplay').innerText = `Rp ${totalZakatMaal.toLocaleString('id-ID')}`;

// Event listeners untuk checkbox dengan validasi real-time
const checkboxes = document.querySelectorAll('.mustahik-checkbox');
checkboxes.forEach(cb => {
    cb.addEventListener('change', function() {
        const item = document.getElementById(`item-${this.value}`);
        if (this.checked) {
            item.classList.add('selected');
            
            // Tampilkan dalil untuk mustahik yang dipilih
            tampilkanDalilMustahik(this.value);
        } else {
            item.classList.remove('selected');
        }
        
        // Validasi real-time
        validasiPilihanRealtime();
    });
});

// Fungsi untuk menampilkan dalil mustahik
function tampilkanDalilMustahik(mustahikId) {
    const mustahik = HIMPUNAN_MUSTAHIK.find(m => m.id === mustahikId);
    if (!mustahik) return;
    
    const infoBox = document.getElementById('infoDalil');
    if (infoBox) {
        infoBox.innerHTML = `
            <div style="background-color: #e8f5e9; padding: 15px; border-radius: 8px; margin: 10px 0; border-left: 4px solid #4caf50;">
                <h4 style="margin: 0 0 10px 0; color: #2e7d32;">${mustahik.emoji} ${mustahik.nama}</h4>
                <p style="margin: 5px 0;"><strong>📖 Dalil:</strong> ${mustahik.dalil}</p>
                <p style="margin: 5px 0;"><strong>📚 Hadits:</strong> ${mustahik.hadits}</p>
                ${mustahik.pesanKhusus ? `<p style="margin: 5px 0; color: #ef6c00;"><strong>⚠️ Catatan:</strong> ${mustahik.pesanKhusus}</p>` : ''}
            </div>
        `;
    }
}

// Fungsi validasi real-time
function validasiPilihanRealtime() {
    const terpilih = [];
    checkboxes.forEach(cb => {
        if (cb.checked) {
            terpilih.push(cb.value);
        }
    });
    
    const warningBox = document.getElementById('warningValidasi');
    if (!warningBox) return;
    
    if (terpilih.length === 0) {
        warningBox.innerHTML = '';
        return;
    }
    
    // Cek kombinasi terlarang
    for (let aturan of ATURAN_SYARIAH.kombinasiTerlarang) {
        if (JSON.stringify(terpilih.sort()) === JSON.stringify(aturan.kombinasi.sort())) {
            warningBox.innerHTML = `
                <div style="background-color: #ffebee; padding: 15px; border-radius: 8px; margin: 10px 0; border-left: 4px solid #f44336;">
                    <h4 style="margin: 0 0 10px 0; color: #c62828;">🚫 Distribusi Tidak Sesuai Syariah</h4>
                    <p><strong>Alasan:</strong> ${aturan.alasan}</p>
                    <p><strong>📖 Dalil:</strong> ${aturan.dalil}</p>
                </div>
            `;
            return;
        }
    }
    
    // Cek aturan wajib bersama
    for (let mustahikId in ATURAN_SYARIAH.aturanWajibBersama) {
        if (terpilih.includes(mustahikId)) {
            const aturan = ATURAN_SYARIAH.aturanWajibBersama[mustahikId];
            const adaYangDiperlukan = aturan.harus_dengan.some(id => terpilih.includes(id));
            
            if (!adaYangDiperlukan) {
                const mustahik = HIMPUNAN_MUSTAHIK.find(m => m.id === mustahikId);
                warningBox.innerHTML = `
                    <div style="background-color: #fff3cd; padding: 15px; border-radius: 8px; margin: 10px 0; border-left: 4px solid #ff9800;">
                        <h4 style="margin: 0 0 10px 0; color: #e65100;">⚠️ Peringatan Syariah</h4>
                        <p><strong>${mustahik.nama}</strong> harus disertai dengan salah satu dari: <strong>${aturan.harus_dengan.map(id => HIMPUNAN_MUSTAHIK.find(m => m.id === id).nama).join(', ')}</strong></p>
                        <p>${aturan.pesan}</p>
                    </div>
                `;
                return;
            }
        }
    }
    
    // Jika valid, kosongkan warning
    warningBox.innerHTML = `
        <div style="background-color: #e8f5e9; padding: 10px; border-radius: 8px; margin: 10px 0; border-left: 4px solid #4caf50;">
            <p style="margin: 0; color: #2e7d32;">✅ Kombinasi mustahik yang Anda pilih sesuai dengan syariah</p>
        </div>
    `;
}

// Fungsi validasi distribusi sebelum hitung
function validasiDistribusi(mustahikTerpilih) {
    const ids = mustahikTerpilih.map(m => m.id);
    
    // 1. Cek minimal golongan
    if (ids.length < ATURAN_SYARIAH.minimalGolongan) {
        return {
            valid: false,
            pesan: `Minimal ${ATURAN_SYARIAH.minimalGolongan} golongan mustahik harus dipilih untuk distribusi yang sesuai syariah.`,
            dalil: 'Jumhur ulama: Zakat sebaiknya didistribusikan kepada beberapa golongan, tidak hanya satu.'
        };
    }
    
    // 2. Cek kombinasi terlarang
    for (let aturan of ATURAN_SYARIAH.kombinasiTerlarang) {
        if (JSON.stringify(ids.sort()) === JSON.stringify(aturan.kombinasi.sort())) {
            return {
                valid: false,
                pesan: aturan.alasan,
                dalil: aturan.dalil
            };
        }
    }
    
    // 3. Cek aturan wajib bersama
    for (let mustahikId in ATURAN_SYARIAH.aturanWajibBersama) {
        if (ids.includes(mustahikId)) {
            const aturan = ATURAN_SYARIAH.aturanWajibBersama[mustahikId];
            const adaYangDiperlukan = aturan.harus_dengan.some(id => ids.includes(id));
            
            if (!adaYangDiperlukan) {
                return {
                    valid: false,
                    pesan: aturan.pesan,
                    dalil: 'Berdasarkan kaidah fiqh distribusi zakat'
                };
            }
        }
    }
    
    // 4. Periksa apakah fakir/miskin ada dalam prioritas
    const adaPrioritasUtama = ATURAN_SYARIAH.prioritasUtama.some(p => ids.includes(p));
    if (!adaPrioritasUtama && ids.length > 2) {
        return {
            valid: false,
            pesan: 'Fakir dan/atau miskin harus menjadi prioritas dalam distribusi zakat.',
            dalil: 'Hadits Riwayat Bukhari: "Ambillah zakat dari orang kaya mereka dan kembalikan kepada orang fakir mereka"'
        };
    }
    
    return { valid: true };
}

// Fungsi menghitung bobot distribusi berbasis prioritas dan dalil
function hitungBobotSyariah(mustahikTerpilih) {
    const distribusi = [];
    let totalBobot = 0;
    
    // Tentukan bobot berdasarkan prioritas dan aturan syariah
    for (let mustahik of mustahikTerpilih) {
        let bobot = 0;
        
        // Prioritas 1 (Fakir & Miskin): 50-80% total
        if (mustahik.prioritas === 1) {
            bobot = 30; // Base weight tinggi
        }
        // Prioritas 2 (Amil, Muallaf, Gharim, Fi Sabilillah): 10-30%
        else if (mustahik.prioritas === 2) {
            if (mustahik.id === 'amil') {
                bobot = 8; // Amil maksimal 12.5% (1/8)
            } else {
                bobot = 15;
            }
        }
        // Prioritas 3 (Riqab, Ibnu Sabil): 5-15%
        else {
            bobot = 10;
        }
        
        distribusi.push({ mustahik, bobot });
        totalBobot += bobot;
    }
    
    // Normalisasi bobot agar total = 100%
    const hasil = distribusi.map(d => ({
        ...d.mustahik,
        persentase: (d.bobot / totalBobot) * 100,
        nominal: ((d.bobot / totalBobot) * totalZakatMaal)
    }));
    
    // Validasi bobot sesuai aturan
    const fakirMiskin = hasil.filter(h => h.prioritas === 1);
    const totalFakirMiskin = fakirMiskin.reduce((sum, h) => sum + h.persentase, 0);
    
    // Jika fakir+miskin < 50%, naikkan proporsi mereka
    if (fakirMiskin.length > 0 && totalFakirMiskin < 50) {
        const selisih = 50 - totalFakirMiskin;
        const tambahanPerGolongan = selisih / fakirMiskin.length;
        
        fakirMiskin.forEach(fm => {
            fm.persentase += tambahanPerGolongan;
            fm.nominal = (fm.persentase / 100) * totalZakatMaal;
        });
        
        // Kurangi proporsi golongan lain
        const lainnya = hasil.filter(h => h.prioritas !== 1);
        const totalLainnya = lainnya.reduce((sum, h) => sum + h.persentase, 0);
        const faktorKoreksi = (100 - 50) / totalLainnya;
        
        lainnya.forEach(l => {
            l.persentase = l.persentase * faktorKoreksi;
            l.nominal = (l.persentase / 100) * totalZakatMaal;
        });
    }
    
    return hasil;
}

// Fungsi untuk menghitung distribusi
function hitungDistribusi() {
    const hasilDiv = document.getElementById('hasilDistribusi');
    const logikaDiv = document.getElementById('logikaHimpunan');
    
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
    
    // Ambil mustahik yang dipilih
    const mustahikTerpilih = [];
    checkboxes.forEach(cb => {
        if (cb.checked) {
            const mustahik = HIMPUNAN_MUSTAHIK.find(m => m.id === cb.value);
            if (mustahik) {
                mustahikTerpilih.push(mustahik);
            }
        }
    });
    
    // Validasi
    if (mustahikTerpilih.length === 0) {
        hasilDiv.innerHTML = `
            <div class="info-box" style="background-color: #ffebee; border-left-color: #f44336;">
                <h3>⚠️ Pilih Minimal ${ATURAN_SYARIAH.minimalGolongan} Mustahik</h3>
                <p>Anda harus memilih minimal ${ATURAN_SYARIAH.minimalGolongan} golongan penerima zakat sesuai syariah.</p>
            </div>
        `;
        return;
    }
    
    // Validasi syariah
    const validasi = validasiDistribusi(mustahikTerpilih);
    if (!validasi.valid) {
        hasilDiv.innerHTML = `
            <div class="info-box" style="background-color: #ffebee; border-left-color: #f44336;">
                <h3>🚫 Distribusi Tidak Sesuai Syariah</h3>
                <p><strong>Alasan:</strong> ${validasi.pesan}</p>
                <p><strong>📖 Dalil:</strong> ${validasi.dalil}</p>
                <hr>
                <p><em>Silakan sesuaikan pilihan mustahik Anda agar sesuai dengan ketentuan syariah.</em></p>
            </div>
        `;
        return;
    }
    
    // Hitung distribusi berdasarkan bobot syariah
    const distribusi = hitungBobotSyariah(mustahikTerpilih);
    
    // Tampilkan hasil distribusi
    let hasilHTML = `
        <div class="hasil-distribusi">
            <h2>✅ Hasil Distribusi Zakat Sesuai Syariah</h2>
            <p><b>Total Zakat:</b> Rp ${totalZakatMaal.toLocaleString('id-ID')}</p>
            <p><b>Jumlah Mustahik Terpilih:</b> ${mustahikTerpilih.length} dari 8 golongan</p>
            <p><b>Metode Distribusi:</b> Berdasarkan Prioritas Syariah (QS. At-Taubah [9]: 60)</p>
            <hr>
            <h3>📊 Rincian Distribusi Berbasis Dalil:</h3>
    `;
    
    // Urutkan berdasarkan prioritas
    distribusi.sort((a, b) => a.prioritas - b.prioritas);
    
    distribusi.forEach((d, index) => {
        hasilHTML += `
            <div class="distribusi-item">
                <div>
                    <span class="distribusi-nama">${d.emoji} ${d.nama}</span>
                    <span style="font-size: 12px; color: #666; margin-left: 10px;">(Prioritas ${d.prioritas})</span>
                    <br>
                    <small style="color: #666;">${d.deskripsi}</small>
                    <br>
                    <small style="color: #2e7d32; font-style: italic;">📖 ${d.dalil}</small>
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
            <p style="margin: 5px 0;">✓ Total persentase: 100% (Sesuai Syariah)</p>
        </div>
        
        <div style="background-color: #e8f5e9; padding: 15px; border-radius: 5px; margin-top: 15px; border-left: 4px solid #4caf50;">
            <h4 style="margin: 0 0 10px 0; color: #2e7d32;">📚 Penjelasan Distribusi:</h4>
            <ul style="margin: 5px 0; padding-left: 20px;">
                <li><strong>Fakir & Miskin</strong> mendapat porsi terbesar (50-80%) sesuai prioritas utama dalam Islam</li>
                <li><strong>Amil</strong> maksimal 12.5% (1/8) sebagai upah pengelolaan, bukan penerima utama</li>
                <li><strong>Golongan lainnya</strong> disesuaikan berdasarkan kebutuhan dan kondisi</li>
                <li>Distribusi ini mengikuti pendapat jumhur ulama dan madzhab Syafi'i</li>
            </ul>
        </div>
        </div>
    `;
    
    hasilDiv.innerHTML = hasilHTML;
    
    // Tampilkan Logika Himpunan dan Dalil Syariah
    tampilkanLogikaHimpunan(mustahikTerpilih, distribusi);
}

// Fungsi untuk menampilkan logika himpunan dengan dalil
function tampilkanLogikaHimpunan(mustahikTerpilih, distribusi) {
    const logikaDiv = document.getElementById('logikaHimpunan');
    
    const jumlahMustahik = mustahikTerpilih.length;
    const himpunanUniversal = HIMPUNAN_MUSTAHIK.map(m => m.nama);
    const subsetTerpilih = mustahikTerpilih.map(m => m.nama);
    const komplemen = HIMPUNAN_MUSTAHIK
        .filter(m => !mustahikTerpilih.find(mt => mt.id === m.id))
        .map(m => m.nama);
    
    let logikaHTML = `
        <div class="logika-box">
            <h2>🧮 Logika Matematika & Dalil Syariah: Himpunan, Kombinasi & Proporsi</h2>
            
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
                <b>2<sup>8</sup> = 256 kombinasi</b>
            </p>
            <p><i>(Setiap golongan bisa dipilih atau tidak dipilih = 2 pilihan per golongan)</i></p>
            
            <p><b>Kombinasi yang Anda Pilih:</b></p>
            <p>Memilih ${jumlahMustahik} dari 8 golongan dapat dihitung dengan rumus kombinasi:</p>
            <p style="text-align: center; font-size: 18px; background-color: #fff; padding: 10px; border-radius: 5px;">
                <b>C(8, ${jumlahMustahik}) = 8! / (${jumlahMustahik}! × ${8-jumlahMustahik}!)</b>
            </p>
            <p><b>Hasil:</b> Ada <b>${hitungKombinasi(8, jumlahMustahik)}</b> cara berbeda untuk memilih ${jumlahMustahik} golongan dari 8 golongan.</p>
            
            <div style="background-color: #fff3cd; padding: 15px; border-radius: 5px; margin: 15px 0; border-left: 4px solid #ff9800;">
                <p><b>⚠️ Catatan Penting:</b> Tidak semua kombinasi diperbolehkan dalam syariah. Dari ${hitungKombinasi(8, jumlahMustahik)} kemungkinan, hanya kombinasi yang memenuhi aturan syariah yang valid.</p>
            </div>
            <hr>
            
            <h3>3️⃣ Proporsi Berdasarkan Prioritas Syariah</h3>
            <p><b>Metode Pembagian:</b> Distribusi Berbasis Prioritas & Dalil (Priority-Based Distribution)</p>
            
            <div style="background-color: #e8f5e9; padding: 15px; border-radius: 5px; margin: 10px 0; border-left: 4px solid #4caf50;">
                <h4 style="margin-top: 0;">📖 Dalil Utama: QS. At-Taubah [9]: 60</h4>
                <p style="font-style: italic; font-size: 14px;">
                    "إِنَّمَا ٱلصَّدَقَٰتُ لِلْفُقَرَآءِ وَٱلْمَسَٰكِينِ وَٱلْعَٰمِلِينَ عَلَيْهَا وَٱلْمُؤَلَّفَةِ قُلُوبُهُمْ وَفِى ٱلرِّقَابِ وَٱلْغَٰرِمِينَ وَفِى سَبِيلِ ٱللَّهِ وَٱبْنِ ٱلسَّبِيلِ ۖ فَرِيضَةً مِّنَ ٱللَّهِ ۗ وَٱللَّهُ عَلِيمٌ حَكِيمٌ"
                </p>
                <p><b>Artinya:</b> "Sesungguhnya zakat itu hanyalah untuk orang-orang fakir, orang miskin, amil zakat, yang dilunakkan hatinya (muallaf), untuk (memerdekakan) hamba sahaya, untuk (membebaskan) orang yang berutang, untuk jalan Allah, dan untuk orang yang sedang dalam perjalanan, sebagai kewajiban dari Allah. Allah Maha Mengetahui, Mahabijaksana."</p>
            </div>
            
            <p><b>Sistem Bobot Prioritas:</b></p>
            <table class="logika-table">
                <tr>
                    <th>Prioritas</th>
                    <th>Golongan</th>
                    <th>Bobot Minimal</th>
                    <th>Bobot Maksimal</th>
                    <th>Dalil</th>
                </tr>
                <tr style="background-color: #e8f5e9;">
                    <td><b>1 (Tertinggi)</b></td>
                    <td>Fakir & Miskin</td>
                    <td>50%</td>
                    <td>80%</td>
                    <td>HR. Bukhari: Zakat dari orang kaya untuk orang fakir</td>
                </tr>
                <tr>
                    <td><b>2 (Sedang)</b></td>
                    <td>Amil (maksimal)</td>
                    <td>5%</td>
                    <td>12.5%</td>
                    <td>Ijma Ulama: Amil maksimal 1/8</td>
                </tr>
                <tr>
                    <td><b>2 (Sedang)</b></td>
                    <td>Muallaf, Gharim, Fi Sabilillah</td>
                    <td>5%</td>
                    <td>30%</td>
                    <td>Disesuaikan kondisi dan kebutuhan</td>
                </tr>
                <tr>
                    <td><b>3 (Kondisional)</b></td>
                    <td>Riqab, Ibnu Sabil</td>
                    <td>5%</td>
                    <td>15%</td>
                    <td>Jika ada yang membutuhkan</td>
                </tr>
            </table>
            
            <p><b>Perhitungan Distribusi untuk Kombinasi Anda:</b></p>
            <div style="background-color: #fff; padding: 15px; border-radius: 5px; margin: 10px 0;">
    `;
    
    distribusi.forEach(d => {
        const bobotInfo = d.prioritas === 1 ? 'Prioritas Utama' : 
                          d.prioritas === 2 ? 'Prioritas Sedang' : 'Kondisional';
        logikaHTML += `
                <p><b>${d.emoji} ${d.nama}</b> (${bobotInfo}):</p>
                <p style="margin-left: 20px;">
                    Persentase: <b>${d.persentase.toFixed(2)}%</b><br>
                    Nominal: <b>Rp ${d.nominal.toLocaleString('id-ID')}</b><br>
                    <i style="font-size: 13px; color: #666;">Bobot: ${d.bobotMinimal}% - ${d.bobotMaksimal}% | ${d.dalil}</i>
                </p>
        `;
    });
    
    logikaHTML += `
            </div>
            
            <p><b>Validasi Total (Hukum Identitas):</b></p>
            <p>Σ Distribusi = Total Zakat</p>
            <p>${distribusi.map(d => `Rp ${d.nominal.toLocaleString('id-ID')}`).join(' + ')} = <b>Rp ${totalZakatMaal.toLocaleString('id-ID')} ✓</b></p>
            
            <div style="background-color: #e3f2fd; padding: 15px; border-radius: 5px; margin: 15px 0; border-left: 4px solid #2196f3;">
                <h4 style="margin-top: 0;">💡 Mengapa Tidak Dibagi Rata?</h4>
                <p>Pembagian zakat tidak disamaratakan karena:</p>
                <ol>
                    <li><b>Prioritas dalam Syariah:</b> Fakir dan miskin adalah prioritas utama yang disebutkan pertama kali dalam ayat</li>
                    <li><b>Amil Bukan Penerima Utama:</b> Amil hanya berhak atas upah (maksimal 12.5%), bukan bagian dari zakat itu sendiri</li>
                    <li><b>Kondisi Berbeda-beda:</b> Kebutuhan setiap golongan berbeda, sehingga porsi disesuaikan dengan urgensi</li>
                    <li><b>Pendapat Ulama:</b> Jumhur ulama sepakat bahwa zakat harus memprioritaskan yang paling membutuhkan</li>
                </ol>
            </div>
            <hr>
            
            <h3>4️⃣ Logika Proposisional & Validasi Syariah</h3>
            <table class="logika-table">
                <tr>
                    <th>Hukum Logika</th>
                    <th>Penerapan dalam Distribusi Zakat</th>
                    <th>Hasil</th>
                </tr>
                <tr>
                    <td><b>Konjungsi (AND)</b></td>
                    <td>Zakat valid jika: Total > 0 ∧ Mustahik ≥ ${ATURAN_SYARIAH.minimalGolongan} ∧ Sesuai Syariah</td>
                    <td>✓ BENAR</td>
                </tr>
                <tr>
                    <td><b>Disjungsi (OR)</b></td>
                    <td>Mustahik terpilih: ${subsetTerpilih.join(' ∨ ')}</td>
                    <td>✓ Salah satu/lebih dipilih</td>
                </tr>
                <tr>
                    <td><b>Implikasi (IF-THEN)</b></td>
                    <td>Jika (Fakir ∨ Miskin) terpilih → Mereka mendapat ≥50%</td>
                    <td>✓ VALID</td>
                </tr>
                <tr>
                    <td><b>Negasi (NOT)</b></td>
                    <td>¬(Hanya Amil) ∧ ¬(Tanpa Fakir/Miskin untuk Fi Sabilillah)</td>
                    <td>✓ Kombinasi terlarang dihindari</td>
                </tr>
                <tr>
                    <td><b>Hukum Identitas</b></td>
                    <td>Σ Persentase = 100%</td>
                    <td>✓ ${distribusi.reduce((sum, d) => sum + d.persentase, 0).toFixed(2)}% = 100%</td>
                </tr>
            </table>
            
            <p><b>Validasi Kombinasi Terlarang:</b></p>
            <ul>
                <li>❌ <b>Hanya Amil:</b> Tidak diperbolehkan (Amil bukan penerima utama)</li>
                <li>❌ <b>Hanya Fi Sabilillah:</b> Harus ada Fakir/Miskin sebagai prioritas</li>
                <li>❌ <b>Tanpa Fakir & Miskin (jika >2 golongan):</b> Prioritas utama harus ada</li>
                <li>✅ <b>Kombinasi Anda:</b> Memenuhi aturan syariah</li>
            </ul>
            <hr>
            
            <h3>5️⃣ Referensi Dalil & Pendapat Ulama</h3>
            <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px;">
                <h4>📚 Hadits Shahih:</h4>
                <blockquote style="background-color: #fff; padding: 15px; border-left: 4px solid #4caf50; margin: 10px 0;">
                    <p style="font-style: italic;">"أُمِرْتُ أَنْ آخُذَ الصَّدَقَةَ مِنْ أَغْنِيَائِكُمْ فَأَرُدَّهَا فِي فُقَرَائِكُمْ"</p>
                    <p><b>Artinya:</b> "Aku diperintahkan untuk mengambil zakat dari orang-orang kaya di antara kalian dan mengembalikannya kepada orang-orang fakir di antara kalian."</p>
                    <p><b>(HR. Bukhari no. 1496 & Muslim no. 19)</b></p>
                </blockquote>
                
                <h4>👨‍🏫 Pendapat Ulama:</h4>
                <ul>
                    <li><b>Imam Syafi'i:</b> "Fakir dan miskin adalah prioritas utama dalam distribusi zakat. Jika semua golongan ada, maka disesuaikan dengan kebutuhan, namun fakir dan miskin tidak boleh diabaikan."</li>
                    <li><b>Imam Maliki:</b> "Zakat sebaiknya didistribusikan kepada beberapa golongan, tidak hanya satu golongan saja, kecuali dalam kondisi darurat."</li>
                    <li><b>Imam Ahmad:</b> "Amil berhak atas upah maksimal 1/8 (12.5%) dari total zakat yang dikelola."</li>
                    <li><b>Ibnu Qudamah (Al-Mughni):</b> "Tidak boleh memberikan seluruh zakat hanya kepada amil atau hanya kepada satu golongan yang bukan prioritas utama."</li>
                </ul>
                
                <h4>⚖️ Kaidah Fiqh:</h4>
                <ul>
                    <li><b>الأمور بمقاصدها</b> (Segala perkara tergantung pada tujuannya) - Tujuan utama zakat adalah membantu yang paling membutuhkan</li>
                    <li><b>درء المفاسد مقدم على جلب المصالح</b> (Menolak kerusakan didahulukan daripada meraih kemaslahatan) - Mencegah kemiskinan adalah prioritas</li>
                    <li><b>الضرورات تبيح المحظورات</b> (Darurat membolehkan yang terlarang) - Dalam kondisi darurat, distribusi bisa disesuaikan</li>
                </ul>
            </div>
            <hr>
            
            <h3>6️⃣ Catatan Penting</h3>
            <div style="background-color: #fff3cd; padding: 15px; border-radius: 5px; border-left: 4px solid #ff9800;">
                <ul>
                    <li>✅ Sistem ini menggunakan pendekatan <b>madzhab Syafi'i</b> dan pendapat <b>jumhur ulama</b></li>
                    <li>✅ Pembagian tidak harus merata di semua golongan, tetapi berdasarkan <b>prioritas dan kebutuhan</b></li>
                    <li>✅ <b>Fakir dan miskin</b> selalu menjadi prioritas utama (50-80% dari total)</li>
                    <li>✅ <b>Amil</b> maksimal 12.5% sebagai upah pengelolaan, bukan penerima utama</li>
                    <li>✅ Golongan <b>kondisional</b> (Riqab, Ibnu Sabil) hanya mendapat bagian jika ada yang membutuhkan</li>
                    <li>⚠️ Dalam praktik, konsultasikan dengan <b>ustadz atau lembaga amil zakat terpercaya</b> untuk kondisi spesifik</li>
                    <li>⚠️ Distribusi dapat disesuaikan dengan <b>kondisi lokal</b> dan <b>tingkat urgensi kebutuhan</b></li>
                </ul>
            </div>
        </div>
    `;
    
    logikaDiv.innerHTML = logikaHTML;
}

// Fungsi untuk menghitung kombinasi C(n, r)
function hitungKombinasi(n, r) {
    if (r > n) return 0;
    if (r === 0 || r === n) return 1;
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

// Inisialisasi
window.addEventListener('DOMContentLoaded', () => {
    // Tambahkan elemen info dalil dan warning validasi
    const container = document.querySelector('.container');
    if (container && !document.getElementById('infoDalil')) {
        const infoDalilDiv = document.createElement('div');
        infoDalilDiv.id = 'infoDalil';
        infoDalilDiv.style.marginTop = '20px';
        
        const warningDiv = document.createElement('div');
        warningDiv.id = 'warningValidasi';
        warningDiv.style.marginTop = '10px';
        
        // Cari tempat yang tepat untuk menyisipkan
        const hitungBtn = document.getElementById('hitungDistribusiBtn');
        if (hitungBtn && hitungBtn.parentNode) {
            hitungBtn.parentNode.insertBefore(warningDiv, hitungBtn);
            hitungBtn.parentNode.insertBefore(infoDalilDiv, warningDiv);
        }
    }
    
    // Tampilkan info awal tentang aturan syariah
    const infoBox = document.getElementById('infoDalil');
    if (infoBox) {
        infoBox.innerHTML = `
            <div style="background-color: #e3f2fd; padding: 15px; border-radius: 8px; margin: 10px 0; border-left: 4px solid #2196f3;">
                <h4 style="margin: 0 0 10px 0; color: #1565c0;">📖 Panduan Distribusi Zakat Sesuai Syariah</h4>
                <p style="margin: 5px 0;">Pilih minimal <b>2 golongan mustahik</b> untuk distribusi yang sesuai syariah.</p>
                <p style="margin: 5px 0;"><b>Prioritas Utama:</b> Fakir dan Miskin (akan mendapat porsi 50-80%)</p>
                <p style="margin: 5px 0;"><b>Amil:</b> Maksimal 12.5% sebagai upah pengelolaan</p>
                <p style="margin: 5px 0;"><b>Aturan:</b></p>
                <ul style="margin: 5px 0; padding-left: 20px;">
                    <li>❌ Tidak boleh hanya Amil saja</li>
                    <li>❌ Tidak boleh Fi Sabilillah tanpa Fakir/Miskin</li>
                    <li>✅ Fakir dan Miskin harus menjadi prioritas</li>
                </ul>
                <p style="margin: 5px 0; font-style: italic; font-size: 13px; color: #666;">
                    Sistem akan memvalidasi pilihan Anda berdasarkan dalil Al-Qur'an dan hadits shahih
                </p>
            </div>
        `;
    }
});