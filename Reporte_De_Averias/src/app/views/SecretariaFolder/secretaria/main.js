const hamburgerButton = document.querySelector('#hamburger-button');
const sidebar = document.querySelector('.sidebar');

hamburgerButton.addEventListener('click', () => {
  sidebar.classList.toggle('open');
});
