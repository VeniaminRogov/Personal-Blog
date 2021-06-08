const btnModal = document.querySelectorAll('[data-modal]');
const btnModalClose = document.querySelectorAll('.modal__close');
const modal = document.querySelectorAll('.modal')

const body = document.body;

function openModal(currentModal) {
  let modalContent = currentModal.querySelector('.modal__content');

  currentModal.classList.add('modal--active');
  body.classList.add('no-scroll');

  setTimeout(() => {
    modalContent.style.transform = 'none';
    modalContent.style.opacity = 1;
  }, 1);
}

function closeModal(currentModal) {
  let modalContent = currentModal.querySelector('.modal__content');
  modalContent.removeAttribute('style');

  setTimeout(() => {
    currentModal.classList.remove('modal--active');
    body.classList.remove('no-scroll');
  }, 200)
}

btnModal.forEach(item => {
  item.addEventListener('click', event => {
    let __this = event.currentTarget;
    let modalId = __this.getAttribute('data-modal');
    let modal = document.getElementById(modalId);
    let modalContent = modal.querySelector('.modal__content');

    modalContent.addEventListener('click', event => {
      event.stopPropagation();
    });

    openModal(modal);
  });
});


btnModalClose.forEach(item => {
  item.addEventListener('click', event => {
    let currentModal = event.currentTarget.closest('.modal');

    closeModal(currentModal);
  });
});

modal.forEach(item => {
  item.addEventListener('click', event => {
    let currentModal = event.currentTarget;

    closeModal(currentModal);
  });
});