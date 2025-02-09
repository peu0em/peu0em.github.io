var can_hover = window.matchMedia("(hover:hover)").matches;

function get_id_from_url(){
  let url = window.location.href;
  let idch = url.replace(/^.+\#/,";");
  return (url==idch)?false:idch.replace(/[^(\w|\-)].*/,";");
}