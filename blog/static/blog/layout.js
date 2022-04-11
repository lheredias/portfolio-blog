document.addEventListener('DOMContentLoaded', function() {
    
  document.querySelector('#about_link').addEventListener('click', about_view)
  document.querySelector('#project_link').addEventListener('click', project_view)
  hide_articles()

  document.addEventListener('click', event=> {
    if (event.target.innerText == ' back') {
      project_view()
    }
    let article_id = event.target.getAttribute('data-post');
    if(article_id) { 
      console.log(article_id)
      article_view(article_id)
    }
    })

  about_view()

  $(function () {
    $('[data-toggle="tooltip"]').tooltip()
  })

  const darkThemeMq = window.matchMedia("(prefers-color-scheme: dark)");
  if (darkThemeMq.matches) {
    document.getElementsByTagName('body')[0].className=`bg-dark text-light`
  } else {
    document.getElementsByTagName('body')[0].className=`bg-white text-dark`
  }
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
    if (colorScheme === "dark") {
      document.getElementsByTagName('body')[0].className=`bg-dark text-light`
		} else {
      document.getElementsByTagName('body')[0].className=`bg-white text-dark`

		}
  });
})

function hide_articles() {
  let articles = document.getElementsByName("article")
  articles.forEach((article => {
    article.style.display='none'
  }))
}

function about_view() {

  document.querySelector('#about').style.display = 'block';
  document.querySelector('#projects').style.display = 'none';
  document.querySelector('#articles').style.display = 'none';
  hide_articles()

}

function project_view() {

  document.querySelector('#about').style.display = 'none';
  document.querySelector('#projects').style.display = 'block';
  document.querySelector('#articles').style.display = 'none';
  hide_articles()

}

function article_view(post_id) {

  document.querySelector('#about').style.display = 'none';
  document.querySelector('#projects').style.display = 'none';
  document.querySelector('#articles').style.display = 'block';
  document.getElementById(post_id).style.display = 'block';

}