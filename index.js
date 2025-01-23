var right = document.getElementsByClassName("right");
var prevBtn = document.getElementById("prev");
var nextBtn = document.getElementById("next");

var currentIndex = 1;
var z = 1;

function initializePages() {
  for (var i = 0; i < right.length; i++) {
    right[i].style.zIndex = right.length - i;

    if (i < currentIndex) {
      right[i].classList.add("flip"); // 左邊頁面展開
    } else {
      right[i].classList.remove("flip"); // 右邊頁面閉合
    }

    var leftPage = right[i].querySelector(".back");
    var rightPage = right[i].querySelector(".front");

    if (i === currentIndex - 1) {
      leftPage.style.opacity = "1"; // 左頁可見
    } else {
      leftPage.style.opacity = "0"; // 左頁隱藏
    }

    if (i === currentIndex) {
      rightPage.style.opacity = "1"; // 右頁可見
    } else {
      rightPage.style.opacity = "0"; // 右頁隱藏
    }
  }

  updateButtons();
}

function turnRight() {
  if (currentIndex < right.length - 1) {
    right[currentIndex].classList.add("flip");
    right[currentIndex].style.zIndex = z++;
    currentIndex++;

    updatePageOpacity();
    updateButtons();
  }
}

function turnLeft() {
  if (currentIndex > 1) {
    currentIndex--;
    right[currentIndex].classList.remove("flip");
    right[currentIndex].style.zIndex = z++;

    updatePageOpacity();
    updateButtons();
  }
}

function updatePageOpacity() {
  for (var i = 0; i < right.length; i++) {
    var leftPage = right[i].querySelector(".back");
    var rightPage = right[i].querySelector(".front");

    if (i === currentIndex - 1) {
      leftPage.style.opacity = "1"; // 左頁可見
    } else {
      leftPage.style.opacity = "0"; // 左頁隱藏
    }

    if (i === currentIndex) {
      rightPage.style.opacity = "1"; // 右頁可見
    } else {
      rightPage.style.opacity = "0"; // 右頁隱藏
    }
  }
}

function updateButtons() {
  prevBtn.disabled = currentIndex === 1;
  nextBtn.disabled = currentIndex === right.length - 1;
}

function toFirstPage() {
  while (currentIndex > 1) {
    currentIndex--;
    right[currentIndex].classList.remove("flip");
    right[currentIndex].style.zIndex = z++;
  }
  updatePageOpacity();
  updateButtons();
}

function toLastPage() {
  while (currentIndex < right.length - 1) {
    right[currentIndex].classList.add("flip");
    right[currentIndex].style.zIndex = z++;
    currentIndex++;
  }
  updatePageOpacity();
  updateButtons();
}

initializePages();

document.addEventListener("DOMContentLoaded", () => {
  AOS.init();

  const loading = document.getElementById("loading");
  setTimeout(() => {
    loading.style.transition = "opacity 10s ease";
    loading.style.opacity = "0";
    window.scrollTo(0, 0);
  }, 8200);
  setTimeout(() => {
    loading.style.visibility = "hidden";
  }, 9600);

  const parallaxSections = document.querySelectorAll(".parallax-section");

  function handleParallax() {
    parallaxSections.forEach((section) => {
      const bg = section.querySelector(".parallax-bg");
      const rect = section.getBoundingClientRect();
      const speed = 0.5;

      const offset = rect.top * speed * -0.6;

      if (bg) {
        bg.style.transform = `translateY(${offset}px)`;
      }
    });
  }

  window.addEventListener("scroll", handleParallax);

  handleParallax();

  const textElements = document.querySelectorAll('.his-her-eyes');
  const speed = 240;
  const interval = 12000;

  function startTyping(element) {
    const text = element.getAttribute('data-original-text');
    element.textContent = '';
    let index = 0;

    function type() {
      if (index < text.length) {
        element.textContent += text[index];
        index++;
        setTimeout(type, speed);
      } else {
        setTimeout(() => {
          element.textContent = '';
          startTyping(element);
        }, interval);
      }
    }

    type();
  }

  textElements.forEach((element) => {
    element.setAttribute('data-original-text', element.textContent.trim());
    startTyping(element);
  });

  const boxes = document.querySelectorAll(".box");

  const imagesSet1 = [
    "./img/back-2.png",
    "./img/back-4.png",
    "./img/back-5.png",
    "./img/back-3.png",
    "./img/back-1.png",
  ];

  const imagesSet2 = [
    "./img/front-3.png",
    "./img/front-4.png",
    "./img/front-5.png",
    "./img/front-2.png",
    "./img/front-1.png",
  ];

  let isSet1 = true;

  boxes.forEach((box, index) => {
    const image1 = document.createElement("div");
    image1.classList.add("image", "active");
    image1.style.backgroundImage = `url('${imagesSet1[index]}')`;

    const image2 = document.createElement("div");
    image2.classList.add("image", "inactive");
    image2.style.backgroundImage = `url('${imagesSet2[index]}')`;

    box.appendChild(image1);
    box.appendChild(image2);
  });

  const switchImages = () => {
    boxes.forEach((box) => {
      const activeImage = box.querySelector(".image.active");
      const inactiveImage = box.querySelector(".image.inactive");

      activeImage.classList.remove("active");
      activeImage.classList.add("inactive");

      inactiveImage.classList.remove("inactive");
      inactiveImage.classList.add("active");
    });

    isSet1 = !isSet1;

    boxes.forEach((box, index) => {
      const inactiveImage = box.querySelector(".image.inactive");
      const newImage = isSet1 ? imagesSet2[index] : imagesSet1[index];
      inactiveImage.style.backgroundImage = `url('${newImage}')`;
    });
  };

  setInterval(switchImages, 8000);

  function adjustText() {
    const meetupText = document.getElementById("meetup-text");
    if (window.innerWidth < 780) {
      meetupText.innerHTML =
        "二〇二二年底相遇，隔年二月十四日正式交往，<br>選擇在二〇二五年一月二十三日戶政登記成為夫妻。<br>兩年來見證彼此的成長，看到對方最真實的模樣，<br>學會在困難中彼此支撐，也在幸福中彼此感恩。";
    } else {
      meetupText.innerHTML =
        "二〇二二年底相遇，隔年二月十四日正式交往，選擇在二〇二五年一月二十三日戶政登記成為夫妻。<br>兩年來見證彼此的成長，看到對方最真實的模樣，學會在困難中彼此支撐，也在幸福中彼此感恩。";
    }
  }

  adjustText();
  window.addEventListener("resize", adjustText);
});
