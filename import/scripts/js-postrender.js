{
  function postrender(){
    //mask
    {
      const maskList = document.getElementsByClassName("mask");
      const wrapperList = [];
      for(let i=0; i<maskList.length; i++){
        const tag = maskList[i];

        const t = document.createDocumentFragment();
        while (tag.firstChild) t.appendChild(tag.firstChild);
        const wrapper = document.createElement("span");
        wrapper.appendChild(t);
        tag.appendChild(wrapper);
        
        wrapperList.push(wrapper);

        tag.style.cursor = "pointer";
        tag.setAttribute("tabindex","0");
        tag.setAttribute("role","button");
        tag.setAttribute("aria-label","[가려짐]");
        tag.classList.add("multilang");
        tag.dataset.ariaLabelKo = "[가려짐]";
        tag.dataset.ariaLabelEn = "[masked]";

        function d(){
            for(let j=0;j<maskList.length;j++){
              if(tag.dataset.maskGroup!=maskList[j].dataset.maskGroup) continue;
              wrapperList[j].style.visibility = "visible";
              maskList[j].style.backgroundColor = "unset";
              maskList[j].style.cursor = "";
              maskList[j].setAttribute("aria-hidden","false");
            }
        }
        tag.addEventListener("click",()=>{d();});
        tag.addEventListener("keydown",(event)=>{if(event.key==="Enter" || event.key===" ") d();});
      }
    }

    // footnote
    function footnote_position(obj){
      const pst = obj.getBoundingClientRect().left;
      const blln = obj.parentNode.querySelector(":not(.n)");
      const wdth = blln.offsetWidth;
      const win = document.body.clientWidth;
      let left;
      if(wdth >= win-20){					//big
        blln.style.width = (win-20) + "px";
        left = pst-10;
      } else if(wdth/2 > (pst-10)){		//left out
        left = pst-10;
      } else if(wdth/2 > (win-pst-15)){	//right out
        left = wdth-win+pst+15;
      } else {								//compact
        left = wdth/2-10;
      }
      obj.parentNode.setAttribute("style","--left:"+left+"px");
    }
    {
      const fnlist = document.querySelectorAll(".footnote.t");
      for(let i=0;i<fnlist.length;i++){
        const fnnum = fnlist[i].getElementsByClassName("n")[0];
        if(fnnum){
          const fnhref = fnnum.getAttribute("href");
          if(fnhref){
            if(!fnlist[i].getElementsByClassName("n")[0].nextElementSibling){
              const fnid = document.getElementById(fnhref.replace("#",""));
              if(fnid){
                const fnbn = fnid.getElementsByClassName("n")[0];
                if(fnbn){
                  const fndetail = fnbn.nextElementSibling;
                  if(fndetail){
                    const fninner = fndetail.innerHTML;
                    if(fninner){
                      let span = document.createElement("span");
                      span.innerHTML = fninner;
                      span.setAttribute("aria-hidden","true");
                      fnlist[i].appendChild(span);
                    }
                  }
                }
              }
            }
          }
          const balloon = fnlist[i].getElementsByClassName("n")[0].nextElementSibling;
          function ariahiddenSwitch(toggle){
            if(balloon){
              switch(toggle){
                case true: balloon.setAttribute("aria-hidden","true"); break;
                case false: balloon.setAttribute("aria-hidden","false"); break;
              }
            }
          }
          switch(hover_possible()){
            case true:{ 
              fnlist[i].addEventListener("mouseover",()=>{
                ariahiddenSwitch(false);
                footnote_position(fnnum);
              });
              fnlist[i].addEventListener("mouseout",()=>{ariahiddenSwitch(true);});
            } break;
            case false:{
              let fnbar = document.createElement("span");
              fnbar.setAttribute("class","bar");
              fnbar.innerHTML = "<a href=\'"+fnhref+"\'>↓</a><a>×</a>";
              fnlist[i].querySelector(":not(.n)").prepend(fnbar);
              fnnum.removeAttribute("href");
              fnnum.addEventListener("click",()=>{
                if(balloon) balloon.style.display = "block";
                ariahiddenSwitch(false);
                footnote_position(fnnum);
              });
              fnbar.firstElementChild.addEventListener("click",()=>{
                balloon.style.display = "none";
                ariahiddenSwitch(true);
              })
              fnbar.lastElementChild.addEventListener("click",()=>{
                balloon.style.display = "none";
                ariahiddenSwitch(true);
              })
            } break;
          }
        }
      }
    }

    // theme
    function theme_change(){
      switch(html_data.theme){
        case "default":
          html_data.theme = "dark";
          window.localStorage.setItem("theme","dark");
        break;
        case "dark":
          html_data.theme = "default";
          window.localStorage.setItem("theme","default");
        break;
        default:
          console.log("No Theme");
      }
      comment_create();
    }
    {
      let theme_button = document.getElementById('theme-button');
      if(theme_button) theme_button.addEventListener('click',theme_change);
    }

    // language
    function lang_refresh(){
      const langCurrent = html_data.lang;
      const mltag = document.getElementsByClassName("multilang");
      const prefix = "-"+langCurrent;
      for(const tag of mltag){
        let attrs = Array.from(tag.attributes).filter(attr => attr.name.endsWith(prefix) && attr.name.startsWith("data-")).reduce((arr, attr) => {
          arr.push(attr.name);
          return arr;
        },[]);
        for(const attr of attrs){
          if(attr.startsWith("data-content-")) tag.innerHTML = tag.getAttribute(attr);
          else tag.setAttribute(attr.replace(/^data-/,"").replace(new RegExp(prefix+"$"),""),tag.getAttribute(attr));
        }

        if(tag.classList.contains('tag')){
          for(const childTag of tag.children){
            const classes = childTag.classList;
            if(classes.contains('multilang-tag')) childTag.hidden = classes.contains(langCurrent)?false:true;
          }
        }
      }
    }
    {
      const selector = document.getElementById("lang-select");
      if(selector){
        selector.addEventListener("change",()=>{
          const sValue = selector.value;
          if(sValue != html_data.lang){
            const urlto = lang_url[sValue]?lang_url[sValue]:false;
            window.localStorage.setItem("lang",sValue);
            html_data.lang = sValue;
            if((typeof lang_all === "undefined" || !lang_all) && (document.documentElement.getAttribute('lang')!=sValue)) window.location.href = (urlto)?urlto:"/404-language";
            else lang_refresh();
          }
        });
      }
    }
    lang_refresh();
    {
      const langselect = document.getElementById("lang-select");
      const langAttr = html_data.lang;
      const langHtml = document.documentElement.getAttribute("lang");
      if(langselect) langselect.querySelector("[value='"+(langAttr?langAttr:(langHtml?langHtml:"ko"))+"']").setAttribute("selected","");
    }

    // upbar 
    if(document.getElementById('upbar')){

      function upbar_scroll_up(){window.scrollTo(-1,0);}
      function upbar_scroll_down(){window.scrollTo(-1,document.body.scrollHeight);}
      document.getElementById('upbar-move-button-up').addEventListener('click',upbar_scroll_up);
      document.getElementById('upbar-move-button-down').addEventListener('click',upbar_scroll_down);

      var post_share_timeout;
      let post_share_timeout_on = false;
      function post_share() {
        window.navigator.clipboard.writeText(window.location.href.replace(/#.*/,""));
        if(post_share_timeout_on) clearTimeout(post_share_timeout)
        else{
          post_share_timeout_on = true;
          document.getElementById("upbar-share-button-noti").classList.toggle("v");
        }
        post_share_timeout = setTimeout(() => {
          document.getElementById("upbar-share-button-noti").classList.toggle("v");
          post_share_timeout_on = false;
        },2200);
      }
      document.getElementById('upbar-share-button').addEventListener('click',post_share);

      {
        let upbar_search_typed;
        function search_string_change(str) {
          str = str.replace(/^[\s|\t|\,]+|[\s|\t|\,]+$/g,"");
          return str;
        }
        function upbar_search_function(){
          upbar_search_typed = document.getElementById("upbar-search-bar").value;
          if(!/^\s*\t*$/.test(upbar_search_typed)){
            location.href='/list?search='+search_string_change(upbar_search_typed);
          }
        }
        function upbar_search_isitenter(pressed){if (pressed == "Enter"){upbar_search_function();}}
      }
      document.getElementById('upbar-search-button').addEventListener('click',upbar_search_function);
      document.getElementById('upbar-search-bar').addEventListener('keydown',(event) => upbar_search_isitenter(event.key));
    }


  }
  if((document.readyState === "loading")) document.addEventListener("DOMContentLoaded", postrender);
  else postrender();
}