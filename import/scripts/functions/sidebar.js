function sidebar_mc(id){
  if(id){
    let main = document.getElementsByClassName("sidebar-main")[0];
    document.getElementById(main.dataset.display).setAttribute("hidden","");
    document.getElementById(id).removeAttribute("hidden");
    main.dataset.display = id;
  }
}
{
  let cId = get_id_from_url();
  if(cId) sidebar_mc(cId);
}