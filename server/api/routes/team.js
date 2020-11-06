const Team = require('../../model/team');

module.exports = (router) => {
	// GET: List of active projects
	router.get('/team', (req, res) => {
		Team.find().sort('name')
			.exec((err, docs) => {
				if (err) {
					return res.status(400).json({ message: 'Can\'t find team members ', error: err });
				}
				return res.status(200).json(docs);
			});
	});
};
