"use client"
import React, {useState} from 'react';
import "./listingScreenRadiobutton.css"
import {
    FormControl,
    FormControlLabel,
    FormLabel,
    InputLabel,
    MenuItem,
    Radio,
    RadioGroup,
    Select,
    SelectChangeEvent
} from "@mui/material";
import Box from "@mui/material/Box";
import {productStatusType} from "@/app/(listing)/listingScreen/page";

const ListingScreenRadiobutton: React.FC<productStatusType> = ({
                                                                   onCategoryChange,
                                                                   onProductSizeChange,
                                                                   onProductConditionChange,
                                                                   onPostageBurdenChange,
                                                                   onDeliveryTimeChange
                                                               }) => {
    const [productCategory, setProductCategory] = useState([])
    console.log(productCategory)

    const [productSize, setProductSize] = useState("")
    console.log(JSON.stringify(productSize))
    const [productCondition, setProductCondition] = useState("")
    const [postageBurden, setPostageBurden] = useState("")
    const [shippingSource, setShippingSource] = useState("")
    const [deliveryTime, setDeliveryTime] = useState("")

    const handleProductSizeChange = (SizeEvent: SelectChangeEvent) => {
        setProductSize(SizeEvent.target.value as string);
    };


    const handleProductExplainCategorySet = (Categoryevent: React.FC<HTMLButtonElement>) => {
        onCategoryChange(Categoryevent)
    }

    const handleProductExplainSizeSet = (SizeEvent: React.FC<HTMLButtonElement>) => {
        setProductSize(SizeEvent)
        onProductSizeChange(productSize)
        console.log(productSize)
    }
    const handleProductExplainConditionSet = (ConditionEvent: React.FC<HTMLButtonElement>) => {

        setProductCondition(ConditionEvent)
        onProductConditionChange(ConditionEvent)
    }
    const handleProductExplainPostageBurdenSet = (PostageBurdenEvent: React.FC<HTMLButtonElement>) => {
        console.log(PostageBurdenEvent)
        setPostageBurden(PostageBurdenEvent)
        onPostageBurdenChange(PostageBurdenEvent)
    }
    const handleProductExplainDeliveryTimeSet = (DeliveryTimeEvent: React.FC<HTMLButtonElement>) => {
        console.log(DeliveryTimeEvent)
        setDeliveryTime(DeliveryTimeEvent)
        onCategoryChange(DeliveryTimeEvent)
    }



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
                                            onChange={(Categoryevent) => handleProductExplainCategorySet(Categoryevent.target.value)}
                                            value="tops" className={"radioButton"} control={<Radio/>} label="トップス"/>
                                        <FormControlLabel
                                            onChange={(Categoryevent) => handleProductExplainCategorySet(Categoryevent.target.value)}
                                            value="denim" control={<Radio/>} label="デニム"/>
                                        <FormControlLabel
                                            onChange={(Categoryevent) => handleProductExplainCategorySet(Categoryevent.target.value)}
                                            value="outer" control={<Radio/>} label="アウター"/>
                                        <FormControlLabel
                                            onChange={(Categoryevent) => handleProductExplainCategorySet(Categoryevent.target.value)}
                                            value="shirt" control={<Radio/>} label="シャツ"/>
                                        <FormControlLabel
                                            onChange={(Categoryevent) => handleProductExplainCategorySet(Categoryevent.target.value)}
                                            value="longShirt" control={<Radio/>} label="長袖"/>
                                    </Box>

                                    <Box className={"radio_button_low2"}>

                                        <FormControlLabel
                                            onChange={(Categoryevent) => handleProductExplainCategorySet(Categoryevent.target.value)}
                                            value="T-shirt" control={<Radio/>} label="Tシャツ"/>
                                        <FormControlLabel
                                            onChange={(Categoryevent) => handleProductExplainCategorySet(Categoryevent.target.value)}
                                            value="perfume" control={<Radio/>} label="香水"/>
                                        <FormControlLabel
                                            onChange={(Categoryevent) => handleProductExplainCategorySet(Categoryevent.target.value)}
                                            value="hat" control={<Radio/>} label="帽子"/>
                                        <FormControlLabel
                                            onChange={(Categoryevent) => handleProductExplainCategorySet(Categoryevent.target.value)}
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
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={productSize}
                            label="Size"
                            onChange={(SizeEvent) => handleProductExplainSizeSet(SizeEvent.target.value)}
                        >
                            <MenuItem 
                                      value={"XS"}>XS</MenuItem>
                            <MenuItem 
                                      value={"S"}>S</MenuItem>
                            <MenuItem 
                                      value={"M"}>M</MenuItem>
                            <MenuItem 
                                      value={"L"}>L</MenuItem>
                            <MenuItem 
                                      value={"LL"}>LL</MenuItem>
                            <MenuItem 
                                      value={"XXL"}>XXL</MenuItem>
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
                            id="demo-simple-select"
                            value={productCondition}
                            label="Condition"
                            onChange={(ConditionEvent) => handleProductExplainConditionSet(ConditionEvent.target.value)}
                         variant={"standard"}>
                            <MenuItem  value={"new"}>新品未使用</MenuItem>
                            <MenuItem  value={"nearNew"}>未使用に近い</MenuItem>
                            <MenuItem  value={"used"}>使用感がある</MenuItem>

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
                        id="demo-simple-select"
                        value={postageBurden}
                        label="postage"
                        onChange={(PostageBurdenEvent) => handleProductExplainPostageBurdenSet(PostageBurdenEvent.target.value)}
                    >
                        <MenuItem  value={"seller"}>出品者負担</MenuItem>
                        <MenuItem  value={"buyer"}>購入者負担</MenuItem>

                    </Select>
                </FormControl>
            </Box>
            {/*    発送情報*/}

            <Box className={"SendDays"}>

                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">発送情報</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={deliveryTime}
                        label="delivery"
                        onChange={(DeliveryTimeEvent) => handleProductExplainDeliveryTimeSet(DeliveryTimeEvent.target.value)}
                    >
                        <MenuItem　value={"1to3day"}>1~3日で発送</MenuItem>
                        <MenuItem　 value={"3to5day"}>3~5日で発送</MenuItem>
                        <MenuItem　 value={"5to7day"}>5~7日で発送</MenuItem>

                    </Select>
                </FormControl>
            </Box>
            {/*    ↑発送情報*/}


        </>
    )
        ;
}


export default ListingScreenRadiobutton;