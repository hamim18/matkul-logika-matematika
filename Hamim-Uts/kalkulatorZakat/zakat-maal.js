function hitungZakat() {
    const emas = parseFloat(document.getElementById('emas').value);
    const haul = parseFloat(document.getElementById('haul').value);
    let hasilText = '';

    if (!isNaN(emas) && !isNaN(haul)) {
        if (emas >= 85 && haul >= 1) {
            hasilText = "Wajib Zakat";
        } else {
            hasilText = "Tidak Wajib Zakat";
        }
    }else {
        hasilText = "Input tidak valid";
    }

    document.getElementById('hasil').innerText = hasilText;

    const hukum = `
        Hukum logika pada perhitungan zakat di atas antara lain:
        - Hukum Dominasi: Jika haul < 1, walaupun emas ≥ 85 tetap Tidak Wajib Zakat.
        - Hukum Komutatif: Urutan kondisi emas dan haul tidak memengaruhi hasil.
        - Hukum Identitas: Jika haul = 1, kondisi emas menentukan wajib atau tidaknya zakat.
    `;
    document.getElementById('hukumLogika').innerText = hukum;
}

document.getElementById('hitungBtn').addEventListener('click', hitungZakat);

const cekEmas = document.getElementById('cekEmas');
const inputEmas = document.getElementById('emas');

cekEmas.addEventListener('change', function() {
    if (this.checked) {
        inputEmas.disabled = false;
    } else {
        inputEmas.disabled = true;
        inputEmas.value = 0; 
    }
});

window.addEventListener('DOMContentLoaded', () => {
    inputEmas.disabled = !cekEmas.checked;
});