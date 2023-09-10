// selecting all required all elements
const dropArea = document.querySelector(".drag_area"),
  dragText = dropArea.querySelector("header"),
  button = dropArea.querySelector("button"),
  input = dropArea.querySelector("input");

let file; // this is global veriable we'll use it inside multiple functions

button.onclick = () => {
  input.click(); // if user click on the button then the  input also clicked
};

input.addEventListener("change", function () {
  // getting user select file [0] this means if user multiple file select
  file = this.files[0];
  showFile(); // calling function
  dropArea.classList.add("active");
});

// If user drag file over droparea
dropArea.addEventListener("dragover", (e) => {
  e.preventDefault(); // preventing from default behavior
  dropArea.classList.add("active");
  dragText.innerText = "Release to Upload File";
});

// If user leave draged file from droparea
dropArea.addEventListener("dragleave", () => {
  dropArea.classList.remove("active");
  dragText.innerText = "Drag & Drop to Upload File";
});

// If user drop file on droparea
dropArea.addEventListener("drop", (e) => {
  e.preventDefault(); // preventing from default behavior

  // getting user select file [0] this means if user multiple file select
  file = e.dataTransfer.files[0];
  showFile(); // calling function
});

function showFile() {
  let fileType = file.type;
  let validExtentions = ["image/jpeg", "image/jpg", "image/png"]; // adding some valid image extentions in array
  if (validExtentions.includes(fileType)) {
    // if user selected file is an image file
    let fileReader = new FileReader(); // creating new fileReader object
    fileReader.onload = () => {
      let fileURL = fileReader.result; // passing user file source in fileURL variable
      let imgTag = `<img src="${fileURL}" alt="" />`; // creating an image tag and passing user selected file source inside src atribiute
      dropArea.innerHTML = imgTag; // adding that created img tag inside droparea container
    };
    fileReader.readAsDataURL(file);
  } else {
    alert("This is not an image file");
    dragText.innerText = "Drag & Drop to Upload File";
    dropArea.classList.remove("active");
  }
}
