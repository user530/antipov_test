import { CustomError } from '../common/types';
type FetchResult<T> = { success: true, data: T } | { success: false, error: string, status: number }

export function makeFetcher<T = never>() {
    // Prepare closure data that will be used across all fetch calls 
    let abortController = new AbortController();
    const cache = new Map<string, FetchResult<T>>();

    return async (url: string, requestBody?: any): Promise<FetchResult<T>> => {

        const cacheKey = url + JSON.stringify(requestBody);

        if (cache.has(cacheKey))
            return cache.get(cacheKey)!;

        // Abort previous fetch call and prepare new one
        abortController.abort();
        abortController = new AbortController();

        // Fetch
        try {
            const response = await fetch(url, {
                method: requestBody ? 'POST' : 'GET',
                headers: requestBody ? { "Content-Type": "application/json" } : undefined,
                body: requestBody ? JSON.stringify(requestBody) : undefined,
                signal: abortController.signal,
            });

            if (!response.ok)
                throw new CustomError(`Fetch failed: ${(await response.json()).error || 'Unrecongnized error'}`, response.status);

            const responseData: T = await response.json();
            const result = { success: true as const, data: responseData };

            // Cache the result
            cache.set(cacheKey, result);

            return result;
        } catch (error) {
            const err = error instanceof CustomError
                ? error
                : { name: 'Undefined fetch error', message: 'Something went wrong during fetch...', status: 500 };

            return { success: false, error: err.message, status: err.status }
        }
    }
}