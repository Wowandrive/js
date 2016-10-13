var selectElement = document.getElementById("fileList");
var textAreaElement = document.getElementById("textId");
var editBtn = document.getElementById("editBtn");
var saveBtn = document.getElementById("saveBtn");


changeMode ("read");
function editMode() {
  changeMode ("edit");
}

loadFileList();

function changeMode (mode) {
  if (mode == "edit") {
    textAreaElement.disabled = false;
    document.getElementById("saveBtn").style.display = "inline";
    document.getElementById("editBtn").style.display = "none";
  } else if (mode == "read") {
    textAreaElement.disabled = true;
    document.getElementById("saveBtn").style.display = "none";
    document.getElementById("editBtn").style.display = "inline";
  }
}

function request(options, callback, method, words) {
  var req = new XMLHttpRequest();
  req.open(method, options, true);
  req.addEventListener("load", function() {
    if (req.status < 400)
      callback(null, req.responseText);
    else
      callback(new Error("Request failed: " + req.statusText), null);
  });
  if (method === "GET") {
    req.send(options.body || null);
  } else if (method === "PUT") {
    req.send(words);
  }
}

function loadFileList() {
  request("/", function(error, fileList) {
    if (error) throw error;
    var fileListArray = fileList.split('\n');
    for (var i = 0; i < fileListArray.length; i++) {
      var option = document.createElement("option");
      option.value = fileListArray[i];
      option.text = fileListArray[i];
      selectElement.add(option);
    }
    loadCurrentFile();
  }, "GET");
}

function loadCurrentFile () {
  var expression = selectElement.value;
  request(expression, function(error, fileText) {
    if (error) throw error; 
    textAreaElement.value = fileText;
  }, "GET");  
}

function saveChanges () {
  var expression = selectElement.value;
  var view = textAreaElement.value;
  request(expression, function(error, fileText) {
    if (error) throw error; 
    textAreaElement.value = fileText;
  }, "PUT", view);  
  loadCurrentFile();
  changeMode ("read");
}
