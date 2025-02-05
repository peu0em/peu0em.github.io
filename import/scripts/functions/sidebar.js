function sidebarMC(id){
  if(id){
    let main = document.getElementsByClassName("sidebar-main")[0];
    document.getElementById(main.dataset.display).setAttribute("hidden","");
    document.getElementById(id).removeAttribute("hidden");
    main.dataset.display = id;

    if(langUrlKr){
      if(typeof langUrlKrC == "undefined") var langUrlKrC = langUrlKr;
      langUrlKr = langUrlKrC + "#" + id;
    }
    if(langUrlEn){
      if(typeof langUrlEnC == "undefined") var langUrlEnC = langUrlEn;
      langUrlEn = langUrlEnC + "#" + id;
    }
  }
}
function sidebarBS(){
  let cId = getIdFromUrl();
  if(cId) sidebarMC(cId);
}