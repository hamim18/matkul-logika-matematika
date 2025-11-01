let angka = 11;
let jenisAngka =" ";
let bg = " ";

if (angka % 2 == 0){
    jenisAngka = "genap";
}else{
    jenisAngka = "ganjil";
}
if (jenisAngka == "ganjil"){
    bg ="gray";
}else{
    bg ="none";
}
console.log(angka,jenisAngka,bg);