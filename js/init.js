let dataProdi = [
  {id: 1, nama: 'Sistem Komputer', singkatan: 'SK', kaprodi: 'Made Liandana, S.Kom., M.Eng.'},
  {id: 3, nama: 'Sistem Informasi', singkatan: 'SI', kaprodi: 'Pande Putu Gede Putra Pertama, S.T., M.T.'},
  {id: 4, nama: 'Teknologi Informasi', singkatan: 'TI', kaprodi: 'I Wayan Ardiyasa, S.Kom., M.MSI.'},
  {id: 5, nama: 'Bisnis Digital', singkatan: 'BD', kaprodi: 'Ni Wayan Deriani, S.E., M.Kom.'},
  {id: 2, nama: 'Manajemen Informatika', singkatan: 'MI', kaprodi: 'I Gusti Ayu Desi Saryanti, S.Kom., M.MSI.'},
];

let newSidang = {
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
  localStorage.setItem('sidangs', JSON.stringify([newSidang]));
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

// app
document.addEventListener('DOMContentLoaded', function() {

  // show modal if tnc is false
  if (!config.tnc) {
    let tncModal = new bootstrap.Modal(document.getElementById('tncModal'));
    tncModal.show();
  }

  // set menuNamaDosen innerHTML to namaDosen on active sidang
  document.getElementById('menuNamaDosen').innerHTML = sidangs[config.active].namaDosen;

  // get element 'selectSidang'
  let selectSidang = document.getElementById('selectSidang');

  // add event listener to 'tncAgree' button
  document.getElementById('tncAgree').addEventListener('click', function() {
    config.tnc = true;
    localStorage.setItem('config', JSON.stringify(config));
  });

  // add event listener to 'tncNotAgree' link
  document.getElementById('tncNotAgree').addEventListener('click', function() {
    // clear all local storage before following the link
    localStorage.clear();
  });

  // add event listener to 'menuHapusData' menu item
  document.getElementById('menuHapusData').addEventListener('click', function() {
    // konfirmasi hapus data
    if (confirm('Bersihkan data sidang pada browser ini?')) {
      localStorage.clear();
      // go to index.html
      location.href = 'index.html';
    }
  });

  // add event listener to 'menuSidangBaru' menu item
  document.getElementById('menuSidangBaru').addEventListener('click', function() {
    // konfirmasi sidang baru
    if (confirm('Buat data sidang yang baru?')) {
      // create new sidang object with datetime now
      sidangs.push(newSidang);
      // set active sidang to the last sidang
      config.active = sidangs.length - 1;
      // update local storage 'sidangs'
      localStorage.setItem('sidangs', JSON.stringify(sidangs));
      // update local storage 'config'
      localStorage.setItem('config', JSON.stringify(config));
      // go to index.html
      location.href = 'index.html';
    }
  });

  // add event listener on dataModal
  let dataModal = document.getElementById('dataModal')
  dataModal.addEventListener('show.bs.modal', event => {
    // show all sidang data as select option on dataModal
    selectSidang.innerHTML = '';
    sidangs.forEach((sidang, index) => {
      let optionSidang = document.createElement('option');
      let txtSelectSidang = sidang.tanggal + ' : ' + sidang.statusDosen + " " + sidang.jenis + ' (' + sidang.timMhs + ' mhsw)';
      optionSidang.value = index;
      optionSidang.classList.add('py-2');
      optionSidang.innerHTML = txtSelectSidang;
      selectSidang.appendChild(optionSidang);
    });

    // add event listener to select 'selectSidang'
    selectSidang.addEventListener('change', function() {
      // set button 'buttonSetSidang' to enabled
      document.getElementById('buttonSetSidang').disabled = false;
    });

    // add event listener to button 'buttonSetSidang'
    document.getElementById('buttonSetSidang').addEventListener('click', function() {
      // set active sidang to selected sidang
      config.active = selectSidang.value;
      // update local storage 'config'
      localStorage.setItem('config', JSON.stringify(config));
      // go to index.html
      location.href = 'index.html';
    });
  })

});