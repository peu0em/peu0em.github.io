const url = window.location.href;
const lang_list = ["ko","en"];

const can_hover = window.matchMedia("(hover:hover)").matches;

const id_from_url = (()=>{
  let idch = url.replace(/^.+\#/,"");
  return (url==idch)?false:idch.replace(/[^(\w|\-)].*/,";");
})();
