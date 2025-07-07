const wrapper = document.querySelector(".sliderWrapper");
const menuItems = document.querySelectorAll(".menuItem");

const products = [
  {
    id: 1,
    title: "Atomic Habits",
    price: 19,
    description: "An easy & proven way to build good habits & break bad ones. James Clear reveals practical strategies that will teach you exactly how to form good habits, break bad ones, and master the tiny behaviors that lead to remarkable results.",
    colors: [
      {
        code: "default",
        img: "./atomic-habits.jpg",
      },
      {
        code: "alt",
        img: "./atomic-habits-alt.png",
      },
    ],
  },
  {
    id: 2,
    title: "Rich Dad Poor Dad",
    price: 15,
    description: "Robert Kiyosaki challenges the conventional wisdom that you need a high income to be rich and explains the difference between an asset and a liability.",
    colors: [
      {
        code: "default",
        img: "./rich-dad-poor-dad.jpg",
      },
      {
        code: "alt",
        img: "./richdadpoordad-alt.png",
      },
    ],
  },
  {
    id: 3,
    title: "Psychology of Money",
    price: 17,
    description: "Morgan Housel shares 19 short stories exploring the strange ways people think about money and teaches you how to make better sense of one of life’s most important topics.",
    colors: [
      {
        code: "default",
        img: "./psychology-of-money.jpg", // Asosiy rasm
      },
      {
        code: "alt",
        img: "./psychologyofmoney-alt.png",
      },
    ],
  },
  {
    id: 4,
    title: "48 Laws of Power",
    price: 22,
    description: "A controversial and thought-provoking guide to understanding and achieving power, drawing on lessons from history's most cunning strategists.",
    colors: [
      {
        code: "default",
        img: "./48-laws-of-power.jpg",
      },
      {
        code: "alt",
        img: "./48lawsofpower-alt.png",
      },
    ],
  },
  {
    id: 5,
    title: "The Subtle Art",
    price: 14,
    description: "A counterintuitive approach to living a good life. Mark Manson argues that we should all stop trying to be 'positive' all the time and instead learn to deal with life's inevitable setbacks.",
    colors: [
      {
        code: "en", // EN uchun shartli kod
        img: "./subtle-art.jpg", // EN versiya rasmi
      },
      {
        code: "uz", // UZ uchun shartli kod
        img: "./atomic-habits.jpg", // UZ versiya uchun Atomic Habits rasmini qo'ydim (misol uchun)
      },
    ],
  },
];

let choosenProduct = products[0];

const currentProductImg = document.querySelector(".productImg");
const currentProductTitle = document.querySelector(".productTitle");
const currentProductPrice = document.querySelector(".productPrice");
const currentProductDesc = document.querySelector(".productDesc");
const currentProductColors = document.querySelectorAll(".color-text");
const currentProductSizes = document.querySelectorAll(".size");

menuItems.forEach((item, index) => {
  item.addEventListener("click", () => {
    // Joriy slaydni o'zgartirish
    wrapper.style.transform = `translateX(${-100 * index}vw)`;

    // Tanlangan mahsulotni o'zgartirish
    choosenProduct = products[index];

    // Joriy mahsulot matnlarini o'zgartirish
    currentProductTitle.textContent = choosenProduct.title;
    currentProductPrice.textContent = "$" + choosenProduct.price;
    currentProductDesc.textContent = choosenProduct.description; // Tavsifni yangilash
    currentProductImg.src = choosenProduct.colors[0].img; // Asosiy rasmni yangilash

    // Product sahifasidagi chapdagi rasmni boshqarish
    let productMainContent = document.querySelector(".product-main-content");
    let productImgLeft = productMainContent.querySelector(".productImgLeft");

    if (choosenProduct.title === "Atomic Habits" || choosenProduct.title === "Psychology of Money") {
      if (!productImgLeft) {
        productImgLeft = document.createElement("img");
        productImgLeft.classList.add("productImg", "productImgLeft");
        productMainContent.insertBefore(productImgLeft, currentProductTitle.parentNode); // productDetails oldiga joylashtirish
      }
      productImgLeft.src = choosenProduct.colors[0].img; // Mos rasmni yuklash
      productImgLeft.style.display = "block"; // Rasmni ko'rsatish
    } else {
      if (productImgLeft) {
        productImgLeft.style.display = "none"; // Boshqa kitoblar uchun yashirish
      }
    }


    // Yangi rang/til tugmalarini berish
    currentProductColors.forEach((button, i) => {
      // Faqat The Subtle Art uchun EN/UZ tugmalarini ko'rsatamiz
      if (choosenProduct.title === "The Subtle Art") {
        button.style.display = "flex"; // Tugmalarni ko'rsatish
        button.textContent = choosenProduct.colors[i].code.toUpperCase(); // EN yoki UZ matnini qo'yish
      } else {
        button.style.display = "none"; // Boshqa kitoblar uchun yashirish
      }
    });

    // Avvalgi faol holatni o'chirish
    currentProductColors.forEach(button => {
      button.classList.remove("active");
    });
    currentProductSizes.forEach(size => {
      size.classList.remove("active");
    });

    // Birinchi tugmani faol holatga keltirish (agar ko'rinadigan bo'lsa)
    if (choosenProduct.title === "The Subtle Art" && currentProductColors.length > 0) {
      currentProductColors[0].classList.add("active");
    }
    // O'lchamlarda ham birinchisini faol qilish
    if (currentProductSizes.length > 0) {
      currentProductSizes[0].classList.add("active");
    }
  });
});

currentProductColors.forEach((button, index) => {
  button.addEventListener("click", () => {
    currentProductColors.forEach(btn => {
      btn.classList.remove("active");
    });
    button.classList.add("active");
    // "The Subtle Art" uchun rasm almashtirish
    if (choosenProduct.title === "The Subtle Art") {
        currentProductImg.src = choosenProduct.colors[index].img;
    }
  });
});


currentProductSizes.forEach((size, index) => {
  size.addEventListener("click", () => {
    currentProductSizes.forEach((size) => {
      size.classList.remove("active");
    });
    size.classList.add("active");
  });
});

const productButton = document.querySelector(".productButton");
const payment = document.querySelector(".payment");
const close = document.querySelector(".close");

productButton.addEventListener("click", () => {
  payment.style.display = "flex";
});

close.addEventListener("click", () => {
  payment.style.display = "none";
});

// Sahifa o'tishlariga animatsiya qo'shish
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    });
});

// Sahifa yuklanganda boshlang'ich holatni sozlash
document.addEventListener("DOMContentLoaded", () => {
  // Barcha color-text tugmalarini yashiring
  const allColorTextButtons = document.querySelectorAll(".color-text");
  allColorTextButtons.forEach(button => {
    button.style.display = "none";
  });

  // Atomic Habits uchun Product sahifasidagi rasmni ko'rsatish
  const productMainContent = document.querySelector(".product-main-content");
  const productDetails = document.querySelector(".productDetails");
  const productImgLeft = document.createElement("img");
  productImgLeft.classList.add("productImg", "productImgLeft");
  productImgLeft.src = "./atomic-habits.jpg"; // Boshlang'ich rasm Atomic Habits
  productMainContent.insertBefore(productImgLeft, productDetails);

  // Faol o'lchamni belgilash
  if (currentProductSizes.length > 0) {
    currentProductSizes[0].classList.add("active");
  }
});