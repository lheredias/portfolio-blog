document.addEventListener('DOMContentLoaded', function() {

  document.querySelector('#about_link').addEventListener('click', about_view)
  document.querySelector('#project_link').addEventListener('click', project_view)

  document.addEventListener('click', event=> {
    if (event.target.innerText == ' back') {
      project_view()
    }
    let article_id = event.target.getAttribute('data-post');
    if(article_id) { 
      console.log(article_id)
      STORE.article_id=article_id
      article_view()
    }
    })

  // about_view()
  console.log(STORE.page)
  let page = STORE.page
  let module = ROUTER[page]
  module()

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

STORE = {
  page: fromLocalStorage("current-page") || "home",
  article_id: fromLocalStorage("article_id") || null
}

ROUTER = {
  "home":about_view,
  "projects":project_view,
  "article":article_view,
}

function fromLocalStorage(key) {
  const data = JSON.parse(localStorage.getItem("rh_blog")) || {};
  return data[key];
}

function saveToLocalStorage(key, value) {
  let data = JSON.parse(localStorage.getItem("rh_blog")) || {};
  data = { ...data, [key]: value };
  localStorage.setItem("rh_blog", JSON.stringify(data));
}

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
  saveToLocalStorage("current-page", "home")

}

function project_view() {

  document.querySelector('#about').style.display = 'none';
  document.querySelector('#projects').style.display = 'block';
  document.querySelector('#articles').style.display = 'none';
  hide_articles()
  saveToLocalStorage("current-page", "projects")

}

function article_view() {
  if (STORE.article_id) {
    console.log("here")
    document.querySelector('#about').style.display = 'none';
    document.querySelector('#projects').style.display = 'none';
    hide_articles()
    document.querySelector('#articles').style.display = 'block';
    document.getElementById(STORE.article_id).style.display = 'block';
    saveToLocalStorage("current-page", "article") 
    saveToLocalStorage("article_id", STORE.article_id) 
  } else {
    console.log("got here")
  }
}