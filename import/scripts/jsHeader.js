var canHover = window.matchMedia("(hover:hover)").matches;

function getIdFromUrl(){
  let url = window.location.href;
  let idch = url.replace(/^.+\#/,";");
  return (url==idch)?false:idch.replace(/[^(\w|\-)].*/,";");
}

// theme
{
  /* let themeItem = window.localStorage.getItem("theme"); */
  document.body.dataset.theme = /* themeItem?
    themeItem:( */
      window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"default" /*
    ) */
  ;
}