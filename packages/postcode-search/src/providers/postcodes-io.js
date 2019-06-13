import "whatwg-fetch";

export const loadPostcode = postcode =>
  fetch(`https://api.postcodes.io/postcodes/${postcode}`)
    .then(res => {
      if (res.status !== 200) {
        throw new Error(res.statusText);
      }

      return res.json();
    })
    .then(({ result }) => result);
