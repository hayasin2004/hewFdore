"use client"
import {FormControl, FormControlLabel, FormLabel, Radio, RadioGroup} from "@mui/material";
import Box from "@mui/material/Box";
import searchProductCategoryServerAction from "@/app/utils/search/(product)/searchProductCategory";
import likeListProductCategory from "@/app/utils/search/(product)/likeListProductCategory";
import confirmUser from "@/app/utils/user/confirmUser";
import React, {ChangeEvent, useEffect, useState} from "react";
import {UserType} from "@/app/api/user/catchUser/route";

const SearchProductCategory = () => {
    const token = localStorage.getItem("token")
    const [loginNowUser, setLoginNowUser] = useState<UserType | null>(null)
    const [searchKeyWord, setSearchKeyWord] = useState<string | null>("")
    const [productCategory, setProductCategory] = useState<string| null>(null)
    console.log(productCategory)

    useEffect(() => {
        const loginUser = async () => {
            const response = await confirmUser(token!)
            const responseParse = JSON.parse(response!)
            setLoginNowUser(responseParse)
        }
        loginUser()
    }, [token]);

    const handleProductSearch = async () => {
        const searchProductCategory = await searchProductCategoryServerAction(productCategory);
        console.log(searchProductCategory)
    }
    const handleSaveProductSearch = async () => {
        const searchProductCategory = await likeListProductCategory(loginNowUser?._id , productCategory);
        console.log(searchProductCategory)
    }

    const handleProductExplainCategorySet = (Categoryevent: string) => {
        setProductCategory(Categoryevent)
    }


    console.log(searchKeyWord)
    return (
        <>
            <FormControl>
                <FormLabel id="demo-radio-buttons-group-label"></FormLabel>
                <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    defaultValue="tops"
                    name="radio-buttons-group">
                    <Box className={"radio_button_flex"}>

                        <Box className={"radio_button_low1"}>

                            <FormControlLabel
                                 onChange={(e: React.SyntheticEvent<Element, Event>) => handleProductExplainCategorySet((e.currentTarget as HTMLInputElement).value)}
                                value="tops" className={"radioButton"} control={<Radio/>} label="トップス"/>
                            <FormControlLabel
                                onChange={(e: React.SyntheticEvent<Element, Event>) => handleProductExplainCategorySet((e.currentTarget as HTMLInputElement).value)}
                                value="bottom" control={<Radio/>} label="ボトム"/>
                            <FormControlLabel
                                onChange={(e: React.SyntheticEvent<Element, Event>) => handleProductExplainCategorySet((e.currentTarget as HTMLInputElement).value)}
                                value="outer" control={<Radio/>} label="アウター"/>
                            <FormControlLabel
                                onChange={(e: React.SyntheticEvent<Element, Event>) => handleProductExplainCategorySet((e.currentTarget as HTMLInputElement).value)}
                                value="shirt" control={<Radio/>} label="シャツ"/>
                            <FormControlLabel
                                onChange={(e: React.SyntheticEvent<Element, Event>) => handleProductExplainCategorySet((e.currentTarget as HTMLInputElement).value)}
                                value="longShirt" control={<Radio/>} label="長袖"/>
                        </Box>

                        <Box className={"radio_button_low2"}>

                            <FormControlLabel
                                onChange={(e: React.SyntheticEvent<Element, Event>) => handleProductExplainCategorySet((e.currentTarget as HTMLInputElement).value)}
                                value="T-shirt" control={<Radio/>} label="Tシャツ"/>
                            <FormControlLabel
                                onChange={(e: React.SyntheticEvent<Element, Event>) => handleProductExplainCategorySet((e.currentTarget as HTMLInputElement).value)}
                                value="perfume" control={<Radio/>} label="香水"/>
                            <FormControlLabel
                                onChange={(e: React.SyntheticEvent<Element, Event>) => handleProductExplainCategorySet((e.currentTarget as HTMLInputElement).value)}
                                value="hat" control={<Radio/>} label="帽子"/>
                            <FormControlLabel
                                onChange={(e: React.SyntheticEvent<Element, Event>) => handleProductExplainCategorySet((e.currentTarget as HTMLInputElement).value)}
                                value="shose" control={<Radio/>} label="靴"/>
                        </Box>

                    </Box>
                </RadioGroup>
            </FormControl>

            <label htmlFor="searchKeyWord">
                <input type="text" onChange={(e :React.ChangeEvent<HTMLInputElement>) => setSearchKeyWord(e.target.value)} value={searchKeyWord!}/>
                <button type={"submit"} onClick={handleProductSearch}>カテゴリー検索</button>
                <button type={"submit"} onClick={handleSaveProductSearch}>このカテゴリー保存する</button>
            </label>
            {/*{searchProductResult?.map((item) => (*/}
            {/*    <ul key={item._id}>*/}
            {/*        <li>*/}
            {/*            商品名 : {item.productName}*/}
            {/*        </li>*/}
            {/*    </ul>*/}
            {/*))}*/}

        </>
    );
};

export default SearchProductCategory;