type FetcherOptions = RequestInit & { timeout?: number };

export default async function fetcher<T>(
   url: string,
   options?: FetcherOptions
): Promise<T> {
   const controller = new AbortController();
   const timeout = options?.timeout || 1 * 60 * 1000;
   const timeoutId = setTimeout(() => controller.abort(), timeout);

   try {
      const response: Response = await fetch(url, {
         ...options,
         signal: controller.signal,
      });

      return (await response.json()) as T;
   } catch (err) {
      if (err instanceof DOMException && err.name === "AbortError") {
         throw new Error("request timed out");
      }
      throw err;
   } finally {
      clearTimeout(timeoutId);
   }
}
