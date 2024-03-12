/**
 * 文件处理引擎
 */
export abstract class CoolFileEngine {
	abstract upload<T extends Record<string, unknown>>(ctx?: T): Promise<unknown>
}
