/*!
* Start Bootstrap - Clean Blog v6.0.9 (https://startbootstrap.com/theme/clean-blog)
* Copyright 2013-2023 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-clean-blog/blob/master/LICENSE)
*/
window.addEventListener('DOMContentLoaded', () => {
    let scrollPos = 0;
    const mainNav = document.getElementById('mainNav');
    const headerHeight = mainNav.clientHeight;
    window.addEventListener('scroll', function() {
        const currentTop = document.body.getBoundingClientRect().top * -1;
        if ( currentTop < scrollPos) {
            // Scrolling Up
            if (currentTop > 0 && mainNav.classList.contains('is-fixed')) {
                mainNav.classList.add('is-visible');
            } else {
                console.log(123);
                mainNav.classList.remove('is-visible', 'is-fixed');
            }
        } else {
            // Scrolling Down
            mainNav.classList.remove(['is-visible']);
            if (currentTop > headerHeight && !mainNav.classList.contains('is-fixed')) {
                mainNav.classList.add('is-fixed');
            }
        }
        scrollPos = currentTop;
    });
});

//------------------------------------------------------------------------


let posts = [];
let image_url = {};

const postPreview = document.querySelector('.postsPreviewClass')
async function loadPostData() {
    posts = await fetch('http://localhost:1337/api/posts/').then(x => x.json());
    await loadImageDetail(); 
    renderTitle();
    renderImage();
}


async function loadImageDetail() {
    image_url = await fetch('http://localhost:1337/api/posts?populate=hero').then(x=>x.json());
}

function renderImage() {
    for (let i=0; i<image_url.data.length; i++)
    currImage = image_url.data[i];
    if(currImage) {

        postPreview.innerHTML += `
        <div class="onlyImage">
        <img src="${'http://localhost:1337'+currImage.attributes.hero.data.attributes.url}"></img>
        </div>
        `;
    };
}


function renderTitle() {
    for (let i=0; i<posts.data.length; i++) {
        currentTitle = posts.data[i];
        postPreview.innerHTML += `
        <div class="post-preview">
                        <a href="todos.html?id="${currentTitle.attributes.id}" class="post-title" data-postid="${currentTitle.attributes.id}">
                        <h2 class="post-title">${currentTitle.attributes.title}</h2>
                            <h5 class="post-subtitle">${currentTitle.attributes.summary}</h5>
                        </a>
                        <p class="post-meta">
                            Yaratılma tarihi: ${currentTitle.attributes.createdAt}
                           
                        </p>
                        
                    </div>
                    <!-- Divider-->
                    <hr class="my-4" />
        `;
    }
    postPreview.innerHTML += `
    <div class="d-flex justify-content-end mb-4"><a class="btn btn-primary text-uppercase" href="#!">Older Posts →</a></div>
    `;
    
    
    
};

loadPostData();
loadImageDetail()


const contentApi = document.querySelector('.contentApi');

function renderTitleDetail(titleDetailResponse) {
    contentApi.innerHTML = `
    <p>${titleDetailResponse.content}</p>
    `;
}