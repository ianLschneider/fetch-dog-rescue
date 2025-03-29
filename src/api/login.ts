import { User } from '../interfaces/User'

export default async function authorizeUser(user: User): Promise<boolean | null>{
    try {
        const response = await fetch('https://frontend-take-home-service.fetch.com/auth/login', {
            
            method: "POST",
            credentials: 'include',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(user)
        })

        const loginResult = response

        return  loginResult.ok 

    } catch (error) {
        console.log(error)
        return null
    }
}