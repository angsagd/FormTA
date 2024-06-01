let dataProdi = [
  {id: 1, nama: 'Sistem Komputer', singkatan: 'SK', kaprodi: 'Made Liandana, S.Kom., M.Eng.'},
  {id: 3, nama: 'Sistem Informasi', singkatan: 'SI', kaprodi: 'Pande Putu Gede Putra Pertama, S.T., M.T.'},
  {id: 4, nama: 'Teknologi Informasi', singkatan: 'TI', kaprodi: 'I Wayan Ardiyasa, S.Kom., M.MSI.'},
  {id: 5, nama: 'Bisnis Digital', singkatan: 'BD', kaprodi: 'Ni Wayan Deriani, S.E., M.Kom.'},
  {id: 2, nama: 'Manajemen Informatika', singkatan: 'MI', kaprodi: 'I Gusti Ayu Desi Saryanti, S.Kom., M.MSI.'},
];

let dataSidang = {
  namaDosen: 'Dosen',
  statusDosen: 'pembimbing',
  jenis: 'proposal',
  timMhs: 1,
  tanggal: new Date().toISOString().split('T')[0],
  createdAt: new Date().toISOString(),
};

// if local storage 'config' doesn't exist
if (!localStorage.getItem('config')) {
  // clear local storage 'sidangs'
  localStorage.removeItem('sidangs');
  // create local storage 'sidangs'
  localStorage.setItem('sidangs', JSON.stringify([dataSidang]));
  // create local storage 'config' 
  localStorage.setItem('config', JSON.stringify({tnc: false, active: 0}));
}

// get local storage 'config'
let config = JSON.parse(localStorage.getItem('config'));
// get local storage 'sidangs'
let sidangs = JSON.parse(localStorage.getItem('sidangs'));

function hideComponent(nodes) {
  Array.from(nodes).forEach(node => {
    node.classList.add('d-none');
  });
}
