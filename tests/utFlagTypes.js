/**
 *  @license
 *    Copyright 2016 Brigham Young University
 *
 *    Licensed under the Apache License, Version 2.0 (the "License");
 *    you may not use this file except in compliance with the License.
 *    You may obtain a copy of the License at
 *
 *        http://www.apache.org/licenses/LICENSE-2.0
 *
 *    Unless required by applicable law or agreed to in writing, software
 *    distributed under the License is distributed on an "AS IS" BASIS,
 *    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *    See the License for the specific language governing permissions and
 *    limitations under the License.
 **/
'use strict';
const expect            = require('chai').expect;
const byuApi            = require('node-byuapi-framework');
const ut                = require('./testUtil.js');


// ----- University Applications API Unit Tests -----
describe('API Flag Type Unit Tests', function () {
  // ----- Set up the local test server -----
  let api;
  const config = {
    controllers: './controllers',
    swagger: './swagger.json',
    ignoreBasePath: true,
    development: true
  };
  before(() => {
    api = byuApi.server(config);
  });
  afterEach(() => console.log('\n'));


  // ----- API Root -----
  it("GET / 200", () => {
    return api.request({method: 'GET', path: '/'})
      .then(res => { ut.testMockResponseSuccess(res, 200); });
  });

  it("POST /  201", () => {
    return api.request({
      method: 'POST', path: '/',
      body: {
          "name": "HOLD"
      }
    })
      .then(res => {
        expect(res.statusCode).to.equal(201);
      });
  });

    it("DELETE /hold  204", () => {
        return api.request({
            method: 'DELETE', path: '/hold'
        })
            .then(res => {
                expect(res.statusCode).to.equal(204);
            });
    });

  it("GET /hold 404", () => {
      return api.request({method: 'GET', path: '/hold'})
          .then(res => {
              ut.testResponseError(res, 404);
          });
  });
    it("GET /degree 200", () => {
        return api.request({method: 'GET', path: '/degree'})
            .then(res => {
                ut.testMockResponseSuccess(res, 200);
                let body = JSON.parse(res.body);
                expect(body.name).to.equal("degree");
            });
    });

  it("PUT /hold  200", () => {
      return api.request({
          method: 'PUT', path: '/hold',
          body: {
              "name": "HOLD",
              "explanation": "country divided into 2"
          }
      })
          .then(res => {
              expect(res.statusCode).to.equal(200);
          });
  });
});
