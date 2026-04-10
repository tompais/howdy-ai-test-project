'use strict';

class HelloController {
  constructor(helloService) {
    this.helloService = helloService;
    this.getHello = this.getHello.bind(this);
  }

  getHello(req, res) {
    const message = this.helloService.getGreeting();
    res.json({ message });
  }
}

module.exports = { HelloController };
