'use strict';

exports.user = function* () {
  this.body = {
    url: this.url,
    name: this.query.name,
  };
};
