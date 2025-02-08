let filtered, mode, term;
let space = document.getElementById('post-list');
let params = new URLSearchParams(window.location.search);
if(params.has('search')){
  mode='search';
  let paramSearch = params.get('search').replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  if(!/\s/.test(paramSearch)) term = new RegExp(paramSearch,'i');
  else term = new RegExp(paramSearch.split(' ').join('|'), 'i');
}else if(params.has('tag')){
  mode='tag';
  term = params.get('tag');
}else mode='all';

fetch("/import/data/postList.json")
  .then(response => {
    if(response.ok) return response.json();
  })
  .then(data => {
    filtered = data.posts.filter(post=>{
      switch(mode){
        case 'search':
          return term.test(post.title) || term.test(post.description) || term.test(post.tags);
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
    if(filtered.length > 0){
      listing(filtered);
    }else{
      document.getElementById('noResult').hidden=false;
    }

  })
  .catch(error => console.log('post listing error: ',error))
;


async function listing(list){
  try{
    for(let post of list){
      let aTag = document.createElement('a');
      aTag.innerHTML = "<li class='badge'>"+(post.thumbnail?"<img class='thumbnail' src='"+post.thumbnail+"'>":"")+"<h2 class='title'>"+post.title+"</h2><div class='description'>"+post.description+"</div></li>";
      aTag.setAttribute('href',post.url);
      space.appendChild(aTag);
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
  }catch(error){
    console.log('listing error: '+error);
  }
}