/* Pas de modal ouverte par défaut */
let modal = null;

/* Fonction openModal */
const openModal = function(e) {

    e.preventDefault();
    modal = document.querySelector(e.target.getAttribute('href'));
    modal.style.display = null;
    modal.removeAttribute('aria-hidden');
    modal.addEventListener('click', closeModal);
    modal.querySelector('.js-modal-close').addEventListener('click', closeModal);
    modal.querySelector('.js-modal-stop').addEventListener('click', stopPropagation);

    //Bloque le scroll quand la modal est ouverte
    document.body.style.overflow = "hidden";
}

/* Fonction closeModal */
const closeModal = function(e) {

    if (modal === null) return;

    e.preventDefault();
    modal.setAttribute('aria-hidden', true);
    modal.removeEventListener('click', closeModal);
    modal.querySelector('.js-modal-close').removeEventListener('click', closeModal);
    modal.querySelector('.js-modal-stop').removeEventListener('click', stopPropagation);
    const hideModal = function() {
        modal.style.display = "none";
        modal.removeEventListener('animationend', hideModal);
        modal = null;
    }
    modal.addEventListener('animationend', hideModal);

    //Débloque le scroll quand la modal est fermée
    document.body.style.overflow = "scroll";
    document.body.style.overflowX = "hidden";
}

/* Fonction stopPropagation */
const stopPropagation = function(e) {
    e.stopPropagation();
}

/* Selection des éléments avec la classe js-modal */
document.querySelectorAll('.js-modal').forEach(a => {
    a.addEventListener('click', openModal);
})

/* Gestion du clavier */
window.addEventListener('keydown', function(e) {
    if(e.key === 'Escape' || e.key === 'Esc'){
        closeModal(e);
    }
})

