const mongoose = require('mongoose');

const impedimentsEnum = {
	values: ['none', 'minor', 'blocking', 'severe'],
	message: 'Impediments must be one of these: none, minor, blocking or severe.'
};

const filled = [
	// function to validade, must return true to allows continue
	(val) => {
		const string = val.trim();
		return (string.length > 0);
	},
	// Custom error message
	'{PATH} must be filled'
];

const standupSchema = new mongoose.Schema({
	_teamMemberId: {
		type: mongoose.Types.ObjectId,
		ref: 'TeamMember'
	},
	teamMember: {
		type: String,
		required: true
	},
	project: {
		type: String,
		required: [true, 'Project field mustn\'t be blank']
	},
	workYesterday: {
		type: String,
		required: true,
		validate: filled
	},
	workToday: {
		type: String,
		required: true
	},
	impediment: {
		type: String,
		required: true,
		enum: impedimentsEnum
	},
	createdOn: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Standup', standupSchema, 'standups');

// Validators

// Custom Validation - method signature = validade[funcion(val, errmsg)];

// const sizeValidator = [
// 	function(val) {
// 		return (val.length > 0 && val.length < 50)
// 	},
// 	'{PATH} must be 10 charcter at most'
// ];

// firstName: {
// 	type: String,
// 	required: true,
// 	validate: sizeValidator
// };

// Setting requiride field with a error message
// standupSchema.path('project').required(true, 'Ops! Supply a project ');

// String - Match Validador Example
// const regex = /[a-zA-Z]/;
// name : {
// 	type: String,
// 	required: true,
// 	match: regex
// },

// String - Enum Validator Example
// const impedimentsEnum = ['none', 'minor', 'blocking', 'severe'];
// impediment : {
// 	type: String,
// 	required: true,
// 	enum: impedimentsEnum
// },

// Number - min and max Validators
// discount: {
// 	type: Number,
// 	min: 5,
// 	max: 10
// },

// Disable _id schema
// const noIdSchema = new mongoose.Schema({ name: String }, { _id: false });

// Schema.add()
// const example = new mongoose.Schema;

// const hasFullName = true;

// if (hasFullName) {
// 	example.add({
// 		name: {
// 			firstName: { type: String },
// 			lastName: { type: String }
// 		}
// 	});
// } else {
// 	example.add({
// 		name: { type: String }
// 	});
// }
