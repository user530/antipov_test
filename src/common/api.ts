export const submitRegistration = async (formData: { [key: string]: string }) => {
    console.log('FORM - SUBMIT REGISTRATION FORM!');
    console.log(formData);
    const result = await fetcher('https://reqres.in/api/register', formData);

    // Throw error for the form context to handle
    if (!result.success)
        throw new Error(result.error)

    // SET LOGIN DATA?
    console.log('SUBMIT RESULT'); console.log(result.data);
}

export const submitSignup = async (formData: { [key: string]: string }) => {
    console.log('FORM - SUBMIT SIGNUP FORM!');
    console.log(formData);
    const result = await fetcher('https://reqres.in/api/login', formData);

    // Throw error for the form context to handle
    if (!result.success)
        throw new Error(result.error)

    // SET LOGIN DATA
    console.log('SUBMIT RESULT'); console.log(result.data);
}

const fetcher = makeFetcher();

type FetchResult = { success: true, data: any } | { success: false, error: string }

function makeFetcher() {
    // Prepare closure data that will be used across all fetch calls 
    let abortController = new AbortController();
    const cache = new Map<string, FetchResult>();

    return async (url: string, requestBody?: any): Promise<FetchResult> => {

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
                throw new Error(`Fetch failed! Error ${response.status}: ${response.statusText}`);

            const responseData = await response.json();
            const result = { success: true as const, data: responseData };

            // Cache the result
            cache.set(cacheKey, result);

            return result;
        } catch (error) {
            const err = error instanceof Error ? error : { name: 'Undefined fetch error', message: 'Something went wrong during fetch...' }
            // Only log abort errors
            if (err.name === 'AbortError') {
                console.error('Fetch has been aborted!');
                return { success: false, error: err.message }
            }
            else
                return { success: false, error: err.message }
        }
    }
}