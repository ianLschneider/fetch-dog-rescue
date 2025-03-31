import { Link } from "react-router"

function BackHomeButton(){
    return (
        <Link to="/" className="flex gap-x-1 align-middle">
            <span className="font-(family-name:--font-button) font-medium inline-block align-top">&lt;</span> Back Home
        </Link>
    )
}

export default BackHomeButton