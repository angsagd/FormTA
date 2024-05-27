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
