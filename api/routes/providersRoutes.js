var ObjectID = require('mongodb').ObjectID;

module.exports = function(app, db) {
  app.get('/providers/:id', (req, res) => {
    const id = req.params.id;
    const details = { '_id': new ObjectID(id) };
    db.collection('providers').findOne(details, (err, item) => {
      if (err) {
        res.send({'error':'An error has occurred'});
      } else {
        res.send(item);
      } 
    });
  });

  app.post('/providers', (req, res) => {
    const provider = { text: req.body.body, title: req.body.title };
    db.collection('providers').insert(provider, (err, result) => {
      if (err) { 
        res.send({ 'error': 'An error has occurred' }); 
      } else {
        res.send(result.ops[0]);
      }
    });
  });

  app.put('/providers/:id', (req, res) => {
    const id = req.params.id;
    const details = { '_id': new ObjectID(id) };
    const provider = { text: req.body.body, title: req.body.title };
    db.collection('providers').update(details, provider, (err, result) => {
      if (err) {
          res.send({'error':'An error has occurred'});
      } else {
          res.send(provider);
      } 
    });
  });

  app.delete('/providers/:id', (req, res) => {
    const id = req.params.id;
    const details = { '_id': new ObjectID(id) };
    db.collection('providers').remove(details, (err, item) => {
      if (err) {
        res.send({'error':'An error has occurred'});
      } else {
        res.send('Provider ' + id + ' deleted!');
      } 
    });
  });
};