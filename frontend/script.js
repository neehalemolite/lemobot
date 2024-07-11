const menutoggle = document.querySelector(".menutoggle");
menutoggle.onclick = function () {
  menutoggle.classList.toggle("active");
};
var step = 0;
var ideadStep = 0;
var ideacount = 0;
var count = 0;

var username = "";
var email = "";
var contact = "";
var Prefered_Mode_of_Contact = "";
var projectDescription = "";
var projectDomain = "";
var description = "";

var message = "";

var current_function = "";
var current_input = "";
var last_response = "";
var emailvalid = false;

var selectedDomain = "";
var selectedCategory = "";
var selectedSpecification = "";
var gdata = "";

function supportive() {
  current_input = "";
  var userInput = document.getElementById("userInput").value.trim();
  current_input = userInput;
  document.getElementById("userInput").value = "";
  if (userInput !== "") {
    if (current_function === "getInTouch") {
      getInTouch();
    } else if (current_function === "handleIdeaResponse") {
      step++;
      handleIdeaResponse();
    } else if (current_function === "handleDomainIdea") {
      handleDomainIdea();
    } else if (current_function === "Description") {
      Description();
    }
  }
}

function checkEnter(event) {
  if (event.keyCode === 13) {
    supportive();
  }
}

function getUniqueDomains(data) {
  const domains = data.map((item) => item.Domain);
  const uniqueDomains = [...new Set(domains)];
  return uniqueDomains;
}

function getUniqueCategory(data) {
  const Category = data.map((item) => item.Category);
  const UniqueCategory = [...new Set(Category)];
  return UniqueCategory;
}

function getUniqueSpecifications(data) {
  const Specifications = data.map((item) => item.Specifications);
  const uniqueSpecifications = [...new Set(Specifications)];
  return uniqueSpecifications;
}

function createDomainButtons(domains) {
  return domains
    .map(
      (domain) =>
        `<button class="domain-button" onclick="handleDomainClick('${domain}')">${domain}</button>`
    )
    .join("");
}

function createCategoryButtons(Category) {
  return Category.map(
    (Category) =>
      `<button class="Category-button" onclick="handleCategoryClick('${Category}')">${Category}</button>`
  ).join("");
}

function createspecificationButtons(specification) {
  return specification
    .map(
      (specification) =>
        `<button class="specification-button" onclick="handlespecificationClick('${specification}')">${specification}</button>`
    )
    .join("");
}

function createQuestionButtons(Question) {
  return Question.map(
    (Question) =>
      `<button class="Category-button" onclick="Answer('${Question}')">${Question}</button>`
  ).join("");
}
function prefered_contact(mode) {
  Prefered_Mode_of_Contact = mode;
  var messagesDiv = document.getElementById("chat-section");
  var userMessage = `
        <div class="user">
            <p>${Prefered_Mode_of_Contact}</p>
        </div>`;
  messagesDiv.innerHTML += userMessage;
  messagesDiv.scrollTop = messagesDiv.scrollHeight;
  if (current_function === "getInTouch") {
    getInTouch();
  } else if (current_function === "handleIdeaResponse") {
    step++;
    handleIdeaResponse();
  } else if (current_function === "handleDomainIdea") {
    handleDomainIdea(last_response);
  } else if (current_function === "Description") {
    Description();
  }
}
var func = 0;
function handleDomainIdea(response) {
  current_function = "handleDomainIdea";
  var messagesDiv = document.getElementById("chat-section");
  var botMessage = "";
  if (response != undefined) {
    last_response = response;
  }

  if (ideacount === 0) {
    var userMessage = `
        <div class="right-part">
            <div class="chat">
                <p>${last_response}</p>
            </div>
        </div>`;
    messagesDiv.innerHTML += userMessage;
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
    ideacount++;
  }

  if (last_response === "yes") {
    if (func > 0 && func < 4) {
      if (current_input !== "") {
        var userInput = current_input;
        var Message = `
                <div class="user">
                    <p>${userInput}</p>
                </div>`;
        messagesDiv.innerHTML += Message;
        messagesDiv.scrollTop = messagesDiv.scrollHeight;
      }
    }

    var botMessage = "";
    if (ideadStep === 0) {
      botMessage = `
            <div class="left-part">
                <div class="chat typing">
                    <i class='bx bxs-bot'></i>
                    <p>Please enter your name <span style="font-size: 20px;"> ✍️</span></p>
                </div>
            </div>`;
      setTimeout(function () {
        var typingMessage = messagesDiv.querySelector(".typing");
        if (typingMessage) {
          typingMessage.classList.remove("typing");
        }
      }, 1000);
            ideadStep++;
      func++;
    } else if (ideadStep == 1) {
      if (current_input != "") {
        ideadStep++;
        func++;
      } else {
        ideadStep--;
        func = 0;
        handleDomainIdea();
        return;
      }
      username = userInput;
      botMessage = `
            <div class="left-part">
            <div class="chat typing">
                <i class='bx bxs-bot'></i>
                <p>Please enter your email<span style="font-size: 20px;">📧</span></p>
            </div>
            </div>`;

      setTimeout(function () {
        var typingMessage = messagesDiv.querySelector(".typing");
        if (typingMessage) {
          typingMessage.classList.remove("typing");
        }
      }, 1100);
    } else if (ideadStep === 2) {
      function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
      }

      if (emailvalid === false) {
        if (current_input != "" && isValidEmail(userInput)) {
          emailvalid = true;
          email = userInput;
          ideadStep++;
          func++;
        } else {
          func = 0;
          botMessage = `
                        <div class="left-part">
                        <div class="warning typing">
                        <i class='bx bxs-bot'></i>
                        <p>Your Email is incorrect!<span style="font-size: 20px;">😏</span></p>
                        </div>
                        </div>`;
          setTimeout(function () {
            var typingMessage = messagesDiv.querySelector(".typing");
            if (typingMessage) {
              typingMessage.classList.remove("typing");
            }
            messagesDiv.innerHTML += botMessage;
            messagesDiv.scrollTop = messagesDiv.scrollHeight;
            ideadStep--;
            handleDomainIdea();
          }, 1100);
          return;
        }
      } else {
        ideadStep++;
        func++;
      }

      botMessage = `
                <div class="left-part">
                    <div class="chat typing">
                        <i class='bx bxs-bot'></i>
                        <p>Please enter your mobile number<span style="font-size: 20px;">📞</span></p>
                    </div>
                </div>`;
      setTimeout(function () {
        var typingMessage = messagesDiv.querySelector(".typing");
        if (typingMessage) {
          typingMessage.classList.remove("typing");
        }
      }, 1100);
    } else if (ideadStep === 3) {
      function isValidContactNumber(contactNumber) {
        const contactRegex = /^(\+?\d{1,2}[- \.]?)?\d{10}$/;
        return contactRegex.test(contactNumber);
      }
      if (current_input != "" && isValidContactNumber(userInput)) {
        contact = userInput;
        ideadStep++;
        func++;
      } else {
        track = 0;
        botMessage = `
                <div class="left-part">
                <div class="warning typing">
                    <i class='bx bxs-bot'></i>
                    <p>Your Number is incorrect!<span style="font-size: 20px;">😏</span></p>
                </div>
                </div>`;

        setTimeout(function () {
          var typingMessage = messagesDiv.querySelector(".typing");
          if (typingMessage) {
            typingMessage.classList.remove("typing");
          }
          messagesDiv.innerHTML += botMessage;
          messagesDiv.scrollTop = messagesDiv.scrollHeight;
          ideadStep--;
          func = 0;
          handleDomainIdea();
        }, 1100);
        return;
      }

      var textbox = document.getElementById("userInput");
      textbox.disabled = true;
      botMessage = `
                <div class="left-part">
                    <div class="chat typing">
                        <i class='bx bxs-bot'></i>
                        <p>Please enter your Preferred Mode of Contact<span style="font-size: 20px;"> ☎️</span></p>
                    </div>
                    <div class="contact">
                        <button class="contact-button" onclick="prefered_contact('Voice Call')">Voice Call</button>
                        <button class="contact-button" onclick="prefered_contact('Video Call')">Video Call</button>
                        <button class="contact-button" onclick="prefered_contact('Mail')">Mail</button>
                        <button class="contact-button" onclick="prefered_contact('Offline')">Offline</button>
                    </div>
                </div>`;
      setTimeout(function () {
        var typingMessage = messagesDiv.querySelector(".typing");
        if (typingMessage) {
          typingMessage.classList.remove("typing");
        }
      }, 1100);
    } else if (ideadStep === 4) {
      var textbox = document.getElementById("userInput");
      textbox.disabled = true;
      botMessage = `
            <div class="left-part">
                <div class="chat typing">
                    <i class='bx bxs-bot'></i>
                    <p>So, What's the Great Idea?<span style="font-size: 20px;">😀</span></p>
                </div>
                <div class="inner-button">
                    <input type="file" id="file-input" style="display: none;">
                    <button id="upload-button" onclick = "uploadFile()">Upload</button>
                    <button id="button2"onclick = "Description()">Description</button>
                </div>
            </div>`;
      setTimeout(function () {
        var typingMessage = messagesDiv.querySelector(".typing");
        if (typingMessage) {
          typingMessage.classList.remove("typing");
        }
      }, 1100);
    } else if (ideadStep === 5) {
      var textbox = document.getElementById("userInput");
      textbox.disabled = false;
      projectDomain = selectedSpecification;
      var botMessage1 = `
            <div class="left-part">
            <div class="chat typing">
                <i class='bx bxs-bot'></i>
                <p>Name:  ${username}<br>Email:  ${email}<br>Contact:  ${contact}<br>Mode of Contact:  ${Prefered_Mode_of_Contact}<br>Project Domain:  ${projectDomain}<br>projectDescription:  ${file_name}</p>
            </div>
            </div>`;
      setTimeout(function () {
        messagesDiv.innerHTML += botMessage1;
        var typingMessage = messagesDiv.querySelector(".typing");
        if (typingMessage) {
          typingMessage.classList.remove("typing");
        }
      }, 100);
      lead_Capturing(
        selectedDomain,
        username,
        email,
        contact,
        Prefered_Mode_of_Contact,
        projectDomain,
        "None",
        file_url
      );
      emailvalid = false;
      var botMessage2 = `
            <div class="left-part">
                <div class="chat typing">
                <i class='bx bxs-bot'></i>
                <p>Our team will contact you shortly!<span style="font-size: 20px;">👨‍💻</span></p>
                </div>
            </div>`;

      setTimeout(function () {
        messagesDiv.innerHTML += botMessage2;
        var typingMessage = messagesDiv.querySelectorAll(".typing");
        typingMessage.forEach((msg) => msg.classList.remove("typing"));
        messagesDiv.scrollTop = messagesDiv.scrollHeight;
      }, 1500);

      var botMessage3 = `
                <div class="left-part">
                <div class="chat">
                <i class='bx bxs-bot'></i>
                <p>How can I assist you today?<span style="font-size: 20px;">🤔</span></p>
                </div>
                <div class = "inner-button">
                    <button onclick="learnAboutProducts()">Learn about products</button>
                    <button onclick="getInTouch()">Get in touch</button>
                    <button onclick="otherInquiries()">Other inquiries</button>
                </div>
                    </div>`;

      setTimeout(function () {
        messagesDiv.innerHTML += botMessage3;
        var typingMessage = messagesDiv.querySelectorAll(".typing");
        typingMessage.forEach((msg) => msg.classList.remove("typing"));
        messagesDiv.scrollTop = messagesDiv.scrollHeight;
      }, 2500);
      ideadStep = 0;
      func = 0;
      ideacount = 0;

    }
  } else if (last_response === "no") {
    var botMessage1 = `
        <div class="left-part">
        <div class="chat typing">
            <i class='bx bxs-bot'></i>
            <p>No worries! If you have any questions, feel free to ask.<span style="font-size: 20px;">😎</span></p>
    </div>`;
    setTimeout(function () {
      messagesDiv.innerHTML += botMessage1;
      var typingMessage = messagesDiv.querySelector(".typing");
      if (typingMessage) {
        typingMessage.classList.remove("typing");
      }
    }, 100);
    var botMessage3 = `
    <div class="left-part">
    < class="chat">
    <i class='bx bxs-bot'></i>
    <p>How can I assist you today?<span style="font-size: 20px;">🤔</span></p>
</>
<div class = "inner-button">
    <button onclick="learnAboutProducts()">Learn about products</button>
    <button onclick="getInTouch()">Get in touch</button>
    <button onclick="otherInquiries()">Other inquiries</button>
</div>
</div>`;

    setTimeout(function () {
      messagesDiv.innerHTML += botMessage3;
      var typingMessage = messagesDiv.querySelectorAll(".typing");
      typingMessage.forEach((msg) => msg.classList.remove("typing"));
      messagesDiv.scrollTop = messagesDiv.scrollHeight;
    }, 1500);
    ideacount = 0;
  }

  setTimeout(function () {
    var typingMessage = messagesDiv.querySelector(".typing");
    if (typingMessage) {
      typingMessage.classList.remove("typing");
    }
  }, 1100);

  setTimeout(function () {
    messagesDiv.innerHTML += botMessage;
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
  }, 600);
  current_input = "";
}

function Description() {
  current_function = "Description";
  var textbox = document.getElementById("userInput");
  textbox.disabled = false;
  var messagesDiv = document.getElementById("chat-section");
  if (ideadStep < 5) {
    ideadStep = 5;
  }
  if (ideadStep > 5) {
    var userInput = current_input;
    var userMessage = `
        <div class="user">
        <p>${userInput}</p>
        </div>`;
    messagesDiv.innerHTML += userMessage;
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
  }
  if (ideadStep === 5) {
    var userMessage = `
        <div class="user">
        <p>Description</p>
        </div>`;
    messagesDiv.innerHTML += userMessage;
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
  }
  if (ideadStep === 5) {
    var botMessage1 = `
        <div class="left-part">
        <div class="chat typing">
            <i class='bx bxs-bot'></i>
            <p>Sure! You can Write the description.</p>
        </div>
    </div>`;

    setTimeout(function () {
      messagesDiv.innerHTML += botMessage1;
      var typingMessage = messagesDiv.querySelector(".typing");
      if (typingMessage) {
        typingMessage.classList.remove("typing");
      }
      messagesDiv.scrollTop = messagesDiv.scrollHeight;
    }, 100);

    ideadStep++;
  } else if (ideadStep === 6) {
    projectDescription = userInput;
    projectDomain = selectedSpecification;

    var botMessage1 = `
        <div class="left-part">
        <div class="chat typing">
            <i class='bx bxs-bot'></i>
            <p>Name:  ${username}<br>Email:  ${email}<br>Contact:  ${contact}<br>Mode of Contact:  ${Prefered_Mode_of_Contact}<br>Project Domain:  ${projectDomain}<br>projectDescription:  ${projectDescription}</p>
        </div>
    </div>`;
    setTimeout(function () {
      messagesDiv.innerHTML += botMessage1;
      var typingMessage = messagesDiv.querySelector(".typing");
      if (typingMessage) {
        typingMessage.classList.remove("typing");
      }
    }, 100);
    lead_Capturing(
      selectedDomain,
      username,
      email,
      contact,
      Prefered_Mode_of_Contact,
      projectDomain,
      projectDescription,
      "None"
    );
    emailvalid = false;
    var botMessage2 = `
    <div class="left-part">
        <div class="chat typing">
            <i class='bx bxs-bot'></i>
            <p>Our team will contact you shortly!<span style="font-size: 20px;">👨‍💻</span></p>
        </div>
    </div>`;

    setTimeout(function () {
      messagesDiv.innerHTML += botMessage2;
      var typingMessage = messagesDiv.querySelectorAll(".typing");
      typingMessage.forEach((msg) => msg.classList.remove("typing"));
      messagesDiv.scrollTop = messagesDiv.scrollHeight;
    }, 1500);

    var botMessage3 = `
    <div class="left-part">
    <div class="chat">
    <i class='bx bxs-bot'></i>
    <p>How can I assist you today?<span style="font-size: 20px;">🤔</span></p>
</div>
<div class = "inner-button">
    <button onclick="learnAboutProducts()">Learn about products</button>
    <button onclick="getInTouch()">Get in touch</button>
    <button onclick="otherInquiries()">Other inquiries</button>
</div>
    </div>`;

    setTimeout(function () {
      messagesDiv.innerHTML += botMessage3;
      var typingMessage = messagesDiv.querySelectorAll(".typing");
      typingMessage.forEach((msg) => msg.classList.remove("typing"));
      messagesDiv.scrollTop = messagesDiv.scrollHeight;
    }, 2500);
    ideadStep = 0;
  }
  func = 0;
  current_input = "";
}

async function handlespecificationClick(specification) {
  current_function = "handlespecificationClick";
  var messagesDiv = document.getElementById("chat-section");
  var userMessage = `
    <div class="right-part">
        <div class="chat">
            <i class='bx bxs-user'></i>
            <p>${specification}</p>
        </div>
    </div>`;
  messagesDiv.innerHTML += userMessage;
  selectedSpecification = specification;
  var filteredData = gdata.filter(
    (item) =>
      item.Domain === selectedDomain &&
      item.Specifications.includes(specification)
  );

  var messagesDiv = document.getElementById("chat-section");

  var botMessage1 = `
        <div class="left-part">
            <div class="chat typing">
                <i class='bx bxs-bot'></i>
                <p>${filteredData[0]["Description"]}</p>
            </div>
        </div>`;

  messagesDiv.innerHTML += botMessage1;

  setTimeout(function () {
    var typingMessage = messagesDiv.querySelector(".typing");
    if (typingMessage) {
      typingMessage.classList.remove("typing");
    }
  }, 1100);

  messagesDiv.scrollTop = messagesDiv.scrollHeight;
  var botMessage2 = `
        <div class="left-part">
            <div class="chat typing">
                <i class='bx bxs-bot'></i>
                <p>Would you like to share any Idea?<span style="font-size: 20px;">🤔</span></p>
            </div>
            <div class="inner-button">
                <button onclick="handleDomainIdea('yes')">Yes</button>
                <button onclick="handleDomainIdea('no')">No</button>
            </div>
        </div>`;

  setTimeout(function () {
    messagesDiv.innerHTML += botMessage2;
    var typingMessage = messagesDiv.querySelectorAll(".typing");
    typingMessage.forEach((msg) => msg.classList.remove("typing"));
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
  }, 1100);
}

async function handleDomainClick(domain) {
  current_function = "handleDomainClick";
  var messagesDiv = document.getElementById("chat-section");
  selectedDomain = domain;
  var userMessage = `
        <div class="right-part">
            <div class="chat">
                <i class='bx bxs-user'></i>
                <p>${domain}</p>
            </div>
        </div>`;
  messagesDiv.innerHTML += userMessage;

  let response = await fetch("http://localhost:8888/Data_Fetch_Option_1");
  let data = await response.json();
  gdata = data;
  var filteredData = data.filter((item) => item.Domain === domain);

  // var domainButtons = document.querySelectorAll(".domain-button");
  // domainButtons.forEach((button) => (button.style.display = "none"));

  var specifications = filteredData.map((item) => item.Specifications);
  var specificationButtons = createspecificationButtons(specifications);

  var botMessage = `
        <div class="left-part">
            <div class="chat">
                <i class='bx bxs-bot'></i>
                <p>Here are the specifications for ${domain}<span style="font-size: 20px;">👇</span></p>
            </div>
            <div class=" specification-buttons">
                ${specificationButtons}
            </div>
        </div>`;
  messagesDiv.innerHTML += botMessage;
  messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

async function learnAboutProducts() {
  current_function = "learnAboutProducts";
  var messagesDiv = document.getElementById("chat-section");
  var userMessage = `
        <div class="right-part">
            <div class="chat">
                <i class='bx bxs-user'></i>
                <p>Learn about products</p>
            </div>
        </div>`;
  messagesDiv.innerHTML += userMessage;

  try {
    let response = await fetch("http://localhost:8888/Data_Fetch_Option_1");
    if (response.ok) {
      let data = await response.json();

      var uniqueDomains = getUniqueDomains(data);
      var domainButtons = createDomainButtons(uniqueDomains);

      var botMessage = `
                <div class="left-part">
                    <div class="chat">
                        <i class='bx bxs-bot'></i>
                        <p>Here are our products <span style="font-size: 20px;">👇</span></p>
                    </div>
                    <div class="inner-button">
                        ${domainButtons}
                    </div>
                </div>`;
      messagesDiv.innerHTML += botMessage;
      messagesDiv.scrollTop = messagesDiv.scrollHeight;
    } else {
      showErrorMessage(messagesDiv);
    }
  } catch (error) {
    showErrorMessage(messagesDiv);
  }
}

var track = 0;
var gete = 0;
const file_url = [];
var file_name = [];

async function uploadFile() {
  const fileInput = document.getElementById("file-input");
  fileInput.setAttribute("multiple", "multiple");
  fileInput.click();

  fileInput.addEventListener("change", async function handleFileSelect(event) {
    const files = Array.from(event.target.files);
    const uploadButton = document.getElementById("upload-button");
    uploadButton.innerText = "Uploading";
    uploadButton.style.backgroundColor = "red";
    uploadButton.style.color = "white";
    if (files.length > 0) {
      for (const file of files) {
        const fileName = await File_Uploading_Gdrive(file);
        file_name.push(file.name);
        file_url.push(fileName);
      }
      
      const uploadButton = document.getElementById("upload-button");
      uploadButton.innerText = "Uploaded";
      uploadButton.style.backgroundColor = "rgb(54, 54, 141)";
      uploadButton.style.color = "white";

      if (current_function === "handleIdeaResponse") {
        step++;
        handleIdeaResponse();
      } else if (current_function === "handleDomainIdea") {
        ideadStep++;
        handleDomainIdea();
      }
    } else {
    }
    fileInput.removeEventListener("change", handleFileSelect);
  });
}


function getInTouch() {
  current_function = "getInTouch";
  if (userInput !== "") {
    var messagesDiv = document.getElementById("chat-section");
    if (count === 0) {
      var userMessage = `
            <div class="right-part">
            <div class="chat">
            <i class='bx bxs-user'></i>
            <p>Get in touch</p>
            </div>
            </div>`;
      messagesDiv.innerHTML += userMessage;
      messagesDiv.scrollTop = messagesDiv.scrollHeight;
      count++;
    }
    if (track > 0 && step < 4) {
      var userInput = current_input;
      var userMessage = `
                <div class="user">
                    <p>${userInput}</p>
                </div>`;
      messagesDiv.innerHTML += userMessage;
      messagesDiv.scrollTop = messagesDiv.scrollHeight;
    }

    var botMessage = "";
    if (step === 0) {
      botMessage = `
                <div class="left-part">
                <div class="chat typing">
                    <i class='bx bxs-bot'></i>
                    <p>Please enter your name <span style="font-size: 20px;"> ✍️</span></p>
                </div>
                </div>`;
      setTimeout(function () {
        var typingMessage = messagesDiv.querySelector(".typing");
        if (typingMessage) {
          typingMessage.classList.remove("typing");
        }
      }, 1000);
      step++;
      track++;
    } else if (step == 1) {
      username = userInput;
      if (current_input != "") {
        step++;
        track++;
      } else {
        step--;
        track = 0;
        getInTouch();
        return;
      }
      botMessage = `
                <div class="left-part">
                <div class="chat typing">
                    <i class='bx bxs-bot'></i>
                    <p>Please enter your email<span style="font-size: 20px;">📧</span></p>
                </div>
                </div>`;
      setTimeout(function () {
        var typingMessage = messagesDiv.querySelector(".typing");
        if (typingMessage) {
          typingMessage.classList.remove("typing");
        }
      }, 1100);
    } else if (step === 2) {
      function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
      }

      if (emailvalid === false) {
        if (current_input != "" && isValidEmail(userInput)) {
          emailvalid = true;
          email = userInput;
          step++;
          track++;
        } else {
          track = 0;
          botMessage = `
                    <div class="left-part">
                    <div class="warning typing">
                    <i class='bx bxs-bot'></i>
                    <p>Your Email is incorrect!<span style="font-size: 20px;">😏</span></p>
                    </div>
                    </div>`;
          setTimeout(function () {
            var typingMessage = messagesDiv.querySelector(".typing");
            if (typingMessage) {
              typingMessage.classList.remove("typing");
            }
            messagesDiv.innerHTML += botMessage;
            messagesDiv.scrollTop = messagesDiv.scrollHeight;
            step--;
            getInTouch();
          }, 1100);
          return;
        }
      } else {
        step++;
        track++;
      }
      botMessage = `
                        <div class="left-part">
                        <div class="chat typing">
                            <i class='bx bxs-bot'></i>
                            <p>Please enter your mobile number<span style="font-size: 20px;"> 📞</span></p>
                        </div>
                        </div>`;
      setTimeout(function () {
        var typingMessage = messagesDiv.querySelector(".typing");
        if (typingMessage) {
          typingMessage.classList.remove("typing");
        }
      }, 1100);
    } else if (step === 3) {
      contact = userInput;
      function isValidContactNumber(contactNumber) {
        const contactRegex = /^(\+?\d{1,2}[- \.]?)?\d{10}$/;
        return contactRegex.test(contactNumber);
      }
      if (current_input != "" && isValidContactNumber(contact)) {
        step++;
        track++;
      } else {
        track = 0;
        botMessage = `
            <div class="left-part">
            <div class="warning typing">
                <i class='bx bxs-bot'></i>
                <p>Your Number is incorrect!<span style="font-size: 20px;">😏</span></p>
            </div>
            </div>`;

        setTimeout(function () {
          var typingMessage = messagesDiv.querySelector(".typing");
          if (typingMessage) {
            typingMessage.classList.remove("typing");
          }
          messagesDiv.innerHTML += botMessage;
          messagesDiv.scrollTop = messagesDiv.scrollHeight;
          step--;
          getInTouch();
        }, 1100);
        return;
      }
      botMessage = `
                        <div class="left-part">
                        <div class="chat typing">
                            <i class='bx bxs-bot'></i>
                            <p>Please enter your Preferred Mode of Contact<span style="font-size: 20px;">☎️</span></p>
                        </div>
                        <div class="contact">
                        <button class="contact-button" onclick="prefered_contact('Voice Call')">Voice Call</button>
                        <button class="contact-button" onclick="prefered_contact('Video Call')">Video Call</button>
                        <button class="contact-button" onclick="prefered_contact('Mail')">Mail</button>
                        <button class="contact-button" onclick="prefered_contact('Offline')">Offline</button>
                    </div>
                        </div>`;
      setTimeout(function () {
        var typingMessage = messagesDiv.querySelector(".typing");
        if (typingMessage) {
          typingMessage.classList.remove("typing");
        }
      }, 1100);
    } else if (step === 4) {
      if (current_input != "") {
        step++;
        track++;
      } else {
        step--;
        track = 0;
        getInTouch();
        return;
      }
      botMessage = `
            <div class="left-part">
            <div class="chat typing">
                <i class='bx bxs-bot'></i>
                <p>Name:  ${username}<br>Email:  ${email}<br>Contact:  ${contact}<br>Mode of Contact:  ${Prefered_Mode_of_Contact}</p>
            </div>
            <div class="chat typing">
                <i class='bx bxs-bot'></i>
                <p>would you like to share any Idea?<span style="font-size: 20px;">🤔</span></p>
            </div>
            <div class="inner-button">
                <button onclick="handleIdeaResponse('yes')">Yes</button>
                <button onclick="handleIdeaResponse('no')">No</button>
            </div>
            </div>`;
      setTimeout(function () {
        var typingMessage = messagesDiv.querySelector(".typing");
        if (typingMessage) {
          typingMessage.classList.remove("typing");
        }
      }, 1100);
    } else {
      // Default response for other inputs
      botMessage = `
            <div class="left-part">
                <div class="chat typing">
                    <i class='bx bxs-bot'></i>
                    <p>Sorry, I'm just a demo chatbot!<span style="font-size: 20px;">🤓</span></p>
                </div>
                </div>`;
      setTimeout(function () {
        var typingMessage = messagesDiv.querySelector(".typing");
        if (typingMessage) {
          typingMessage.classList.remove("typing");
        }
      }, 1100);
    }

    setTimeout(function () {
      var previousTypingMessages = messagesDiv.querySelectorAll(".typing");
      messagesDiv.innerHTML += botMessage;
      messagesDiv.scrollTop = messagesDiv.scrollHeight;
    }, 600);

    document.getElementById("userInput").value = "";
  }
}

function handleIdeaResponse(response) {
  current_function = "handleIdeaResponse";
  var userInput = current_input;
  var messagesDiv = document.getElementById("chat-section");
  var botMessage = "";
  if (response != undefined) {
    last_response = response;
  }
  if (last_response === "yes") {
    if (step >= 6 && step < 7) {
      var userInput = current_input;
      var userMessage = `
            <div class="user">
            <p>${userInput}</p>
            </div>`;
      messagesDiv.innerHTML += userMessage;
      messagesDiv.scrollTop = messagesDiv.scrollHeight;
    }
    if (step === 5) {
      botMessage = `
            <div class="left-part">
            <div class="chat typing">
            <i class='bx bxs-bot'></i>
            <p>Great! Please share your idea Domain<span style="font-size: 20px;">🌐</span></p>
            </div>
            </div>`;
    } else if (step === 6) {
      projectDomain = current_input;
      botMessage = `
                        <div class="left-part">
                        <div class="chat typing">
                            <i class='bx bxs-bot'></i>
                            <p>Share your ideas with us!<span style="font-size: 20px;">😀</span></p>
                        </div>
                        <div class="inner-button">
                            <input type="file" id="file-input" style="display: none;">
                            <button id="upload-button" onclick="uploadFile()">Upload</button>
                            <button id="button2"onclick = "Description()">Description</button>
                        </div>
                </div>
            </div>`;
      setTimeout(function () {
        var typingMessage = messagesDiv.querySelector(".typing");
        if (typingMessage) {
          typingMessage.classList.remove("typing");
        }
      }, 1100);
    }
  }
  if (step === 7) {
      var botMessage1 = `
            <div class="left-part">
            <div class="chat typing">
                <i class='bx bxs-bot'></i>
                <p>Name: ${username}<br>Email: ${email}<br>Contact :${contact}<br>Mode of Contact: ${Prefered_Mode_of_Contact}<br>Project Domain: ${projectDomain}<br>projectDescription: ${file_name}</p>
            </div>
            </div>`;
    setTimeout(function () {
      messagesDiv.innerHTML += botMessage1;
      var typingMessage = messagesDiv.querySelector(".typing");
      if (typingMessage) {
        typingMessage.classList.remove("typing");
      }
    }, 100);
    lead_Capturing(
      "Get In Touch ",
      username,
      email,
      contact,
      Prefered_Mode_of_Contact,
      projectDomain,
      "None",
      file_url
    );
    emailvalid = false;
    var botMessage2 = `
            <div class="left-part">
                <div class="chat typing">
                <i class='bx bxs-bot'></i>
                <p>Our team will contact you shortly<span style="font-size: 20px;">👨‍💻</span></p>
                </div>
            </div>`;

    setTimeout(function () {
      messagesDiv.innerHTML += botMessage2;
      var typingMessage = messagesDiv.querySelectorAll(".typing");
      typingMessage.forEach((msg) => msg.classList.remove("typing"));
      messagesDiv.scrollTop = messagesDiv.scrollHeight;
    }, 1500);

    var botMessage3 = `
                <div class="left-part">
                <div class="chat">
                <i class='bx bxs-bot'></i>
                <p>How can I assist you today?<span style="font-size: 20px;">🤔</span></p>
                </div>
                <div class = "inner-button">
                    <button onclick="learnAboutProducts()">Learn about products</button>
                    <button onclick="getInTouch()">Get in touch</button>
                    <button onclick="otherInquiries()">Other inquiries</button>
                </div>
                    </div>`;

    setTimeout(function () {
      messagesDiv.innerHTML += botMessage3;
      var typingMessage = messagesDiv.querySelectorAll(".typing");
      typingMessage.forEach((msg) => msg.classList.remove("typing"));
      messagesDiv.scrollTop = messagesDiv.scrollHeight;
    }, 2500);
    count = 0;
    step = 0;
    track = 0;
  } else if (last_response === "no") {
    count = 0;
    step = 0;
    track = 0;
    lead_Capturing(
      "Get In Touch",
      username,
      email,
      contact,
      Prefered_Mode_of_Contact,
      "None",
      "None",
      "None"
    );
    emailvalid = false;
    var botMessage1 = `
            <div class="left-part">
            <div class="chat typing">
                <i class='bx bxs-bot'></i>
                <p>Name:  ${username}<br>Email:  ${email}<br>Contact:  ${contact}<br>Mode of Contact:  ${Prefered_Mode_of_Contact}</p>
            </div>
            <div class="chat typing">
                <i class='bx bxs-bot'></i>
                <p>Thank You for Contacting Us. Our team will contact you shortly<span style="font-size: 20px;">👨‍💻</span></p>
        </div>`;
    setTimeout(function () {
      messagesDiv.innerHTML += botMessage1;
      var typingMessage = messagesDiv.querySelector(".typing");
      if (typingMessage) {
        typingMessage.classList.remove("typing");
      }
    }, 100);
    var botMessage3 = `
        <div class="left-part">
        <div class="chat">
        <i class='bx bxs-bot'></i>
        <p>How can I assist you today?<span style="font-size: 20px;">🤔</span></p>
    </div>
    <div class = "inner-button">
        <button onclick="learnAboutProducts()">Learn about products</button>
        <button onclick="getInTouch()">Get in touch</button>
        <button onclick="otherInquiries()">Other inquiries</button>
    </div>
        </div>`;

    setTimeout(function () {
      messagesDiv.innerHTML += botMessage3;
      var typingMessage = messagesDiv.querySelectorAll(".typing");
      typingMessage.forEach((msg) => msg.classList.remove("typing"));
      messagesDiv.scrollTop = messagesDiv.scrollHeight;
    }, 2500);
  }

  setTimeout(function () {
    var typingMessage = messagesDiv.querySelector(".typing");
    if (typingMessage) {
      typingMessage.classList.remove("typing");
    }
    messagesDiv.innerHTML += botMessage;
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
  }, 600);
}

//Below are the functions for FAQS
async function otherInquiries() {
  current_function = "otherInquiries";
  let response = await fetch("http://localhost:8888/FAQs_Fetch");

  let data = await response.json();
  var UniqueCategory = getUniqueCategory(data);
  var CategoryButtons = createCategoryButtons(UniqueCategory);
  var messagesDiv = document.getElementById("chat-section");

  var botMessage = `
                <div class="left-part">
                    <div class="chat">
                        <i class='bx bxs-bot'></i>
                        <p>Here are our products<span style="font-size: 20px;">👇</span></p>
                    </div>
                    <div class = "Category-button-display">
                        ${CategoryButtons}
                    </div>
                </div>`;
  messagesDiv.innerHTML += botMessage;
  messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

async function handleCategoryClick(Category) {
  current_function = "handleCategoryClick";
  var messagesDiv = document.getElementById("chat-section");
  selectedCategory = Category;
  var userMessage = `
        <div class="right-part">
            <div class="chat">
                <i class='bx bxs-user'></i>
                <p>${Category}</p>
            </div>
        </div>`;
  messagesDiv.innerHTML += userMessage;
  let response = await fetch("http://localhost:8888/FAQs_Fetch");
  let data = await response.json();
  var filteredData = data.filter((item) => item.Category === Category);
  var questions = filteredData.map((item) => item.Question);
  var questionbutton = createQuestionButtons(questions);
  var botMessage = `
    <div class="left-part">
        <div class="chat">
            <i class='bx bxs-bot'></i>
            <p>Here are the Questions for ${Category}:</p>
        </div>
        <div class="ques-style">
            ${questionbutton}
        </div>
    </div>`;
  messagesDiv.innerHTML += botMessage;
  messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

async function Answer(Question) {
  current_function = "Answer";
  var messagesDiv = document.getElementById("chat-section");
  let response = await fetch("http://localhost:8888/FAQs_Fetch");
  let data = await response.json();
  var userMessage = `
    <div class="chat-faq">
        <div class="chat">
            <p>${Question}</p>
        </div>
    </div>`;
  messagesDiv.innerHTML += userMessage;

  var filteredData = data.filter(
    (item) =>
      item.Category === selectedCategory && item.Question.includes(Question)
  );
  var botMessage1 = `
    <div class="left-part">
        <div class="ans typing ">
            <i class='bx bxs-bot'></i>
        <div class="ans-style">
            <p>${filteredData[0]["Answer"]}</p>
        </div>
    </div>`;

  messagesDiv.innerHTML += botMessage1;
  messagesDiv.scrollTop = messagesDiv.scrollHeight;
  var botMessage2 = `
                <div class="left-part">
                <div class="chat typing">
                <i class='bx bxs-bot'></i>
                    <p>Have Other Inquiries?<span style="font-size: 20px;">❓</span></p>
                </div>
                <div class = "inner-button">
                <button onclick="otherInquiries()">Other inquiries</button>
                <button onclick="first()">Main Menu</button>
                </div>
                </div>`;
  messagesDiv.innerHTML += botMessage2;
  messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

function first() {
  var messagesDiv = document.getElementById("chat-section");
  var botMessage3 = `
        <div class="left-part">
        <div class="chat">
        <i class='bx bxs-bot'></i>
        <p>How can I assist you today?<span style="font-size: 20px;">🤔</span></p>
    </div>
    <div class = "inner-button">
        <button onclick="learnAboutProducts()">Learn about products</button>
        <button onclick="getInTouch()">Get in touch</button>
        <button onclick="otherInquiries()">Other inquiries</button>
    </div>
        </div>`;

  setTimeout(function () {
    messagesDiv.innerHTML += botMessage3;
    var typingMessage = messagesDiv.querySelectorAll(".typing");
    typingMessage.forEach((msg) => msg.classList.remove("typing"));
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
  }, 200);
}
