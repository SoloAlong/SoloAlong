const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const expect = chai.expect;
const mongoose = require('mongoose');
const server = require(__dirname + '/test_server');
const User = require(__dirname + '/../models/user');
const origin = 'localhost:4000';

describe('User Authentication: ', () => {
  after((done) => {
    mongoose.connection.db.dropDatabase(() => {
      done();
    });
  });
  describe('User signup test: ', () => {
    it('should be able to remind user to enter a email if it does not exist', (done) => {
      var invalidUser = {
        email: '',
        username: 'newuser1',
        password: '12345678'
      };
      chai.request(origin)
        .post('/signup')
        .send(invalidUser)
        .end((err, res) => {
          expect(err).to.eql(null);
          expect(res).to.have.status(400);
          expect(res.body.msg).to.eql('Please enter an email');
          done();
        });
    });
    it('should be able to remind user to re-enter a email if it is invalid', (done) => {
      var invalidUser = {
        email: 'user.',
        username: 'newuser1',
        password: '12345678'
      };
      chai.request(origin)
        .post('/signup')
        .send(invalidUser)
        .end((err, res) => {
          expect(err).to.eql(null);
          expect(res).to.have.status(400);
          expect(res.body.msg).to.eql('Please enter a valid email');
          done();
        });
    });
  });
});
