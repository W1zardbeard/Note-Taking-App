import SearchBar from './SearchBar';

export default function TopHeader(props){
    return(
        <div className="topHeader">
            <h1>{props.tagPage ? <span>Notes tagged:</span> : null }{props.selectedPage}</h1>

            <div>
                <SearchBar 
                    searchGetter={props.searchGetter}
                />

                <button
                    className='settingsButton'
                >
                    <img src="../src/assets/icon-settings.svg" alt="settings" />
                </button>
            </div>
        </div>
    )
}