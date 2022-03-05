var apiKey = config.YOUR_API_KEY;

async function getImageList() {
  const response = await fetch(
    "https://www.flickr.com/services/rest/?method=flickr.people.getPhotos&api_key=" + apiKey + "&user_id=75430200%40N04&format=json&nojsoncallback=1"
  );
  const flickrObjectResponse = await response.json();
  //   console.log(flickrObjectResponse.photos.photo.length);
  let sliced = flickrObjectResponse.photos.photo.slice(0, 5);
  return sliced;
}

function createImgSrc(serverId, imageId, secret) {
  let imageSrc =
    `https://live.staticflickr.com/${serverId}/${imageId}_${secret}.jpg`;
  return imageSrc;
}

function createAndAppend(imgSrc) {
  let imgHolder = document.createElement("img");

  imgHolder.src = imgSrc;
  let imageContainer = document.getElementById("grid-image-container");
  //console.log(imageContainer);

  imageContainer.appendChild(imgHolder);
}

getImageList().then((value) =>
  value.forEach((element) => {
    let tempSrc = createImgSrc(element.server, element.id, element.secret);
    createAndAppend(tempSrc);
  })
).finally( ()=>
    document.querySelectorAll('img').forEach(element=> element.addEventListener('click', function() {

        this.style.setProperty('position', 'absolute')
        ;
    }
    )));
