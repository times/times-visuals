// @flow
/* global fetch */
const url = "https://qj2242lz4a.execute-api.eu-west-1.amazonaws.com/dev";
// const url = 'http://localhost:3000';

type Records = Array<*>;

type GetRecords = (
  ?string
) => (number, number, ?string, ?string, ?boolean) => Promise<Records>;
export const getRecords: GetRecords = (sector = null) => (
  skip = 0,
  show = 10,
  searchTerm = null,
  sortBy = null,
  reverseSort = false
) => {
  const queryParams = {
    skip,
    show,
    term: searchTerm,
    orderBy: sortBy,
    order: reverseSort ? "DESC" : "ASC",
    sector
  };

  return fetch(
    `${url}/records?${Object.entries(queryParams)
      .filter(([key, value]) => !!value) // eslint-disable-line no-unused-vars
      .map(q => q.join("="))
      .join("&")}`
  )
    .then(res => res.json())
    .then(({ records }) =>
      records.map(({ name, rank, pay_gap, bonus_gap, pay_quartile }) => ({
        name,
        rank,
        pay_gap,
        bonus_gap,
        pay_quartile
      }))
    );
};

type CountRecords = (?string) => (?string) => Promise<number>;
export const countRecords: CountRecords = sector => searchTerm => {
  const queryParams = {
    term: searchTerm,
    sector
  };

  return fetch(
    `${url}/countRecords?${Object.entries(queryParams)
      .filter(([key, value]) => !!value) // eslint-disable-line no-unused-vars
      .map(q => q.join("="))
      .join("&")}`
  )
    .then(res => res.json())
    .then(({ count }) => count);
};
