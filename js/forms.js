document.addEventListener('DOMContentLoaded', function() {
  // add click even listener to vPillsNavToggle to set vPillsTab class d-none and nav-side
  document.getElementById("vPillsNavToogle").addEventListener("click", function () {
    document.getElementById("vPillsTab").classList.toggle("d-none");
    document.getElementById("vPillsTab").classList.toggle("nav-side");
  });

  // set infoProdi options
  dataProdi.forEach(function(prodi) {
    let option = document.createElement('option');
    option.value = prodi.nama;
    option.text = prodi.nama;
    document.getElementById('infoProdi').appendChild(option);
  });
  // even listener select infoPordi
  document.getElementById('infoProdi').addEventListener('change', function() {
    let prodi = dataProdi.find(function(prodi) {
      return prodi.nama == document.getElementById('infoProdi').value;
    });
    document.getElementById('infoKaprodi').value = prodi.kaprodi;
  });

  // set tanggal to now
  document.getElementById('infoTanggal').valueAsDate = new Date();
  
  if (sidangs[config.active].timMhs == 1) {
    // hide every node on collection if perorangan
    hideComponent(document.getElementsByClassName('hideif-perorangan'));
  } else {
    // hide every node on collection if kelompok
    hideComponent(document.getElementsByClassName('hideif-kelompok'));
  }

  if (sidangs[config.active].jenis == 'proposal') {
    // hide every node on collection if proposal
    hideComponent(document.getElementsByClassName('hideif-proposal'));
  } else {
    // hide every node on collection if laporan
    hideComponent(document.getElementsByClassName('hideif-laporan'));
  }
  
  if (sidangs[config.active].statusDosen == 'pembimbing') {
    // hide every node on collection if pembimbing
    hideComponent(document.getElementsByClassName('hideif-pembimbing'));
  } else {
    // hide every node on collection if penguji
    hideComponent(document.getElementsByClassName('hideif-penguji'));
  }

});