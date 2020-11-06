const debug = require('debug')('app:standup');
const Standup = require('../../model/standup');

module.exports = (router) => {
	// GET: the 12 newest stand-up meeting notes
	router.get('/standup', (req, res) => {
		const q = Standup.find({}).sort('createdOn').limit(12);
		q.exec((err, docs) => {
			if (err) {
				return res.status(400).json({ message: 'Cant find standups', error: err });
			}
			const standups = docs.map((doc) => {
				debug(doc);
				const hateoas = doc.toJSON();
				hateoas.links = [
					{
						description: 'Find standups from that member',
						// eslint-disable-next-line no-underscore-dangle
						url: `http://${req.hostname}:${process.env.PORT}/api/standup/${hateoas._teamMemberId}`
					},
				];
				return hateoas;
			});
			debug(standups);
			return res.status(200).json(standups);
		});
	});

	// GET: by team member
	router.get('/standup/:id', (req, res) => {
		const query = {
			_teamMemberId: req.params.id
		};
		Standup.find(query).sort('createdOn')
			.exec((err, docs) => {
				if (err) {
					return res.status(400).json({ error: 'merda' });
				}
				return res.status(200).json(docs);
			});
	});

	// POST: create a standup
	router.post('/standup', (req, res) => {
		const note = new Standup(req.body);
		const error = [];
		note.save((err, document) => {
			if (err) {
				debug(err);
				if (err.name === 'ValidationError') {
					Object.entries(err.errors).forEach((item) => {
						const key = item[0];
						const value = err.errors[key].message;
						const required = {
							key,
							value
						};
						error.push(required);
					});
					return res.status(422).json(error);
				}
				return res.status(500).json({ error: 'Sorry, couldn\'t create, contact the support team!' });
			}
			debug(error);
			return res.status(200).json(document);
		});
	});
};
