'use server'

export async function searchAction(formData: FormData) {
    const query: string = formData.get('query') as string

    console.log('ini hasil query', query)
}