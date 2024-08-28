import React from 'react';
import  "./Heder.css"
const Header = () => {

    return (
        <header>
            <div className="nav">
                <div className="title">
                    <h1>
                        F'dore
                    </h1>
                </div>
                <div className="bar">
                    <ul>
                        <li>
                            Category
                        </li>
                        <span id="short_line"><br/>
                    <p id="short_text">
                        探す
                    </p>
                    </span>
                        <li>
                            Search 〇
                        </li>
                        <span className="long_line"></span>
                        <li id="uru_ul">
                            Sell
                            <span id="uru"></span>
                        <br/>売る

                        </li>
                        <span className="long_line"></span>

                        <li>
                            ○
                        </li>
                        <li>
                            User name
                        </li>
                        <li>
                            ▲
                        </li>
                    </ul>
                </div>
            </div>
            <span className="under_bar"></span>
        </header>

    );
}


export default Header;