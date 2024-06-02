document.addEventListener('DOMContentLoaded', function() {
  // set menuNamaDosen innerHTML to namaDosen on active sidang
  document.getElementById('inputNamaDosen').value = sidangs[config.active].namaDosen;
  // set radio checked
  document.querySelector('input[name="jenis"][value="'+sidangs[config.active].jenis+'"]').checked = true;
  document.querySelector('input[name="status"][value="'+sidangs[config.active].statusDosen+'"]').checked = true;
  document.querySelector('input[name="jumlah"][value="'+sidangs[config.active].timMhs+'"]').checked = true;

  // if formSidangBaru is submitted
  document.getElementById('formSidangBaru').addEventListener('submit', (e) => {
    e.preventDefault();

    let sidang = sidangs[config.active];

    sidang.namaDosen = document.getElementById('inputNamaDosen').value;
    sidang.statusDosen = document.querySelector('input[name="status"]:checked').value;
    sidang.jenis = document.querySelector('input[name="jenis"]:checked').value;
    sidang.timMhs = document.querySelector('input[name="jumlah"]:checked').value;

    // update current active sidang
    sidangs[config.active] = sidang;
    
    // update local storage 'sidangs'
    localStorage.setItem('sidangs', JSON.stringify(sidangs));
    // redirect to form.html
    window.location.href = 'forms.html';
  });
});