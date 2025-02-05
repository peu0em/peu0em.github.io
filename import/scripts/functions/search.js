var upbarSearchTyped;
function searchStringChange(str) {
  str = str.replace(/^[\s|\t|\,]+|[\s|\t|\,]+$/g,"");
  str = str.replace(/[\s|\t|\,]+/g,"|") + '|label:' + str.replace(/[\s|\t|\,]+/g,"|label:");
  return str;
}
function upbarSearchF(){
  upbarSearchTyped = document.getElementById("upbar-search-bar").value;
  if(!/^\s*\t*$/.test(upbarSearchTyped)){
    location.href="https://peu0em.blogspot.com/search/?q="+searchStringChange(upbarSearchTyped);
  }
}
function upbarSearchIsitenter(cPressed){if (cPressed == 13){upbarSearchF();}}