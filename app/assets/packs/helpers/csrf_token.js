function getCsrfToken() {
  return document.querySelector("meta[name=csrf-token]").content;
}

export { getCsrfToken };
