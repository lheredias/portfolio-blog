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
  
  window.addEventListener('popstate', function() {
    routing(pop=true)
  });
  routing()

  // let page = STORE.page
  // let module = ROUTER[page]
  // module()
  // about_view()

  $(function () {
    $('[data-toggle="tooltip"]').tooltip()
  })

  themeHandler() 
  // const darkThemeMq = window.matchMedia("(prefers-color-scheme: dark)");
  // if (darkThemeMq.matches) {
  //   document.getElementsByTagName('body')[0].className=`bg-dark text-light`
  //   Array.from(document.getElementsByClassName('alert-custom')).forEach(element => {
  //     element.className=`alert-custom alert-dark`
  //   })

  // } else {
  //   document.getElementsByTagName('body')[0].className=`bg-white text-dark`
  //   Array.from(document.getElementsByClassName('alert-custom')).forEach(element => {
  //     element.className=`alert-custom alert-light`
  //   })
  // }
  // window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
  //   if (colorScheme === "dark") {
  //     document.getElementsByTagName('body')[0].className=`bg-dark text-light`
  //     Array.from(document.getElementsByClassName('alert-custom')).forEach(element => {
  //       element.className=`alert-custom alert-dark`
  //     })
	// 	} else {
  //     document.getElementsByTagName('body')[0].className=`bg-white text-dark`
  //     Array.from(document.getElementsByClassName('alert-custom')).forEach(element => {
  //       element.className=`alert-custom alert-light`
  //     })
	// 	}
  // });
})

function themeHandler() {
  const darkThemeMq = window.matchMedia("(prefers-color-scheme: dark)");
  let body = document.getElementsByTagName('body')[0]
  let skills = Array.from(document.getElementsByClassName('skill'))
  let customAlerts = Array.from(document.getElementsByClassName('alert-custom'))
  if (darkThemeMq.matches) {
    darkTheme(body, customAlerts, skills)
  } else {
    lightTheme(body, customAlerts, skills)
  }
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
    if (colorScheme === "dark") {
      darkTheme(body, customAlerts, skills)
		} else {
      lightTheme(body, customAlerts, skills)
		}
  });
}

function lightTheme(body, customAlerts, skills) {
  body.className=`bg-white text-dark`
  customAlerts.forEach(element => {
    element.className=`alert-custom alert-light`
  })
  skills.forEach(element => {
    element.className=`list-group-item skill flex-column skill-light`
  })
}

function darkTheme(body, customAlerts, skills) {
  body.className=`bg-dark text-light`
  customAlerts.forEach(element => {
    element.className=`alert-custom alert-dark`
  })
  skills.forEach(element => {
    element.className=`list-group-item skill flex-column skill-dark`
  })
}

STORE = {
  page: fromLocalStorage("current-page") || "/",
  article_id: fromLocalStorage("article_id") || null
}

ROUTER = {
  "/":about_view,
  "/projects":project_view,
  // "/article":article_view,
}

function onNavigate(pathname) {
  window.history.pushState(
    {},
    pathname,
    window.location.origin + pathname
  )
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

function routing(pop=false) {
  let articleRegex = /^\/projects\/[1-9]+[0-9]*$/
  let idRegex = /[1-9]+[0-9]*$/
  let page = window.location.pathname
  if (Object.keys(ROUTER).includes(page)) {
    let module = ROUTER[page]
    module(pop)
  } else if (articleRegex.test(page)) {
    let article_id = page.match(idRegex)
    if (article_id) {
      let postElement = (document.querySelector(`[data-post='${article_id}']`))
      if (postElement) {
        STORE.article_id=article_id[0]
        article_view(pop)
      } else {
        about_view(pop=false)
      }    
    } else {
      about_view(pop)
    }
  } else {
    about_view(pop)
  }
}

function hide_views() {
  document.querySelector('#about').style.display = 'none';
  document.querySelector('#projects').style.display = 'none';
  document.querySelector('#articles').style.display = 'none';
  hide_articles()
}

function about_view(pop=false) {
  if (pop !== true) {
    onNavigate("")
  }
  document.querySelector('#about').style.display = 'block';
  document.querySelector('#projects').style.display = 'none';
  document.querySelector('#articles').style.display = 'none';
  hide_articles()
  saveToLocalStorage("current-page", "/")

}

function project_view(pop=false) {
  if (pop!==true) {
    onNavigate("/projects")
  }
  document.querySelector('#about').style.display = 'none';
  document.querySelector('#projects').style.display = 'block';
  document.querySelector('#articles').style.display = 'none';
  hide_articles()
  saveToLocalStorage("current-page", "/projects")

}

function article_view(pop=false) {
  if (pop!==true) {
    onNavigate(`/projects/${STORE.article_id}`)
  }
  document.querySelector('#about').style.display = 'none';
  document.querySelector('#projects').style.display = 'none';
  hide_articles()
  document.querySelector('#articles').style.display = 'block';
  document.getElementById(STORE.article_id).style.display = 'block';
  saveToLocalStorage("current-page", "article") 
  saveToLocalStorage("article_id", STORE.article_id) 

}