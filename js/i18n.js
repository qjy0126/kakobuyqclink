/* EN/PL UI strings + USD/PLN display currency */
(function () {
  window.KF = window.KF || {};

  const RATES = {
    USD: { rate: 1, symbol: "$", code: "USD" },
    PLN: { rate: 3.95, symbol: "zł", code: "PLN" },
  };

  const STRINGS = {
    en: {
      language: "Language",
      currency: "Currency",
      lang_en: "English",
      lang_pl: "Polski",
      fx_note: "Display rates are approximate.",
      nav_home: "Home",
      nav_shop: "Shop All",
      nav_apparel: "Apparel",
      nav_lifestyle: "Lifestyle",
      nav_guides: "Guides",
      search: "Search",
      search_placeholder: "Search reps, brands, items...",
      search_popular: "Popular",
      search_categories: "Categories",
      browse_catalog: "Browse the catalog",
      convert_link: "Convert a link",
      explore_categories: "Explore Our Categories",
      explore_lede: "Jump into a lane instead of scrolling a 15,000-row dump.",
      all_products: "All products",
      link_converter: "Link converter",
      link_converter_lede: "Paste a Taobao, Weidian, or 1688 URL — open the Kakobuy-compatible page instantly.",
      buy_kakobuy: "Buy on Kakobuy",
      more_in_category: "More in this category",
      footer_blurb: "Independent Kakobuy QC Link catalog with QC photos and listing links. We do not process orders or payments. Not officially affiliated with Kakobuy.",
      footer_products: "Products",
      footer_guides: "Guides",
      footer_quick: "Quick Links",
      hero_eyebrow: "2026 · links · QC photos",
      hero_h1: "Spreadsheet finds, rebuilt as a catalog",
      hero_lede: "Paste marketplace links or browse categories. Preview QC here, then open Kakobuy — not a frozen Google Sheet.",
      feat_indexed: "15k+ indexed finds",
      feat_indexed_p: "Shoes, streetwear, jerseys, bags — sorted into lanes you can tap.",
      feat_qc: "QC before you order",
      feat_qc_p: "Many cards carry inspection shots so you can compare batches early.",
      feat_one: "One-click Kakobuy",
      feat_one_p: "Directory only. Payments, warehouse, and shipping stay on the agent.",
    },
    pl: {
      language: "Język",
      currency: "Waluta",
      lang_en: "English",
      lang_pl: "Polski",
      fx_note: "Kursy wyświetlania są orientacyjne.",
      nav_home: "Start",
      nav_shop: "Sklep",
      nav_apparel: "Odzież",
      nav_lifestyle: "Lifestyle",
      nav_guides: "Poradniki",
      search: "Szukaj",
      search_placeholder: "Szukaj marek, rzeczy…",
      search_popular: "Popularne",
      search_categories: "Kategorie",
      browse_catalog: "Przeglądaj katalog",
      convert_link: "Konwertuj link",
      explore_categories: "Przeglądaj kategorie",
      explore_lede: "Wybierz kategorię zamiast przewijać 15 000 wierszy.",
      all_products: "Wszystkie produkty",
      link_converter: "Konwerter linków",
      link_converter_lede: "Wklej URL Taobao, Weidian lub 1688 — otwórz stronę Kakobuy od razu.",
      buy_kakobuy: "Kup na Kakobuy",
      more_in_category: "Więcej w tej kategorii",
      footer_blurb: "Niezależny katalog Kakobuy QC Link ze zdjęciami QC i linkami. Nie przyjmujemy płatności i nie wysyłamy paczek. Brak oficjalnego powiązania z Kakobuy.",
      footer_products: "Produkty",
      footer_guides: "Poradniki",
      footer_quick: "Szybkie linki",
      hero_eyebrow: "2026 · linki · zdjęcia QC",
      hero_h1: "Znaleziska ze sheetu jako katalog",
      hero_lede: "Wklej linki marketplace lub przeglądaj kategorie. Podgląd QC tutaj, potem otwórz Kakobuy — nie zamrożony Google Sheet.",
      feat_indexed: "15k+ znalezisk",
      feat_indexed_p: "Buty, streetwear, jersey, torby — posortowane w kategorie.",
      feat_qc: "QC przed zamówieniem",
      feat_qc_p: "Wiele kart ma zdjęcia kontrolne, żeby porównać batch wcześniej.",
      feat_one: "Kakobuy jednym kliknięciem",
      feat_one_p: "Tylko katalog. Płatności, magazyn i wysyłka zostają u agenta.",
    },
  };

  const CAT_LABELS = {
    en: {
      shoes: "Shoes",
      "t-shirts": "T-Shirts",
      hoodies: "Hoodies",
      jackets: "Jackets",
      pants: "Pants/Shorts",
      headwear: "Headwear",
      sets: "Sets",
      underwear: "Underpants",
      jersey: "Jersey",
      accessories: "Accessories",
      glasses: "Glasses",
      watches: "Watches",
      perfume: "Perfume",
      bricks: "Building Blocks",
      other: "Other Stuff",
      bags: "Bags",
    },
    pl: {
      shoes: "Buty",
      "t-shirts": "Koszulki",
      hoodies: "Bluzy",
      jackets: "Kurtki",
      pants: "Spodnie/Szorty",
      headwear: "Czapki",
      sets: "Komplety",
      underwear: "Bielizna",
      jersey: "Jersey",
      accessories: "Akcesoria",
      glasses: "Okulary",
      watches: "Zegarki",
      perfume: "Perfumy",
      bricks: "Klocki",
      other: "Inne",
      bags: "Torby",
    },
  };

  function readLang() {
    try {
      const c = localStorage.getItem("kf-lang");
      if (c === "pl" || c === "en") return c;
    } catch (_) {}
    return "en";
  }

  function readCurrency() {
    try {
      const c = localStorage.getItem("kf-currency");
      if (c && RATES[c]) return c;
    } catch (_) {}
    return "USD";
  }

  let lang = "en";
  let currency = "USD";

  function init() {
    lang = readLang();
    currency = readCurrency();
    document.documentElement.setAttribute("lang", lang);
  }

  function t(key) {
    const pack = STRINGS[lang] || STRINGS.en;
    return pack[key] || STRINGS.en[key] || key;
  }

  function catLabel(slug) {
    return (CAT_LABELS[lang] || CAT_LABELS.en)[slug] || slug;
  }

  function money(usd) {
    const n = Number(usd) || 0;
    const info = RATES[currency] || RATES.USD;
    const v = n * info.rate;
    if (currency === "PLN") {
      const rounded = Math.round(v * 100) / 100;
      return (
        rounded.toLocaleString("pl-PL", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) +
        " " +
        info.symbol
      );
    }
    return info.symbol + v.toFixed(2);
  }

  function setLang(code) {
    if (code !== "en" && code !== "pl") return;
    try {
      localStorage.setItem("kf-lang", code);
    } catch (_) {}
    lang = code;
    location.reload();
  }

  function setCurrency(code) {
    if (!RATES[code]) return;
    currency = code;
    try {
      localStorage.setItem("kf-currency", code);
    } catch (_) {}
    refreshPrices();
    updateChip();
    document.dispatchEvent(new CustomEvent("kf:currency", { detail: { currency } }));
  }

  function refreshPrices() {
    document.querySelectorAll("[data-price]").forEach((el) => {
      el.textContent = money(el.getAttribute("data-price"));
    });
    const itemPrice = document.getElementById("item-price");
    if (itemPrice && itemPrice.dataset.price != null) {
      itemPrice.textContent = money(itemPrice.dataset.price);
    }
  }

  function applyStaticI18n() {
    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.getAttribute("data-i18n");
      if (key) el.textContent = t(key);
    });
    document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
      const key = el.getAttribute("data-i18n-placeholder");
      if (key) el.setAttribute("placeholder", t(key));
    });
  }

  function updateChip() {
    const chip = document.getElementById("prefs-chip");
    if (!chip) return;
    chip.innerHTML = `${lang === "pl" ? "PL" : "EN"} · <strong>${currency}</strong>`;
  }

  init();

  KF.i18n = {
    get lang() {
      return lang;
    },
    get currency() {
      return currency;
    },
    t,
    catLabel,
    money,
    setLang,
    setCurrency,
    refreshPrices,
    applyStaticI18n,
    updateChip,
  };

  KF.t = t;
  KF.catLabel = catLabel;
  KF.money = money;
})();
