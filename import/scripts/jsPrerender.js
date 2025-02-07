// theme
{
  /* let themeItem = window.localStorage.getItem("theme"); */
  document.body.dataset.theme = "default" /* themeItem?
    themeItem:(
      window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"default"
    ) */
  ;
}