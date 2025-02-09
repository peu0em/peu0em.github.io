function sidebar_mainchange(id){
  if(id){
    let main = document.getElementsByClassName("sidebar-main")[0];
    document.getElementById(main.dataset.display).setAttribute("hidden","");
    document.getElementById(id).removeAttribute("hidden");
    main.dataset.display = id;
  }
}
function sidebar_bottomscript(){
  let cId = get_id_from_url();
  if(cId) sidebar_mainchange(cId);
}