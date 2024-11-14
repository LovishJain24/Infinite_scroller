// script.js
const postsContainer = document.getElementById("posts");
const loader = document.getElementById("loader");

let currentPage = 1;
const limit = 5;
const apiUrl = `https://jsonplaceholder.typicode.com/posts?_limit=${limit}`;

async function fetchPosts() {
  loader.style.display = "block";
  
  try {
    const res = await fetch(`${apiUrl}&_page=${currentPage}`);
    const posts = await res.json();
    
    posts.forEach(post => {
      const postEl = document.createElement("div");
      postEl.classList.add("post");
      postEl.innerHTML = `
        <h2>${post.title}</h2>
        <p>${post.body}</p>
      `;
      postsContainer.appendChild(postEl);
    });

    loader.style.display = "none";
    currentPage++;
  } catch (error) {
    console.error("Error fetching posts:", error);
    loader.innerText = "Failed to load posts";
  }
}

function handleScroll() {
  if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 10) {
    fetchPosts();
  }
}

window.addEventListener("scroll", handleScroll);

// Initial fetch
fetchPosts();
