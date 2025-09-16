{
  let filtered, mode, term;
  const pdiv = document.currentScript.parentElement;
  const space = pdiv.getElementsByTagName("ul")[0];
  const params = new URLSearchParams(window.location.search);
  const placeholder = pdiv.getElementsByClassName("placeholder")[0];
  const noResult = pdiv.getElementsByClassName("no-result")[0];
  const card = pdiv.getElementsByClassName("card")[0];

  function cardText(mark,text){
    var flex = document.createElement("h1");
    flex.style.display = "flex";
    flex.style.justifyContent = "center";
    flex.classList.add("no-deco");

    var flexMark = document.createElement("div");
    flexMark.innerHTML = mark;
    flexMark.style.textAlign = "right";

    var flexText = document.createElement("div");
    flexText.innerHTML = text;
    flexText.style.textAlign = "left";

    flex.appendChild(flexMark);
    flex.appendChild(flexText);

    card.appendChild(flex);

    card.hidden = false;
  }

  if(params.has('search')){
    mode='search';
    var paramSearch = params.get('search').replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    if(!/\s/.test(paramSearch)) term = new RegExp(paramSearch,'i');
    else term = new RegExp(paramSearch.split(' ').join('|'), 'i');
    cardText("🔍&nbsp;",paramSearch);
  }else if(params.has('tag')){
    mode='tag';
    term = params.get('tag');
    cardText("#",term);
  }else mode='all';

  fetch("/import/data/postlist.json")
    .then(response => {
      if(response.ok) return response.json();
    })
    .then(data => {
      let listOrder1 = [];
      let listOrder2 = [];

      data.posts.forEach(post=>{
        switch(mode){
          case 'search':
            const table = [post.title || '',post.description || '',(post.tags || []).join(' '),(post.keywords || []).join(' ')].join(' ').toLowerCase();
            if(table.includes(paramSearch.toLowerCase())) listOrder1.push(post);
            else if(term.test(table)) listOrder2.push(post);
          break;
          case 'tag':
            if(post.tags.includes(term)) listOrder1.push(post);
          break;
          case 'all':
            listOrder1.push(post);
          break;
          default: console.log('error');
        }
      });
      const filtered = [...listOrder1,...listOrder2];
      if(filtered.length > 0) listing(filtered);
      else{
        placeholder.hidden=true;
        noResult.hidden=false;
        space.hidden=true;
      }

    })
    .catch(error => console.log('post listing error: ',error))
  ;


  async function listing(list){
    try{
      for(let post of list){
        let a_tag = document.createElement('a');
        a_tag.innerHTML = "<li class='badge'>"+(post.thumbnail?"<div class='thumbnail'><img src='"+post.thumbnail+"'></div>":"")+"<h2 class='title'>"+post.title+"</h2><div class='description'>"+post.description+"</div></li>";
        a_tag.setAttribute('href',post.url);
        space.appendChild(a_tag);
        await new Promise((resolve)=>{
          let observer = new IntersectionObserver((block)=>{
            block.forEach((block)=>{
              if(block.isIntersecting){
                observer.unobserve(block.target);
                resolve();
              }
            });
          });
          observer.observe(space.lastElementChild);
        });
      }
      placeholder.hidden=true;
    }catch(error){
      console.log('listing error: '+error);
    }
  }
}