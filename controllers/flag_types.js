/*
 * Copyright 2017 Brigham Young University
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */
'use strict';

let flagTypeData = {
    "admissions": "Admissions Flag",
    "degree": "Degree Flag",
    "diploma": "Diploma Flag",
    "library": "Library Flag",
    "n_a": "Null Flag",
    "pe": "PE Flag",
    "registration": "Registration Flag",
    "transcript": "Transcript Flag"
}

function generateFlagInstance(name) {
    let response = {}

    if (flagTypeData[name] === undefined) return {
        "validation_response": {
            "return_code": 404,
            "response": "Not Found"
        }
    };

    response.links = {
        "flag_type__info": {
            "rel": "self",
                "href": "https://api.byu.edu/domains/domain/identity/flag_types/v1/" + name,
                "method": "GET"
        },
        "flag_type__modify": {
            "rel": "flag_types__modify",
                "href": "https://api.byu.edu/domains/domain/identity/flag_types/v1/" + name,
                "method": "PUT"
        },
        "flag_type__remove": {
            "rel": "flag_types__remove",
                "href": "https://api.byu.edu/domains/domain/identity/flag_types/v1/" + name,
                "method": "DELETE"
        }
    };
    response.metadata = {
        "validation_response": {
            "return_code": 200,
            "response": "Successful"
        }
    };

    response.name = name;
    response.explanation = flagTypeData[name];

    return response;
}


// ----- Exported Endpoint Handlers -----
exports.getflag_types = function (req, res) {
  console.log("Invoked getflag_types");
  exports.getflag_types.mock(req, res);
};

exports.getflag_types.mock = function (req, res) {
  console.log("Invoked getflag_types.mock");
  res.send(req.swagger['x-mock_json'].flag_types);
};

exports.getflag_type = function (req, res) {
    console.log("Invoked getflag_type");
    // exports.getflag_type.mock(req, res);
    let response = generateFlagInstance(req.params.flag_name);
    if (response.hasOwnProperty("validation_response")) {
      res.status(response.validation_response.return_code).send(response);
    } else {
      res.send(response);
    }
};

exports.getflag_type.mock = function (req, res) {
    console.log("Invoked getflag_type.mock");
    res.send(req.swagger['x-mock_json'].flag_types.values[0]);
};

// post
exports.createflag_type = function (req, res) {
    console.log("Invoked createflag_type");
    exports.createflag_type.mock(req, res);
};

exports.createflag_type.mock = function (req, res) {
    console.log("Invoked createflag_type.mock");
    res.status(201).send(req.swagger['x-mock_json'].flag_types.values[0]);
};

//put
exports.modify_flag_type = function (req, res) {
    console.log("Invoked modify_flag_type");
    exports.modify_flag_type.mock(req, res);
};

exports.modify_flag_type.mock = function (req, res) {
    console.log("Invoked modify_flag_type.mock");
    res.send(req.swagger['x-mock_json'].flag_types.values[0]);
};

//delete
exports.delete_flag_type = function (req, res) {
    console.log("Invoked delete_flag_type");
    exports.delete_flag_type.mock(req, res);
};

exports.delete_flag_type.mock = function (req, res) {
    console.log("Invoked delete_flag_type.mock");
    res.status(204).send();
};

/*
TODO /{name}
    GET 1 file type
    PUT modify 1 file type
    DELETE 1 file type
    POST 1 file type
TODO /log?date=??? // Note place ahead of / and /{name}
    GET

 "admissions"
 "degree"
 "diploma":
 "library":
 "n_a"
 "pe"
 "registration"
 "transcript"
 */