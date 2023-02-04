let os=require('os');
console.log('platform you are using: '+os.platform());
console.log('arch of the system'+os.arch());
console.log('System uptime since'+os.uptime());
console.log('core of the system'+os.cpus().length);