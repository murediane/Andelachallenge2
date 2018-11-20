// write your tests down here
import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../../server';
import { myfakeData1 } from '../testData';
import { myfakeData2 } from '../testData';

const should = chai.should();

chai.use(chaiHttp);
describe('/GET parcels', () => {
  it('should get all the parcels', done => {
    chai
      .request(server)
      .get('/api/V1/parcels')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('array').length(3);

        done();
      });
  });
});
describe('POST parcels', () => {
  it(' it should return a valid object', done => {
    chai
      .request(server)
      .post('/api/v1/parcels')
      .send(myfakeData1)
      .end((err, res) => {
        res.body.should.be.a('object');
        res.body.should.have
          .property('usr_id')
          .be.a('number', 'Expected user_id to be a number');
        res.body.should.have.property('category');
        res.body.category.should.be.a(
          'string',
          'Expected the category to be a string',
        );
        res.body.should.have.property('price');
        res.body.price.should.be.a('number', 'Expected price to be a number');
        res.body.should.have.property('pickuploc');
        res.body.pickuploc.should.be.a(
          'string',
          'Expected the pickuploc to be a string',
        );
        res.body.should.have.property('destination');
        res.body.destination.should.be.a(
          'string',
          'Expected the destination to be a string',
        );
        res.body.should.have.property('presentlocation');
        res.body.presentlocation.should.be.a(
          'string',
          'Expected the presentlocation to be a string',
        );
        res.body.should.have.property('receiver');
        res.body.receiver.should.be.a(
          'string',
          'Expected the receiver to be a string',
        );
        res.body.should.have.property('re_email');
        res.body.re_email.should.be.a(
          'string',
          'Expected the re_email to be a string',
        );
        res.body.should.have.property('re_phoneno');
        res.body.re_phoneno.should.be.a(
          'string',
          'Expected the re_phoneno to be a string',
        );
        res.body.should.have.property('status');
        res.body.status.should.be.a('string', 'Expected the status to be a string');
        done();
      });
  });
});
describe('GET parcels/: id parcel', () => {
  it('should display all parcels of a specific id', () => {
    chai
      .request(server)
      .get('/api/v1/parcels/' + myfakeData2.id)
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.a('object');
        res.body.should.have.property('id');
      });
  });
  it('should not display a parcel with an invalid parcel id ', () => {
    chai
      .request(server)
      .get('/api/v1/parcels/invalid')
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property(
          'message',
          'invalid id',
          'the id should be a number and be existing in database',
        );
      });
  });
});
describe('GET parcels/: id user', () => {
  it('should display all parcels of a specific user', () => {
    chai
      .request(server)
      .get(`/api/v1/users/${myfakeData2.usr_id}/parcels`)
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.a('object');
        res.body.should.have.property('usr_id');
      });
  });
  it('should display all parcels of a specific user', () => {
    chai
      .request(server)
      .get('/api/v1/users/invalid/parcels')
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property(
          'message',
          'invalid user_id',
          'the  user id should be a number and be existing in database',
        );
      });
  });
});
describe('PUT parcels/:id parcel /cancel', () => {
  it('should cancel parcel with the given id', () => {
    chai
      .request(server)
      .put(`/api/v1/parcels/${myfakeData2.id}/cancel`)
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.a('object');
        // res.body.should.have.property('');
      });
  });

  it('should cancel parcel with the given id', () => {
    chai
      .request(server)
      .put(`/api/v1/parcels/stuyi/cancel`)
      .end((err, res) => {
        res.should.have.status(400);
        res.should.be.a('object');
        res.body.should.have.property(
          'message',
          'invalid id',
          'expected message to be invalid id',
        );
        // res.body.should.have.property('');
      });
  });
});
