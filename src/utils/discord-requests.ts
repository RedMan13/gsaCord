import {generateUrl} from './discord-urls'
import { getContext } from 'svelte'

export type HTTPMethods = 'GET' | 'PUT' | 'POST' | 'PATCH' | 'DELETE'
export function fetchDiscord(path: string, method: HTTPMethods = 'GET', body?: any): Promise<any> {
    const token: string = getContext('token')
    return new Promise(async (resolve, reject) => {
        const res = await fetch(generateUrl(path), {
            method,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            },
            body: JSON.stringify(body)
        })
        const data = await res.json()
        if (typeof data.code === 'number') {
            reject([data.code, data.message])
            return
        }
        resolve(data)
    })
}
