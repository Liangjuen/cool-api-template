/**
 * @description 定义 winston log level
 */
export enum LOG_LEVEL {
	error,
	warn,
	info,
	http,
	debug,
	verbose,
	silly
}

/**
 * @description 定义 winston log color
 */
export enum LOG_COLOR {
	error = 'red',
	warn = 'yellow',
	info = 'green',
	http = 'blue',
	debug = 'magenta',
	verbose = 'cyan',
	silly = 'gray'
}
