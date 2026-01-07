const url = window.location.href;
const htmlData = document.documentElement.dataset;
const langList = ["ko","en"];

const can_hover = window.matchMedia("(hover:hover)").matches;

const id_from_url = (()=>{
  const idch = url.replace(/^.+\#/,"");
  return (url==idch)?false:idch.replace(/[^(\w|\-)].*/,";");
})();

// END: global

// theme
{
  let themeItem = window.localStorage.getItem("theme");
  htmlData.theme =
    themeItem?
      themeItem:(window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"default")
  ;
}

// language
{
  const languageItem = window.localStorage.getItem("lang");
  const parameter = new URLSearchParams(new URL(url).search).get("lang");
  let result;
  if(languageItem) result = languageItem;
  else if(parameter) result = parameter;
  else result = "ko";
  result = (langList.includes(result))?result:"ko";
  htmlData.lang = result;
}

// comment 
function createComments(){
  const parent = document.getElementsByClassName("comments")[0];
  let theme;
  let st = document.createElement("script");
  let loading = document.createElement("div");

  loading.innerHTML = "&#x231B;";
  loading.className = "placeholder";

  theme = (()=>{
    const themeAttr = htmlData.theme;
    if(themeAttr){
      switch(themeAttr){
        case "default": return "github-light";
        case "dark": return "github-dark";
        default: return "github-light";
      }
    }else return "github-light";
  })();
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