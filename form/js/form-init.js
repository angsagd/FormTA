try {
  pdf2htmlEX.defaultViewer = new pdf2htmlEX.Viewer({});
} catch(e) {}

// if local storage 'config' or 'sidangs' doesn't exist
if (!localStorage.getItem('config') || !localStorage.getItem('sidangs')) {
  // redirect to root
  window.location.href = '../';
}
// get local storage 'config'
let config = JSON.parse(localStorage.getItem('config'));
// get local storage 'sidangs'
let sidangs = JSON.parse(localStorage.getItem('sidangs'));
// get active sidang
let sidang = sidangs[config.active];
// array of month
let months = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
// array of hari
let days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
// get infoTanggal from sidang
let infoTanggal = new Date(sidang.infoTanggal);
let hari = days[infoTanggal.getDay()];
let tanggal = infoTanggal.getDate();
let bulan = months[infoTanggal.getMonth()];
let tahun = infoTanggal.getFullYear();
let tanggalPanjang = `${tanggal} ${bulan} ${tahun}`;
let hariTanggal = `${hari}, ${tanggalPanjang}`;