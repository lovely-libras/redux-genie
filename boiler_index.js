
module.exports = {

	action_boiler_Rails_model : require('./store_boiler/action_boiler_Rails_model'),
	actionTypes_boiler : require('./store_boiler/constants_boiler'),
	reducer_creator : require('./store_boiler/reducer_creator'),
	combine_reducers : require('./store_boiler/combine_reducers_boiler'),
	store_reducer : require('./store_boiler/store_boiler')
}