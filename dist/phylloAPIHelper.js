

const url = new URL(window.location.toLocaleString());
const parameters = new URLSearchParams(url.search);
const handle = parameters.get('handle');
const external_id = parameters.get('id');
const pid = parameters.get('pid');
const sdk = parameters.get('sdk');
const isExistingUser = parameters.get('exists');
const workpid = parameters.get('workpid');
const platform = parameters.get('platform');


  localStorage.setItem('auth', auth.toString());
  localStorage.setItem('pid', pid.toString());
  localStorage.setItem('external_id', external_id.toString());
  localStorage.setItem('handle', handle.toString());
  localStorage.setItem('sdk', sdk.toString());
  localStorage.setItem('isExistingUser', isExistingUser.toString());
  localStorage.setItem('workpid', workpid.toString());
  localStorage.setItem('platform', platform.toString());
  



