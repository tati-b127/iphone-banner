window.addEventListener("DOMContentLoaded", () => {
  const URL = window.location.href;
  const locale = navigator.language;
  const paramLang = new URLSearchParams(window.location.search).get("lang");
  console.log(paramLang);
  let lang = { de: "de", en: "en", es: "es", fr: "fr", ja: "ja", pt: "pt" };
  Promise.all([
    fetch("locale/de.json"),
    fetch("locale/en.json"),
    fetch("locale/es.json"),
    fetch("locale/fr.json"),
    fetch("locale/ja.json"),
    fetch("locale/pt.json"),
  ])
    .then(async ([de, en, es, fr, ja, pt]) => {
      const deJson = await de.json();
      const enJson = await en.json();
      const esJson = await es.json();
      const frJson = await fr.json();
      const jaJson = await ja.json();
      const ptJson = await pt.json();
      return { deJson, enJson, esJson, frJson, jaJson, ptJson };
    })
    .then((response) => {
      console.log(response);
      if (paramLang === lang.de) {
        getLocaleText(response.deJson);
      } else if (paramLang === lang.en) {
        getLocaleText(response.enJson);
      } else if (paramLang === lang.es) {
        getLocaleText(response.esJson);
      } else if (paramLang === lang.fr) {
        getLocaleText(response.frJson);
      } else if (paramLang === lang.ja) {
        console.log(response.jaJson.Continue);
        getLocaleText(response.jaJson);
      } else if (paramLang === lang.pt) {
        getLocaleText(response.ptJson);
      } else {
        getLocaleText(response.enJson);
      }
      if (locale === "ru-RU") {
        console.log("Hello");
      }
    });
  function getLocaleText(localeJson) {
    let data = {};

    const arrayKeys = Object.values(localeJson);

    data.titleSTR = arrayKeys[0];
    data.wrapperTitle1STR = arrayKeys[1];
    data.wrapperTitle2STR = arrayKeys[2];
    data.wrapperTitle3STR = arrayKeys[3];
    data.btnTopTitleSTR = arrayKeys[4];
    data.btnOfferSTR = arrayKeys[5];
    data.btnTopSubLeftSTR = arrayKeys[6];
    data.btnBottomTitleSTR = arrayKeys[7];
    data.btnTopSubRightSTR = arrayKeys[8];
    data.btnBottomSubRightSTR = arrayKeys[8];
    data.footerLink1STR = arrayKeys[9];
    data.footerLink2STR = arrayKeys[10];
    data.footerLink3STR = arrayKeys[11];
    data.btnContinueSTR = arrayKeys[12];
    console.log(data);
    createLocalePage(data);
  }
  function createLocalePage(data) {
    console.log(data);
    const mainTitle = document.getElementById("banner-title");
    const wrapperTitle1 = document.querySelector(
      ".wrapper__item_1 .wrapper__title"
    );
    const wrapperTitle2 = document.querySelector(
      ".wrapper__item_2 .wrapper__title"
    );
    const wrapperTitle3 = document.querySelector(
      ".wrapper__item_3 .wrapper__title"
    );
    const btnTop = document.querySelector(".banner__btn_top");
    const btnTopTitle = btnTop.querySelector(".btn__title");
    const btnTopSubLeft = btnTop.querySelector(".btn__subtitle_left");
    const btnTopSubRight = btnTop.querySelector(".btn__subtitle_right");
    const btnBottom = document.querySelector(".banner__btn_bottom");
    const btnBottomTitle = btnBottom.querySelector(".btn__title");
    //   const btnBottomSubLeft = btnBottom.querySelector(".btn__subtitle_left");
    const btnBottomSubRight = btnBottom.querySelector(".btn__subtitle_right");
    const btnOffer = btnTop.querySelector(".banner__btn_offer");
    const btnContinue = document.getElementById("continue");
    const footerLink1 = document.querySelector(".footer__link_1");
    const footerLink2 = document.querySelector(".footer__link_2");
    const footerLink3 = document.querySelector(".footer__link_3");

    let href = btnTop.dataset.href;
    console.log(href);

    btnTop.addEventListener("click", (event) => {
      href = event.target.dataset.href;

      if (!event.target.classList.contains("active")) {
        btnBottom.classList.remove("active");
        event.target.classList.add("active");
      }
    });
    btnBottom.addEventListener("click", (event) => {
      href = event.target.dataset.href;

      if (!event.target.classList.contains("active")) {
        btnTop.classList.remove("active");
        event.target.classList.add("active");
      }
    });
    btnContinue.addEventListener("click", (event) => {
      window.location.href = href;
    });

    mainTitle.innerHTML = data.titleSTR;
    wrapperTitle1.innerHTML = data.wrapperTitle1STR;
    wrapperTitle2.innerHTML = data.wrapperTitle2STR;
    wrapperTitle3.innerHTML = data.wrapperTitle3STR;
    btnTopTitle.innerHTML = data.btnTopTitleSTR;
    btnTopSubLeft.innerHTML = data.btnTopSubLeftSTR;
    btnTopSubRight.innerHTML = data.btnTopSubRightSTR;
    btnBottomTitle.innerHTML = data.btnBottomTitleSTR;
    btnBottomSubRight.innerHTML = data.btnBottomSubRightSTR;
    btnOffer.innerHTML = data.btnOfferSTR;
    btnContinue.innerHTML = data.btnContinueSTR;
    footerLink1.innerHTML = data.footerLink1STR;
    footerLink2.innerHTML = data.footerLink2STR;
    footerLink3.innerHTML = data.footerLink2STR;
    fontsize(btnTop, btnTopTitle, btnTopSubLeft);
  }
  function fontsize(btn, btnTitle, btnSubTitle) {
    let blockWidth = btnTitle.offsetWidth;
    console.log(blockWidth);
    console.log(btnTitle.innerHTML.length);
    const initialMinFontSize = 16;
    console.log(initialMinFontSize);
    let maxWidth = btnTitle.clientWidth;
    let maxHeight = btnTitle.clientHeight;
    let fontSize = maxHeight;
    let minFontSize = initialMinFontSize;
    let maxFontSize = fontSize;
    let optimalSize = Math.floor((maxFontSize + minFontSize) / 2);
    // btnTitle.style.fontSize = optimalSize + "px";

    // btnTitle.style.fontSize =
    //   (blockWidth / btnTitle.innerHTML.length) * 1.8 + "px";
    // btnSubTitle.style.fontSize =
    //   (blockWidth / btnTitle.innerHTML.length) * 1.8 + "px";
    // text.style.left = w / 9 + "px";
  }
});
