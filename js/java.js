$(".open-drawer").click(function (e) {
  console.log(e.target);
  let element = e.target;
  let check = $(element).attr("class");
  console.log(check);

  if (check.includes("open-close-icon") == true) {
    for (let i = 0; i < 5; i++) {
      $(".links li")
        .eq(i)
        .animate(
          {
            top: 0,
          },
          (i + 5) * 100
        );
    }
    $(".drawer").animate({
      width: "100%",
    });

    $(".container-nav").animate({
      width: "20%",
    });
    $(element).attr(
      "class",
      "fa-solid fa-x fa-2x fa-align-justify open-drawer"
    );
  } else {
    $(".drawer").animate({
      width: "0%",
    });

    $(".container-nav").animate({
      width: "4%",
    });

    $(element).attr(
      "class",
      "fa-solid open-close-icon fa-2x fa-align-justify open-drawer"
    );
    $(".links li").animate(
      {
        top: 300,
      },
      500
    );
  }
});
function open() {
  for (let i = 0; i < 5; i++) {
    $(".links li")
      .eq(i)
      .animate(
        {
          top: 0,
        },
        (i + 5) * 100
      );
  }
  $(".drawer").animate({
    width: "100%",
  });

  $(element).attr("class", "fa-solid fa-x fa-2x fa-align-justify open-drawer");
}
function close() {
  $(".drawer").animate({
    width: "0%",
  });

  $(".open-drawer").attr(
    "class",
    "fa-solid open-close-icon fa-2x fa-align-justify open-drawer"
  );
  $(".links li").animate(
    {
      top: 300,
    },
    500
  );
}

function hideSearchBar() {
  $("header").addClass("d-none");
  $("header").removeClass("d-block");
}

$(".show-search-controller").click(function (e) {
  $("header").removeClass("d-none");
  $("header").addClass("d-block");
  $(".body-data").html("");

  close();
});

$(".show-contact-us").click(function (e) {
  hideSearchBar()
  $(".body-data").html("");

  $(
    ".body-data"
  ).append(`<div class="contact min-vh-100 d-flex justify-content-center align-items-center">
  <div class="container w-75 text-center">
      <div class="row g-4">
          <div class="col-md-6">
              <input onkeyup="validationName()" type="text" class="form-control nameInput" placeholder="Enter Your Name">
              <div class="alert alert-danger w-100 mt-2 d-none nameAlert">
                  Special characters and numbers not allowed
              </div>
          </div>
          <div class="col-md-6">
              <input onkeyup="validationEmail()" type="email" class="form-control emailInput " placeholder="Enter Your Email">
              <div class="alert alert-danger w-100 mt-2 d-none emailAlert">
                  Email not valid *exemple@yyy.zzz
              </div>
          </div>
          <div class="col-md-6">
              <input onkeyup="validationPhone()" type="text" class="form-control phoneInput" placeholder="Enter Your Phone">
              <div class="alert alert-danger w-100 mt-2 d-none phoneAlert">
                  Enter valid Phone Number
              </div>
          </div>
          <div class="col-md-6">
              <input onkeyup="validationAge()" type="number" class="form-control ageInput " placeholder="Enter Your Age">
              <div class="alert alert-danger w-100 mt-2 ageAlert d-none">
                  Enter valid age
              </div>
          </div>
          <div class="col-md-6">
              <input onkeyup="validationPassword()" type="password" class="passwordInput form-control " placeholder="Enter Your Password">
              <div  class="passwordAlert alert alert-danger w-100 mt-2 d-none">
                  Enter valid password *Minimum eight characters, at least one letter and one number:*
              </div>
          </div>
          <div class="col-md-6">
              <input onkeyup="validationConfirmPassword()" type="password" class="form-control confirmPasswordInput" placeholder="Repassword">
              <div class="confirmPasswordAlert alert alert-danger w-100 mt-2 d-none">
                  Enter valid repassword 
              </div>
          </div>
      </div>
      <button disabled class="submit-button btn btn-outline-danger px-2 mt-3">Submit</button>
  </div>
</div> `);
  close();
});

$(".show-categories").click(async function (e) {
  hideSearchBar()
  close();

  $(".body-data").html("");
  $(".place-holder").fadeIn(300);

  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/categories.php`
  );
  result = await response.json();

  for (let i = 0; i < result.categories.length; i++) {
    $(".body-data").append(`
    <div class="col-md-3">
            <div onclick="getCategoryFromSide('${
              result.categories[i].strCategory
            }')" class="over-lay-div position-relative overflow-hidden rounded-2 cursor-pointer">
                <img class="w-100" src="${
                  result.categories[i].strCategoryThumb
                }" alt="" srcset="">
                <div class="container-layer position-absolute text-center text-black p-2">
                    <h3>${result.categories[i].strCategory}</h3>
                    <p>${result.categories[i].strCategoryDescription
                      .split(" ")
                      .slice(0, 20)
                      .join(" ")}</p>
                </div>
            </div>
    </div>
    `);
  }
  $(".place-holder").fadeOut(300);
});

async function getCategoryFromSide(id) {
  $(".body-data").html("");

  $(".place-holder").fadeIn(300);
  var response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?c=${id}`
  );
  result = await response.json();

  console.log(`Newwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww ${result}`);

  console.log(result);

  for (let i = 0; i < result.meals.length; i++) {
    $(".body-data").append(`
    <div class="col-md-3 gy-5 gx-2">
      <div onclick="getMealDetails('${result.meals[i].idMeal}')" class="over-lay-div position-relative overflow-hidden rounded-2 cursor-pointer">
        <img class="w-100" src="${result.meals[i].strMealThumb}" alt="" srcset="">
        <div class="container-layer position-absolute d-flex align-items-center text-black p-2">
          <h3>${result.meals[i].strMeal}</h3>
        </div>
      </div>
    </div>
  `);
  }

  $(".place-holder").fadeOut(300);
}

$(".show-area").click(async function (e) {
  hideSearchBar()
  close();

  $(".body-data").html("");
  $(".place-holder").fadeIn(300);

  let respone = await fetch(
    `https://www.themealdb.com/api/json/v1/1/list.php?a=list`
  );
  result = await respone.json();

  for (let i = 0; i < result.meals.length; i++) {
    $(".body-data").append(`
    <div class="col-md-3 text-white">
            <div onclick="getArea('${result.meals[i].strArea}')" class="rounded-2 text-center cursor-pointer">
                    <i class="fa-solid fa-house-laptop fa-4x"></i>
                    <h3>${result.meals[i].strArea}</h3>
            </div>
    </div>
    `);
  }
  $(".place-holder").fadeOut(300);
});

async function getArea(id) {
  close();

  $(".body-data").html("");
  $(".place-holder").fadeIn(300);

  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?a=${id}`
  );

  result = await response.json();
  for (let i = 0; i < result.meals.length; i++) {
    $(".body-data").append(`
    <div class="col-md-3 gy-5 gx-2">
      <div onclick="getMealDetails('${result.meals[i].idMeal}')" class="over-lay-div position-relative overflow-hidden rounded-2 cursor-pointer">
        <img class="w-100" src="${result.meals[i].strMealThumb}" alt="" srcset="">
        <div class="container-layer position-absolute d-flex align-items-center text-black p-2">
          <h3>${result.meals[i].strMeal}</h3>
        </div>
      </div>
    </div>
  `);
  }
  $(".place-holder").fadeOut(300);
}

//!

async function getCategoryMeals(id) {
  $(".body-data").html("");

  $(".place-holder").fadeIn(300);
  var response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${id}`
  );
  result = await response.json();

  console.log(`Newwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww ${result}`);

  console.log(result);

  for (let i = 0; i < result.meals.length; i++) {
    $(".body-data").append(`
    <div class="col-md-3 gy-5 gx-2">
      <div onclick="getMealDetails('${result.meals[i].idMeal}')" class="over-lay-div position-relative overflow-hidden rounded-2 cursor-pointer">
        <img class="w-100" src="${result.meals[i].strMealThumb}" alt="" srcset="">
        <div class="container-layer position-absolute d-flex align-items-center text-black p-2">
          <h3>${result.meals[i].strMeal}</h3>
        </div>
      </div>
    </div>
  `);
  }

  $(".place-holder").fadeOut(300);
}

async function getMealDetails(id) {
  console.log(id);
  close();
  $(".body-data").html("");
  $(".place-holder").fadeIn(300);

  let respone = await fetch(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
  );
  result = await respone.json();

  const ingredientsLength = Object.keys(result.meals[0]).filter(
    (key) => key.startsWith("strIngredient") && result.meals[0][key] !== ""
  ).length;

  let containerOfIngredients = ``;

  for (let i = 1; i <= ingredientsLength; i++) {
    if (result.meals[0][`strIngredient${i}`]) {
      containerOfIngredients += `<li class="alert alert-info m-2 p-1">${
        result.meals[0][`strMeasure${i}`]
      } ${result.meals[0][`strIngredient${i}`]}</li>`;
    }
  }

  console.info(ingredientsLength);

  let tagsStr = "";

  if (result.meals[0].strTags == null) {
    console.log("Nulll Tags");
  } else {
    for (let i = 0; i < result.meals[0].strTags.split(",").length; i++) {
      tagsStr += `
        <li class="alert alert-danger m-2 p-1">${
          result.meals[0].strTags.split(",")[i]
        }</li>`;
    }
    console.info(result.meals[0].strTags.split(","));
  }

  $(".body-data").append(`
  <div class="col-md-4 text-white ">
              <img class="w-100 rounded-3" src="${result.meals[0].strMealThumb}"
                  alt="">
                  <h2>${result.meals[0].strMeal}</h2>
          </div>
          <div class="col-md-8 text-white">
              <h2>Instructions</h2>
              <p>${result.meals[0].strInstructions}</p>
              <h3><span class="fw-bolder">Area : </span>${result.meals[0].strArea}</h3>
              <h3><span class="fw-bolder">Category : </span>${result.meals[0].strCategory}</h3>
              <h3>Recipes :</h3>
              <ul class="list-unstyled d-flex g-3 flex-wrap">
              ${containerOfIngredients}
               </ul>

               <h3>Tags :</h3>
               <ul class="list-unstyled d-flex g-3 flex-wrap">
                   ${tagsStr}
               </ul>
             

              <a class="btn btn-success"  href="${result.meals[0].strSource}" target="_blank">Source</a>
              <a class="btn btn-danger"   href="${result.meals[0].strYoutube}" target="_blank"  >Youtube</a>
          </div>`);
  $(".place-holder").fadeOut(300);
}

async function getCategoryBySearch(category) {
  $(".body-data").html("");
  $(".place-holder").fadeIn(300);

  var response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${category}`
  );
  result = await response.json();

  console.log(result);

  for (let i = 0; i < result.meals.length; i++) {
    $(".body-data").append(`
      <div class="col-md-3 gy-5 gx-2">
        <div onclick="getMealDetails('${result.meals[i].idMeal}')" class="over-lay-div position-relative overflow-hidden rounded-2 cursor-pointer">
          <img class="w-100" src="${result.meals[i].strMealThumb}" alt="" srcset="">
          <div class="container-layer position-absolute d-flex align-items-center text-black p-2">
            <h3>${result.meals[i].strMeal}</h3>
          </div>
        </div>
      </div>
    `);
  }
  $(".place-holder").fadeOut(300);
}

async function getCategoryByFirstLetter(category) {
  if (category == "") {
    $(".place-holder").fadeIn(300);

    $(".place-holder").fadeOut(300);
  } else {
    $(".body-data").html("");

    $(".place-holder").fadeIn(300);

    var response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?f=${category}`
    );
    result = await response.json();

    console.log(result);
    if (result.meals == null) {
      $(".place-holder").fadeOut(300);
    } else {
      for (let i = 0; i < result.meals.length; i++) {
        $(".body-data").append(`
          <div class="col-md-3 gy-5 gx-2">
            <div onclick="getMealDetails('${result.meals[i].idMeal}')" class="over-lay-div position-relative overflow-hidden rounded-2 cursor-pointer">
              <img class="w-100" src="${result.meals[i].strMealThumb}" alt="" srcset="">
              <div class="container-layer position-absolute d-flex align-items-center text-black p-2">
                <h3>${result.meals[i].strMeal}</h3>
              </div>
            </div>
          </div>
        `);
      }
      $(".place-holder").fadeOut(300);
    }
  }
}

let vaildName = false;
let vaildEmail = false;
let vaildPhone = false;
let vaildAge = false;
let vaildPassword = false;
let vaildConfimPass = false;

function validationName() {
  const check = /^[A-Za-z\s]+$/;

  console.log($(".nameInput").val());

  if (check.test($(".nameInput").val())) {
    $(".nameAlert").addClass("d-none");
    $(".nameAlert").removeClass("d-block");
    vaildName = true;
  } else {
    $(".nameAlert").removeClass("d-none");
    $(".nameAlert").addClass("d-block");
    vaildName = false;
  }
  disabledButton();
}

function validationEmail() {
  const gmailRegex = /@gmail\.com$/;

  console.log($(".emailInput").val());

  if (gmailRegex.test($(".emailInput").val())) {
    console.log("seconf");
    $(".emailAlert").addClass("d-none");
    $(".emailAlert").removeClass("d-block");
    vaildEmail = true;
  } else {
    console.log("first");
    $(".emailAlert").removeClass("d-none");
    $(".emailAlert").addClass("d-block");
    vaildEmail = false;
  }
  disabledButton();
}

function validationPhone() {
  const phoneNumberRegex = /^\+20\d{10}$/;
  console.log($(".phoneInput").val());

  if (phoneNumberRegex.test($(".phoneInput").val())) {
    console.log("seconf");
    $(".phoneAlert").addClass("d-none");
    $(".phoneAlert").removeClass("d-block");
    vaildPhone = true;
  } else {
    console.log("first");
    $(".phoneAlert").removeClass("d-none");
    $(".phoneAlert").addClass("d-block");
    vaildPhone = false;
  }
  disabledButton();
}

function validationAge() {
  const regex = /^\d{4}$/;
  console.log($(".ageInput").val());

  if (regex.test($(".ageInput").val()) || $(".ageInput").val() == "") {
    console.log("first");
    $(".ageAlert").removeClass("d-none");
    $(".ageAlert").addClass("d-block");

    vaildAge = false;
  } else {
    console.log("seconf");
    $(".ageAlert").addClass("d-none");
    $(".ageAlert").removeClass("d-block");
    vaildAge = true;
  }
  disabledButton();
}

function validationPassword() {
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

  console.log($(".passwordInput").val());

  if (passwordRegex.test($(".passwordInput").val())) {
    console.log("first");
    $(".passwordAlert").addClass("d-none");
    $(".passwordAlert").removeClass("d-block");

    vaildPassword = true;
  } else {
    console.log("seconf");
    $(".passwordAlert").removeClass("d-none");
    $(".passwordAlert").addClass("d-block");
    vaildPassword = false;
  }
  disabledButton();
}

function validationConfirmPassword() {
  if ($(".passwordInput").val() == $(".confirmPasswordInput").val()) {
    $(".confirmPasswordAlert").addClass("d-none");
    $(".confirmPasswordAlert").removeClass("d-block");
    vaildConfimPass = true;
  } else {
    if ($(".confirmPasswordInput").val() == "") {
      $(".confirmPasswordAlert").addClass("d-none");
      $(".confirmPasswordAlert").removeClass("d-block");
    } else {
      $(".confirmPasswordAlert").removeClass("d-none");
      $(".confirmPasswordAlert").addClass("d-block");
    }
    vaildConfimPass = false;
  }
  disabledButton();
}

function disabledButton() {
  if (
    vaildName == true &&
    vaildEmail == true &&
    vaildPhone == true &&
    vaildAge == true &&
    vaildPassword == true &&
    vaildConfimPass == true
  ) {
    $(".submit-button").removeAttr("disabled");
  } else {
    $(".submit-button").attr("disabled", true);
  }
}

getCategoryMeals("");
