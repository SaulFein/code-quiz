require('express')().use(require('express').static(__dirname + '/build')).listen(8080, ()=>{
  console.log('live port 8080');
});
