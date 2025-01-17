// Ajax Handling
// const BASE_URL = "http://localhost:3000/api"; // Localhost
const BASE_URL = "https://be-semarang-14-production.up.railway.app/api"; // Production

// Create number formatter.
const NumFormatter = new Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR",
});

window.onload = async () => {
  // Best Courses handling
  var bestCourse = document.getElementById("best-course");
  fetch(`${BASE_URL}/best_courses`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      response.json().then((data) => {
        let best_courses = data.data;

        var template = best_courses.map((course) => {
          return `
                <div class="course-col">
                    <h3>${course.nama}</h3>
                        <p>
                            ${course.deskripsi_singkat}
                        </p>
                    <div class="section-btn">
                        <a class="myBtn" onclick="showModal('${course.id}')">Join Course</a>
                    </div>
                </div>
                `;
        });

        bestCourse.innerHTML = template.join("");
      });
    })
    .catch((error) => {
      console.log(error);
    });

  //AnimasiTransparanscroll
    window.addEventListener('scroll', function() {
      const navbar = document.querySelector('nav');
      if (window.scrollY > 50) { 
        navbar.classList.add('nav-transparent');
      } else {
        navbar.classList.remove('nav-transparent');
      }
    });
    
    
  
  // Testimonials handling
  var testimoniList = document.getElementById("testimonial-list");

  function generateStarRating(rating) {
    var stars = "";
    for (var i = rating; i > 0; i--) {
      stars += '<i class="fa-solid fa-star"></i>';
    }
    for (var j = 5 - rating; j > 0; j--) {
      stars += '<i class="fa-regular fa-star"></i>';
    }
    return stars;
  }

  fetch(`${BASE_URL}/testimonial`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      response.json().then((data) => {
        let testimonials = data.data;

        var current = testimonials.map((testimonial) => {
          return `
                <div class="testimonial-col">
                    <div class="testimonial-text">
                        <p>
                            "${testimonial.testimoni}"
                        </p>
                    </div>
                    <div class="profile-section">
                        <div class="profile">
                            <img src="./assets/images/${
                              testimonial.pesertaDetails.photo
                            }" alt="" />
                            <h3>${testimonial.pesertaDetails.nama}</h3>
                        </div>
                        <div class="testimonial-star">
                            "${generateStarRating(testimonial.rating)}"
                        </div>
                    </div>
                </div>
                `;
        });

        testimoniList.innerHTML = current.join("");
        currentIndex = 0;
        showTestimonials();
      });
    })
    .catch((error) => {
      console.log(error);
    });
};

const testimonialsContainer = document.querySelector(".testimonial-container");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
let currentIndex = 0;

// show current testimonial
function showTestimonials() {
  const testimonialCols = document.querySelectorAll(".testimonial-col");
  testimonialCols.forEach((col, index) => {
    col.style.display =
      index >= currentIndex && index < currentIndex + 2 ? "block" : "none";
  });
}

// move next slide
function moveToNextSlide() {
  currentIndex += 2;
  if (currentIndex >= testimonialsContainer.children.length) {
    currentIndex = 0; // Loop to the first slide if at the end
  }
  showTestimonials();
}

// move prev slide
function moveToPrevSlide() {
  currentIndex -= 2;
  if (currentIndex < 0) {
    currentIndex = testimonialsContainer.children.length - 2; // Loop to the last slide if at the beginning
  }
  showTestimonials();
}

// interval 5 seconds
setInterval(moveToNextSlide, 5000);

// call function
showTestimonials();

// click next and prev
prevBtn.addEventListener("click", moveToPrevSlide);
nextBtn.addEventListener("click", moveToNextSlide);

// Modal handling


var modal = document.getElementById("myModal");

function showModal(id) {
  modal.style.display = "block";

  fetch(`${BASE_URL}/courses/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      response.json().then((data) => {
        let course = data.data;

        var modalTemplate = `
            <div class="modal-course">
                <div class="modal-course-col">
                    <div class="modal-close">
                        <span class="close" onclick="closeModal()">&times;</span>
                        <h3>Join Our Class</h3>
                    </div>

                    <div>
                        <div class="modal-course-image">
                            <img src="./assets/images/${course.photo}" alt="" />
                        </div>
                        <div class="modal-course-tag">
                            <h4>${course.nama}</h4>
                        </div>
                        <div class="modal-course-title-rating">
                            <h3>${course.nama}</h3>
                            <h3>${course.rating}/10</h3>
                        </div>
                        <div class="modal-course-price">
                            <h4>${NumFormatter.format(course.harga)}</h4>
                        </div>
                        <div class="modal-course-text">
                            <p>${course.deskripsi_panjang}</p>
                        </div>
                    </div>
                    <div class="modal-content">
                    <h2>Contact Form</h2>
                        <form id="contactForm">

                            <div class="form-label">
                                <label for="course">Course <span>:</span></label>
                                <input type="text" id="course" name="course" value="${
                                  course.nama
                                }" readonly>
                                <input type="hidden" id="id_course" name="id_course" value="${
                                  course.id
                                }" readonly>
                            </div>

                            <div class="form-label">
                                <label for="name">Name <span>:</span></label>
                                <input type="text" id="name" name="name" >
                            </div>

                            <div class="form-label">
                                <label for="email">Email <span>:</span></label>
                                <input type="email" id="email" name="email" >
                            </div>

                            <div class="form-label">
                                <label for="phone">Phone Number <span>:</span></label>
                                <input type="tel" id="phone" name="phone" >
                            </div>

                            <button type="submit" id="submitForm">Send <i class="fa-solid fa-arrow-right"></i></button>
                        </form>
                    </div>
                </div>
            </div>
            `;

        modal.innerHTML = modalTemplate;
      });
    })
    .catch((error) => {
      console.log(error);
    });
}



// Form Handling
const submitForm = document.addEventListener("submit", async (e) => {
  e.preventDefault();

  const id_course = document.getElementById("id_course").value;
  const nama = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const no_hp = document.getElementById("phone").value;

  // validate form with regex
  const nameRegex = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^[0-9]{10,12}$/;

  if (!nama || !email || !no_hp) {
    alert("Please fill the form!");
    return;
  } else if (!nameRegex.test(nama)) {
    alert("Please enter a valid name!");
    return;
  } else if (!emailRegex.test(email)) {
    alert("Please enter a valid email!");
    return;
  } else if (!phoneRegex.test(no_hp)) {
    alert("Please enter a valid phone number!");
    return;
  }

  const data = {
    id_course,
    nama,
    email,
    no_hp,
  };

  fetch(`${BASE_URL}/peserta`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      response.json().then((data) => {
        alert("Success!");
        closeModal();
      });
    })
    .catch((error) => {
      console.log(error);
    });
});

// Close Modal
function closeModal() {
  modal.style.display = "none";

  // clear form
  if (contactForm) {
    contactForm.reset();
  }

  // clear modal
  modal.innerHTML = "";

  // refresh page
  window.location.reload();
}

window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "block";
  }
};

// Subscriptions handling
var email = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
var submit = document.querySelector(".submit-email");
var input = document.querySelector(".add-email");
var subscription = document.querySelector(".subscription");

submit.addEventListener("mousedown", (e) => {
  e.preventDefault();
  if (!email.test(input.value)) {
    subscription.classList.add("error");
    alert("Please enter a valid email!");
  } else {
    subscription.classList.add("done");
    subscription.classList.remove("error");
    
    const email = document.getElementById("add-email").value;
    const data = { email };
  
    fetch(`${BASE_URL}/subcription`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        response.json().then((data) => {
          alert("Success!");
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }
});