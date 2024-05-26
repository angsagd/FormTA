let dataSidang = {
  namaDosen: 'Dosen',
  statusDosen: 'pembimbing',
  jenis: 'proposal',
  timMhs: 1,
  tanggal: new Date().toISOString().split('T')[0],
  createdAt: new Date().toISOString(),
};

document.addEventListener('DOMContentLoaded', function() {

  // if local storage 'config' doesn't exist
  if (!localStorage.getItem('config')) {
    // create local storage 'config' 
    localStorage.setItem('config', JSON.stringify({tnc: false, active: 0}));
    // clear local storage 'sidangs'
    localStorage.removeItem('sidangs');
    // create local storage 'sidangs'
    localStorage.setItem('sidangs', JSON.stringify([dataSidang]));
  }

  // get local storage 'config'
  let config = JSON.parse(localStorage.getItem('config'));
  // get local storage 'sidangs'
  let sidangs = JSON.parse(localStorage.getItem('sidangs'));

  // show modal if tnc is false
  if (!config.tnc) {
    let tncModal = new bootstrap.Modal(document.getElementById('tncModal'));
    tncModal.show();
  }

  // set menuNamaDosen innerHTML to namaDosen on active sidang
  document.getElementById('menuNamaDosen').innerHTML = sidangs[config.active].namaDosen;
  document.getElementById('inputNamaDosen').value = sidangs[config.active].namaDosen;

  // set radio checked
  document.querySelector('input[name="jenis"][value="'+sidangs[config.active].jenis+'"]').checked = true;
  document.querySelector('input[name="status"][value="'+sidangs[config.active].statusDosen+'"]').checked = true;
  document.querySelector('input[name="jumlah"][value="'+sidangs[config.active].timMhs+'"]').checked = true;

  // add event listener to 'tncAgree' button
  document.getElementById('tncAgree').addEventListener('click', function() {
    config.tnc = true;
    localStorage.setItem('config', JSON.stringify(config));
  });

  // add event listener to 'menuHapusData' menu item
  document.getElementById('menuHapusData').addEventListener('click', function() {
    // konfirmasi hapus data
    if (confirm('Bersihkan data sidang pada browser ini?')) {
      localStorage.clear();
      location.reload();
    }
  });

  // add event listener to 'menuSidangBaru' menu item
  document.getElementById('menuSidangBaru').addEventListener('click', function() {
    // konfirmasi sidang baru
    if (confirm('Buat data sidang yang baru?')) {
      // create new sidang object with datetime now
      sidangs.push(dataSidang);
      // set active sidang to the last sidang
      config.active = sidangs.length - 1;
      // update local storage 'sidangs'
      localStorage.setItem('sidangs', JSON.stringify(sidangs));
      // update local storage 'config'
      localStorage.setItem('config', JSON.stringify(config));
      // reload page
      location.reload();
    }
  });

  console.log(sidangs);

});

