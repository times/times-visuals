const camelise = str => str.replace(/-([a-z])/g, g => g[1].toUpperCase());

export const processAttributes = attributes =>
  [...attributes].reduce(
    (acc, attribute) => ({
      ...acc,
      [camelise(attribute.name)]: attribute.value
    }),
    {}
  );
