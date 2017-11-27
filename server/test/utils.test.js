import chai from 'chai';
import convertCase from '../utils/convertCase';
import getArray from '../utils/getArray';
import emailValidation from '../utils/emailValidation';

const expect = chai.expect;

chai.should();

describe('The Helper function', () => {
  describe('convertCase:', () => {
    const smallText = 'smallText';
    it('should  Capitalize the first leeter of string passed to it',
      () => {
        expect(convertCase(smallText)).to.equal('Smalltext');
      });
  });
  describe('getArray:', () => {
    const myObj = {
      name: "John",
      age: 30,
    };
    it('should return an array of objects values when an object is passed',
      () => {
        expect(getArray(myObj)).to.be.a('array');
      });
  });
  describe('emailValidation', () => {
    const badEmail = 'bademail.com';
    const goodEmail = 'goodEmail@email.com';
    it('should validate a string to be of email format', () => {
      expect(emailValidation(badEmail)).to.be.false; // eslint-disable-line
    });
    it('should return true if string supplied is email format', () => {
      expect(emailValidation(goodEmail)).to.be.true; // eslint-disable-line
    });
  });
});
