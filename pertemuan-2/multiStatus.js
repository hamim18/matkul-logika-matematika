let nama="andi";
let nilaiT=98;
let nilaiR=88;
let bayarSpp=true;
let upKtp=true;
let upKK=true;
let upIjz=true;

let hasil="maba";

console.log("nama "+nama);
if (nilaiR>75&&bayarSpp) {
    hasil="lulus admin";
    console.log(hasil);
    if((upKtp||upKK)&&upIjz){
        hasil="lulus berkas";
        console.log(hasil);
        if(nilaiT>75){
            hasil="lulus tes";
            console.log(hasil);
            if(nilaiR>75&&nilaiT>75&&(upKtp||upKK)&&upIjz&&bayarSpp){
                hasil="selamat anda maba"
                console.log(hasil);
            }
        }
    }

} else {
    hasil="lengkapi persaratan";
    console.log(hasil);
}
