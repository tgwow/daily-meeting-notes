const Project = require('../../model/project');

module.exports = (router) => {
	// GET: List of active projects
	router.get('/project', (req, res) => {
		Project.find({ isActive: { $eq: true } }).sort('name')
			.exec((err, docs) => {
				if (err) return res.status(500).json(err);
				return res.status(200).json(docs);
			});
	});
};
