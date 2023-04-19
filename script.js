const imgContainer = document.getElementById("img-container");
const loader = document.getElementById("loader");
const apiKey = "5X64ADvwEoW7FIAHXFReQYFpyyQsp4M1G0GYdJlRIiY";
const numOfPics = 30;
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${numOfPics}`;
let photos = [];

// !Helper Functions
const setAttributes = (element, attributes) => {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
};

//* create elements for links and pics, and adding it to the DOM:
const displayPics = () => {
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

//* when page loads:
getPics();
