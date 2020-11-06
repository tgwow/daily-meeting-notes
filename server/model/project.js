const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	description: { type: String, required: true },
	isActive: { type: Boolean, default: true }
});

module.exports = mongoose.model('Project', projectSchema, 'projects');
