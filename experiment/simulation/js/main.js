function changeImage() {
  const image = document.getElementById('gif_test');
  const currentImageSrc = image.src;


  if (currentImageSrc.includes('images/initial.png')) {
    image.src = 'images/lab.gif';
    image.alt = 'Lab Gif';
  } else {
    image.src = 'images/initial.png';
    image.alt = 'initial 1';
  }
  image.addEventListener('load', function() {
    // Animation is complete, change to a normal image
    setTimeout(function(){
      image.src = 'images/lab.png';
      image.alt = 'Normal Image';
    },6890);
    
  });
}
