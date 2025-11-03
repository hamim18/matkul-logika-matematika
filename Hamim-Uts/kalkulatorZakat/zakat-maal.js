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