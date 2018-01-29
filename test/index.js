'use strict';

/* DEPENDENCIES */
const { expect } = require('chai');
const ideally = require('./../.');

describe('Ideally library Tests', () => {
  it('should be an object with a generate function', () => {
    expect(ideally).to.be.an('object');
    expect(ideally.generate).to.be.a('function');
  });

  it('should generate 6 characted id.', () => {
    const generator = ideally.generate;
    expect(generator).to.be.a('function');
    const id = generator();
    expect(id)
    .to.be.a('string')
    .and.have.length(6);
  });

  it('should generate 128 characted id with numerical argument', () => {
    const id = ideally.generate(128);
    expect(id)
    .to.have.length(128);
  });

  it('should generate 256 character id with options object', () => {
    const id = ideally.generate({ length: 256 });
    expect(id)
    .to.have.length(256);
  });

  it('should generate 128 characted id from custon char string', () => {
    const id = ideally.generate({ length: 256, chars: 'abcd' });
    expect(id)
    .to.be.a('string')
    .and.have.length(256);
  });

  it('should generate id with a callback', done => {
    ideally.generate(null, (error, id) => {
      if (error) return done(error);
      expect(id)
      .to.be.a('string')
      .and.have.length(6);
      done();
    });
  });

  it('should generate id with a promise', async () => {
    const promise = ideally.generate({ asyncronous: true });
    expect(promise).to.be.an.instanceof(Promise);
    const id = await promise;
    expect(id)
    .to.be.a('string')
    .and.have.length(6);
  });

  it('should return a function, that in turn should return id', () => {
    const generator = ideally.generate({ length: 32, function: true });
    expect(generator)
    .to.be.a('function');
    const id = generator();
    expect(id)
    .to.have.length(32);
  });
});
