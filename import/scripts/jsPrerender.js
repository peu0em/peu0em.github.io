// theme
{
  /* let themeItem = window.localStorage.getItem("theme"); */
  document.body.dataset.theme = /* themeItem?
    themeItem:( */
      window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"default" /*
    ) */
  ;
}