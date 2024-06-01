document.addEventListener('DOMContentLoaded', function() {
  // hide unused components
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

  // set infoProdi options
  dataProdi.forEach(function(prodi) {
    let option = document.createElement('option');
    option.value = prodi.nama;
    option.text = prodi.nama;
    document.getElementById('infoProdi').appendChild(option);
  });
  
  // set tanggal to now
  document.getElementById('infoTanggal').valueAsDate = new Date();

  // add click even listener to vPillsNavToggle to set vPillsTab class d-none and nav-side
  document.getElementById("vPillsNavToogle").addEventListener("click", function () {
    document.getElementById("vPillsTab").classList.toggle("d-none");
    document.getElementById("vPillsTab").classList.toggle("nav-side");
  });


  // event listener

  // even listener select infoPordi
  document.getElementById('infoProdi').addEventListener('change', function() {
    let prodi = dataProdi.find(function(prodi) {
      return prodi.nama == document.getElementById('infoProdi').value;
    });
    document.getElementById('infoKaprodi').value = prodi.kaprodi;
  });
  
  // add event listener click to "nav nav-link"
  document.querySelectorAll('#vPillsTab .nav-link').forEach(function(navLink) {
    navLink.addEventListener('click', function() {
      storeData();
    });
  });

  const saveToast = document.getElementById('saveToast')
  // add event listener click to btn-simpan class
  document.querySelectorAll('.btn-simpan').forEach(function(btnSimpan) {
    btnSimpan.addEventListener('click', function() {
      storeData();
      const toast = new bootstrap.Toast(saveToast);
      toast.show();
    });
  });
  
});


// function to store data to active sidang on local storage
function storeData() {
  let sidang = sidangs[config.active];
  // get data from vPillsInfo (Informasi Umum)
  sidang.infoNamaMhs1 = document.getElementById('infoNamaMhs1').value;
  sidang.infoNIMMhs1 = document.getElementById('infoNIMMhs1').value;
  sidang.infoTelp1 = document.getElementById('infoTelp1').value;
  sidang.infoNamaMhs2 = document.getElementById('infoNamaMhs2').value;
  sidang.infoNIMMhs2 = document.getElementById('infoNIMMhs2').value;
  sidang.infoTelp2 = document.getElementById('infoTelp2').value;
  sidang.infoJudul = document.getElementById('infoJudul').value;
  sidang.infoProdi = document.getElementById('infoProdi').value;
  sidang.infoKaprodi = document.getElementById('infoKaprodi').value;
  sidang.infoPenguji1 = document.getElementById('infoPenguji1').value;
  sidang.infoPenguji2 = document.getElementById('infoPenguji2').value;
  sidang.infoPenguji3 = document.getElementById('infoPenguji3').value;
  sidang.infoTanggal = document.getElementById('infoTanggal').value;

  // get data from vPillsRevisi (Revisi)
  sidang.revisiContent = document.getElementById('revisiContent').value;

  // get data from vPillsNilaiPro (Penilaian Proposal)
  sidang.nilaiProp1 = document.querySelector('input[name="nilaiProp1"]:checked').value;
  sidang.nilaiProp2 = document.querySelector('input[name="nilaiProp2"]:checked').value;
  sidang.nilaiProp3 = document.querySelector('input[name="nilaiProp3"]:checked').value;
  sidang.nilaiProp4 = document.querySelector('input[name="nilaiProp4"]:checked').value;

  // get data from vPillsNilaiLap1 (Penilaian 1)
  sidang.nilaiLap11 = document.getElementById('nilaiLap11').value;
  sidang.timbangLap11 = document.getElementById('timbangLap11').value;
  sidang.nilaiLap12 = document.getElementById('nilaiLap12').value;
  sidang.timbangLap12 = document.getElementById('timbangLap12').value;
  sidang.nilaiLap13 = document.getElementById('nilaiLap13').value;
  sidang.timbangLap13 = document.getElementById('timbangLap13').value;
  sidang.nilaiLap14 = document.getElementById('nilaiLap14').value;
  sidang.timbangLap14 = document.getElementById('timbangLap14').value;
  sidang.total1 = document.getElementById('total1').value;

  // get data from vPillsNilaiLap2 (Penilaian 2)
  sidang.nilaiLap21 = document.getElementById('nilaiLap21').value;
  sidang.timbangLap21 = document.getElementById('timbangLap21').value;
  sidang.nilaiLap22 = document.getElementById('nilaiLap22').value;
  sidang.timbangLap22 = document.getElementById('timbangLap22').value;
  sidang.nilaiLap23 = document.getElementById('nilaiLap23').value;
  sidang.timbangLap23 = document.getElementById('timbangLap23').value;
  sidang.nilaiLap24 = document.getElementById('nilaiLap24').value;
  sidang.timbangLap24 = document.getElementById('timbangLap24').value;
  sidang.total2 = document.getElementById('total2').value;
    
  // get data from vPillsBerita (Berita Acara dan Cetak Form)
  sidang.revisiPropDosen1 = document.querySelector('input[name="revisiPropDosen1"]:checked').value;
  sidang.revisiPropDosen2 = document.querySelector('input[name="revisiPropDosen2"]:checked').value;
  sidang.statusProp = document.querySelector('input[name="statusProp"]:checked').value;
  sidang.revisiLapDosen1 = document.querySelector('input[name="revisiLapDosen1"]:checked').value;
  sidang.nilaiTotalDosen2 = document.getElementById('nilaiTotalDosen2').value;
  sidang.revisiLapDosen2 = document.querySelector('input[name="revisiLapDosen2"]:checked').value;
  sidang.nilaiTotalDosen3 = document.getElementById('nilaiTotalDosen3').value;
  sidang.revisiLapDosen3 = document.querySelector('input[name="revisiLapDosen3"]:checked').value;
  sidang.nilaiTotalDosen4 = document.getElementById('nilaiTotalDosen4').value;
  sidang.revisiLapDosen4 = document.querySelector('input[name="revisiLapDosen4"]:checked').value;
  sidang.statusLap = document.querySelector('input[name="statusLap"]:checked').value;

  // update current active sidang
  sidangs[config.active] = sidang;
  
  // update local storage 'sidangs'
  localStorage.setItem('sidangs', JSON.stringify(sidangs));

}