const express = require('express');

const router = express.Router();


router.get('/', (req, res) => {
	const hateoas = {};
	hateoas.links = {};
	hateoas.links.projects = `http://${req.host}:${process.env.PORT}/api/project`;
	hateoas.links.standups = `http://${req.host}:${process.env.PORT}/api/standup`;
	hateoas.links.team = `http://${req.host}:${process.env.PORT}/api/team`;

	return res.json(hateoas);
});
require('./routes/standup')(router);
require('./routes/projects')(router);
require('./routes/team')(router);

module.exports = router;
