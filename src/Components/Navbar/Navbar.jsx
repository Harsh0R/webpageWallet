import { icon } from "../../assets/imgs"
import Style from "./Navbar.module.css"

const Navbar = () => {
    return (
        <>
            <div className={Style.nav}>
                <img className={Style.icon} src={icon} alt="" width={50} />
                <h2 className={Style.nameI}>
                    WEBPAGE WALLET
                </h2>
            </div>
        </>
    )
}

export default Navbar