function footnoeP(obj){
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
  let fnlist = document.querySelectorAll(".c-footnote.c-t");
  for(let i=0;i<fnlist.length;i++){
    let fnnum = fnlist[i].getElementsByClassName("c-n")[0];
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
        if(!canHover){
          let fnbar = document.createElement("span");
          fnbar.setAttribute("class","c-bar");
          fnbar.innerHTML = "<a href=\'"+fnhref+"\' onclick=\'this.parentNode.parentNode.style.display = \"none\"\;\'>↓</a><a onclick=\'this.parentNode.parentNode.style.display = \"none\"\;\'>×</a>";
          fnlist[i].querySelector(":not(.n)").prepend(fnbar);
        }
      }
      switch(canHover){
        case true: fnlist[i].addEventListener("mouseover",()=>{footnoeP(fnnum);}); break;
        case false:{
          fnnum.removeAttribute("href");
          fnnum.addEventListener("click",()=>{
            let fnbl = fnlist[i].querySelector(":not(.n)");
            if(fnbl) fnbl.style.display = "block";
            footnoeP(fnnum);
          });
        } break;
      }
    }
  }
}