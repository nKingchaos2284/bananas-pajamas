let submitBtn = document.getElementById("submit-btn");
let generateGif = () => {
  //Get search value
  let q = document.getElementById("search-box").value;
  //The max is 20 gifs to be displayed in result
  let gifCount = 20;
  //API URL =
  let finalURL = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${q}&limit=${gifCount}&offset=0&rating=g&lang=en`;
  document.querySelector(".wrapper").innerHTML = "";
  //Make a call to API
  fetch(finalURL)
    .then((resp) => resp.json())
    .then((info) => {
      console.log(info.data);
      //All gifs
      let gifsData = info.data;
      gifsData.forEach((gif) => {
        //Generate cards for every gif
        let container = document.createElement("div");
        container.classList.add("container");
        let iframe = document.createElement("img");
        console.log(gif);
        iframe.setAttribute("src", gif.images.downsized_medium.url);
        iframe.onload = () => {
          //if iframes has loaded correctly reduce the count when each gif loads
          gifCount--;
          if (gifCount == 0) {
            //If all gifs have loaded then display gifs UI
            document.querySelector(".wrapper").style.display = "grid";
          }
        };
        container.append(iframe);
        //Copy link button
        let copyBtn = document.createElement("button");
        copyBtn.innerText = "Copy Link";
        copyBtn.onclick = () => {
          //Append the obtained ID to default URL
          let copyLink = `https://media4.giphy.com/media/${gif.id}/giphy.mp4`;
          //Copy text inside the text field
          navigator.clipboard
            .writeText(copyLink)
            .then(() => {
              alert("GIF copied to clipboard");
            })
            .catch(() => {
              //if navigator is not supported
              alert("GIF was not copied to clipboard");
              //create temporary input
              let hiddenInput = document.createElement("input");
              hiddenInput.setAttribute("type", "text");
              document.body.appendChild(hiddenInput);
              hiddenInput.value = copyLink;
              //Select input
              hiddenInput.select();
              //Copy the value
              document.execCommand("copy");
              //remove the input
              document.body.removeChild(hiddenInput);
            });
        };
        container.append(copyBtn);
        document.querySelector(".wrapper").append(container);
      });
    });
};
//Generate Gifs when user clicks on submit
submitBtn.addEventListener("click", generateGif);
