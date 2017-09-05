const mocha = require('mocha');
const expect = require('chai').expect;
const assert = require('assert');
const should = require('should');

const isEven = (number) => {
    return number % 2 === 0;
}

describe('isEven', () => {
    it('should return true when number is even', () => {
        expect(isEven(4)).to.be.true;
    });
    it('should return false when number is odd', () => {
        expect(isEven(5)).to.be.false;
    })
});
