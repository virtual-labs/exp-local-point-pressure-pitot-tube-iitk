function changeImage() {
  document.getElementById("button2").disabled = false;
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
function datasheet1(){

  document.getElementById("h1a").innerHTML = "0.11";
  document.getElementById("h2a").innerHTML = "0.107";
  document.getElementById("ha").innerHTML = "0.003";
  document.getElementById("ta").innerHTML = "10";
  document.getElementById("r1").innerHTML = "0";
  document.getElementById("r2").innerHTML = "1.57";
  document.getElementById("va").innerHTML = "0.01";
  document.getElementById("vth").innerHTML = "0.2426";
  document.getElementById("qa").innerHTML = "3.14 X 10^-6";
 
  document.getElementById("h1b").innerHTML = "0.137";
  document.getElementById("h2b").innerHTML = "0.13";
  document.getElementById("hb").innerHTML = "0.007";
  document.getElementById("tb").innerHTML = "7";
  document.getElementById("qb").innerHTML = "4.485 X 10^-6";
  document.getElementById("vaa").innerHTML = "0.014";
  document.getElementById("vthh").innerHTML = "0.3706";
 
  
  document.getElementById("r1b").innerHTML = "0";
  document.getElementById("r2b").innerHTML = "2.24";
}


