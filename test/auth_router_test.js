const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const expect = chai.expect;
const mongoose = require('mongoose');
const server = require(__dirname + '/test_server');
const User = require(__dirname + '/../models/user');
const origin = 'localhost:4000';
const zeroBuffer = require(__dirname + '/../lib/logic/zero_buffer.js');

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
    it('should be able to remind user to enter a username', (done) => {
      var invalidUser = {
        email: 'newuser1@gmail.com',
        username: '',
        password: '12345678'
      };
      chai.request(origin)
        .post('/signup')
        .send(invalidUser)
        .end((err, res) => {
          expect(err).to.eql(null);
          expect(res).to.have.status(400);
          expect(res.body.msg).to.eql('Please enter a user name');
          done();
        });
    });

    it('should be able to remind user to enter a password if its length is less than 7 characters', (done) => {
      var invalidUser = {
        email: 'newuser1@gmail.com',
        username: 'newuser1',
        password: '123456'
      };
      chai.request(origin)
        .post('/signup')
        .send(invalidUser)
        .end((err, res) => {
          expect(err).to.eql(null);
          expect(res).to.have.status(400);
          expect(res.body.msg).to.eql('Please enter a password longer than 7 characters');
          done();
        });
    });

    it('it should be able to create a new  user', (done) => {
      var newUser = {
        email: 'newuser@gmail.com',
        username: 'newuser',
        password: '12345678',
        comfirmpassword: '12345678'
      };
      chai.request(origin)
        .post('/signup')
        .send(newUser)
        .end((err, res) => {
          expect(err).to.eql(null);
          expect(res).to.have.a.status(200);
          expect(res.body.msg).to.eql('Success in signup!');
          this.token = res.body;
          done();
        });
    });

    it('should be able to check whether the user already exist for signup', (done) => {
      var sameUser = {
        email: 'newuser@gmail.com',
        username: 'newuser',
        password: '12345678',
        comfirmpassword: '12345678'
      };
      chai.request(origin)
        .post('/signup')
        .send(sameUser)
        .end((err, res) => {
          expect(err).to.eql(null);
          expect(res).to.have.status(400);
          expect(res.body.msg).to.eql('User already exists! Please use a different username');
          done();
        });
    });
  });

  describe('user signin test:', () => {
    var signinuser = {
      email: 'signinuser@gmail.com',
      username: 'signinuser',
      password: '12345678',
      comfirmpassword: '12345678'
    };
    before((done) => {
      chai.request('localhost:4000')
        .post('/signup')
        .send(signinuser)
        .end((err, res) => {
          expect(err).to.eql(null);
          expect(res).to.have.status(200);
          done();
        });
    });

    it('should be able to signin if user valid', (done) => {
      chai.request(origin)
        .get('/signin')
        .auth(signinuser.email, signinuser.password)
        .end((err, res) => {
          expect(err).to.eql(null);
          expect(res.body.msg).to.eql('Success in signin');
          expect(res).to.have.status(200);
          done();
        });
    });
    it('should be able to avoid user to login if user doesn not exist', (done) => {
      chai.request(origin)
        .get('/signin')
        .auth('nouser@gmail.com', '12345678')
        .end((err, res) => {
          expect(err).to.eql(null);
          expect(res).to.have.status(401);
          expect(res.body.msg).to.eql('no user exists');
          done();
        });
    });
    it('should be able to avoid user to login if password is incorrect', (done) => {
      chai.request(origin)
        .get('/signin')
        .auth('signinuser@gmail.com', '12345679')
        .end((err, res) => {
          expect(err).to.eql(null);
          expect(res).to.have.status(401);
          expect(res.body.msg).to.eql('incorrect password');
          done();
        });
    });
    it('should be able to zero out the buffer' => {
      var testBuffer = [34, 345, 564, 23455435];
      zeroBuffer(testBuffer);
      expect(testBuffer).to.eql('[0, 0, 0, 0]');
    });
  });
});
