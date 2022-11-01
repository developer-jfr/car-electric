
const openBtn = document.querySelectorAll('.open-modal');

  /*=============== SHOW MODAL ===============*/
  const showModal = (e) =>{
      const modalContainer = document.getElementById('modal-container');
    const body = document.querySelector('body');
    body.classList.add('overflow-hd');
    modalContainer.classList.add('show-modal');
    modalGetItem(e.target.parentNode.closest('div[class="car_list-preview"]'));

}


const modalGetItem = (clickedElment) => {
  const modalInfo = document.querySelector('.modal_info ');
  //Rating
  modalInfo.querySelector('.car_list-rating').innerHTML  =  clickedElment.querySelector('.car_list-rating').innerHTML;
  //car_list-prem
  modalInfo.querySelector('.car_list-prem').innerHTML = clickedElment.querySelector('.car_list-prem').innerHTML;
  //Car Image
  modalInfo.querySelector('.car_list-img img').src  = clickedElment.querySelector('.car_list-img img').src;
  //Car Name
  modalInfo.querySelector('.modal_form h5').innerText = clickedElment.querySelector('.car_list-name p').innerText;
  modalInfo.querySelector('.car_list-name p').innerText = clickedElment.querySelector('.car_list-name p').innerText;
  //Price 
  modalInfo.querySelector('.modal_form h6').innerText = clickedElment.querySelector('.car_list-costs p').innerText;

  
}

openBtn.forEach(c => c.addEventListener('click', function(e) {
  showModal(e)
}));

/*=============== CLOSE MODAL ===============*/
const closeBtn = document.querySelectorAll('.close-modal')

function closeModal(){
    const modalContainer = document.getElementById('modal-container')
    modalContainer.classList.remove('show-modal')
    const body = document.querySelector('body');
    body.classList.remove('overflow-hd')
}
closeBtn.forEach(c => c.addEventListener('click', closeModal))



// ------------------------- Form Modal -----------------------

const formBtn = document.querySelectorAll('.form-modal');

  /*=============== SHOW MODAL ===============*/
  const showModalForm = (e) =>{
      const modalContainer = document.getElementById('modal-form');
    const body = document.querySelector('body');
    body.classList.add('overflow-hd');
    modalContainer.classList.add('show-modal');
    modalGetItem(e.target.parentNode.closest('div[class="car_list-preview"]'));

}



formBtn.forEach(c => c.addEventListener('click', function(e) {
  showModalForm(e)
}));

/*=============== CLOSE MODAL ===============*/
document.getElementById('close-modal-form').addEventListener('click', closeModalForm)

function closeModalForm(){
    const modalContainer = document.getElementById('modal-form')
    modalContainer.classList.remove('show-modal')
    const body = document.querySelector('body');
    body.classList.remove('overflow-hd')
}