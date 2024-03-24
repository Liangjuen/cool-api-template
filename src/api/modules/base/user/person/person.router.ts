import { RouteModule } from '@classes'
import { RequestMethod as METHOD } from '@enums'
import { Validator } from '@api/middlewares'
import { PersonService } from './person.service'
import { get, update, updatePassword } from './person.validation'
const personService = new PersonService()

export class PersonRouter extends RouteModule {
	routes() {
		return [
			{
				segment: '/',
				middlewares: [Validator.check(get), personService.get],
				method: METHOD.Get
			},
			{
				segment: '/',
				middlewares: [Validator.check(update), personService.update],
				method: METHOD.Put
			},
			{
				segment: '/password/',
				middlewares: [
					Validator.check(updatePassword),
					personService.updatePassword
				],
				method: METHOD.Post
			}
		]
	}
}
