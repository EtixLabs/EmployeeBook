/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/profils              ->  index
 * GET     /api/profils/:id          ->  show
 * PUT     /api/profils/:id          ->  update
 * DELETE  /api/profils/:id          ->  destroy
 */

'use strict';

var _ = require('lodash');
var Question = require('../question/question.model');
var Profil = require('./profil.model');
var lwip = require('lwip');
var fs = require('fs');
var path = require('path');

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    res.status(statusCode).send(err);
  };
}

function responseWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if (entity) {
      res.status(statusCode).json(entity);
    }
  };
}

function handleEntityNotFound(res) {
  return function(entity) {
    if (!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

function saveUpdates(updates) {
  return function(entity) {
    var updated = _.merge(entity, updates);
    return updated.saveAsync()
      .spread(function(updated) {
        return updated;
      });
  };
}

function removeEntity(res) {
  return function(entity) {
    if (entity) {
      return entity.removeAsync()
        .then(function() {
          res.status(204).end();
        });
    }
  };
}

// Gets a list of Profils
exports.index = function(req, res) {
  Profil.findAsync()
    .then(responseWithResult(res))
    .catch(handleError(res));
};

// Gets a single Profil from the DB
exports.show = function(req, res) {
  Profil.findByFriendlyId(req.params.slug)
    .populate('about.question')
    .then(handleEntityNotFound(res))
    .then(responseWithResult(res));
};

// Updates an existing Profil in the DB
exports.update = function(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  Profil.findByFriendlyId(req.params.slug)
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(responseWithResult(res))
    .catch(handleError(res));
};

// Deletes a Profil from the DB
exports.destroy = function(req, res) {
  Profil.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
};

// Upload a profile picture or cover photo
exports.upload = function(req, res) {
  if (!req.body.type || !req.body.user || !req.file) {
    res.status(400).send({
      message: 'Missing field'
    });
    return;
  }

  if (req.file.mimetype !== 'image/jpeg') {
    res.status(400).send({
      message: 'Invalid image. Only support jpeg'
    });
    return;
  }

  let user = null;
  let previousImage = null;
  let imgSize = {
    'image': [320, 320],
    'cover': [748, 300]
  }[req.body.type];

  Profil.findByIdAsync(req.body.user)
    .then(handleEntityNotFound(res))
    .then(dbUser => {
      // Save user into parent scope for easier access
      user = dbUser;

      // Process image
      return new Promise((resolve, reject) => {
        lwip.open(req.file.path, 'jpg', function (err, image) {
          if (err) {
            reject(err);
            return;
          }

          let processedImage = req.file.path + '.jpg';

          image.batch()
            .cover(imgSize[0], imgSize[1])
            .writeFile(processedImage, function (err) {
              if (err) {
                reject(err);
                return;
              }
              resolve(processedImage);
            });
        });
      });
    })
    .then(processedImage => {
      // If user already had an image, keep it to clean at the end
      if (user[req.body.type]) {
        previousImage = user[req.body.type];
      }

      // Save image name to user
      user[req.body.type] = processedImage;
      return user.saveAsync()
        .spread(function(updated) {
          return updated;
        });
    })
    .then(responseWithResult(res))
    .catch(handleError(res))
    .finally(() => {
      // Remove original images
      if (req.file) {
        fs.unlink(req.file.path, (err) => {
          // Not a big deal...
        });
      }
      if (previousImage) {
        fs.unlink(previousImage, (err) => {
          // ...
        });
      }
    });
};
