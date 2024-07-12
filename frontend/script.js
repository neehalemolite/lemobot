const Lemolite_Bot_menutoggle = document.querySelector(
  ".Lemolite_Bot_menutoggle"
);
Lemolite_Bot_menutoggle.onclick = function () {
  Lemolite_Bot_menutoggle.classList.toggle("active");
};
var Lemolite_Bot_step = 0;
var Lemolite_Bot_ideadStep = 0;
var Lemolite_Bot_ideacount = 0;
var Lemolite_Bot_count = 0;

var Lemolite_Bot_username = "";
var Lemolite_Bot_email = "";
var Lemolite_Bot_contact = "";
var Lemolite_Bot_Prefered_Mode_of_Contact = "";
var Lemolite_Bot_projectDescription = "";
var Lemolite_Bot_projectDomain = "";

var Lemolite_Bot_message = "";

var Lemolite_Bot_current_function = "";
var Lemolite_Bot_current_input = "";
var Lemolite_Bot_last_response = "";
var Lemolite_Bot_emailvalid = false;

var Lemolite_Bot_selectedDomain = "";
var Lemolite_Bot_selectedCategory = "";
var Lemolite_Bot_selectedSpecification = "";
var Lemolite_Bot_gdata = "";

function Lemolite_Bot_supportive() {
  Lemolite_Bot_current_input = "";
  var Lemolite_Bot_userInput = document
    .getElementById("Lemolite_Bot_userInput")
    .value.trim();
  Lemolite_Bot_current_input = Lemolite_Bot_userInput;
  console.log(Lemolite_Bot_current_input);
  document.getElementById("Lemolite_Bot_userInput").value = "";
  if (Lemolite_Bot_userInput !== "") {
    if (Lemolite_Bot_current_function === "Lemolite_Bot_getInTouch") {
      Lemolite_Bot_getInTouch();
    } else if (
      Lemolite_Bot_current_function === "Lemolite_Bot_handleIdeaResponse"
    ) {
      Lemolite_Bot_step++;
      Lemolite_Bot_handleIdeaResponse();
    } else if (
      Lemolite_Bot_current_function === "Lemolite_Bot_handleDomainIdea"
    ) {
      Lemolite_Bot_handleDomainIdea();
    } else if (Lemolite_Bot_current_function === "Lemolite_Bot_description") {
      Lemolite_Bot_description();
    }
  }
}

function Lemolite_Bot_checkEnter(event) {
  if (event.keyCode === 13) {
    Lemolite_Bot_supportive();
  }
}

function Lemolite_Bot_getUniqueDomains(Lemolite_Bot_data) {
  const Lemolite_Bot_domains = Lemolite_Bot_data.map((item) => item.Domain);
  const Lemolite_Bot_uniqueDomains = [...new Set(Lemolite_Bot_domains)];
  return Lemolite_Bot_uniqueDomains;
}

function Lemolite_Bot_getUniqueCategory(Lemolite_Bot_data) {
  const Lemolite_Bot_Category = Lemolite_Bot_data.map((item) => item.Category);
  const Lemolite_Bot_UniqueCategory = [...new Set(Lemolite_Bot_Category)];
  return Lemolite_Bot_UniqueCategory;
}

function Lemolite_Bot_getUniqueSpecifications(Lemolite_Bot_data) {
  const Lemolite_Bot_Specifications = Lemolite_Bot_data.map(
    (item) => item.Specifications
  );
  const Lemolite_Bot_uniqueSpecifications = [
    ...new Set(Lemolite_Bot_Specifications),
  ];
  return Lemolite_Bot_uniqueSpecifications;
}

function Lemolite_Bot_createDomainButtons(Lemolite_Bot_domains) {
  return Lemolite_Bot_domains.map(
    (Lemolite_Bot_domain) =>
      `<button class="Lemolite_Bot_domain-button" onclick="handleDomainClick('${Lemolite_Bot_domain}')">${Lemolite_Bot_domain}</button>`
  ).join("");
}

function Lemolite_Bot_createCategoryButtons(Lemolite_Bot_Category) {
  return Lemolite_Bot_Category.map(
    (Lemolite_Bot_Category) =>
      `<button class="Lemolite_Bot_Category-button" onclick="Lemolite_Bot_handleCategoryClick('${Lemolite_Bot_Category}')">${Lemolite_Bot_Category}</button>`
  ).join("");
}

function Lemolite_Bot_createspecificationButtons(Lemolite_Bot_specification) {
  return Lemolite_Bot_specification.map(
    (Lemolite_Bot_specification) =>
      `<button class="Lemolite_Bot_specification-button" onclick="Lemolite_Bot_handlespecificationClick('${Lemolite_Bot_specification}')">${Lemolite_Bot_specification}</button>`
  ).join("");
}

function Lemolite_Bot_createQuestionButtons(Lemolite_Bot_Question) {
  return Lemolite_Bot_Question.map(
    (Lemolite_Bot_Question) =>
      `<button class="Lemolite_Bot_Category-button" onclick="Lemolite_Bot_Answer('${Lemolite_Bot_Question}')">${Lemolite_Bot_Question}</button>`
  ).join("");
}
function Lemolite_Bot_prefered_contact(Lemolite_Bot_mode) {
  Lemolite_Bot_Prefered_Mode_of_Contact = Lemolite_Bot_mode;
  var Lemolite_Bot_messagesDiv = document.getElementById(
    "Lemolite_Bot_chat-section"
  );
  var Lemolite_Bot_userMessage = `
        <div class="Lemolite_Bot_user">
            <p>${Lemolite_Bot_Prefered_Mode_of_Contact}</p>
        </div>`;
  Lemolite_Bot_messagesDiv.innerHTML += Lemolite_Bot_userMessage;
  Lemolite_Bot_messagesDiv.scrollTop = Lemolite_Bot_messagesDiv.scrollHeight;
  if (Lemolite_Bot_current_function === "Lemolite_Bot_getInTouch") {
    Lemolite_Bot_getInTouch();
  } else if (
    Lemolite_Bot_current_function === "Lemolite_Bot_handleIdeaResponse"
  ) {
    Lemolite_Bot_step++;
    Lemolite_Bot_handleIdeaResponse();
  } else if (
    Lemolite_Bot_current_function === "Lemolite_Bot_handleDomainIdea"
  ) {
    Lemolite_Bot_handleDomainIdea(Lemolite_Bot_last_response);
  } else if (Lemolite_Bot_current_function === "Lemolite_Bot_description") {
    Lemolite_Bot_description();
  }
}
var Lemolite_Bot_func = 0;
function Lemolite_Bot_handleDomainIdea(Lemolite_Bot_response) {
  Lemolite_Bot_current_function = "Lemolite_Bot_handleDomainIdea";
  var Lemolite_Bot_messagesDiv = document.getElementById(
    "Lemolite_Bot_chat-section"
  );
  var Lemolite_Bot_botMessage = "";
  if (Lemolite_Bot_response != undefined) {
    Lemolite_Bot_last_response = Lemolite_Bot_response;
  }

  if (Lemolite_Bot_ideacount === 0) {
    var Lemolite_Bot_userMessage = `
        <div class="Lemolite_Bot_right-part">
            <div class="Lemolite_Bot_chat">
                <p>${Lemolite_Bot_last_response}</p>
            </div>
        </div>`;
    Lemolite_Bot_messagesDiv.innerHTML += Lemolite_Bot_userMessage;
    Lemolite_Bot_messagesDiv.scrollTop = Lemolite_Bot_messagesDiv.scrollHeight;
    Lemolite_Bot_ideacount++;
  }

  if (Lemolite_Bot_last_response === "yes") {
    if (Lemolite_Bot_func > 0 && Lemolite_Bot_func < 4) {
      if (Lemolite_Bot_current_input !== "") {
        console.log(Lemolite_Bot_current_input);
        var Lemolite_Bot_userInput = Lemolite_Bot_current_input;
        var Lemolite_Bot_message = `
          <div class="Lemolite_Bot_user">
              <p>${Lemolite_Bot_userInput}</p>
          </div>`;
        Lemolite_Bot_messagesDiv.innerHTML += Lemolite_Bot_message;
        Lemolite_Bot_messagesDiv.scrollTop =
          Lemolite_Bot_messagesDiv.scrollHeight;
      }
    }

    var Lemolite_Bot_botMessage = "";

    if (Lemolite_Bot_ideadStep === 0) {
      Lemolite_Bot_botMessage = `
          <div class="Lemolite_Bot_left-part">
              <div class="Lemolite_Bot_chat Lemolite_Bot_typing">
                  <i class='bx bxs-bot'></i>
                  <p>Please enter your name <span style="font-size: 20px;"> ✍️</span></p>
              </div>
          </div>`;
      setTimeout(function () {
        var Lemolite_Bot_typingMessage = Lemolite_Bot_messagesDiv.querySelector(
          ".Lemolite_Bot_typing"
        );
        if (Lemolite_Bot_typingMessage) {
          Lemolite_Bot_typingMessage.classList.remove("Lemolite_Bot_typing");
        }
      }, 1000);
      Lemolite_Bot_ideadStep++;
      Lemolite_Bot_func++;
    } else if (Lemolite_Bot_ideadStep == 1) {
      if (Lemolite_Bot_current_input != "") {
        Lemolite_Bot_ideadStep++;
        Lemolite_Bot_func++;
      } else {
        Lemolite_Bot_ideadStep--;
        Lemolite_Bot_func = 0;
        Lemolite_Bot_handleDomainIdea();
        return;
      }

      Lemolite_Bot_username = Lemolite_Bot_userInput;
      Lemolite_Bot_botMessage = `
            <div class="Lemolite_Bot_left-part">
            <div class="Lemolite_Bot_chat Lemolite_Bot_typing">
                <i class='bx bxs-bot'></i>
                <p>Please enter your email<span style="font-size: 20px;">📧</span></p>
            </div>
            </div>`;

      setTimeout(function () {
        var Lemolite_Bot_typingMessage = Lemolite_Bot_messagesDiv.querySelector(
          ".Lemolite_Bot_typing"
        );
        if (Lemolite_Bot_typingMessage) {
          Lemolite_Bot_typingMessage.classList.remove("Lemolite_Bot_typing");
        }
      }, 1100);
    } else if (Lemolite_Bot_ideadStep === 2) {
      function Lemolite_Bot_isValidEmail(Lemolite_Bot_email) {
        const Lemolite_Bot_emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return Lemolite_Bot_emailRegex.test(Lemolite_Bot_email);
      }

      if (Lemolite_Bot_emailvalid === false) {
        if (
          Lemolite_Bot_current_input != "" &&
          Lemolite_Bot_isValidEmail(Lemolite_Bot_userInput)
        ) {
          Lemolite_Bot_emailvalid = true;
          Lemolite_Bot_email = Lemolite_Bot_userInput;
          Lemolite_Bot_ideadStep++;
          Lemolite_Bot_func++;
        } else {
          Lemolite_Bot_func = 0;
          Lemolite_Bot_botMessage = `
                        <div class="Lemolite_Bot_left-part">
                        <div class="Lemolite_Bot_warning Lemolite_Bot_typing">
                        <i class='bx bxs-bot'></i>
                        <p>Your email is incorrect!<span style="font-size: 20px;">😏</span></p>
                        </div>
                        </div>`;
          setTimeout(function () {
            var Lemolite_Bot_typingMessage =
              Lemolite_Bot_messagesDiv.querySelector(".Lemolite_Bot_typing");
            if (Lemolite_Bot_typingMessage) {
              Lemolite_Bot_typingMessage.classList.remove(
                "Lemolite_Bot_typing"
              );
            }
            Lemolite_Bot_messagesDiv.innerHTML += Lemolite_Bot_botMessage;
            Lemolite_Bot_messagesDiv.scrollTop =
              Lemolite_Bot_messagesDiv.scrollHeight;
            Lemolite_Bot_ideadStep--;
            Lemolite_Bot_handleDomainIdea();
          }, 1100);
          return;
        }
      } else {
        Lemolite_Bot_ideadStep++;
        Lemolite_Bot_func++;
      }

      Lemolite_Bot_botMessage = `
                <div class="Lemolite_Bot_left-part">
                    <div class="Lemolite_Bot_chat Lemolite_Bot_typing">
                        <i class='bx bxs-bot'></i>
                        <p>Please enter your mobile number<span style="font-size: 20px;">📞</span></p>
                    </div>
                </div>`;
      setTimeout(function () {
        var Lemolite_Bot_typingMessage = Lemolite_Bot_messagesDiv.querySelector(
          ".Lemolite_Bot_typing"
        );
        if (Lemolite_Bot_typingMessage) {
          Lemolite_Bot_typingMessage.classList.remove("Lemolite_Bot_typing");
        }
      }, 1100);
    } else if (Lemolite_Bot_ideadStep === 3) {
      function Lemolite_Bot_isValidContactNumber(Lemolite_Bot_contactNumber) {
        if (Lemolite_Bot_contactNumber.length === 10) {
          const Lemolite_Bot_contactRegex = /^(\+?\d{1,2}[- \.]?)?\d{10}$/;
          return Lemolite_Bot_contactRegex.test(Lemolite_Bot_contactNumber);
        }
        return false;
      }
      if (
        Lemolite_Bot_current_input != "" &&
        Lemolite_Bot_isValidContactNumber(Lemolite_Bot_userInput)
      ) {
        Lemolite_Bot_contact = Lemolite_Bot_userInput;
        Lemolite_Bot_ideadStep++;
        Lemolite_Bot_func++;
      } else {
        Lemolite_Bot_track = 0;
        Lemolite_Bot_botMessage = `
                <div class="Lemolite_Bot_left-part">
                <div class="Lemolite_Bot_warning Lemolite_Bot_typing">
                    <i class='bx bxs-bot'></i>
                    <p>Your Number is incorrect!<span style="font-size: 20px;">😏</span></p>
                </div>
                </div>`;

        setTimeout(function () {
          var Lemolite_Bot_typingMessage =
            Lemolite_Bot_messagesDiv.querySelector(".Lemolite_Bot_typing");
          if (Lemolite_Bot_typingMessage) {
            Lemolite_Bot_typingMessage.classList.remove("Lemolite_Bot_typing");
          }
          Lemolite_Bot_messagesDiv.innerHTML += Lemolite_Bot_botMessage;
          Lemolite_Bot_messagesDiv.scrollTop =
            Lemolite_Bot_messagesDiv.scrollHeight;
          Lemolite_Bot_ideadStep--;
          Lemolite_Bot_func = 0;
          Lemolite_Bot_handleDomainIdea();
        }, 1100);
        return;
      }

      var Lemolite_Bot_textbox = document.getElementById(
        "Lemolite_Bot_userInput"
      );
      Lemolite_Bot_textbox.disabled = true;
      Lemolite_Bot_botMessage = `
                <div class="Lemolite_Bot_left-part">
                    <div class="Lemolite_Bot_chat Lemolite_Bot_typing">
                        <i class='bx bxs-bot'></i>
                        <p>Please enter your Preferred Mode of contact<span style="font-size: 20px;"> ☎️</span></p>
                    </div>
                    <div class="Lemolite_Bot_contact">
                        <button class="Lemolite_Bot_contact-button" onclick="Lemolite_Bot_prefered_contact('Voice Call')">Voice Call</button>
                        <button class="Lemolite_Bot_contact-button" onclick="Lemolite_Bot_prefered_contact('Video Call')">Video Call</button>
                        <button class="Lemolite_Bot_contact-button" onclick="Lemolite_Bot_prefered_contact('Mail')">Mail</button>
                        <button class="Lemolite_Bot_contact-button" onclick="Lemolite_Bot_prefered_contact('Offline')">Offline</button>
                    </div>
                </div>`;
      setTimeout(function () {
        var Lemolite_Bot_typingMessage = Lemolite_Bot_messagesDiv.querySelector(
          ".Lemolite_Bot_typing"
        );
        if (Lemolite_Bot_typingMessage) {
          Lemolite_Bot_typingMessage.classList.remove("Lemolite_Bot_typing");
        }
      }, 1100);
    } else if (Lemolite_Bot_ideadStep === 4) {
      var Lemolite_Bot_textbox = document.getElementById(
        "Lemolite_Bot_userInput"
      );
      Lemolite_Bot_textbox.disabled = true;
      Lemolite_Bot_botMessage = `
            <div class="Lemolite_Bot_left-part">
                <div class="Lemolite_Bot_chat Lemolite_Bot_typing">
                    <i class='bx bxs-bot'></i>
                    <p>So, What's the Great Idea?<span style="font-size: 20px;">😀</span></p>
                </div>
                <div class="Lemolite_Bot_inner-button">
                    <input type="file" id="Lemolite_Bot_file-input" style="display: none;">
                    <button id="Lemolite_Bot_upload-button" onclick = "Lemolite_Bot_uploadFile()">Upload</button>
                    <button id="Lemolite_Bot_button2"onclick = "Lemolite_Bot_description()">description</button>
                </div>
            </div>`;
      setTimeout(function () {
        var Lemolite_Bot_typingMessage = Lemolite_Bot_messagesDiv.querySelector(
          ".Lemolite_Bot_typing"
        );
        if (Lemolite_Bot_typingMessage) {
          Lemolite_Bot_typingMessage.classList.remove("Lemolite_Bot_typing");
        }
      }, 1100);
    } else if (Lemolite_Bot_ideadStep === 5) {
      var Lemolite_Bot_textbox = document.getElementById(
        "Lemolite_Bot_userInput"
      );
      Lemolite_Bot_textbox.disabled = false;
      Lemolite_Bot_projectDomain = Lemolite_Bot_selectedSpecification;
      var Lemolite_Bot_botMessage1 = `
            <div class="Lemolite_Bot_left-part">
            <div class="Lemolite_Bot_chat Lemolite_Bot_typing">
                <i class='bx bxs-bot'></i>
                <p>Name:  ${Lemolite_Bot_username}<br>email:  ${Lemolite_Bot_email}<br>contact:  ${Lemolite_Bot_contact}<br>Mode of contact:  ${Lemolite_Bot_Prefered_Mode_of_Contact}<br>Project Domain:  ${Lemolite_Bot_projectDomain}<br>ProjectDescription:  ${Lemolite_Bot_file_name}</p>
            </div>
            </div>`;
      setTimeout(function () {
        Lemolite_Bot_messagesDiv.innerHTML += Lemolite_Bot_botMessage1;
        var Lemolite_Bot_typingMessage = Lemolite_Bot_messagesDiv.querySelector(
          ".Lemolite_Bot_typing"
        );
        if (Lemolite_Bot_typingMessage) {
          Lemolite_Bot_typingMessage.classList.remove("Lemolite_Bot_typing");
        }
      }, 100);
      Lemolite_Bot_lead_Capturing(
        Lemolite_Bot_selectedDomain,
        Lemolite_Bot_username,
        Lemolite_Bot_email,
        Lemolite_Bot_contact,
        Lemolite_Bot_Prefered_Mode_of_Contact,
        Lemolite_Bot_projectDomain,
        "None",
        Lemolite_Bot_file_url,
      );
      Lemolite_Bot_emailvalid = false;
      var Lemolite_Bot_botMessage2 = `
            <div class="Lemolite_Bot_left-part">
                <div class="Lemolite_Bot_chat Lemolite_Bot_typing">
                <i class='bx bxs-bot'></i>
                <p>Our team will contact you shortly!<span style="font-size: 20px;">👨‍💻</span></p>
                </div>
            </div>`;

      setTimeout(function () {
        Lemolite_Bot_messagesDiv.innerHTML += Lemolite_Bot_botMessage2;
        var Lemolite_Bot_typingMessage =
          Lemolite_Bot_messagesDiv.querySelectorAll(".Lemolite_Bot_typing");
        Lemolite_Bot_typingMessage.forEach((msg) =>
          msg.classList.remove("Lemolite_Bot_typing")
        );
        Lemolite_Bot_messagesDiv.scrollTop =
          Lemolite_Bot_messagesDiv.scrollHeight;
      }, 1500);

      var Lemolite_Bot_botMessage3 = `
                <div class="Lemolite_Bot_left-part">
                <div class="Lemolite_Bot_chat">
                <i class='bx bxs-bot'></i>
                <p>How can I assist you today?<span style="font-size: 20px;">🤔</span></p>
                </div>
                <div class = "Lemolite_Bot_inner-button">
                    <button onclick="Lemolite_Bot_learnAboutProducts()">Learn about products</button>
                    <button onclick="Lemolite_Bot_getInTouch()">Get in touch</button>
                    <button onclick="Lemolite_Bot_otherInquiries()">Other inquiries</button>
                </div>
                    </div>`;

      setTimeout(function () {
        Lemolite_Bot_messagesDiv.innerHTML += Lemolite_Bot_botMessage3;
        var Lemolite_Bot_typingMessage =
          Lemolite_Bot_messagesDiv.querySelectorAll(".Lemolite_Bot_typing");
        Lemolite_Bot_typingMessage.forEach((msg) =>
          msg.classList.remove("Lemolite_Bot_typing")
        );
        Lemolite_Bot_messagesDiv.scrollTop =
          Lemolite_Bot_messagesDiv.scrollHeight;
      }, 2500);
      Lemolite_Bot_ideadStep = 0;
      Lemolite_Bot_func = 0;
      Lemolite_Bot_ideacount = 0;
    }
  } else if (Lemolite_Bot_last_response === "no") {
    var Lemolite_Bot_botMessage1 = `
        <div class="Lemolite_Bot_left-part">
        <div class="Lemolite_Bot_chat Lemolite_Bot_typing">
            <i class='bx bxs-bot'></i>
            <p>No worries! If you have any Lemolite_Bot_questions, feel free to ask.<span style="font-size: 20px;">😎</span></p>
    </div>`;
    setTimeout(function () {
      Lemolite_Bot_messagesDiv.innerHTML += Lemolite_Bot_botMessage1;
      var Lemolite_Bot_typingMessage = Lemolite_Bot_messagesDiv.querySelector(
        ".Lemolite_Bot_typing"
      );
      if (Lemolite_Bot_typingMessage) {
        Lemolite_Bot_typingMessage.classList.remove("Lemolite_Bot_typing");
      }
    }, 100);
    var Lemolite_Bot_botMessage3 = `
    <div class="Lemolite_Bot_left-part">
    < class="Lemolite_Bot_chat">
    <i class='bx bxs-bot'></i>
    <p>How can I assist you today?<span style="font-size: 20px;">🤔</span></p>
</>
<div class = "Lemolite_Bot_inner-button">
    <button onclick="Lemolite_Bot_learnAboutProducts()">Learn about products</button>
    <button onclick="Lemolite_Bot_getInTouch()">Get in touch</button>
    <button onclick="Lemolite_Bot_otherInquiries()">Other inquiries</button>
</div>
</div>`;

    setTimeout(function () {
      Lemolite_Bot_messagesDiv.innerHTML += Lemolite_Bot_botMessage3;
      var Lemolite_Bot_typingMessage =
        Lemolite_Bot_messagesDiv.querySelectorAll(".Lemolite_Bot_typing");
      Lemolite_Bot_typingMessage.forEach((msg) =>
        msg.classList.remove("Lemolite_Bot_typing")
      );
      Lemolite_Bot_messagesDiv.scrollTop =
        Lemolite_Bot_messagesDiv.scrollHeight;
    }, 1500);
    Lemolite_Bot_ideacount = 0;
  }

  setTimeout(function () {
    var Lemolite_Bot_typingMessage = Lemolite_Bot_messagesDiv.querySelector(
      ".Lemolite_Bot_typing"
    );
    if (Lemolite_Bot_typingMessage) {
      Lemolite_Bot_typingMessage.classList.remove("Lemolite_Bot_typing");
    }
  }, 1100);

  setTimeout(function () {
    Lemolite_Bot_messagesDiv.innerHTML += Lemolite_Bot_botMessage;
    Lemolite_Bot_messagesDiv.scrollTop = Lemolite_Bot_messagesDiv.scrollHeight;
  }, 600);
  Lemolite_Bot_current_input = "";
}

async function Lemolite_Bot_description() {
  var Lemolite_Bot_last_function = Lemolite_Bot_current_function;
  Lemolite_Bot_current_function = "Lemolite_Bot_description";
  var Lemolite_Bot_textbox = document.getElementById("Lemolite_Bot_userInput");
  Lemolite_Bot_textbox.disabled = false;
  var Lemolite_Bot_messagesDiv = document.getElementById(
    "Lemolite_Bot_chat-section"
  );
  if (Lemolite_Bot_ideadStep < 5) {
    Lemolite_Bot_ideadStep = 5;
  }
  if (Lemolite_Bot_ideadStep > 5) {
    var Lemolite_Bot_userInput = Lemolite_Bot_current_input;
    var Lemolite_Bot_userMessage = `
        <div class="Lemolite_Bot_user">
        <p>${Lemolite_Bot_userInput}</p>
        </div>`;
    Lemolite_Bot_messagesDiv.innerHTML += Lemolite_Bot_userMessage;
    Lemolite_Bot_messagesDiv.scrollTop = Lemolite_Bot_messagesDiv.scrollHeight;
  }
  if (Lemolite_Bot_ideadStep === 5) {
    var Lemolite_Bot_userMessage = `
        <div class="Lemolite_Bot_user">
        <p>description</p>
        </div>`;
    Lemolite_Bot_messagesDiv.innerHTML += Lemolite_Bot_userMessage;
    Lemolite_Bot_messagesDiv.scrollTop = Lemolite_Bot_messagesDiv.scrollHeight;
  }
  if (Lemolite_Bot_ideadStep === 5) {
    var Lemolite_Bot_botMessage1 = `
        <div class="Lemolite_Bot_left-part">
        <div class="Lemolite_Bot_chat Lemolite_Bot_typing">
            <i class='bx bxs-bot'></i>
            <p>Sure! You can Write the description.</p>
        </div>
    </div>`;

    setTimeout(function () {
      Lemolite_Bot_messagesDiv.innerHTML += Lemolite_Bot_botMessage1;
      var Lemolite_Bot_typingMessage = Lemolite_Bot_messagesDiv.querySelector(
        ".Lemolite_Bot_typing"
      );
      if (Lemolite_Bot_typingMessage) {
        Lemolite_Bot_typingMessage.classList.remove("Lemolite_Bot_typing");
      }
      Lemolite_Bot_messagesDiv.scrollTop =
        Lemolite_Bot_messagesDiv.scrollHeight;
    }, 100);

    Lemolite_Bot_ideadStep++;
  } else if (Lemolite_Bot_ideadStep === 6) {
    Lemolite_Bot_projectDescription = Lemolite_Bot_userInput;
    Lemolite_Bot_projectDomain = Lemolite_Bot_selectedSpecification;

    var Lemolite_Bot_botMessage1 = `
        <div class="Lemolite_Bot_left-part">
        <div class="Lemolite_Bot_chat Lemolite_Bot_typing">
            <i class='bx bxs-bot'></i>
            <p>Name:  ${Lemolite_Bot_username}<br>email:  ${Lemolite_Bot_email}<br>contact:  ${Lemolite_Bot_contact}<br>Mode of contact:  ${Lemolite_Bot_Prefered_Mode_of_Contact}<br>Project Domain:  ${Lemolite_Bot_projectDomain}<br>ProjectDescription:  ${Lemolite_Bot_projectDescription}</p>
        </div>
    </div>`;
    setTimeout(function () {
      Lemolite_Bot_messagesDiv.innerHTML += Lemolite_Bot_botMessage1;
      var Lemolite_Bot_typingMessage = Lemolite_Bot_messagesDiv.querySelector(
        ".Lemolite_Bot_typing"
      );
      if (Lemolite_Bot_typingMessage) {
        Lemolite_Bot_typingMessage.classList.remove("Lemolite_Bot_typing");
      }
    }, 100);
      await Lemolite_Bot_lead_Capturing(
        Lemolite_Bot_selectedDomain,
        Lemolite_Bot_username,
        Lemolite_Bot_email,
        Lemolite_Bot_contact,
        Lemolite_Bot_Prefered_Mode_of_Contact,
        Lemolite_Bot_projectDomain,
        Lemolite_Bot_projectDescription,
        ["None"]
      );
    Lemolite_Bot_emailvalid = false;
    var Lemolite_Bot_botMessage2 = `
    <div class="Lemolite_Bot_left-part">
        <div class="Lemolite_Bot_chat Lemolite_Bot_typing">
            <i class='bx bxs-bot'></i>
            <p>Our team will contact you shortly!<span style="font-size: 20px;">👨‍💻</span></p>
        </div>
    </div>`;

    setTimeout(function () {
      Lemolite_Bot_messagesDiv.innerHTML += Lemolite_Bot_botMessage2;
      var Lemolite_Bot_typingMessage =
        Lemolite_Bot_messagesDiv.querySelectorAll(".Lemolite_Bot_typing");
      Lemolite_Bot_typingMessage.forEach((msg) =>
        msg.classList.remove("Lemolite_Bot_typing")
      );
      Lemolite_Bot_messagesDiv.scrollTop =
        Lemolite_Bot_messagesDiv.scrollHeight;
    }, 1500);

    var Lemolite_Bot_botMessage3 = `
    <div class="Lemolite_Bot_left-part">
    <div class="Lemolite_Bot_chat">
    <i class='bx bxs-bot'></i>
    <p>How can I assist you today?<span style="font-size: 20px;">🤔</span></p>
</div>
<div class = "Lemolite_Bot_inner-button">
    <button onclick="Lemolite_Bot_learnAboutProducts()">Learn about products</button>
    <button onclick="Lemolite_Bot_getInTouch()">Get in touch</button>
    <button onclick="Lemolite_Bot_otherInquiries()">Other inquiries</button>
</div>
    </div>`;

    setTimeout(function () {
      Lemolite_Bot_messagesDiv.innerHTML += Lemolite_Bot_botMessage3;
      var Lemolite_Bot_typingMessage =
        Lemolite_Bot_messagesDiv.querySelectorAll(".Lemolite_Bot_typing");
      Lemolite_Bot_typingMessage.forEach((msg) =>
        msg.classList.remove("Lemolite_Bot_typing")
      );
      Lemolite_Bot_messagesDiv.scrollTop =
        Lemolite_Bot_messagesDiv.scrollHeight;
    }, 2500);
    Lemolite_Bot_ideadStep = 0;
  }
  Lemolite_Bot_func = 0;
  Lemolite_Bot_current_input = "";
}

async function Lemolite_Bot_handlespecificationClick(
  Lemolite_Bot_specification
) {
  Lemolite_Bot_current_function = "Lemolite_Bot_handlespecificationClick";
  var Lemolite_Bot_messagesDiv = document.getElementById(
    "Lemolite_Bot_chat-section"
  );
  var Lemolite_Bot_userMessage = `
    <div class="Lemolite_Bot_right-part">
        <div class="Lemolite_Bot_chat">
            <i class='bx bxs-Lemolite_Bot_user'></i>
            <p>${Lemolite_Bot_specification}</p>
        </div>
    </div>`;
  Lemolite_Bot_messagesDiv.innerHTML += Lemolite_Bot_userMessage;
  Lemolite_Bot_selectedSpecification = Lemolite_Bot_specification;
  var Lemolite_Bot_filteredData = Lemolite_Bot_gdata.filter(
    (item) =>
      item.Domain === Lemolite_Bot_selectedDomain &&
      item.Specifications.includes(Lemolite_Bot_specification)
  );

  var Lemolite_Bot_messagesDiv = document.getElementById(
    "Lemolite_Bot_chat-section"
  );

  var Lemolite_Bot_botMessage1 = `
        <div class="Lemolite_Bot_left-part">
            <div class="Lemolite_Bot_chat Lemolite_Bot_typing">
                <i class='bx bxs-bot'></i>
                <p>${Lemolite_Bot_filteredData[0]["Description"]}</p>
            </div>
        </div>`;

  Lemolite_Bot_messagesDiv.innerHTML += Lemolite_Bot_botMessage1;

  setTimeout(function () {
    var Lemolite_Bot_typingMessage = Lemolite_Bot_messagesDiv.querySelector(
      ".Lemolite_Bot_typing"
    );
    if (Lemolite_Bot_typingMessage) {
      Lemolite_Bot_typingMessage.classList.remove("Lemolite_Bot_typing");
    }
  }, 1100);

  Lemolite_Bot_messagesDiv.scrollTop = Lemolite_Bot_messagesDiv.scrollHeight;
  var Lemolite_Bot_botMessage2 = `
        <div class="Lemolite_Bot_left-part">
            <div class="Lemolite_Bot_chat Lemolite_Bot_typing">
                <i class='bx bxs-bot'></i>
                <p>Would you like to share any Idea?<span style="font-size: 20px;">🤔</span></p>
            </div>
            <div class="Lemolite_Bot_inner-button">
                <button onclick="Lemolite_Bot_handleDomainIdea('yes')">Yes</button>
                <button onclick="Lemolite_Bot_handleDomainIdea('no')">No</button>
            </div>
        </div>`;

  setTimeout(function () {
    Lemolite_Bot_messagesDiv.innerHTML += Lemolite_Bot_botMessage2;
    var Lemolite_Bot_typingMessage = Lemolite_Bot_messagesDiv.querySelectorAll(
      ".Lemolite_Bot_typing"
    );
    Lemolite_Bot_typingMessage.forEach((msg) =>
      msg.classList.remove("Lemolite_Bot_typing")
    );
    Lemolite_Bot_messagesDiv.scrollTop = Lemolite_Bot_messagesDiv.scrollHeight;
  }, 1100);
}

async function handleDomainClick(Lemolite_Bot_domain) {
  Lemolite_Bot_current_function = "handleDomainClick";
  var Lemolite_Bot_messagesDiv = document.getElementById(
    "Lemolite_Bot_chat-section"
  );
  Lemolite_Bot_selectedDomain = Lemolite_Bot_domain;
  var Lemolite_Bot_userMessage = `
        <div class="Lemolite_Bot_right-part">
            <div class="Lemolite_Bot_chat">
                <i class='bx bxs-Lemolite_Bot_user'></i>
                <p>${Lemolite_Bot_domain}</p>
            </div>
        </div>`;
  Lemolite_Bot_messagesDiv.innerHTML += Lemolite_Bot_userMessage;

  let Lemolite_Bot_response = await fetch(
    "http://localhost:8888/Data_Fetch_Option_1"
  );
  let Lemolite_Bot_data = await Lemolite_Bot_response.json();
  Lemolite_Bot_gdata = Lemolite_Bot_data;
  var Lemolite_Bot_filteredData = Lemolite_Bot_data.filter(
    (item) => item.Domain === Lemolite_Bot_domain
  );

  // var Lemolite_Bot_domainButtons = document.querySelectorAll(".Lemolite_Bot_domain-button");
  // Lemolite_Bot_domainButtons.forEach((button) => (button.style.display = "none"));

  var Lemolite_Bot_Specifications = Lemolite_Bot_filteredData.map(
    (item) => item.Specifications
  );
  var Lemolite_Bot_specificationButtons =
    Lemolite_Bot_createspecificationButtons(Lemolite_Bot_Specifications);

  var Lemolite_Bot_botMessage = `
        <div class="Lemolite_Bot_left-part">
            <div class="Lemolite_Bot_chat">
                <i class='bx bxs-bot'></i>
                <p>Here are the Specifications for ${Lemolite_Bot_domain}<span style="font-size: 20px;">👇</span></p>
            </div>
            <div class=" Lemolite_Bot_specification-buttons">
                ${Lemolite_Bot_specificationButtons}
            </div>
        </div>`;
  Lemolite_Bot_messagesDiv.innerHTML += Lemolite_Bot_botMessage;
  Lemolite_Bot_messagesDiv.scrollTop = Lemolite_Bot_messagesDiv.scrollHeight;
}

async function Lemolite_Bot_learnAboutProducts() {
  Lemolite_Bot_current_function = "Lemolite_Bot_learnAboutProducts";
  var Lemolite_Bot_messagesDiv = document.getElementById(
    "Lemolite_Bot_chat-section"
  );
  var Lemolite_Bot_userMessage = `
        <div class="Lemolite_Bot_right-part">
            <div class="Lemolite_Bot_chat">
                <i class='bx bxs-Lemolite_Bot_user'></i>
                <p>Learn about products</p>
            </div>
        </div>`;
  Lemolite_Bot_messagesDiv.innerHTML += Lemolite_Bot_userMessage;

  try {
    let Lemolite_Bot_response = await fetch(
      "http://localhost:8888/Data_Fetch_Option_1"
    );
    if (Lemolite_Bot_response.ok) {
      let Lemolite_Bot_data = await Lemolite_Bot_response.json();

      var Lemolite_Bot_uniqueDomains =
        Lemolite_Bot_getUniqueDomains(Lemolite_Bot_data);
      var Lemolite_Bot_domainButtons = Lemolite_Bot_createDomainButtons(
        Lemolite_Bot_uniqueDomains
      );

      var Lemolite_Bot_botMessage = `
                <div class="Lemolite_Bot_left-part">
                    <div class="Lemolite_Bot_chat">
                        <i class='bx bxs-bot'></i>
                        <p>Here are our products <span style="font-size: 20px;">👇</span></p>
                    </div>
                    <div class="Lemolite_Bot_inner-button">
                        ${Lemolite_Bot_domainButtons}
                    </div>
                </div>`;
      Lemolite_Bot_messagesDiv.innerHTML += Lemolite_Bot_botMessage;
      Lemolite_Bot_messagesDiv.scrollTop =
        Lemolite_Bot_messagesDiv.scrollHeight;
    } else {
      showErrorMessage(Lemolite_Bot_messagesDiv);
    }
  } catch (error) {
    showErrorMessage(Lemolite_Bot_messagesDiv);
  }
}

var Lemolite_Bot_track = 0;
var gete = 0;
var Lemolite_Bot_file_url = [];
var Lemolite_Bot_file_name = [];

var Lemolite_Bot_warn_count = 0;

async function Lemolite_Bot_uploadFile() {
  const Lemolite_Bot_fileInput = document.getElementById("Lemolite_Bot_file-input");
  Lemolite_Bot_fileInput.setAttribute("multiple", "multiple");
  Lemolite_Bot_fileInput.click();
  // Display "20mb only" message
  if(Lemolite_Bot_warn_count === 0){
    const uploadMessage = document.createElement("p");
    uploadMessage.textContent = "file must not be greater than 20mb";
    uploadMessage.style.fontSize = "13px";
    uploadMessage.style.color = "red";
    uploadMessage.style.marginTop = "-1px";
    uploadMessage.id = "upload-message";
    Lemolite_Bot_warn_count ++;
    const uploadButton = document.getElementById("Lemolite_Bot_upload-button");
    uploadButton.parentNode.insertBefore(uploadMessage, uploadButton.nextSibling);
  }
  Lemolite_Bot_fileInput.addEventListener(
    "change",
    async function Lemolite_Bot_handleFileSelect(event) {
      const Lemolite_Bot_files = Array.from(event.target.files);
      const Lemolite_Bot_uploadButton = document.getElementById("Lemolite_Bot_upload-button");
      Lemolite_Bot_uploadButton.innerText = "Uploading";
      Lemolite_Bot_uploadButton.style.backgroundColor = "red";
      Lemolite_Bot_uploadButton.style.color = "white";
      // Remove "20mb only" message
      const message = document.getElementById("upload-message");
      if (message) {
        Lemolite_Bot_warn_count = 0;
        console.log(Lemolite_Bot_warn_count)
        message.remove();
      }
      if (Lemolite_Bot_files.length > 0) {
        for (const Lemolite_Bot_file of Lemolite_Bot_files) {
          console.log(Lemolite_Bot_file);
          const Lemolite_Bot_fileurl = await Lemolite_Bot_File_Uploading_Gdrive(Lemolite_Bot_file);
          Lemolite_Bot_file_name.push(Lemolite_Bot_file.name);
          Lemolite_Bot_file_url.push(Lemolite_Bot_fileurl);
        }
        Lemolite_Bot_uploadButton.innerText = "Uploaded";
        Lemolite_Bot_uploadButton.style.backgroundColor = "rgb(54, 54, 141)";
        Lemolite_Bot_uploadButton.style.color = "white";
        if (Lemolite_Bot_current_function === "Lemolite_Bot_handleIdeaResponse") {
          Lemolite_Bot_step++;
          Lemolite_Bot_handleIdeaResponse();
        } else if (Lemolite_Bot_current_function === "Lemolite_Bot_handleDomainIdea") {
          Lemolite_Bot_ideadStep++;
          Lemolite_Bot_handleDomainIdea();
        }
      } else {
        console.log("No files selected.");
      }
      // Removing the event listener
      Lemolite_Bot_fileInput.removeEventListener("change", Lemolite_Bot_handleFileSelect);
    }
  );
}

function Lemolite_Bot_getInTouch() {
  Lemolite_Bot_current_function = "Lemolite_Bot_getInTouch";
  if (Lemolite_Bot_userInput !== "") {
    var Lemolite_Bot_messagesDiv = document.getElementById(
      "Lemolite_Bot_chat-section"
    );
    if (Lemolite_Bot_count === 0) {
      var Lemolite_Bot_userMessage = `
            <div class="Lemolite_Bot_right-part">
            <div class="Lemolite_Bot_chat">
            <i class='bx bxs-Lemolite_Bot_user'></i>
            <p>Get in touch</p>
            </div>
            </div>`;
      Lemolite_Bot_messagesDiv.innerHTML += Lemolite_Bot_userMessage;
      Lemolite_Bot_messagesDiv.scrollTop =
        Lemolite_Bot_messagesDiv.scrollHeight;
      Lemolite_Bot_count++;
    }
    if (Lemolite_Bot_track > 0 && Lemolite_Bot_step < 4) {
      var Lemolite_Bot_userInput = Lemolite_Bot_current_input;
      var Lemolite_Bot_userMessage = `
                <div class="Lemolite_Bot_user">
                    <p>${Lemolite_Bot_userInput}</p>
                </div>`;
      Lemolite_Bot_messagesDiv.innerHTML += Lemolite_Bot_userMessage;
      Lemolite_Bot_messagesDiv.scrollTop =
        Lemolite_Bot_messagesDiv.scrollHeight;
    }

    var Lemolite_Bot_botMessage = "";
    if (Lemolite_Bot_step === 0) {
      Lemolite_Bot_botMessage = `
                <div class="Lemolite_Bot_left-part">
                <div class="Lemolite_Bot_chat Lemolite_Bot_typing">
                    <i class='bx bxs-bot'></i>
                    <p>Please enter your name <span style="font-size: 20px;"> ✍️</span></p>
                </div>
                </div>`;
      setTimeout(function () {
        var Lemolite_Bot_typingMessage = Lemolite_Bot_messagesDiv.querySelector(
          ".Lemolite_Bot_typing"
        );
        if (Lemolite_Bot_typingMessage) {
          Lemolite_Bot_typingMessage.classList.remove("Lemolite_Bot_typing");
        }
      }, 1000);
      Lemolite_Bot_step++;
      Lemolite_Bot_track++;
    } else if (Lemolite_Bot_step == 1) {
      Lemolite_Bot_username = Lemolite_Bot_userInput;
      if (Lemolite_Bot_current_input != "") {
        Lemolite_Bot_step++;
        Lemolite_Bot_track++;
      } else {
        Lemolite_Bot_step--;
        Lemolite_Bot_track = 0;
        Lemolite_Bot_getInTouch();
        return;
      }
      Lemolite_Bot_botMessage = `
                <div class="Lemolite_Bot_left-part">
                <div class="Lemolite_Bot_chat Lemolite_Bot_typing">
                    <i class='bx bxs-bot'></i>
                    <p>Please enter your email <span style="font-size: 20px;">📧</span></p>
                </div>
                </div>`;
      setTimeout(function () {
        var Lemolite_Bot_typingMessage = Lemolite_Bot_messagesDiv.querySelector(
          ".Lemolite_Bot_typing"
        );
        if (Lemolite_Bot_typingMessage) {
          Lemolite_Bot_typingMessage.classList.remove("Lemolite_Bot_typing");
        }
      }, 1100);
    } else if (Lemolite_Bot_step === 2) {
      function Lemolite_Bot_isValidEmail(Lemolite_Bot_email) {
        const Lemolite_Bot_emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return Lemolite_Bot_emailRegex.test(Lemolite_Bot_email);
      }

      if (Lemolite_Bot_emailvalid === false) {
        if (
          Lemolite_Bot_current_input != "" &&
          Lemolite_Bot_isValidEmail(Lemolite_Bot_userInput)
        ) {
          Lemolite_Bot_emailvalid = true;
          Lemolite_Bot_email = Lemolite_Bot_userInput;
          Lemolite_Bot_step++;
          Lemolite_Bot_track++;
        } else {
          Lemolite_Bot_track = 0;
          Lemolite_Bot_botMessage = `
                    <div class="Lemolite_Bot_left-part">
                    <div class="Lemolite_Bot_warning Lemolite_Bot_typing">
                    <i class='bx bxs-bot'></i>
                    <p>Your email is incorrect!<span style="font-size: 20px;">😏</span></p>
                    </div>
                    </div>`;
          setTimeout(function () {
            var Lemolite_Bot_typingMessage =
              Lemolite_Bot_messagesDiv.querySelector(".Lemolite_Bot_typing");
            if (Lemolite_Bot_typingMessage) {
              Lemolite_Bot_typingMessage.classList.remove(
                "Lemolite_Bot_typing"
              );
            }
            Lemolite_Bot_messagesDiv.innerHTML += Lemolite_Bot_botMessage;
            Lemolite_Bot_messagesDiv.scrollTop =
              Lemolite_Bot_messagesDiv.scrollHeight;
            Lemolite_Bot_step--;
            Lemolite_Bot_getInTouch();
          }, 1100);
          return;
        }
      } else {
        Lemolite_Bot_step++;
        Lemolite_Bot_track++;
      }
      Lemolite_Bot_botMessage = `
                        <div class="Lemolite_Bot_left-part">
                        <div class="Lemolite_Bot_chat Lemolite_Bot_typing">
                            <i class='bx bxs-bot'></i>
                            <p>Please enter your mobile number<span style="font-size: 20px;"> 📞</span></p>
                        </div>
                        </div>`;
      setTimeout(function () {
        var Lemolite_Bot_typingMessage = Lemolite_Bot_messagesDiv.querySelector(
          ".Lemolite_Bot_typing"
        );
        if (Lemolite_Bot_typingMessage) {
          Lemolite_Bot_typingMessage.classList.remove("Lemolite_Bot_typing");
        }
      }, 1100);
    } else if (Lemolite_Bot_step === 3) {
      Lemolite_Bot_contact = Lemolite_Bot_userInput;
      function Lemolite_Bot_isValidContactNumber(Lemolite_Bot_contactNumber) {
        if (Lemolite_Bot_contactNumber.length === 10) {
          const Lemolite_Bot_contactRegex = /^(\+?\d{1,2}[- \.]?)?\d{10}$/;
          return Lemolite_Bot_contactRegex.test(Lemolite_Bot_contactNumber);
        }
        return false;
      }
      if (
        Lemolite_Bot_current_input != "" &&
        Lemolite_Bot_isValidContactNumber(Lemolite_Bot_contact)
      ) {
        Lemolite_Bot_step++;
        Lemolite_Bot_track++;
      } else {
        Lemolite_Bot_track = 0;
        Lemolite_Bot_botMessage = `
            <div class="Lemolite_Bot_left-part">
            <div class="Lemolite_Bot_warning Lemolite_Bot_typing">
                <i class='bx bxs-bot'></i>
                <p>Your Number is incorrect!<span style="font-size: 20px;">😏</span></p>
            </div>
            </div>`;

        setTimeout(function () {
          var Lemolite_Bot_typingMessage =
            Lemolite_Bot_messagesDiv.querySelector(".Lemolite_Bot_typing");
          if (Lemolite_Bot_typingMessage) {
            Lemolite_Bot_typingMessage.classList.remove("Lemolite_Bot_typing");
          }
          Lemolite_Bot_messagesDiv.innerHTML += Lemolite_Bot_botMessage;
          Lemolite_Bot_messagesDiv.scrollTop =
            Lemolite_Bot_messagesDiv.scrollHeight;
          Lemolite_Bot_step--;
          Lemolite_Bot_getInTouch();
        }, 1100);
        return;
      }
      Lemolite_Bot_botMessage = `
                        <div class="Lemolite_Bot_left-part">
                        <div class="Lemolite_Bot_chat Lemolite_Bot_typing">
                            <i class='bx bxs-bot'></i>
                            <p>Please enter your Preferred Mode of contact<span style="font-size: 20px;">☎️</span></p>
                        </div>
                        <div class="Lemolite_Bot_contact">
                        <button class="Lemolite_Bot_contact-button" onclick="Lemolite_Bot_prefered_contact('Voice Call')">Voice Call</button>
                        <button class="Lemolite_Bot_contact-button" onclick="Lemolite_Bot_prefered_contact('Video Call')">Video Call</button>
                        <button class="Lemolite_Bot_contact-button" onclick="Lemolite_Bot_prefered_contact('Mail')">Mail</button>
                        <button class="Lemolite_Bot_contact-button" onclick="Lemolite_Bot_prefered_contact('Offline')">Offline</button>
                    </div>
                        </div>`;
      setTimeout(function () {
        var Lemolite_Bot_typingMessage = Lemolite_Bot_messagesDiv.querySelector(
          ".Lemolite_Bot_typing"
        );
        if (Lemolite_Bot_typingMessage) {
          Lemolite_Bot_typingMessage.classList.remove("Lemolite_Bot_typing");
        }
      }, 1100);
    } else if (Lemolite_Bot_step === 4) {
      if (Lemolite_Bot_current_input != "") {
        Lemolite_Bot_step++;
        Lemolite_Bot_track++;
      } else {
        Lemolite_Bot_step--;
        Lemolite_Bot_track = 0;
        Lemolite_Bot_getInTouch();
        return;
      }
      Lemolite_Bot_botMessage = `
            <div class="Lemolite_Bot_left-part">
            <div class="Lemolite_Bot_chat Lemolite_Bot_typing">
                <i class='bx bxs-bot'></i>
                <p>Name:  ${Lemolite_Bot_username}<br>email:  ${Lemolite_Bot_email}<br>contact:  ${Lemolite_Bot_contact}<br>Mode of contact:  ${Lemolite_Bot_Prefered_Mode_of_Contact}</p>
            </div>
            <div class="Lemolite_Bot_chat Lemolite_Bot_typing">
                <i class='bx bxs-bot'></i>
                <p>would you like to share any Idea?<span style="font-size: 20px;">🤔</span></p>
            </div>
            <div class="Lemolite_Bot_inner-button">
                <button onclick="Lemolite_Bot_handleIdeaResponse('yes')">Yes</button>
                <button onclick="Lemolite_Bot_handleIdeaResponse('no')">No</button>
            </div>
            </div>`;
      setTimeout(function () {
        var Lemolite_Bot_typingMessage = Lemolite_Bot_messagesDiv.querySelector(
          ".Lemolite_Bot_typing"
        );
        if (Lemolite_Bot_typingMessage) {
          Lemolite_Bot_typingMessage.classList.remove("Lemolite_Bot_typing");
        }
      }, 1100);
    } else {
      // Default Lemolite_Bot_response for other inputs
      Lemolite_Bot_botMessage = `
            <div class="Lemolite_Bot_left-part">
                <div class="Lemolite_Bot_chat Lemolite_Bot_typing">
                    <i class='bx bxs-bot'></i>
                    <p>Sorry, I'm just a demo chatbot!<span style="font-size: 20px;">🤓</span></p>
                </div>
                </div>`;
      setTimeout(function () {
        var Lemolite_Bot_typingMessage = Lemolite_Bot_messagesDiv.querySelector(
          ".Lemolite_Bot_typing"
        );
        if (Lemolite_Bot_typingMessage) {
          Lemolite_Bot_typingMessage.classList.remove("Lemolite_Bot_typing");
        }
      }, 1100);
    }

    setTimeout(function () {
      // var previousTypingMessages = Lemolite_Bot_messagesDiv.querySelectorAll(".Lemolite_Bot_typing");
      Lemolite_Bot_messagesDiv.innerHTML += Lemolite_Bot_botMessage;
      Lemolite_Bot_messagesDiv.scrollTop =
        Lemolite_Bot_messagesDiv.scrollHeight;
    }, 600);

    document.getElementById("Lemolite_Bot_userInput").value = "";
  }
}

function Lemolite_Bot_handleIdeaResponse(Lemolite_Bot_response) {
  Lemolite_Bot_current_function = "Lemolite_Bot_handleIdeaResponse";
  var Lemolite_Bot_userInput = Lemolite_Bot_current_input;
  var Lemolite_Bot_messagesDiv = document.getElementById(
    "Lemolite_Bot_chat-section"
  );
  var Lemolite_Bot_botMessage = "";
  if (Lemolite_Bot_response != undefined) {
    Lemolite_Bot_last_response = Lemolite_Bot_response;
  }
  if (Lemolite_Bot_last_response === "yes") {
    if (Lemolite_Bot_step >= 6 && Lemolite_Bot_step < 7) {
      var Lemolite_Bot_userInput = Lemolite_Bot_current_input;
      var Lemolite_Bot_userMessage = `
            <div class="Lemolite_Bot_user">
            <p>${Lemolite_Bot_userInput}</p>
            </div>`;
      Lemolite_Bot_messagesDiv.innerHTML += Lemolite_Bot_userMessage;
      Lemolite_Bot_messagesDiv.scrollTop =
        Lemolite_Bot_messagesDiv.scrollHeight;
    }
    if (Lemolite_Bot_step === 5) {
      Lemolite_Bot_botMessage = `
            <div class="Lemolite_Bot_left-part">
            <div class="Lemolite_Bot_chat Lemolite_Bot_typing">
            <i class='bx bxs-bot'></i>
            <p>Great! Please share your idea Domain<span style="font-size: 20px;">🌐</span></p>
            </div>
            </div>`;
    } else if (Lemolite_Bot_step === 6) {
      Lemolite_Bot_projectDomain = Lemolite_Bot_current_input;
      Lemolite_Bot_selectedDomain = "Get In Touch"
      Lemolite_Bot_botMessage = `
                        <div class="Lemolite_Bot_left-part">
                        <div class="Lemolite_Bot_chat Lemolite_Bot_typing">
                            <i class='bx bxs-bot'></i>
                            <p>Share your ideas with us!<span style="font-size: 20px;">😀</span></p>
                        </div>
                       <div class="Lemolite_Bot_inner-button">
                        <input type="file" id="Lemolite_Bot_file-input" style="display: none;">
                        <button id="Lemolite_Bot_upload-button" onclick="Lemolite_Bot_uploadFile()">Upload</button>
                        <span style="font-size: 10px; color: red;">add</span>
                        <button id="Lemolite_Bot_button2" onclick="Lemolite_Bot_description()">description</button>
                      </div>
                </div>
            </div>`;
      setTimeout(function () {
        var Lemolite_Bot_typingMessage = Lemolite_Bot_messagesDiv.querySelector(
          ".Lemolite_Bot_typing"
        );
        if (Lemolite_Bot_typingMessage) {
          Lemolite_Bot_typingMessage.classList.remove("Lemolite_Bot_typing");
        }
      }, 1100);
    }
  }
  if (Lemolite_Bot_step === 7) {
    var Lemolite_Bot_botMessage1 = `
            <div class="Lemolite_Bot_left-part">
            <div class="Lemolite_Bot_chat Lemolite_Bot_typing">
                <i class='bx bxs-bot'></i>
                <p>Name: ${Lemolite_Bot_username}<br>email: ${Lemolite_Bot_email}<br>contact :${Lemolite_Bot_contact}<br>Mode of contact: ${Lemolite_Bot_Prefered_Mode_of_Contact}<br>Project Domain: ${Lemolite_Bot_projectDomain}<br>ProjectDescription: ${Lemolite_Bot_file_name}</p>
            </div>
            </div>`;
    setTimeout(function () {
      Lemolite_Bot_messagesDiv.innerHTML += Lemolite_Bot_botMessage1;
      var Lemolite_Bot_typingMessage = Lemolite_Bot_messagesDiv.querySelector(
        ".Lemolite_Bot_typing"
      );
      if (Lemolite_Bot_typingMessage) {
        Lemolite_Bot_typingMessage.classList.remove("Lemolite_Bot_typing");
      }
    }, 100);
    Lemolite_Bot_lead_Capturing(
      "Get In Touch ",
      Lemolite_Bot_username,
      Lemolite_Bot_email,
      Lemolite_Bot_contact,
      Lemolite_Bot_Prefered_Mode_of_Contact,
      Lemolite_Bot_projectDomain,
      "None",
      Lemolite_Bot_file_url
    );
    Lemolite_Bot_emailvalid = false;
    var Lemolite_Bot_botMessage2 = `
            <div class="Lemolite_Bot_left-part">
                <div class="Lemolite_Bot_chat Lemolite_Bot_typing">
                <i class='bx bxs-bot'></i>
                <p>Our team will contact you shortly<span style="font-size: 20px;">👨‍💻</span></p>
                </div>
            </div>`;

    setTimeout(function () {
      Lemolite_Bot_messagesDiv.innerHTML += Lemolite_Bot_botMessage2;
      var Lemolite_Bot_typingMessage =
        Lemolite_Bot_messagesDiv.querySelectorAll(".Lemolite_Bot_typing");
      Lemolite_Bot_typingMessage.forEach((msg) =>
        msg.classList.remove("Lemolite_Bot_typing")
      );
      Lemolite_Bot_messagesDiv.scrollTop =
        Lemolite_Bot_messagesDiv.scrollHeight;
    }, 1500);

    var Lemolite_Bot_botMessage3 = `
                <div class="Lemolite_Bot_left-part">
                <div class="Lemolite_Bot_chat">
                <i class='bx bxs-bot'></i>
                <p>How can I assist you today?<span style="font-size: 20px;">🤔</span></p>
                </div>
                <div class = "Lemolite_Bot_inner-button">
                    <button onclick="Lemolite_Bot_learnAboutProducts()">Learn about products</button>
                    <button onclick="Lemolite_Bot_getInTouch()">Get in touch</button>
                    <button onclick="Lemolite_Bot_otherInquiries()">Other inquiries</button>
                </div>
                    </div>`;

    setTimeout(function () {
      Lemolite_Bot_messagesDiv.innerHTML += Lemolite_Bot_botMessage3;
      var Lemolite_Bot_typingMessage =
        Lemolite_Bot_messagesDiv.querySelectorAll(".Lemolite_Bot_typing");
      Lemolite_Bot_typingMessage.forEach((msg) =>
        msg.classList.remove("Lemolite_Bot_typing")
      );
      Lemolite_Bot_messagesDiv.scrollTop =
        Lemolite_Bot_messagesDiv.scrollHeight;
    }, 2500);
    Lemolite_Bot_count = 0;
    Lemolite_Bot_step = 0;
    Lemolite_Bot_track = 0;
  } else if (Lemolite_Bot_last_response === "no") {
    Lemolite_Bot_count = 0;
    Lemolite_Bot_step = 0;
    Lemolite_Bot_track = 0;
    Lemolite_Bot_lead_Capturing(
      "Get In Touch",
      Lemolite_Bot_username,
      Lemolite_Bot_email,
      Lemolite_Bot_contact,
      Lemolite_Bot_Prefered_Mode_of_Contact,
      "None",
      "None",
      ["None"]
    );
    Lemolite_Bot_emailvalid = false;
    var Lemolite_Bot_botMessage1 = `
            <div class="Lemolite_Bot_left-part">
            <div class="Lemolite_Bot_chat Lemolite_Bot_typing">
                <i class='bx bxs-bot'></i>
                <p>Name:  ${Lemolite_Bot_username}<br>email:  ${Lemolite_Bot_email}<br>contact:  ${Lemolite_Bot_contact}<br>Mode of contact:  ${Lemolite_Bot_Prefered_Mode_of_Contact}</p>
            </div>
            <div class="Lemolite_Bot_chat Lemolite_Bot_typing">
                <i class='bx bxs-bot'></i>
                <p>Thank You for Contacting Us. Our team will contact you shortly<span style="font-size: 20px;">👨‍💻</span></p>
        </div>`;
    setTimeout(function () {
      Lemolite_Bot_messagesDiv.innerHTML += Lemolite_Bot_botMessage1;
      var Lemolite_Bot_typingMessage = Lemolite_Bot_messagesDiv.querySelector(
        ".Lemolite_Bot_typing"
      );
      if (Lemolite_Bot_typingMessage) {
        Lemolite_Bot_typingMessage.classList.remove("Lemolite_Bot_typing");
      }
    }, 100);
    var Lemolite_Bot_botMessage3 = `
        <div class="Lemolite_Bot_left-part">
        <div class="Lemolite_Bot_chat">
        <i class='bx bxs-bot'></i>
        <p>How can I assist you today?<span style="font-size: 20px;">🤔</span></p>
    </div>
    <div class = "Lemolite_Bot_inner-button">
        <button onclick="Lemolite_Bot_learnAboutProducts()">Learn about products</button>
        <button onclick="Lemolite_Bot_getInTouch()">Get in touch</button>
        <button onclick="Lemolite_Bot_otherInquiries()">Other inquiries</button>
    </div>
        </div>`;

    setTimeout(function () {
      Lemolite_Bot_messagesDiv.innerHTML += Lemolite_Bot_botMessage3;
      var Lemolite_Bot_typingMessage =
        Lemolite_Bot_messagesDiv.querySelectorAll(".Lemolite_Bot_typing");
      Lemolite_Bot_typingMessage.forEach((msg) =>
        msg.classList.remove("Lemolite_Bot_typing")
      );
      Lemolite_Bot_messagesDiv.scrollTop =
        Lemolite_Bot_messagesDiv.scrollHeight;
    }, 2500);
  }

  setTimeout(function () {
    var Lemolite_Bot_typingMessage = Lemolite_Bot_messagesDiv.querySelector(
      ".Lemolite_Bot_typing"
    );
    if (Lemolite_Bot_typingMessage) {
      Lemolite_Bot_typingMessage.classList.remove("Lemolite_Bot_typing");
    }
    Lemolite_Bot_messagesDiv.innerHTML += Lemolite_Bot_botMessage;
    Lemolite_Bot_messagesDiv.scrollTop = Lemolite_Bot_messagesDiv.scrollHeight;
  }, 600);
}

//Below are the functions for FAQS
async function Lemolite_Bot_otherInquiries() {
  Lemolite_Bot_current_function = "Lemolite_Bot_otherInquiries";
  let Lemolite_Bot_response = await fetch("http://localhost:8888/FAQs_Fetch");

  let Lemolite_Bot_data = await Lemolite_Bot_response.json();
  var Lemolite_Bot_UniqueCategory =
    Lemolite_Bot_getUniqueCategory(Lemolite_Bot_data);
  var Lemolite_Bot_CategoryButtons = Lemolite_Bot_createCategoryButtons(
    Lemolite_Bot_UniqueCategory
  );
  var Lemolite_Bot_messagesDiv = document.getElementById(
    "Lemolite_Bot_chat-section"
  );

  var Lemolite_Bot_botMessage = `
                <div class="Lemolite_Bot_left-part">
                    <div class="Lemolite_Bot_chat">
                        <i class='bx bxs-bot'></i>
                        <p>Here are our products<span style="font-size: 20px;">👇</span></p>
                    </div>
                    <div class = "Lemolite_Bot_Category-button-display">
                        ${Lemolite_Bot_CategoryButtons}
                    </div>
                </div>`;
  Lemolite_Bot_messagesDiv.innerHTML += Lemolite_Bot_botMessage;
  Lemolite_Bot_messagesDiv.scrollTop = Lemolite_Bot_messagesDiv.scrollHeight;
}

async function Lemolite_Bot_handleCategoryClick(Lemolite_Bot_Category) {
  Lemolite_Bot_current_function = "Lemolite_Bot_handleCategoryClick";
  var Lemolite_Bot_messagesDiv = document.getElementById(
    "Lemolite_Bot_chat-section"
  );
  Lemolite_Bot_selectedCategory = Lemolite_Bot_Category;
  var Lemolite_Bot_userMessage = `
        <div class="Lemolite_Bot_right-part">
            <div class="Lemolite_Bot_chat">
                <i class='bx bxs-Lemolite_Bot_user'></i>
                <p>${Lemolite_Bot_Category}</p>
            </div>
        </div>`;
  Lemolite_Bot_messagesDiv.innerHTML += Lemolite_Bot_userMessage;
  let Lemolite_Bot_response = await fetch("http://localhost:8888/FAQs_Fetch");
  let Lemolite_Bot_data = await Lemolite_Bot_response.json();
  var Lemolite_Bot_filteredData = Lemolite_Bot_data.filter(
    (item) => item.Lemolite_Bot_Category === Lemolite_Bot_Category
  );
  var Lemolite_Bot_questions = Lemolite_Bot_filteredData.map(
    (item) => item.Lemolite_Bot_Question
  );
  var Lemolite_Bot_questionbutton = Lemolite_Bot_createQuestionButtons(
    Lemolite_Bot_questions
  );
  var Lemolite_Bot_botMessage = `
    <div class="Lemolite_Bot_left-part">
        <div class="Lemolite_Bot_chat">
            <i class='bx bxs-bot'></i>
            <p>Here are the Questions for ${Lemolite_Bot_Category}:</p>
        </div>
        <div class="Lemolite_Bot_ques-style">
            ${Lemolite_Bot_questionbutton}
        </div>
    </div>`;
  Lemolite_Bot_messagesDiv.innerHTML += Lemolite_Bot_botMessage;
  Lemolite_Bot_messagesDiv.scrollTop = Lemolite_Bot_messagesDiv.scrollHeight;
}

async function Lemolite_Bot_Answer(Lemolite_Bot_Question) {
  Lemolite_Bot_current_function = "Lemolite_Bot_Answer";
  var Lemolite_Bot_messagesDiv = document.getElementById(
    "Lemolite_Bot_chat-section"
  );
  let Lemolite_Bot_response = await fetch("http://localhost:8888/FAQs_Fetch");
  let Lemolite_Bot_data = await Lemolite_Bot_response.json();
  var Lemolite_Bot_userMessage = `
    <div class="Lemolite_Bot_chat-faq">
        <div class="Lemolite_Bot_chat">
            <p>${Lemolite_Bot_Question}</p>
        </div>
    </div>`;
  Lemolite_Bot_messagesDiv.innerHTML += Lemolite_Bot_userMessage;

  var Lemolite_Bot_filteredData = Lemolite_Bot_data.filter(
    (item) =>
      item.Lemolite_Bot_Category === Lemolite_Bot_selectedCategory &&
      item.Lemolite_Bot_Question.includes(Question)
  );
  var Lemolite_Bot_botMessage1 = `
    <div class="Lemolite_Bot_left-part">
        <div class="Lemolite_Bot_ans Lemolite_Bot_typing ">
            <i class='bx bxs-bot'></i>
        <div class="Lemolite_Bot_ans-style">
            <p>${Lemolite_Bot_filteredData[0]["Answer"]}</p>
        </div>
    </div>`;

  Lemolite_Bot_messagesDiv.innerHTML += Lemolite_Bot_botMessage1;
  Lemolite_Bot_messagesDiv.scrollTop = Lemolite_Bot_messagesDiv.scrollHeight;
  var Lemolite_Bot_botMessage2 = `
                <div class="Lemolite_Bot_left-part">
                <div class="Lemolite_Bot_chat Lemolite_Bot_typing">
                <i class='bx bxs-bot'></i>
                    <p>Have Other Inquiries?<span style="font-size: 20px;">❓</span></p>
                </div>
                <div class = "Lemolite_Bot_inner-button">
                <button onclick="Lemolite_Bot_otherInquiries()">Other inquiries</button>
                <button onclick="Lemolite_Bot_first()">Main Menu</button>
                </div>
                </div>`;
  Lemolite_Bot_messagesDiv.innerHTML += Lemolite_Bot_botMessage2;
  Lemolite_Bot_messagesDiv.scrollTop = Lemolite_Bot_messagesDiv.scrollHeight;
}

function Lemolite_Bot_first() {
  var Lemolite_Bot_messagesDiv = document.getElementById(
    "Lemolite_Bot_chat-section"
  );
  var Lemolite_Bot_botMessage3 = `
        <div class="Lemolite_Bot_left-part">
        <div class="Lemolite_Bot_chat">
        <i class='bx bxs-bot'></i>
        <p>How can I assist you today?<span style="font-size: 20px;">🤔</span></p>
    </div>
    <div class = "Lemolite_Bot_inner-button">
        <button onclick="Lemolite_Bot_learnAboutProducts()">Learn about products</button>
        <button onclick="Lemolite_Bot_getInTouch()">Get in touch</button>
        <button onclick="Lemolite_Bot_otherInquiries()">Other inquiries</button>
    </div>
        </div>`;

  setTimeout(function () {
    Lemolite_Bot_messagesDiv.innerHTML += Lemolite_Bot_botMessage3;
    var Lemolite_Bot_typingMessage = Lemolite_Bot_messagesDiv.querySelectorAll(
      ".Lemolite_Bot_typing"
    );
    Lemolite_Bot_typingMessage.forEach((msg) =>
      msg.classList.remove("Lemolite_Bot_typing")
    );
    Lemolite_Bot_messagesDiv.scrollTop = Lemolite_Bot_messagesDiv.scrollHeight;
  }, 200);
}
