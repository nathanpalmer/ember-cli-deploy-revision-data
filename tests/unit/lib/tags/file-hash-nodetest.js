'use strict';

var assert = require('ember-cli/tests/helpers/assert');

describe('the file-hash key generator', function() {
  var KeyGenerator;

  before(function() {
    KeyGenerator = require('../../../../lib/key-generators/file-hash');
  });

  describe('#generate', function() {
    it ('generates a hash of the supplied index file', function() {
      var subject = new KeyGenerator({
        context: {
          distDir: 'tests/fixtures',
          distFiles: ['index.html'],
        },
        config: {
          filePattern: 'index.html'
        }
      });

      return assert.isFulfilled(subject.generate())
        .then(function(hash) {
          assert.equal(hash, 'ae1569f72495012cd5e8588e0f2f5d49');
        });
    });

    it('rejects when the filePattern doesn\'t exist in distFiles', function() {
      var subject = new KeyGenerator({
        context: {
          distDir: 'tests/fixtures',
          distFiles: ['index.html']
        },
        config: {
          filePattern: 'some-file-that-does-not-exist'
        }
      });

      return assert.isRejected(subject.generate())
        .then(function(error) {
          assert.equal(error, '`some-file-that-does-not-exist` does not exist in distDir `tests/fixtures`');
        });
    });

    it('rejects when the file doesn\'t exist', function() {
      var subject = new KeyGenerator({
        context: {
          distDir: 'tests/fixtures',
          distFiles: ['index.xxx']
        },
        config: {
          filePattern: 'index.xxx'
        }
      });

      return assert.isRejected(subject.generate());
    });
  });
});
