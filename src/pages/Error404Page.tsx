import BackHomeButton from "../components/ui/BackHomeButton"

function Error404Page () {
    return (
        <main className='w-full min-w-[300px] text-center h-screen min-h-screen bg-primary'>
            <div className='flex flex-col justify-center items-center min-h-screen'>
                <h1 className='text-secondary text-9xl'>404</h1>
                <BackHomeButton />
            </div>
        </main>
    )
}

export default Error404Page