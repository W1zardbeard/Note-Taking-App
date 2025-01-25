import Logo from "../../Logo"
import NavItem from "./NavItem"
import NavTag from "./NavTag"

interface Tag {
    id: string;
    name: string;
}

interface SideNavProps {
    tags: Tag[];
    getArchivedNotes: () => void,
    getAllNotes: () => void,
    confirmDeleteTag: (id: string) => void,
    filterTags: (id: string) => void
}

export default function SideNav(props: SideNavProps){


    return(
        <div className="sidenav">

            <Logo />
            <div className="navList">

                <div className="navItemContainer">
                    <NavItem
                        clickHandler={props.getAllNotes}
                        icon="../src/assets/icon-home.svg"
                        title="All notes"
                    />
                    <NavItem
                        clickHandler={props.getArchivedNotes}
                        icon="../src/assets/icon-archive.svg"
                        title="Archived notes"
                    />
                </div>

                <div className="horizontalRule"></div>

                <h4 className="navHeader">Tags</h4>

                <div className="navItemContainer">
                    {props.tags.map(({name, id}) => (
                        <NavTag
                            key={id}
                            id={id}
                            icon="../src/assets/icon-tag.svg"
                            title={name}
                            confirmDeleteTag={props.confirmDeleteTag}
                            clickHandler={props.filterTags}
                        />
                    ))}
                  
                </div>

            </div>
          
        </div>
    )
}