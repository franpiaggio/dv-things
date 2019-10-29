// Código custom para hacer el ordenado tipo masonry
const Shuffle = window.Shuffle;

const element = document.querySelector('.imagenes');
const sizer = element.querySelector('.imagen');

const shuffleInstance = new Shuffle(element, {
  itemSelector: '.imagen',
  sizer: sizer
});

$('.boton-filtro').click(function(){
  const data = $(this).data('filtro');
  shuffleInstance.filter(data);
});