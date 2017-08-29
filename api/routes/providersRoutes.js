var ObjectID = require('mongodb').ObjectID;

module.exports = function(app, db) {

   app.get('/providers', (req, res) => {
	  var filter = {};
	  /*
		var query = req.query;
		query.max_discharges = query['Total Discharges']; //Have to find the max
		query.min_discharges = query['Total Discharges']; //Have to find the min
		query.max_average_covered_charges =  query['Average Covered Charges']; //Have to find the max
		query.min_average_covered_charges = query['Average Covered Charges']; //Have to find the min
		query.max_average_medicare_payments = query['Average Medicare Payments']; //Have to find the max
		query.min_average_medicare_payments = query['Average Medicare Payments']; //Have to find the min
		query.state = query['Provider State'];
	  */
	  db.collection('inpatients').find(filter).toArray(function(err, docs) {
		if (err) {
	        res.send({'error':'An error has occurred'});
		} else {
		  res.status(200).json(docs);
		}
	  });	  
   });
   /*app.get('/providers/:id', (req, res) => {
    const id = req.params.id;
    const details = { '_id': new ObjectID(id) };
    db.collection('inpatients').findOne(details, (err, item) => {
      if (err) {
        res.send({'error':'An error has occurred'});
      } else {
        res.send(item);
      } 
    });
  });*/
  app.post('/providers', (req, res) => {
    const inpatients = { text: req.body.body, title: req.body.title };
    db.collection('inpatients').insert(inpatients, (err, result) => {
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
    const inpatients = { text: req.body.body, title: req.body.title };
    db.collection('inpatients').update(details, inpatients, (err, result) => {
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
    db.collection('inpatients').remove(details, (err, item) => {
      if (err) {
        res.send({'error':'An error has occurred'});
      } else {
        res.send('Inpatients ' + id + ' deleted!');
      } 
    });
  });
};