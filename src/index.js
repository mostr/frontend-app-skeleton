var helloProvider = require('./provider');

function hello(name) {
  return helloProvider.say() + ' ' + name;
}

alert(hello('michal'));