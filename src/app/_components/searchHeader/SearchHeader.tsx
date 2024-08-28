import React from 'react';
import "./searchHeader.css"

const SearchHeader = () => {

    return (
        <>
            <header>
                <div className="nav">
                    <div className="title">
                        <h1>
                            F'dore
                        </h1>
                    </div>
                    <div className="bar">


                        <p>Search○</p>


                        <input className="search" placeholder="お探しの商品を検索…" type="text"/>

                        <span className="long_line"></span>

                        <p>Category</p>


                    </div>
                </div>

            </header>
            <span className="under_bar"></span>
        </>
    );
}


export default SearchHeader;