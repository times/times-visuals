import * as selection from "d3-selection";
import * as pack from "d3-jetpack";

//import * as parliament from 'd3-parliament';
// const d3 = { ...selection, ...pack, ...parliament };
const d3 = { ...selection, ...pack };

const computeNodeSize = node => node.getBoundingClientRect();

const series = (s, n) => {
  let r = 0;
  for (let i = 0; i <= n; i++) {
    r += s(i);
  }
  return r;
};

// shameless reimplementation of:
// https://github.com/geoffreybr/d3-parliament
const makeParliament = (data, width, height, innerRadiusCoef) => {
  const outerParliamentRadius = Math.min(width / 2, height);
  const innerParliementRadius = outerParliamentRadius * innerRadiusCoef;

  // compute number of seats and rows of the parliament
  let nSeats = 0;
  data.forEach(p => {
    nSeats +=
      typeof p.seats === "number" ? Math.floor(p.seats) : p.seats.length;
  });

  let nRows = 0;
  let maxSeatNumber = 0;
  let b = 0.5; // was ist das

  (() => {
    const a = innerRadiusCoef / (1 - innerRadiusCoef);
    const calcFloor = i => Math.floor(Math.PI * (b + i));
    while (maxSeatNumber < nSeats) {
      nRows += 1;
      b += a;
      /* NOTE: the number of seats available in each row depends on the total number
            of rows and floor() is needed because a row can only contain entire seats. So,
            it is not possible to increment the total number of seats adding a row. */
      maxSeatNumber = series(calcFloor, nRows - 1);
    }
  })();

  // create the seats list
  // compute the cartesian and polar coordinates for each seat
  const rowWidth = (outerParliamentRadius - innerParliementRadius) / nRows;
  const seats = [];
  (() => {
    const seatsToRemove = maxSeatNumber - nSeats;
    for (let i = 0; i < nRows; i += 1) {
      const rowRadius = innerParliementRadius + rowWidth * (i + 0.5);
      const rowSeats =
        Math.floor(Math.PI * (b + i)) -
        Math.floor(seatsToRemove / nRows) -
        (seatsToRemove % nRows > i ? 1 : 0);
      const anglePerSeat = Math.PI / rowSeats;
      for (let j = 0; j < rowSeats; j += 1) {
        const s = {};
        s.polar = {
          r: rowRadius,
          teta: -Math.PI + anglePerSeat * (j + 0.5)
        };
        s.cartesian = {
          x: s.polar.r * Math.cos(s.polar.teta),
          y: s.polar.r * Math.sin(s.polar.teta)
        };
        seats.push(s);
      }
    }
  })();

  // sort the seats by angle
  seats.sort((a, b2) => a.polar.teta - b2.polar.teta || b2.polar.r - a.polar.r);

  // fill the seat objects with data of its party and of itself if existing
  (() => {
    let partyIndex = 0;
    let seatIndex = 0;
    seats.forEach(s => {
      // get current party and go to the next one if it has all its seats filled
      let party = data[partyIndex];
      const nSeatsInParty =
        typeof party.seats === "number" ? party.seats : party.seats.length;
      if (seatIndex >= nSeatsInParty) {
        partyIndex += 1;
        seatIndex = 0;
        party = data[partyIndex];
      }

      // set party data
      s.party = party;
      s.data = typeof party.seats === "number" ? null : party.seats[seatIndex];

      seatIndex += 1;
    });
  })();

  return {
    seats,
    rowWidth
  };
};

export const drawChart = (node, data) => {
  const { width } = computeNodeSize(node);
  const height = width < 450 ? 150 : 300;
  const innerRadiusCoef = 0.2;
  const { seats, rowWidth } = makeParliament(
    data,
    width,
    height,
    innerRadiusCoef
  );
  const seatRadius = d => {
    let r = 0.4 * rowWidth;
    if (d.data && typeof d.data.size === "number") {
      r *= d.data.size;
    }
    return r;
  };
  const svg = d3
    .select(node)
    .append("svg")
    .at({
      width: width,
      height: height
    })
    .st({
      backgroundColor: "#f9f9f9"
    });

  svg
    .append("g")
    .translate([width / 2, Math.min(width / 2, height)])
    .selectAll(".seat")
    .data(seats)
    .enter()
    .append("circle")
    .at({
      class: d => `seat ${d.party.id}`,
      cx: d => d.cartesian.x,
      cy: d => d.cartesian.y,
      fill: d => {
        return d.party.color;
      },
      r: seatRadius
    });
};
