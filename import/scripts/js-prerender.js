// theme
{
  let themeItem = window.localStorage.getItem("theme");
  document.body.dataset.theme =
    themeItem?
      themeItem:(window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"default")
  ;
}

// language
{
  let languageItem = window.localStorage.getItem("lang");
  document.body.dataset.lang = languageItem?languageItem:document.documentElement.getAttribute("lang")?document.documentElement.getAttribute("lang"):"ko";
}