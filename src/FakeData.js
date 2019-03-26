let _dueDate = new Date();
_dueDate.setDate(_dueDate.getDate() + 7);
const dueDate = _dueDate.toISOString();

const data = [
	{
		categoryId: '_today',
		starred: false,
		completed: false,
		dueDate,
		name: 'Take out garbage',
		description: 'Smells terrible'
	},
	{
		categoryId: '_today',
		starred: false,
		completed: false,
		dueDate,
		name: 'Cook Dinner',
		description: ''
	},
	{
		categoryId: '_today',
		starred: false,
		completed: false,
		dueDate: null,
		name: 'Update Linkedin',
		description: 'Go to linkedin and update it'
	},
	{
		categoryId: '_life',
		starred: true,
		completed: false,
		dueDate: null,
		name: 'Help people on react discord',
		description: 'For the love of React'
	},
	{
		categoryId: '_life',
		starred: true,
		completed: false,
		dueDate: '2019-03-01T12:29:34.349Z',
		name: 'Apply for Job',
		description: ''
	},
	{
		categoryId: '_life',
		starred: true,
		completed: false,
		dueDate: '2019-05-01T12:29:34.349Z',
		name: 'Get New Job',
		description: ''
	}
].map((task, id) => {
	let newTask = { ...task, id };
	return newTask;
});

export const getTask = data;

export const getCategories = [
	{ id: '_life', displayName: 'Life' },
	{ id: '_today', displayName: 'Today' }
];
