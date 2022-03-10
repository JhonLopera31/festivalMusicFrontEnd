document.addEventListener('DOMContentLoaded', function () {
    startApp();
});

function startApp() {
    navigation();
    creategallery();
    scrollNav(); //smooth transition efect (link click)
}

function navigation (){
    const header = document.querySelector(".header")
    const aboutFestival = document.querySelector(".about-festival")
    const body = document.querySelector("body")

    window.addEventListener('scroll', function (){
        if (aboutFestival.getBoundingClientRect().top<0){
            header.classList.add("fixed")
            body.classList.add("body-scroll")
        }else{
            header.classList.remove("fixed")
            body.classList.remove("body-scroll")
        }
    });
}

function scrollNav(){
    const links = document.querySelectorAll(".main-navigation");
    const header =document.querySelector('.title')

    links.forEach(link =>{
        link.addEventListener('click', function(e){
            e.preventDefault();// prevent by default to allow the smooth transition
            const href_value=e.target.attributes.href.value;
            const section = document.querySelector(href_value);
            section.scrollIntoView({behavior:"smooth"});
            console.log(e.target);
        })
    });

    header.addEventListener('click',function(e){
        e.preventDefault();
        window.scrollTo({top:0, behavior: 'smooth'}); // seed to website top
    });
    
}

function creategallery() {
    const gallery = document.querySelector('.img-gallery');

    for (let i = 1; i <= 12; i++) {
        const image = document.createElement('picture');

        image.innerHTML = `
            <source srcset="build/img/thumb/${i}.avif" type="image/avif">
            <source srcset="build/img/thumb/${i}.webp" type="image/webp">
            <img loading="lazy" width="200" height="300 " src="build/img/thumb/${i}.jpg" 
            alt="gallery images">
            `;

        image.onclick = function () { // a callback is neccesary to obtaing the image_id
            showImage(i);
        }
        gallery.appendChild(image);
    }
}

function showImage(image_id) {
    const image = document.createElement('picture');
    image.innerHTML = `
        <source srcset="build/img/grande/${image_id}.avif" type="image/avif">
        <source srcset="build/img/grande/${image_id}.webp" type="image/webp">
        <img loading="lazy" width="200" height="300 " src="build/img/grande/${image_id}.jpg" 
        alt="gallery images">
        `;

    //Creatig overlay
    const overlay = document.createElement("DIV"); // create a new div to place an image
    overlay.appendChild(image); // adding the big image to previus created div
    overlay.classList.add("overlay") // add a class to format the image div
    overlay.onclick = function(){
        const body = document.querySelector('body')
        body.classList.remove('remove-scroll') // to modify class in globals
        overlay.remove();
    }

    //close image
    const closeImage = document.createElement('P');
    closeImage.textContent = "X";
    closeImage.classList.add('btn-close');
    closeImage.onclick = function(){
        const body = document.querySelector('body')
        body.classList.remove('remove-scroll') // to modify class in globals
        overlay.remove();
    }
    overlay.appendChild(closeImage);

    //Add to HTML body
    const body = document.querySelector('body')
    body.appendChild(overlay) // add image to the document body
    body.classList.add('remove-scroll') // to modify class in globals
}