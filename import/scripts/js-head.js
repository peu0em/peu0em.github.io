const can_hover = window.matchMedia("(hover:hover)").matches;

{
  let url = window.location.href;
  let idch = url.replace(/^.+\#/,"");
  var id_from_url = (url==idch)?false:idch.replace(/[^(\w|\-)].*/,";");
}