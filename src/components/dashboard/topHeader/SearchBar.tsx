import {useState} from 'react';


export default function SearchBar(props){

    const [search, setSearch] = useState("");

    function handleChange(e: any){
        setSearch(e.target.value);
        props.searchGetter(e.target.value);
    }

    return(
        <div className="searchBar">
             <img src="src/assets/icon-search.svg" alt="search"  />
                <input 
                    value={search}
                    onChange={handleChange}
                    type="text" 
                    placeholder="Search by title, content or tags..." 
                />
        </div>
    )
}