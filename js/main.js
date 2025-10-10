// Simple: fill year, smooth nav active update
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("year").textContent = new Date().getFullYear();

  // smooth scroll for nav links
  document.querySelectorAll('a.nav-link[href^="#"]').forEach(a=>{
    a.addEventListener("click", e=>{
      e.preventDefault();
      const id = a.getAttribute("href");
      document.querySelector(id).scrollIntoView({behavior:"smooth", block:"start"});
      // collapse navbar on mobile
      const bsCollapse = document.querySelector('.navbar-collapse');
      if (bsCollapse && bsCollapse.classList.contains('show')) {
        new bootstrap.Collapse(bsCollapse).toggle();
      }
    });
  });
});

