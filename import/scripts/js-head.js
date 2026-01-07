const url = window.location.href;
const lang_list = ["ko","en"];
function hover_possible(){ return window.matchMedia("(hover:hover)").matches; }
function id_fromurl(){
  const idch = url.replace(/^.+\#/,"");
  return (url==idch)?false:idch.replace(/[^(\w|\-)].*/,";");
};

const html_data = document.documentElement.dataset;

// END: global

// theme
{
  let themeItem = window.localStorage.getItem("theme");
  html_data.theme =
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
  result = (lang_list.includes(result))?result:"ko";
  html_data.lang = result;
}

// comment 
function comment_create(){
  const parent = document.getElementsByClassName("comments")[0];
  if(parent){
    let theme;
    let st = document.createElement("script");
    let loading = document.createElement("div");

    loading.innerHTML = "&#x231B;";
    loading.className = "placeholder";

    theme = (()=>{
      const themeAttr = html_data.theme;
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
}