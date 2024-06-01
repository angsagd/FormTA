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
      sidangs.push(dataSidang);
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

