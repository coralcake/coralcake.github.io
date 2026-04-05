const image1 = document.getElementById('flag1');
const image2 = document.getElementById('flag2');

function darkenImage(event) {
    if (event.target === image1) {
        image2.classList.add('darkened');
        image1.classList.remove('darkened');
    } else if (event.target === image2) {
        image1.classList.add('darkened');
        image2.classList.remove('darkened');
    }
}

image1.addEventListener('click', darkenImage);
image2.addEventListener('click', darkenImage);

