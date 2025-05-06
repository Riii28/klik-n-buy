type FetcherOptions = RequestInit & { timeout?: number };

export default async function fetcher<T>(
   url: string,
   options?: FetcherOptions
): Promise<T> {
   const controller = new AbortController();
   const timeout = options?.timeout || 5000;
   const timeoutId = setTimeout(() => controller.abort(), timeout);

   try {
      const response: Response = await fetch(url, {
         ...options,
         signal: controller.signal,
      });

      if (!response.ok) {
         throw new Error(response.statusText);
      }
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
