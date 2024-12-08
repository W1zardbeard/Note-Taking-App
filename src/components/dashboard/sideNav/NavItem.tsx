export default function NavItem(props) {
    return (
        <div className="navItem">
            <img src={props.icon} alt="logo" />
            <h4>{props.title}</h4>
        </div>
    )
}