'use strict';

/* DEPENDENCIES */
const expect = require('chai').expect;
// const stat = require('simple-statistics');
const twizId = require('./../.');

/* EASY ID TESTS */
describe('Id', () => {
  it('should generate 6 characted id.', () => {
    expect(twizId.generate()).to.have.length(6);
  });

  it('should generate 128 characted id.', () => {
    expect(twizId.generate(128)).to.have.length(128);
  });

  it('should generate 128 characted id.', () => {
    expect(twizId.generate({ length: 256 })).to.have.length(256);
  });

  it('should return a function, that in turn should return id.', () => {
    let fun = twizId.generate({ length: 32 }, true);
    expect(fun).to.be.a('function');
    expect(fun()).to.have.length(32);
  });

  it('should generate 128 characted id from custon char string.', () => {
    expect(twizId.generate({ length: 256, chars: 'abcd' })).to.have.length(256);
  });

  // it('should generate random enough strings.', () => {
  //   let N = 1000000;
  //   let id = twizId.generate({ length: N, chars: 'abcd' });
  //   let arr = id.split('');
  //   let obj = {};
  //   for (let char of arr) {
  //     if (!obj[char]) {
  //       obj[char] = 1;
  //     } else {
  //       obj[char]++;
  //     }
  //   }
  //   /* STAT TEST */
  //   let chiSquared = 0;
  //   let p = 1 / 4;
  //   for (let entry in obj) {
  //     let Ei = N * p;
  //     let val = (Math.pow((obj[entry] - Ei), 2) / Ei);
  //   }
  // });

});
