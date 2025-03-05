// ==UserScript==
// @name         Vapi
// @namespace    http://tampermonkey.net/
// @version      2025-01-16
// @description  try to take over the world!
// @author       You
// @match        https://docs.vapi.ai/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=vapi.ai
// @grant        none
// ==/UserScript==

const removeAllClickListeners = (element) => {
  const newElement = element.cloneNode(true);
  element.parentNode.replaceChild(newElement, element);
  return newElement;
}

const makeDefaultSearchTrieve = async () => {
  let defaultSearchBar = null;
  while (!defaultSearchBar) {
    for (const el of document.querySelectorAll('*')) {
      if (el.querySelector('[aria-label="Search"]')) {
        defaultSearchBar = el.querySelector('[aria-label="Search"]');
        break;
      }
    };
    await new Promise((resolve) => setTimeout(resolve, 10));
  }
  defaultSearchBar = removeAllClickListeners(defaultSearchBar);

  defaultSearchBar.onclick = () => {
    const event = new CustomEvent("trieve-open-with-text", { detail: { text: "" } });
    window.dispatchEvent(event);
  }
};
makeDefaultSearchTrieve();
setTimeout(makeDefaultSearchTrieve, 50);
setTimeout(makeDefaultSearchTrieve, 100);
setTimeout(makeDefaultSearchTrieve, 200);
setTimeout(makeDefaultSearchTrieve, 400);
setTimeout(makeDefaultSearchTrieve, 900);
setTimeout(makeDefaultSearchTrieve, 1800);

(async function () {
  "use strict";
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = "https://cdn.trieve.ai/beta/search-component/index.css";
  document.head.appendChild(link);

  import("https://cdn.trieve.ai/beta/search-component/vanilla/index.js").then(
    async (module) => {
      const { renderToDiv } = module;
      const root = document.createElement("div");
      root.classList.add("trigger");
      document.body.appendChild(root);

      renderToDiv(root, {
        apiKey: "tr-hZMKSsTf3ML9hJbAAqPO8K91p9IVe9Oc",
        datasetId: "d3493dc0-2b5c-4c6e-a8ee-b18feeed5b06",
        baseUrl: "https://api.trieve.ai",
        type: "docs",
        analytics: true,
        theme: "dark",
        brandLogoImgSrcUrl: "https://storage.googleapis.com/organization-image-assets/vapi-botAvatarDarkSrcUrl-1709929110474.png",
        brandName: "Vapi",
        brandColor: "#94ffd2",
        placeholder: "How can I help?",
        defaultSearchQueries: ["quickstart", "assistant", "tools"],
        defaultAiQuestions: ["What voices are supported?", "What languages are supported?", "How do I connect a custom LLM?", "How do I fetch the prompt dynamically?"],
        defaultSearchMode: "search",
        showFloatingButton: "true",
        cssRelease: "none",
        hideOpenButton: true,
      });
    },
    (error) => {
      console.error("Failed to load module:", error);
    }
  );
})();
