var right = document.getElementsByClassName("right");
var prevBtn = document.getElementById("prev");
var nextBtn = document.getElementById("next");

var currentIndex = 1; // 初始化索引為 1，從 page1 開始
var z = 1; // z-index 層級

// 初始化頁面
function initializePages() {
  for (var i = 0; i < right.length; i++) {
    // 設定 z-index
    right[i].style.zIndex = right.length - i;

    // 控制翻頁狀態
    if (i < currentIndex) {
      right[i].classList.add("flip"); // 左邊頁面展開
    } else {
      right[i].classList.remove("flip"); // 右邊頁面閉合
    }

    // 控制顯示左邊或右邊內容
    var leftPage = right[i].querySelector(".back");
    var rightPage = right[i].querySelector(".front");

    // 動態調整左頁和右頁的透明度
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

// 下一頁
function turnRight() {
  if (currentIndex < right.length - 1) {
    right[currentIndex].classList.add("flip");
    right[currentIndex].style.zIndex = z++;
    currentIndex++;

    updatePageOpacity();
    updateButtons();
  }
}

// 上一頁
function turnLeft() {
  if (currentIndex > 1) {
    currentIndex--;
    right[currentIndex].classList.remove("flip");
    right[currentIndex].style.zIndex = z++;

    updatePageOpacity();
    updateButtons();
  }
}

// 更新頁面的透明度
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
    "./img/front-3.png",
    "./img/front-4.png",
    "./img/front-5.png",
    "./img/front-2.png",
    "./img/front-1.png",
  ];

  const imagesSet2 = [
    "./img/back-2.png",
    "./img/back-4.png",
    "./img/back-5.png",
    "./img/back-3.png",
    "./img/back-1.png",
  ];

  let isSet1 = true;

  // 初始化每個 box，加入兩個 <div class="image">
  boxes.forEach((box, index) => {
    const image1 = document.createElement("div");
    image1.classList.add("image", "active"); // 初始圖片
    image1.style.backgroundImage = `url('${imagesSet1[index]}')`;

    const image2 = document.createElement("div");
    image2.classList.add("image", "inactive"); // 隱藏的圖片
    image2.style.backgroundImage = `url('${imagesSet2[index]}')`;

    box.appendChild(image1);
    box.appendChild(image2);
  });

  // 定義切換函數
  const switchImages = () => {
    boxes.forEach((box) => {
      const activeImage = box.querySelector(".image.active");
      const inactiveImage = box.querySelector(".image.inactive");

      // 切換圖片的 class
      activeImage.classList.remove("active");
      activeImage.classList.add("inactive");

      inactiveImage.classList.remove("inactive");
      inactiveImage.classList.add("active");
    });

    // 切換圖片組
    isSet1 = !isSet1;

    // 更新 inactive 圖片的背景
    boxes.forEach((box, index) => {
      const inactiveImage = box.querySelector(".image.inactive");
      const newImage = isSet1 ? imagesSet2[index] : imagesSet1[index];
      inactiveImage.style.backgroundImage = `url('${newImage}')`;
    });
  };

  // 每 8 秒切換一次圖片
  setInterval(switchImages, 8000);
});