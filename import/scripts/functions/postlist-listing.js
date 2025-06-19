let filtered, mode, term;
const pdiv = document.currentScript.parentElement;
const space = pdiv.getElementsByTagName("ul")[0];
const params = new URLSearchParams(window.location.search);
const placeholder = pdiv.getElementsByClassName("placeholder")[0];
const noResult = pdiv.getElementsByClassName("no-result")[0];

if(params.has('search')){
  mode='search';
  let paramSearch = params.get('search').replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  if(!/\s/.test(paramSearch)) term = new RegExp(paramSearch,'i');
  else term = new RegExp(paramSearch.split(' ').join('|'), 'i');
}else if(params.has('tag')){
  mode='tag';
  term = params.get('tag');
}else mode='all';

fetch("/import/data/postlist.json")
  .then(response => {
    if(response.ok) return response.json();
  })
  .then(data => {
    filtered = data.posts.filter(post=>{
      switch(mode){
        case 'search':
          return term.test(post.title) || term.test(post.description) || term.test(post.tags) || term.test(post.keywords);
        break;
        case 'tag':
          return post.tags.includes(term);
        break;
        case 'all':
          return true;
        break;
        default: console.log('error');
      }
    });
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