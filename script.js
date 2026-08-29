/* =========================================
   FURNITURE WEBSITE - PROFESSIONAL JAVASCRIPT
========================================= */


/* =========================================
   CURRENCY SETTINGS
========================================= */

const CURRENCY = {
    KES: {
        symbol: "KES",
        rate: 1
    },
    USD: {
        symbol: "USD",
        rate: 1 / 130
    }
};

let currentCurrency = "KES";


/* =========================================
   CURRENCY TOGGLE
========================================= */

function toggleCurrency() {
    const priceElements = document.querySelectorAll(".price");

    if (!priceElements.length) return;

    currentCurrency = currentCurrency === "KES" ? "USD" : "KES";

    priceElements.forEach(price => {
        const basePrice = Number(price.dataset.value);

        if (isNaN(basePrice)) return;

        let convertedPrice;

        if (currentCurrency === "USD") {
            convertedPrice = basePrice * CURRENCY.USD.rate;

            price.textContent = `USD ${convertedPrice.toFixed(2)}`;
        } else {
            convertedPrice = basePrice;

            price.textContent = `KES ${convertedPrice.toLocaleString()}`;
        }

        price.dataset.currency = currentCurrency;

        /* Smooth price update */
        price.classList.add("price-updated");

        setTimeout(() => {
            price.classList.remove("price-updated");
        }, 300);
    });

    /* Update currency button text */
    updateCurrencyButton();
}


/* =========================================
   CURRENCY BUTTON
========================================= */

function updateCurrencyButton() {
    const currencyButton = document.querySelector("#currencyToggle");

    if (!currencyButton) return;

    if (currentCurrency === "KES") {
        currencyButton.textContent = "View Prices in USD";
        currencyButton.setAttribute(
            "aria-label",
            "Switch prices to US Dollars"
        );
    } else {
        currencyButton.textContent = "View Prices in KES";
        currencyButton.setAttribute(
            "aria-label",
            "Switch prices to Kenyan Shillings"
        );
    }
}


/* =========================================
   SECTION REVEAL ANIMATION
========================================= */

const sections = document.querySelectorAll("section");

const revealSection = () => {
    const windowHeight = window.innerHeight;

    sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;

        if (sectionTop < windowHeight - 100) {
            section.classList.add("show");
        }
    });
};


/* =========================================
   NAVIGATION HIGHLIGHT
========================================= */

const navigationLinks = document.querySelectorAll("nav a");

const updateActiveNavigation = () => {
    let currentSection = "";

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;

        if (
            window.scrollY >= sectionTop - 150 &&
            window.scrollY < sectionTop + sectionHeight - 150
        ) {
            currentSection = section.getAttribute("id");
        }
    });

    navigationLinks.forEach(link => {
        link.classList.remove("active");

        const target = link.getAttribute("href");

        if (target === `#${currentSection}`) {
            link.classList.add("active");
        }
    });
};


/* =========================================
   SMOOTH NAVIGATION
========================================= */

navigationLinks.forEach(link => {
    link.addEventListener("click", event => {
        const targetId = link.getAttribute("href");

        if (!targetId || !targetId.startsWith("#")) return;

        const targetSection = document.querySelector(targetId);

        if (!targetSection) return;

        event.preventDefault();

        targetSection.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
    });
});


/* =========================================
   SCROLL EVENT
========================================= */

let ticking = false;

window.addEventListener("scroll", () => {

    if (!ticking) {
        window.requestAnimationFrame(() => {

            revealSection();
            updateActiveNavigation();

            ticking = false;
        });

        ticking = true;
    }
});


/* =========================================
   INITIAL PAGE LOAD
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    revealSection();
    updateActiveNavigation();
    updateCurrencyButton();

});


/* =========================================
   PRODUCT CARD INTERACTIONS
========================================= */

const productCards = document.querySelectorAll(".product-card");

productCards.forEach(card => {

    card.addEventListener("mouseenter", () => {
        card.classList.add("featured");
    });

    card.addEventListener("mouseleave", () => {
        card.classList.remove("featured");
    });

});


/* =========================================
   BUTTON FEEDBACK
========================================= */

const buttons = document.querySelectorAll("button");

buttons.forEach(button => {

    button.addEventListener("click", () => {

        button.classList.add("clicked");

        setTimeout(() => {
            button.classList.remove("clicked");
        }, 200);

    });

});