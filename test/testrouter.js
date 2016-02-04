const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const expect = chai.expect;
const server = require(__dirname + '/test_server');
const origin = 'localhost:4000';
const User = require(__dirname + '/../models/user');
const request = chai.request;

var testUser = new User();
var myTestToken = testUser.generateToken();

describe('Public routes', () => {
  it('should get to /', () => {
    request(origin)
    .get('/')
    .end((err, res) => {
      expect(res).to.have.status(200);
      expect(err).to.eql(null);
    });
  });

  it('should get to /home', () => {
    request(origin)
    .get('/home')
    .end((err, res) => {
      expect(res).to.have.status(200);
      expect(err).to.eql(null);
    });
  });

  it('should get to /index', () => {
    request(origin)
    .get('/index')
    .end((err, res) => {
      expect(res).to.have.status(200);
      expect(err).to.eql(null);
    });
  });

  it('should get to /player', () => {
    request(origin)
    .get('/player')
    .end((err, res) => {
      expect(res).to.have.status(200);
      expect(err).to.eql(null);
    });
  });
});


describe('Token routes no token', () => {
  it('should FAIL TO get to /newCP', () => {
    request(origin)
    .post('/newCP')
    .end((err, res) => {
      expect(res).to.have.status(401);
      expect(err).to.eql(null);
    });
  });

  it('should FAIL TO get to /profile', () => {
    request(origin)
    .get('/profile')
    .end((err, res) => {
      expect(res).to.have.status(401);
      expect(err).to.eql(null);
    });
  });

  it('should FAIL TO get to /player2', () => {
    request(origin)
    .get('/player2')
    .end((err, res) => {
      expect(res).to.have.status(401);
      expect(err).to.eql(null);
    });
  });
});

server.fake = null;
myTestToken.fake = null;
