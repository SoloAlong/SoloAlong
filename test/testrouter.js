const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const expect = chai.expect;
const server = require(__dirname + '/test_server');
const origin = 'localhost:4000';
const User = require(__dirname + '/../models/user');
const request = chai.request;

describe('Public routes', () => {
  it('should get to /', (done) => {
    request(origin)
    .get('/')
    .end((err, res) => {
      expect(res).to.have.status(200);
      expect(err).to.eql(null);
      done();
    });
  });

  it('should get to /home', (done) => {
    request(origin)
    .get('/home')
    .end((err, res) => {
      expect(res).to.have.status(200);
      expect(err).to.eql(null);
      done();
    });
  });

  it('should get to /index', (done) => {
    request(origin)
    .get('/index')
    .end((err, res) => {
      expect(res).to.have.status(200);
      expect(err).to.eql(null);
      done();
    });
  });
});


describe('Token routes no token', () => {
  it('should FAIL TO get to /newCP', (done) => {
    request(origin)
    .post('/newCP')
    .end((err, res) => {
      expect(res).to.have.status(401);
      expect(err).to.eql(null);
      done();
    });
  });

  it('should FAIL TO get to /profile', (done) => {
    request(origin)
    .get('/profile')
    .end((err, res) => {
      expect(res).to.have.status(401);
      expect(err).to.eql(null);
      done();
    });
  });

  it('should FAIL TO get to /player2', (done) => {
    request(origin)
    .get('/player2')
    .end((err, res) => {
      expect(res).to.have.status(401);
      expect(err).to.eql(null);
      done();
    });
  });
});

describe('Token routes with token', () => {
  before((done) => {
    User.create({ email: 't@t.com', password: 'point123' }, (err, data) => {
      if (err) throw err;
      this.token = data.generateToken();
      done();
    });
  });

  it('should get to /newCP', (done) => {
    request(origin)
    .post('/newCP')
    .set('token', this.token)
    .end((err, res) => {
      expect(res).to.have.status(200);
      expect(err).to.eql(null);
      done();
    });
  });

  it('should get to /profile', (done) => {
    request(origin)
    .get('/profile')
    .set('token', this.token)
    .end((err, res) => {
      expect(res).to.have.status(200);
      expect(err).to.eql(null);
      done();
    });
  });

  it('should get to /player2', (done) => {
    request(origin)
    .get('/player2')
    .set('token', this.token)
    .end((err, res) => {
      expect(res).to.have.status(200);
      expect(err).to.eql(null);
      done();
    });
  });
});

server.fake = null;
