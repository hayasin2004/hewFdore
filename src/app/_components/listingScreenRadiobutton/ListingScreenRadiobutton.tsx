"use client"
import React, {useState} from 'react';
import "./listingScreenRadiobutton.css"
import {
    FormControl,
    FormControlLabel,
    FormLabel,
    RadioGroup,
    Box,
    Select,
    MenuItem,
    TextField, Radio, InputLabel
} from "@mui/material";
import {productStatusType} from "@/app/(listing)/listingScreen/page";

const ListingScreenRadiobutton: React.FC<productStatusType> = ({
                                                                   onCategoryChange,
                                                                   onProductSizeChange,
                                                                   onProductConditionChange,
                                                                   onPostageBurdenChange,
                                                                   onDeliveryTimeChange,
                                                                   onShippingSource
                                                               }) => {
    const [productCategory, setProductCategory] = useState<string>("");
    const [productSize, setProductSize] = useState<string | null>("");
    const [productCondition, setProductCondition] = useState<string | null>(null);
    const [postageBurden, setPostageBurden] = useState<string | null>(null);
    const [deliveryTime, setDeliveryTime] = useState<string | null>(null);
    const [shippingAreaText, setShippingAreaText] = useState<string | null>(null);
    console.log(productCategory , shippingAreaText)
    const handleProductExplainCategorySet = (Categoryevent:string ) => {
        setProductCategory(Categoryevent);
        if (onCategoryChange) onCategoryChange(Categoryevent);
    }

    const handleProductExplainSizeSet = (SizeEvent: string) => {
        setProductSize(SizeEvent);
        if (onProductSizeChange) onProductSizeChange(SizeEvent);
    }

    const handleProductExplainConditionSet = (ConditionEvent: string) => {
        setProductCondition(ConditionEvent);
        if (onProductConditionChange) onProductConditionChange(ConditionEvent);
    }

    const handleProductExplainPostageBurdenSet = (PostageBurdenEvent: string) => {
        setPostageBurden(PostageBurdenEvent);
        if (onPostageBurdenChange) onPostageBurdenChange(PostageBurdenEvent);
    }

    const handleProductExplainDeliveryTimeSet = (DeliveryTimeEvent: string) => {
        setDeliveryTime(DeliveryTimeEvent);
        if (onDeliveryTimeChange) onDeliveryTimeChange(DeliveryTimeEvent);
    }

    const handleProductExplainShippingSourceSet = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = event.target.value;
        setShippingAreaText(newValue);
        if (onShippingSource) onShippingSource(newValue);
    };

    return (
        <>
            {/*カテゴリー選択*/}
            <Box className={"radio"}>
                <Box className={"radio_button"}>
                    <Box className={"left_radio_button"}>
                        <FormControl>
                            <FormLabel id="demo-radio-buttons-group-label"></FormLabel>
                            <RadioGroup
                                aria-labelledby="demo-radio-buttons-group-label"
                                    defaultValue="tops"
                                name="radio-buttons-group">
                                <Box className={"radio_button_flex"}>
                                    <Box className={"radio_button_low1"}>
                                        <FormControlLabel
                                            onChange={(e  :React.SyntheticEvent<Element , Event> ) => {
                                                const target = e.target as HTMLInputElement
                                                handleProductExplainCategorySet(target.value)
                                            }}
                                            value="tops" className={"radioButton"} control={<Radio/>} label="トップス"/>
                                        <FormControlLabel
                                            onChange={(e) => handleProductExplainCategorySet(e.target.value)}
                                            value="denim" control={<Radio/>} label="デニム"/>
                                        <FormControlLabel
                                            onChange={(e) => handleProductExplainCategorySet(e.target.value)}
                                            value="outer" control={<Radio/>} label="アウター"/>
                                        <FormControlLabel
                                            onChange={(e) => handleProductExplainCategorySet(e.target.value)}
                                            value="shirt" control={<Radio/>} label="シャツ"/>
                                        <FormControlLabel
                                            onChange={(e) => handleProductExplainCategorySet(e.target.value)}
                                            value="longShirt" control={<Radio/>} label="長袖"/>
                                    </Box>
                                    <Box className={"radio_button_low2"}>
                                        <FormControlLabel
                                            onChange={(e) => handleProductExplainCategorySet(e.target.value)}
                                            value="T-shirt" control={<Radio/>} label="Tシャツ"/>
                                        <FormControlLabel
                                            onChange={(e) => handleProductExplainCategorySet(e.target.value)}
                                            value="perfume" control={<Radio/>} label="香水"/>
                                        <FormControlLabel
                                            onChange={(e) => handleProductExplainCategorySet(e.target.value)}
                                            value="hat" control={<Radio/>} label="帽子"/>
                                        <FormControlLabel
                                            onChange={(e) => handleProductExplainCategorySet(e.target.value)}
                                            value="shose" control={<Radio/>} label="靴"/>
                                    </Box>
                                </Box>
                            </RadioGroup>
                        </FormControl>
                    </Box>
                </Box>
            </Box>
            {/*    ↑カテゴリー選択ボタン終わり*/}

            <Box className={"Size_Situation"}>
                {/*    サイズ選択*/}
                <Box className={"Sizebutton"}>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">サイズ</InputLabel>
                        <Select
                            variant={'outlined'}
                            labelId="demo-simple-select-label"
                            id="outlined-basic"
                            value={productSize || ""}
                            label="Condition"
                            onChange={(e) => handleProductExplainSizeSet(e.target.value)}
                        >
                            <MenuItem value={"XS"}>XS</MenuItem>
                            <MenuItem value={"S"}>S</MenuItem>
                            <MenuItem value={"M"}>M</MenuItem>
                            <MenuItem value={"L"}>L</MenuItem>
                            <MenuItem value={"LL"}>LL</MenuItem>
                            <MenuItem value={"XL"}>XXL</MenuItem>
                        </Select>
                    </FormControl>
                </Box>
                {/*    ↑サイズ選択終わり*/}

                {/*    商品状態*/}
                <Box className={"Situation"}>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">商品状態</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            variant={'outlined'}
                            id="outlined-basic"
                            value={productCondition || ""}
                            label="Condition"
                            onChange={(e) => handleProductExplainConditionSet(e.target.value)}
                        >
                            <MenuItem value={"新品未使用"}>新品未使用</MenuItem>
                            <MenuItem value={"未使用に近い"}>未使用に近い</MenuItem>
                            <MenuItem value={"多少の使用感がある"}>多少の使用感がある</MenuItem>
                            <MenuItem value={"使用感がある"}>使用感がある</MenuItem>
                        </Select>
                    </FormControl>
                </Box>
                {/*    ↑商品状態*/}
            </Box>
            {/*送料*/}
            <Box className={"SendDays"}>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">送料情報</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="outlined-basic"
                        variant={'outlined'}
                        value={postageBurden || ""}
                        label="postage"
                        onChange={(e) => handleProductExplainPostageBurdenSet(e.target.value)}
                    >
                        <MenuItem value={"出品者"}>出品者負担</MenuItem>
                        <MenuItem value={"購入者"}>購入者負担</MenuItem>
                    </Select>
                </FormControl>
            </Box>
            {/*    発送情報*/}
            <Box className={"SendDays"}>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">発送日時</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="outlined-basic"
                        variant={'outlined'}
                        value={deliveryTime || ""}
                        label="delivery"
                        onChange={(e) => handleProductExplainDeliveryTimeSet(e.target.value)}
                    >
                        <MenuItem value={"1日から3日"}>1~3日で発送</MenuItem>
                        <MenuItem value={"3日から5日"}>3~5日で発送</MenuItem>
                        <MenuItem value={"5日から7日"}>5~7日で発送</MenuItem>
                    </Select>
                </FormControl>
                <Box className={"shippingArea"}>
                    <TextField fullWidth
                               onChange={handleProductExplainShippingSourceSet}
                               id="outlined-basic" label="発送地域"
                               variant="outlined"/>
                </Box>
            </Box>
            {/*    ↑発送情報*/}
        </>
    )
};

export default ListingScreenRadiobutton;
