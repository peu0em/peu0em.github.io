var postShareTimeout;
let postShareTimeoutOn = false;
function postShare() {
  window.navigator.clipboard.writeText(window.location.href.replace(/#.*/,""));
  if(postShareTimeoutOn) clearTimeout(postShareTimeout)
  else{
    postShareTimeoutOn = true;
    document.getElementById("upbar-shareB-noti").classList.toggle("v");
  }
  postShareTimeout = setTimeout(() => {
    document.getElementById("upbar-shareB-noti").classList.toggle("v");
    postShareTimeoutOn = false;
  },2200);
}