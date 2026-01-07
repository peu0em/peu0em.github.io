function sidebar_mc(id){
  if(id){
    const main = document.getElementsByClassName("sidebar-main")[0];
    document.getElementById(main.dataset.display).hidden = true;
    document.getElementById(id).hidden = false;
    main.dataset.display = id;
  }
}
{
  let id = id_fromurl();
  if(id) sidebar_mc(id);
}