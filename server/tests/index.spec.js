import chai from 'chai';
import chaiHTTP from 'chai-http';

import server from '../index';
import { baseUrl } from './testData';

const should = chai.should();
chai.use(chaiHTTP);

// Tests the entrypoint of the server

describe('/GET server', () => {
  it("it should return an object with property message:'welcome'", (done) => {
    const exp = { msg: 'welcome' };
    chai
      .request(server)
      .get(baseUrl)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('error', null, 'expected error to be null');
        res.body.should.have
          .property('message')
          .eql(exp.msg, `expected message property to be '${exp.msg}'`);
        done();
      });
  });
  it('it should return an object with property error', (done) => {
    chai
      .request(server)
      .get(`${baseUrl}/unknown`)
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.be.a('object');
        res.body.should.have.property('error');
        res.body.error.should.have.property(
          'name',
          'UrlError',
          'expected error name to be UrlError',
        );
        res.body.error.should.have.property('message').contains('invalid url');
        done();
      });
  });
});
