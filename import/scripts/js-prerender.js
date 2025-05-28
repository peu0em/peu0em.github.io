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
  let loading = document.createElement("div");

  loading.innerHTML = "&#x231B;";
  loading.className = "placeholder";

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
  st.addEventListener("load",()=>{loading.remove();})
  st.addEventListener("error",()=>{
    loading.innerHTML = "&#x274C;";
  });

  parent.innerHTML = "";
  parent.appendChild(loading);
  parent.appendChild(st);
}