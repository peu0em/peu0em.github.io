var canHover = window.matchMedia("(hover:hover)").matches;

function getIdFromUrl(){
  let url = window.location.href;
  let idch = url.replace(/^.+\#/,";");
  return (url==idch)?false:idch.replace(/[^(\w|\-)].*/,";");
}

// theme
{
  document.body.dataset.theme = window.localStorage.getItem("theme") || (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "default");
}