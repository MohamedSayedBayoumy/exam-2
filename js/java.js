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

$(".show-search-controller").click(function (e) {
  $("header").removeClass("d-none");
  $("header").addClass("d-block");
  $(".body-data").html("");

  close();

  

});

async function getCategoryMeals() {
  $(".body-data").html("");

  $(".place-holder").fadeIn(300);
  var response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=`
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

getCategoryMeals();
