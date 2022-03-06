var apiKey = config.YOUR_API_KEY;

let currentPageNumber = {
  page: 1,
};

//async function, takes the desired page number returns list of photos with information needed to create src to display them,
// currently set to only 10, but remove slice
//and it would be all photos per page, 100;

async function getImageList(pageNumber) {
  const response = await fetch(
    "https://www.flickr.com/services/rest/?method=flickr.people.getPhotos&api_key=" +
      apiKey +
      "&user_id=75430200%40N04&page=" +
      pageNumber +
      "&format=json&nojsoncallback=1"
  );
  const flickrObjectResponse = await response.json();
  //   console.log(flickrObjectResponse.photos.photo.length);
  printPageNumbers(flickrObjectResponse.photos.pages);

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

//function that is called when pressing arrow buttons or number buttons to select or move between pages.
function updateImages(pageNumberInput) {
  let gridImageContainer = document.getElementById("grid-image-container");
  gridImageContainer.innerHTML = "";

  getImageList(pageNumberInput)
    .then((value) =>
      value.forEach((element) => {
        let tempSrc = createImgSrc(element.server, element.id, element.secret);
        createAndAppend(tempSrc);
      })
    )
    .catch((error) => alert("Something went wrong! " + error))
    .finally(() =>
      document.querySelectorAll("section img").forEach((element, index) =>
        element.addEventListener("click", function () {
          let t = calculateToggleClass(index) + 1;

          this.classList.toggle("overlay-img-style-" + t);
        })
      )
    );
}

function printPageNumbers(numberOfPages) {
  let numbersContainer = document.getElementById("page-numbers-container");
  numbersContainer.innerHTML = "";
  for (let i = 0; i < numberOfPages; i++) {
    let tempNumberHolder = document.createElement("div");
    tempNumberHolder.innerText = i;
    tempNumberHolder.id = i;

    tempNumberHolder.addEventListener("click", function () {
      currentPageNumber.page = this.innerText;
      updateImages(this.innerText);
      console.log(this.innerText);
    });

    numbersContainer.appendChild(tempNumberHolder);
  }
}

function setUpButtons() {
  let buttons = document.querySelectorAll("button");

  buttons.forEach((element) => {


    if(element.id==="left-button"){
    element.addEventListener("click", function () {

      currentPageNumber.page--;
      updateImages(currentPageNumber.page);
  });} else {


    
    element.addEventListener("click", function () {


      currentPageNumber.page++;
      updateImages(currentPageNumber.page);


    })





    
  }



  });
}
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
setUpButtons();
updateImages(1);
