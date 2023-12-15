export enum RequestMethod {
	GET = 0,
	POST,
	PUT,
	DELETE,
	PATCH,
	ALL,
	OPTIONS,
	HEAD,
	SEARCH
}

export declare const PATH_METADATA = 'path'
export declare const METHOD_METADATA = 'method'

const defaultMetaData = {
	[PATH_METADATA]: '/',
	[METHOD_METADATA]: RequestMethod.GET
}

export const RequestMapping = (metadata = defaultMetaData) => {
	const path = metadata[PATH_METADATA]
	const method = metadata[METHOD_METADATA]
	return <T>(
		target: any,
		key: string | symbol,
		descriptor: TypedPropertyDescriptor<T>
	) => {
		console.log(target)
		console.log(key)
		console.log(target[key])
		console.log(descriptor.value)
		Reflect.defineMetadata(PATH_METADATA, path, descriptor.value)
		Reflect.defineMetadata(METHOD_METADATA, method, descriptor.value)
		return descriptor
	}
}

export const createMappingDecorator =
	(method: RequestMethod) => (path?: string) => {
		return RequestMapping({
			[PATH_METADATA]: path ? path : '',
			[METHOD_METADATA]: method
		})
	}

export const Post: (path?: string) => MethodDecorator = createMappingDecorator(
	RequestMethod.POST
)

export const Get: (path?: string) => MethodDecorator = createMappingDecorator(
	RequestMethod.GET
)

export const Delete: (path?: string) => MethodDecorator =
	createMappingDecorator(RequestMethod.DELETE)

export const Put: (path?: string) => MethodDecorator = createMappingDecorator(
	RequestMethod.PUT
)

export const Patch: (path?: string) => MethodDecorator = createMappingDecorator(
	RequestMethod.PATCH
)

export const Options: (path?: string) => MethodDecorator =
	createMappingDecorator(RequestMethod.OPTIONS)

export const Head: (path?: string) => MethodDecorator = createMappingDecorator(
	RequestMethod.HEAD
)

export const All: (path?: string) => MethodDecorator = createMappingDecorator(
	RequestMethod.ALL
)

export const Search: (path?: string) => MethodDecorator =
	createMappingDecorator(RequestMethod.SEARCH)

Post
Get
Delete
Put
Patch
Options
Head
All
Search
