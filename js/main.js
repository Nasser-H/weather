var navLink = document.querySelectorAll(`.navbar-nav .nav-link`);
for (var i = 0; i < navLink.length; i++) {
  if (!navLink[i].classList.contains("active")) {
    navLink[i].addEventListener("mouseenter", function (e) {
      e.target.classList.add("active");
    });
    navLink[i].addEventListener("mouseout", function (e) {
      e.target.classList.remove("active");
    });
  }
}
