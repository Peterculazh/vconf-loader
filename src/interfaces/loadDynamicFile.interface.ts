export interface ILoadDynamicFile<T> {
    filePath: string,
    fileName: string,
    exportVariable?: 'default' | string,
    defaultConfig?: T,
    absolutePath?: boolean,
    extension?: string,
}
