const { Schema, model } = require('mongoose');

const filled = [
	(val) => {
		const string = val.trim();
		return (string.length > 0 && string.length < 50);
	},
	'{PATH} field must be between 1 and 50'
];

const teamSchema = Schema({
	name: {
		type: String,
		required: true,
		validate: filled
	}
});

module.exports = model('TeamMember', teamSchema, 'team');
