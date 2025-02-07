var upbarSearchTyped;
function searchStringChange(str) {
  str = str.replace(/^[\s|\t|\,]+|[\s|\t|\,]+$/g,"");
  return str;
}
function upbarSearchF(){
  upbarSearchTyped = document.getElementById("upbar-search-bar").value;
  if(!/^\s*\t*$/.test(upbarSearchTyped)){
    location.href='/list/?search='+searchStringChange(upbarSearchTyped);
  }
}
function upbarSearchIsitenter(cPressed){if (cPressed == 13){upbarSearchF();}}