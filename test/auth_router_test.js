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
      var invalidUser = { email: '', username: 'newuser1', password: '12345678' };
      chai.request(origin)
        .post('/signup')
        .send(invalidUser)
        .end((err, res) => {
          expect(err).to.eql(null);
          expect(res).to.have.status(200);
          expect(res.body.msg).to.eql('Please enter a email');
          done();
        });
    });
    it('should be able to remind user to re-enter a email if it is invalid', (done) => {
      var invalidUser = { email: 'user.', username: 'newuser1', password: '12345678' };
      chai.request(origin)
        .post('/signup')
        .send(invalidUser)
        .end((err, res) => {
          expect(err).to.eql(null);
          expect(res).to.have.status(200);
          expect(res.body.msg).to.eql('Please enter a valid email');
          done();
        });
    });
    it('should be able to remind user to enter a username', (done) => {
      var invalidUser = { email: 'newuser1@gmail.com', username: '', password: '12345678' };
      chai.request(origin)
        .post('/signup')
        .send(invalidUser)
        .end((err, res) => {
          expect(err).to.eql(null);
          expect(res).to.have.status(200);
          expect(res.body.msg).to.eql('Please enter a user name');
          done();
        });
    });

    it('should be able to remind user to enter a password if its length is less than 7', (done) => {
      var invalidUser = { email: 'newuser1@gmail.com', username: 'newuser1', password: '123456' };
      chai.request(origin)
        .post('/signup')
        .send(invalidUser)
        .end((err, res) => {
          expect(err).to.eql(null);
          expect(res).to.have.status(200);
          expect(res.body.msg).to.eql('Please enter password of length more than 7');
          done();
        });
    });

    it('it should be able to create a new  user', (done) => {
      var newUser = { email: 'newuser@gmail.com', username: 'newuser', password: '12345678' };
      chai.request(origin)
        .post('/signup')
        .send(newUser)
        .end((err, res) => {
          expect(err).to.eql(null);
          expect(res).to.have.a.status(200);
          expect(res.body).to.have.property('token');
          this.token = res.body;
          done();
        });
    });

    it('should be able to check whether the user already exist for signup', (done) => {
      var sameUser = { email: 'newuser@gmail.com', username: 'newuser', password: '12345678' };
      chai.request(origin)
        .post('/signup')
        .send(sameUser)
        .end((err, res) => {
          expect(err).to.eql(null);
          expect(res).to.have.status(200);
          expect(res.body.msg).to.eql('user already exist; please sign in this site');
          done();
        });
    });
  });

});
