// footnote
function footnoe_position(obj){
  let pst = obj.getBoundingClientRect().left;
  let blln = obj.parentNode.querySelector(":not(.n)");
  let wdth = blln.offsetWidth;
  let win = document.body.clientWidth;
  if(wdth >= win-20){					//big
    blln.style.width = (win-20) + "px";
    obj.parentNode.setAttribute("style","--left:"+(pst-10)+"px");
  } else if(wdth/2 > (pst-10)){		//left out
    obj.parentNode.setAttribute("style","--left:"+(pst-10)+"px");
  } else if(wdth/2 > (win-pst-15)){	//right out
    obj.parentNode.setAttribute("style","--left:"+(wdth-win+pst+15)+"px");
  } else {								//compact
    obj.parentNode.setAttribute("style","--left:"+(wdth/2-10)+"px");
  }
}
{
  let fnlist = document.querySelectorAll(".footnote.t");
  for(let i=0;i<fnlist.length;i++){
    let fnnum = fnlist[i].getElementsByClassName("n")[0];
    if(fnnum){
      let fnhref = fnnum.getAttribute("href");
      if(fnhref){
        if(!fnlist[i].querySelector(":not(.n)")){
          let fnid = document.getElementById(fnhref.replace("#",""));
          if(fnid){
            let fndetail = fnid.querySelector(":scope>*:not(.n)");
            if(fndetail){
              let fninner = fndetail.innerHTML;
              if(fninner){
                let span = document.createElement("span");
                span.innerHTML = fninner;
                fnlist[i].appendChild(span);
              }
            }
          }
        }
        if(!can_hover){
          let fnbar = document.createElement("span");
          fnbar.setAttribute("class","bar");
          fnbar.innerHTML = "<a href=\'"+fnhref+"\' onclick=\'this.parentNode.parentNode.style.display = \"none\"\;\'>↓</a><a onclick=\'this.parentNode.parentNode.style.display = \"none\"\;\'>×</a>";
          fnlist[i].querySelector(":not(.n)").prepend(fnbar);
        }
      }
      switch(can_hover){
        case true: fnlist[i].addEventListener("mouseover",()=>{footnoe_position(fnnum);}); break;
        case false:{
          fnnum.removeAttribute("href");
          fnnum.addEventListener("click",()=>{
            let fnbl = fnlist[i].querySelector(":not(.n)");
            if(fnbl) fnbl.style.display = "block";
            footnoe_position(fnnum);
          });
        } break;
      }
    }
  }
}

// scroll
function upbar_scroll_up(){window.scrollTo(0,0);}
function upbar_scroll_down(){window.scrollTo(0,document.body.scrollHeight);}

// theme
function theme_change(){
  switch(document.body.dataset.theme){
    case "default":
      document.body.dataset.theme = "dark";
      window.localStorage.setItem("theme","dark");
    break;
    case "dark":
      document.body.dataset.theme = "default";
      window.localStorage.setItem("theme","default");
    break;
    default:
      console.log("No Theme");
  }
}

// language
{
  let current = document.documentElement.getAttribute('lang');
  let selector = document.getElementById("lang-select");
  selector.addEventListener("change",()=>{
    if(selector.value!=current) window.location.href = (window['lang_url_'+selector.value])?window['lang_url_'+selector.value]:"/404-language";
  });
}

// postshare
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

// search
var upbar_search_typed;
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
function upbar_search_isitenter(pressed){if (pressed == 13){upbar_search_function();}}