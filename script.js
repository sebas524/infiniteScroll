const imgContainer = document.getElementById("img-container");
const loader = document.getElementById("loader");
const apiKey = "5X64ADvwEoW7FIAHXFReQYFpyyQsp4M1G0GYdJlRIiY";
const numOfPics = 30;
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${numOfPics}`;
let photos = [];
let ready = false;
let imagesLoaded = 0;
let totalImages = 0;

const imageLoaded = () => {
  imagesLoaded++;
  console.log(imagesLoaded);
  if (imagesLoaded === totalImages) {
    ready = true;
    loader.hidden = true;
    console.log("ready = ", ready);
  }
};

// !Helper Functions
const setAttributes = (element, attributes) => {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
};

//* create elements for links and pics, and adding it to the DOM:
const displayPics = () => {
  imagesLoaded = 0;
  totalImages = photos.length;
  console.log("total images = ", totalImages);
  //* forEach function:
  photos.forEach((photo) => {
    // * to create anchor tag to unsplash:
    const item = document.createElement("a");
    //  * to set attributed on anchor tag:
    // item.setAttribute("href", photo.links.html);
    // * for it to open in a new tab:
    // item.setAttribute("target", "_blank");
    setAttributes(item, { href: photo.links.html, target: "_blank" });
    //* to create img per pic:
    const img = document.createElement("img");
    // img.setAttribute("src", photo.urls.regular);
    // img.setAttribute("alt", photo.alt_description);
    // img.setAttribute("title", photo.alt_description);
    setAttributes(img, {
      src: photo.urls.regular,
      alt: photo.alt_description,
      title: photo.alt_description,
    });
    // *check when each is finished loading,event listener:
    img.addEventListener("load", imageLoaded);
    // * put img inside anchor element, and then put both inside imgContainer element:
    item.appendChild(img);
    imgContainer.append(img);
  });
};
//* make request to api:
const getPics = async () => {
  try {
    const res = await fetch(apiUrl);
    const data = await res.json();
    photos = data;
    console.log("photos from array => ", photos);
    displayPics();
  } catch (error) {}
};

// * if scrolling close to bottom of page:
window.addEventListener("scroll", () => {
  console.log("scrolled");
  // * innerHeight is the hight of browser window
  // * scrollY: how high we are from the top of the page
  if (
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 &&
    ready
  ) {
    ready = false;
    getPics();
    console.log("loaded");
  }
});

//* when page loads:
getPics();
