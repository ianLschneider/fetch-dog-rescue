import { Link } from "react-router"

function BackHomeButton(){
    return (
        <Link to="/" className="align-middle">
            <span className="font-(family-name:--font-button) scale-y-175 scale-x-75 -translate-y-0.5 font-medium inline-block align-top">&lt;</span> Back Home
        </Link>
    )
}

export default BackHomeButton