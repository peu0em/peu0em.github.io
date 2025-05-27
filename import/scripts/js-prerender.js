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

// comment 
function createComments(){
  const parent = document.getElementsByClassName("comments")[0];
  let theme;
  let st = document.createElement("script");
  switch(document.body.dataset.theme){
    case "default": theme="github-light"; break;
    case "dark": theme = "github-dark"; break;
    default: theme="github-light";
  }
  st.setAttribute("src","https://utteranc.es/client.js");
  st.setAttribute("repo","peu0em/jekyll-comment");
  st.setAttribute("issue-term","pathname");
  st.setAttribute("theme",theme);
  st.setAttribute("crossorigin","anonymous");
  st.setAttribute("async","");
  parent.innerHTML = "";
  parent.appendChild(st);
}