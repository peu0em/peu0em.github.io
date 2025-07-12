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
  const languageItem = window.localStorage.getItem("lang");
  const parameter = new URLSearchParams(new URL(url).search).get("lang");
  let result;
  if(languageItem) result = languageItem;
  else if(parameter) result = parameter;
  else result = "ko";
  result = (lang_list.includes(result))?result:"ko";
  document.body.dataset.lang = result;
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
    if(document.body.dataset.theme){
      switch(document.body.dataset.theme){
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