function getIdFromUrl(){
  let url = window.location.href;
  let idch = url.replace(/^.+\#/,";");
  return (url==idch)?false:idch.replace(/[^(\w|\-)].*/,";");
}