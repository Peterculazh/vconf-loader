import path from 'path';

export class CallerLocation {

    getCallerFilePath(): string {
        const callSite = this.getCaller();

        const filePath = callSite.getFileName();

        if (!filePath) {
            throw new Error('Unable to get relative path. Pass absolute path to filePath field and set `absolutePath: true`')
        }

        const callerFolderPath = path.parse(filePath).dir;

        return callerFolderPath;
    }

    private getCaller() {
        const stack = this.getStack();

        stack.shift();
        stack.shift();

        return stack[1];
    }

    private getStack() {
        const origPrepareStackTrace = Error.prepareStackTrace;

        Error.prepareStackTrace = (_, stack) => stack;
        const err = new Error();
        const stack = err.stack as unknown as NodeJS.CallSite[];
        Error.prepareStackTrace = origPrepareStackTrace

        // Remove superfluous function call on stack
        stack.shift();

        return stack;
    }
}
