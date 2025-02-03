import React from 'react';
import "./searchHeader.css"
import Link from "next/link";

const SearchHeader = () => {

    return (
        <>
            <header className="Sheader">
                <div className="Snav">
                    <div className="Stitle">
                        <Link href={"toppage"}>

                        <h1>
                            F&apos;dore
                        </h1>
                        </Link>
                    </div>
                    <div className="Sbar">


                        <p className="Sp">Search○</p>

                        <span className="searchInput">
                            <input  placeholder="お探しの商品を検索…" type="text"/>
                        </span>


                        <p className="Sp">Category</p>

                    </div>
                </div>

            </header>
            <span className="Sunder_bar"></span>
        </>
    );
}


export default SearchHeader;