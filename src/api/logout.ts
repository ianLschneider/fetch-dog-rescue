export default async function unauthorizeUser(): Promise<boolean | null>{
    try {

        const response = await fetch('https://frontend-take-home-service.fetch.com/auth/logout', {    
            method: "POST",
            credentials: 'include',
            headers: {
                "Content-Type": "application/json",
            }
        })

        const loginResult = response

        return  loginResult.ok 

    } catch (error) {
        console.log(error)
        return null
    }
}