import React from 'react';
import "./searchHeader.css"
import Link from 'next/link';

const SearchHeader = () => {

    return (
        <>
            <header>
                <div className="nav">
                    <div className="title">
                        <Link href={"/toppage"}>
                            <h1>
                                F'dore
                            </h1>
                        </Link>

                    </div>
                    <div className="bar">


                        <p>
                            <Link href={"/searchResult"}>
                                Search <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                            viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                            stroke-linecap="round" stroke-linejoin="round"
                                            className="lucide lucide-search">
                                <circle cx="11" cy="11" r="8"/>
                                <path d="m21 21-4.3-4.3"/>
                            </svg>
                            </Link>

                        </p>


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