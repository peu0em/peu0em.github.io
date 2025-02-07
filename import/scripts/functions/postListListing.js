let reg, filtered, paramSearch;
let space = document.getElementById('post-list');
let params = new URLSearchParams(window.location.search);
if(params.has('search')){
  paramSearch = params.get('search').replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    if(!/\s/.test(paramSearch)) reg = new RegExp(paramSearch,'i');
    else reg = new RegExp(paramSearch.split(' ').join('|'), 'i');
}else{
  reg = /./;
}

fetch("/import/data/postList.json")
  .then(response => {
    if(response.ok) return response.json();
  })
  .then(data => {
    filtered = data.posts.filter(post=>{
      return reg.test(post.title) || reg.test(post.description) || reg.test(post.tags);
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