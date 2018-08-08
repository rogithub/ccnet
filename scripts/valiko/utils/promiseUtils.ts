class PromiseUtils {

    /**
     * Converts a value into a resolved promise.
     * @param value Parameter value for the resolved promise.
     */
    public static toPromise<T>(value: T): Promise<T> {
        const promise = new Promise<T>((resolve, reject) => {            
            resolve(value);
        });

        return promise;
    }
}


export = PromiseUtils;