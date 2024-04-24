import Header from "../components/Header"

function Leyout({children}) {
    return (
        <div>
            <Header></Header>
            {children}
        </div>
    )
}

export default Leyout
