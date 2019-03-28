import actions from "./action_constants_for_CobraChicken"

const flyTogether = (payload) => {
      	return {
      		type: actions.FLYTOGETHER,
      		payload
      	}
      }

const huntTogether = (payload) => {
      	return {
      		type: actions.HUNTTOGETHER,
      		payload
      	}
      }

const slayTogether = (payload) => {
      	return {
      		type: actions.SLAYTOGETHER,
      		payload
      	}
      }

export default {
	flyTogether,
	huntTogether,
	slayTogether,
}