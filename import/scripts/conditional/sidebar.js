{
  function sidebar_mc(id){
    if(id){
      const main = document.getElementsByClassName("sidebar-main")[0];
      document.getElementById(main.dataset.display).hidden = true;
      document.getElementById(id).hidden = false;
      main.dataset.display = id;
    }
  }

  function sidebar(){
    let id = id_fromurl();
    if(id) sidebar_mc(id);

    const anchors = document.getElementsByClassName("sidebar-link");
    for(tag of anchors){
      const href = tag.getAttribute("href");
      const id = (href[0] === '#')?href.slice(1):false;
      if(href != id) tag.addEventListener("click",()=>{ sidebar_mc(id) });
    }
  }
  if(document.readyState === "loading") document.addEventListener("DOMContentLoaded",sidebar);
  else sidebar();
}