var should = require('chai').should(),
    expect = require('chai').expect,
    supertest = require('supertest'),
    api = supertest('https://reqres.in/api');

describe('requests', function () {

it('get users list should return a 200 response', function (done) {
    api.get('/users?page=2')
        .set('Accept', 'application/json')
        .expect(200, done);
});

it('get single user should return a 200 response', function (done) {
    api.get('/users/2')
        .set('Accept', 'application/json')
        .expect(200, done);
});

it('delete single user should return a 200 response', function (done) {
    api.delete('/users/2')
        .set('Accept', 'application/json')
        .expect(204, done);
});

it('get single resource should return a 200 response and have correct response body', function (done) {
    api.get('/unknown/2')
        .set('Accept', 'application/json')
        .expect(200)
        .end(function (err, res) {
            expect(res.body.data).to.have.property("id");
            expect(res.body.data.id).to.not.equal(null);
            expect(res.body.data).to.have.property("name");
            expect(res.body.data.name).to.not.equal(null);
            expect(res.body.data).to.have.property("year");
            expect(res.body.data.year).to.not.equal(null);
            expect(res.body.data).to.have.property("color");
            expect(res.body.data.color).to.not.equal(null);
            expect(res.body.data).to.have.property("pantone_value");
            expect(res.body.data.pantone_value).to.not.equal(null);
            done();
        });
});

it('post create user should return a 200 response and create the correct user', function (done) {
    api.post('/users')
        .set('Accept', 'application/json')
        .send({
            name: "morpheus",
            job: "leader"
        })
        .expect(201)
        .end(function (err, res) {
            expect(res.body).to.have.property("name");
            expect(res.body.name).to.equal("morpheus");
            expect(res.body).to.have.property("job");
            expect(res.body.job).to.equal("leader");
            expect(res.body).to.have.property("id");
            expect(res.body.id).to.not.equal(null);
            expect(res.body).to.have.property("createdAt");
            expect(res.body.createdAt).to.not.equal(null);
            done();
        });
});

it('post unsuccessful login response 400 and error msg', function (done) {
    api.post('/login')
        .set('Accept', 'application/json')
        .send({
            email: "peter@klaven"
        })
        .expect(400)
        .end(function (err, res) {
            expect(res.body).to.have.property("error");
            expect(res.body.error).to.equal('Missing password');
            done();
        });
});

});
