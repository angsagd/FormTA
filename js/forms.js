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

  // set all form control value from active sidang
  setInitValues(sidangs[config.active]);

  // event listener

  // even listener not yet implemented
  document.querySelectorAll('.not-implemented').forEach(function(nyiEl) {
    // add event listener click
    nyiEl.addEventListener('click', function() {
      // show alert
      alert('Fitur belum diimplementasikan');
    });
  });

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
      storeData(sidangs[config.active]);
      setValues(sidangs[config.active]);
    });
  });

  // add event listener input on text-timbang class
  document.querySelectorAll('.text-timbang').forEach(function(textCalc) {
    textCalc.addEventListener('input', function() {
      let value = textCalc.value;
      let elId = textCalc.id;
      let index = elId.substring(elId.length - 2);
      let part = elId.substring(elId.length - 2, elId.length - 1);
      let bobot = bobotNilai[parseInt(elId.substring(elId.length - 1)) - 1];
      document.getElementById('timbangLap'+index).value = (value*bobot)/100;
      let total = 0;
      for (let i = 1; i <= 4; i++) {
        total += parseFloat(document.getElementById('timbangLap'+part+i).value);
      }
      document.getElementById('total'+part).value = total;
    });
  });

  // add event listener input on text-rekap class
  document.querySelectorAll('.text-rekap').forEach(function(textRekap) {
    textRekap.addEventListener('input', function() {
      let value = textRekap.value;
      let elId = textRekap.id;
      let part = elId.substring(elId.length - 2, elId.length - 1);
      let nilai2, nilai3, nilai4, huruf;
      let total = parseFloat(document.getElementById('nilaiTotalDosen'+part+'1').value) * 4;
      if(document.getElementById('nilaiTotalDosen'+part+'2').value == '') nilai2 = 0;
      else nilai2 = parseFloat(document.getElementById('nilaiTotalDosen'+part+'2').value);
      if(document.getElementById('nilaiTotalDosen'+part+'3').value == '') nilai3 = 0;
      else nilai3 = parseFloat(document.getElementById('nilaiTotalDosen'+part+'3').value);
      if(document.getElementById('nilaiTotalDosen'+part+'4').value == '') nilai4 = 0;
      else nilai4 = parseFloat(document.getElementById('nilaiTotalDosen'+part+'4').value);

      if(sidangs[config.active].timMhs == 1) total += (nilai2 * 3) + (nilai3 * 3);
      else total += (nilai2 * 2) + (nilai3 * 2) + (nilai4 * 2);
      document.getElementById('nilaiTotalSidang'+part).value = (total/10);
      nilaiHuruf.every(nilai => {
        if(total <= (nilai.max * 10)) {
          huruf = nilai.huruf;
          return false;
        }
        return true;
      });
      document.getElementById('nilaiHuruf'+part).value = huruf;
    });
  });
  
});

// funtion to set nama mahasiswa, penguji, nilai
function setValues(sidang) {
  document.getElementById('nilaiNamaMhs1').innerHTML = sidang.infoNamaMhs1;
  document.getElementById('nilaiNamaMhs2').innerHTML = sidang.infoNamaMhs2;
  document.getElementById('rekapNamaMhs1').innerHTML = sidang.infoNamaMhs1;
  document.getElementById('rekapNamaMhs2').innerHTML = sidang.infoNamaMhs2;
  document.getElementById('namaPembimbingLap1').innerHTML = sidang.namaDosen;
  document.getElementById('namaPembimbingLap2').innerHTML = sidang.namaDosen;
  document.getElementById('namaPengujiLap11').innerHTML = sidang.infoPenguji1;
  document.getElementById('namaPengujiLap12').innerHTML = sidang.infoPenguji2;
  document.getElementById('namaPengujiLap13').innerHTML = sidang.infoPenguji3;
  document.getElementById('namaPengujiLap21').innerHTML = sidang.infoPenguji1;
  document.getElementById('namaPengujiLap22').innerHTML = sidang.infoPenguji2;
  document.getElementById('namaPengujiLap23').innerHTML = sidang.infoPenguji3;
  document.getElementById('nilaiTotalDosen11').value = sidang.total1;
  document.getElementById('nilaiTotalDosen21').value = sidang.total2;
}

// function to store data to active sidang on local storage
function storeData(sidang) {
  // get data from vPillsInfo (Informasi Umum)
  sidang.infoNamaMhs1 = document.getElementById('infoNamaMhs1').value;
  sidang.infoNIMMhs1 = document.getElementById('infoNIMMhs1').value;
  sidang.infoTelp1 = document.getElementById('infoTelp1').value;
  sidang.infoKepakaran1 = document.getElementById('infoKepakaran1').value;
  sidang.infoNamaMhs2 = document.getElementById('infoNamaMhs2').value;
  sidang.infoNIMMhs2 = document.getElementById('infoNIMMhs2').value;
  sidang.infoTelp2 = document.getElementById('infoTelp2').value;
  sidang.infoKepakaran2 = document.getElementById('infoKepakaran2').value;
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
    
  // get data from vPillsBerita (Berita Acara)
  sidang.revisiPropDosen1 = document.querySelector('input[name="revisiPropDosen1"]:checked').value;
  sidang.revisiPropDosen2 = document.querySelector('input[name="revisiPropDosen2"]:checked').value;
  sidang.statusProp = document.querySelector('input[name="statusProp"]:checked').value;
  sidang.revisiLapDosen11 = document.querySelector('input[name="revisiLapDosen11"]:checked').value;
  sidang.nilaiTotalDosen12 = document.getElementById('nilaiTotalDosen12').value;
  sidang.revisiLapDosen12 = document.querySelector('input[name="revisiLapDosen12"]:checked').value;
  sidang.nilaiTotalDosen13 = document.getElementById('nilaiTotalDosen13').value;
  sidang.revisiLapDosen13 = document.querySelector('input[name="revisiLapDosen13"]:checked').value;
  sidang.nilaiTotalDosen14 = document.getElementById('nilaiTotalDosen14').value;
  sidang.revisiLapDosen14 = document.querySelector('input[name="revisiLapDosen14"]:checked').value;
  sidang.nilaiTotalSidang1 = document.getElementById('nilaiTotalSidang1').value;
  sidang.nilaiHuruf1 = document.getElementById('nilaiHuruf1').value;
  sidang.revisiLapDosen21 = document.querySelector('input[name="revisiLapDosen21"]:checked').value;
  sidang.nilaiTotalDosen22 = document.getElementById('nilaiTotalDosen22').value;
  sidang.revisiLapDosen22 = document.querySelector('input[name="revisiLapDosen22"]:checked').value;
  sidang.nilaiTotalDosen23 = document.getElementById('nilaiTotalDosen23').value;
  sidang.revisiLapDosen23 = document.querySelector('input[name="revisiLapDosen23"]:checked').value;
  sidang.nilaiTotalDosen24 = document.getElementById('nilaiTotalDosen24').value;
  sidang.revisiLapDosen24 = document.querySelector('input[name="revisiLapDosen24"]:checked').value;
  sidang.nilaiTotalSidang2 = document.getElementById('nilaiTotalSidang2').value;
  sidang.nilaiHuruf2 = document.getElementById('nilaiHuruf2').value;
  sidang.statusLap = document.querySelector('input[name="statusLap"]:checked').value;

  // update current active sidang
  sidangs[config.active] = sidang;
  
  // update local storage 'sidangs'
  localStorage.setItem('sidangs', JSON.stringify(sidangs));
}

// function to set form control value
function setInitValues(sidang) {
  // get data from vPillsInfo (Informasi Umum)
  if(sidang.infoNamaMhs1) document.getElementById('infoNamaMhs1').value = sidang.infoNamaMhs1;
  if(sidang.infoNIMMhs1) document.getElementById('infoNIMMhs1').value = sidang.infoNIMMhs1;
  if(sidang.infoTelp1) document.getElementById('infoTelp1').value = sidang.infoTelp1;
  if(sidang.infoKepakaran1) document.getElementById('infoKepakaran1').value = sidang.infoKepakaran1;
  if(sidang.infoNamaMhs2) document.getElementById('infoNamaMhs2').value = sidang.infoNamaMhs2;
  if(sidang.infoNIMMhs2) document.getElementById('infoNIMMhs2').value = sidang.infoNIMMhs2;
  if(sidang.infoTelp2) document.getElementById('infoTelp2').value = sidang.infoTelp2;
  if(sidang.infoKepakaran2) document.getElementById('infoKepakaran2').value = sidang.infoKepakaran2;
  if(sidang.infoJudul) document.getElementById('infoJudul').value = sidang.infoJudul;
  if(sidang.infoProdi) document.querySelector('#infoProdi option[value="'+sidang.infoProdi+'"]').selected = true;
  if(sidang.infoKaprodi) document.getElementById('infoKaprodi').value = sidang.infoKaprodi;
  if(sidang.infoPenguji1) document.getElementById('infoPenguji1').value = sidang.infoPenguji1;
  if(sidang.infoPenguji2) document.getElementById('infoPenguji2').value = sidang.infoPenguji2;
  if(sidang.infoPenguji3) document.getElementById('infoPenguji3').value = sidang.infoPenguji3;
  if(sidang.infoTanggal) document.getElementById('infoTanggal').value = sidang.infoTanggal;

  // get data from vPillsRevisi (Revisi)
  if(sidang.revisiContent) document.getElementById('revisiContent').value = sidang.revisiContent;

  // get data from vPillsNilaiPro (Penilaian Proposal)
  if(sidang.nilaiProp1) document.querySelector('input[name="nilaiProp1"][value="'+sidang.nilaiProp1+'"]').checked = true;
  if(sidang.nilaiProp2) document.querySelector('input[name="nilaiProp2"][value="'+sidang.nilaiProp2+'"]').checked = true;
  if(sidang.nilaiProp3) document.querySelector('input[name="nilaiProp3"][value="'+sidang.nilaiProp3+'"]').checked = true;
  if(sidang.nilaiProp4) document.querySelector('input[name="nilaiProp4"][value="'+sidang.nilaiProp4+'"]').checked = true;
  
  // get data from vPillsNilaiLap1 (Penilaian 1)
  if(sidang.nilaiLap11) document.getElementById('nilaiLap11').value = sidang.nilaiLap11;
  if(sidang.timbangLap11) document.getElementById('timbangLap11').value = sidang.timbangLap11;
  if(sidang.nilaiLap12) document.getElementById('nilaiLap12').value = sidang.nilaiLap12;
  if(sidang.timbangLap12) document.getElementById('timbangLap12').value = sidang.timbangLap12;
  if(sidang.nilaiLap13) document.getElementById('nilaiLap13').value = sidang.nilaiLap13;
  if(sidang.timbangLap13) document.getElementById('timbangLap13').value = sidang.timbangLap13;
  if(sidang.nilaiLap14) document.getElementById('nilaiLap14').value = sidang.nilaiLap14;
  if(sidang.timbangLap14) document.getElementById('timbangLap14').value = sidang.timbangLap14;
  if(sidang.total1) document.getElementById('total1').value = sidang.total1;

  // get data from vPillsNilaiLap2 (Penilaian 2)
  if(sidang.nilaiLap21) document.getElementById('nilaiLap21').value = sidang.nilaiLap21;
  if(sidang.timbangLap21) document.getElementById('timbangLap21').value = sidang.timbangLap21;
  if(sidang.nilaiLap22) document.getElementById('nilaiLap22').value = sidang.nilaiLap22;
  if(sidang.timbangLap22) document.getElementById('timbangLap22').value = sidang.timbangLap22;
  if(sidang.nilaiLap23) document.getElementById('nilaiLap23').value = sidang.nilaiLap23;
  if(sidang.timbangLap23) document.getElementById('timbangLap23').value = sidang.timbangLap23;
  if(sidang.nilaiLap24) document.getElementById('nilaiLap24').value = sidang.nilaiLap24;
  if(sidang.timbangLap24) document.getElementById('timbangLap24').value = sidang.timbangLap24;
  if(sidang.total2) document.getElementById('total2').value = sidang.total2;
    
  // get data from vPillsBerita (Berita Acara)
  if(sidang.revisiPropDosen1) document.querySelector('input[name="revisiPropDosen1"][value="'+sidang.revisiPropDosen1+'"]').checked = true;
  if(sidang.revisiPropDosen2) document.querySelector('input[name="revisiPropDosen2"][value="'+sidang.revisiPropDosen2+'"]').checked = true;
  if(sidang.statusProp) document.querySelector('input[name="statusProp"][value="'+sidang.statusProp+'"]').checked = true;
  if(sidang.revisiLapDosen11) document.querySelector('input[name="revisiLapDosen11"][value="'+sidang.revisiLapDosen11+'"]').checked = true;
  if(sidang.nilaiTotalDosen12) document.getElementById('nilaiTotalDosen12').value = sidang.nilaiTotalDosen12;
  if(sidang.revisiLapDosen12) document.querySelector('input[name="revisiLapDosen12"][value="'+sidang.revisiLapDosen12+'"]').checked = true;
  if(sidang.nilaiTotalDosen13) document.getElementById('nilaiTotalDosen13').value = sidang.nilaiTotalDosen13;
  if(sidang.revisiLapDosen13) document.querySelector('input[name="revisiLapDosen13"][value="'+sidang.revisiLapDosen13+'"]').checked = true;
  if(sidang.nilaiTotalDosen14) document.getElementById('nilaiTotalDosen14').value = sidang.nilaiTotalDosen14;
  if(sidang.revisiLapDosen14) document.querySelector('input[name="revisiLapDosen14"][value="'+sidang.revisiLapDosen14+'"]').checked = true;
  if(sidang.nilaiTotalSidang1) document.getElementById('nilaiTotalSidang1').value = sidang.nilaiTotalSidang1;
  if(sidang.nilaiHuruf1) document.getElementById('nilaiHuruf1').value = sidang.nilaiHuruf1;
  if(sidang.revisiLapDosen21) document.querySelector('input[name="revisiLapDosen21"][value="'+sidang.revisiLapDosen21+'"]').checked = true;
  if(sidang.nilaiTotalDosen22) document.getElementById('nilaiTotalDosen22').value = sidang.nilaiTotalDosen22;
  if(sidang.revisiLapDosen22) document.querySelector('input[name="revisiLapDosen22"][value="'+sidang.revisiLapDosen22+'"]').checked = true;
  if(sidang.nilaiTotalDosen23) document.getElementById('nilaiTotalDosen23').value = sidang.nilaiTotalDosen23;
  if(sidang.revisiLapDosen23) document.querySelector('input[name="revisiLapDosen23"][value="'+sidang.revisiLapDosen23+'"]').checked = true;
  if(sidang.nilaiTotalDosen24) document.getElementById('nilaiTotalDosen24').value = sidang.nilaiTotalDosen24;
  if(sidang.revisiLapDosen24) document.querySelector('input[name="revisiLapDosen24"][value="'+sidang.revisiLapDosen24+'"]').checked = true;
  if(sidang.nilaiTotalSidang2) document.getElementById('nilaiTotalSidang2').value = sidang.nilaiTotalSidang2;
  if(sidang.nilaiHuruf2) document.getElementById('nilaiHuruf2').value = sidang.nilaiHuruf2;
  if(sidang.statusLap) document.querySelector('input[name="statusLap"][value="'+sidang.statusLap+'"]').checked = true;
}
