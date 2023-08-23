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

const postPreview = document.querySelector('.postsPreviewClass')
async function loadPostData() {
    posts = await fetch('https://jsonplaceholder.org/posts').then(x=>x.json());
    renderTitle();
};

function renderTitle() {
    for (let i=0; i<posts.length; i++) {
        currentTitle = posts[i];
        postPreview.innerHTML += `
        <div class="post-preview">
                        <a href="posts.html?id="${currentTitle.id}" class="post-title" data-postid="${currentTitle.id}">
                        <h2 class="post-title">${currentTitle.title}</h2>
                            <h3 class="post-subtitle">Problems look mighty small from 150 miles up</h3>
                        </a>
                        <p class="post-meta">
                            Published at: ${currentTitle.publishedAt}
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


const contentApi = document.querySelector('.contentApi');

function renderTitleDetail(titleDetailResponse) {
    contentApi.innerHTML = `
    <p>${titleDetailResponse.content}</p>
    `;
}