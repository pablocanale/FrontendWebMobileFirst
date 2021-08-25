/***** BOTON MENU******/

document.querySelector(".btn_menu").addEventListener("click", toggleMenu);

function toggleMenu() {
    document.querySelector(".menu_items").classList.toggle("show");
}; 