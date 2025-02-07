{
  let reg, postList, filtered, paramSearch;

  paramSearch = new URLSearchParams(window.location.search).get('search').replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  if(!/\s/.test(paramSearch)) reg = new RegExp(paramSearch,'i');
  else{
    reg = new RegExp(paramSearch.split(' ').join('|'), 'i');
  }

  fetch("/import/data/postList.json")
    .then(response => {
      if(response.ok) return response.json();
    })
    .then(data => {
      postList = data.posts;

      filtered = postList.filter(post=>{
        return reg.test(post.title) || reg.test(post.description) || reg.test(post.tags);
      });

      listing(filtered);

    })
    .catch(error => console.log('post listing error: ',error))
  ;
}

function listing(list){
  let space = document.getElementById('post-list');
  list.forEach(post=>{
    let aTag = document.createElement('a');
    aTag.innerHTML = "<li class='badge'>"+(post.thumbnail?"<img class='thumbnail' src='"+post.thumbnail+"'>":"")+"<h2 class='title'>"+post.title+"</h2><div class='description'>"+post.description+"</div></li>";
    aTag.setAttribute('href',post.url);
    space.appendChild(aTag);
  })
  if(list.length<1) document.getElementById('noResult').hidden=false;
}