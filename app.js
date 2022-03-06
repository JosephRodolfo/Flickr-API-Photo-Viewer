var apiKey = config.YOUR_API_KEY;

async function getImageList(pageNumber) {
  const response = await fetch(
    "https://www.flickr.com/services/rest/?method=flickr.people.getPhotos&api_key=" +
      apiKey +
      "&user_id=75430200%40N04&page=" + 
      pageNumber + "&format=json&nojsoncallback=1"
  );
  const flickrObjectResponse = await response.json();
  //   console.log(flickrObjectResponse.photos.photo.length);
  let sliced = flickrObjectResponse.photos.photo.slice(0, 10);
  return sliced;
}

function createImgSrc(serverId, imageId, secret) {
  let imageSrc = `https://live.staticflickr.com/${serverId}/${imageId}_${secret}.jpg`;
  return imageSrc;
}

function createAndAppend(imgSrc) {
  let imgHolder = document.createElement("img");

  imgHolder.src = imgSrc;
  let imageContainer = document.getElementById("grid-image-container");
  //console.log(imageContainer);

  imageContainer.appendChild(imgHolder);
}

getImageList(1)
  .then((value) =>
    value.forEach((element) => {
      let tempSrc = createImgSrc(element.server, element.id, element.secret);
      createAndAppend(tempSrc);
    })
  ).catch(error => alert(
   "Something went wrong! " + error))
  .finally(() =>
    document.querySelectorAll("img").forEach((element, index) =>
      element.addEventListener("click", function () {
        let t = calculateToggleClass(index) + 1;

        console.log(t);

        this.classList.toggle("overlay-img-style-" + t);
      })
    )
  );

  //There are 3 classes for each of the 3 griw columns on large screens. This function calculates the 
  //row so the correct class is given to the event listener to attach. 
function calculateToggleClass(number) {
  let x = number;
  if (x === 0) {
    return 0;
  } else if (x === 1) {
    return 1;
  } else if (x === 2) {
    return 2;
  } else {
    return calculateToggleClass((x -= 3));
  }
}

/* 0 1 2
   3 4 5
   6 7 8
   9 10 11
   12 13 14
   15 16 17



*/

/*  function overlayDeploy() {

    
    let overlayContainer = document.querySelector(".overlay-container");
    overlayContainer.classList.add('overlay-on');
    //overlayContainer.classList.add("overlay-on");

}*/
