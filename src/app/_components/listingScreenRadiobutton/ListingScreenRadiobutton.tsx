"use client"
import React from 'react';
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

const ListingScreenRadiobutton = () => {
    const [size, setSize] = React.useState('');
    const [condition, setCondition] = React.useState('');
    const [postage, setPostage] = React.useState('');
    const [days, setDays] = React.useState('');

    const handleSizeChange = (event: SelectChangeEvent) => {
        setSize(event.target.value as string);
    };
    const handleConditonChange = (event: SelectChangeEvent) => {
        setCondition(event.target.value as string);
    };

    const handlePostageChange = (event: SelectChangeEvent) => {
        setPostage(event.target.value as string);
    }
    const handleDaysChange = (event: SelectChangeEvent) => {
        setDays(event.target.value as string);
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

                                        <FormControlLabel value="tops" className={"radioButton"} control={<Radio/>} label="トップス"/>
                                        <FormControlLabel value="denim" control={<Radio/>} label="デニム"/>
                                        <FormControlLabel value="outer" control={<Radio/>} label="アウター"/>
                                        <FormControlLabel value="shirt" control={<Radio/>} label="シャツ"/>
                                        <FormControlLabel value="longShirt" control={<Radio/>} label="長袖"/>
                                    </Box>

                                    <Box className={"radio_button_low2"}>

                                        <FormControlLabel value="T-shirt" control={<Radio/>} label="Tシャツ"/>
                                        <FormControlLabel value="perfume" control={<Radio/>} label="香水"/>
                                        <FormControlLabel value="hat" control={<Radio/>} label="帽子"/>
                                        <FormControlLabel value="shose" control={<Radio/>} label="靴"/>
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
                            value={size}
                            label="Age"
                            onChange={handleSizeChange}
                        >
                            <MenuItem value={10}>XS</MenuItem>
                            <MenuItem value={20}>S</MenuItem>
                            <MenuItem value={30}>M</MenuItem>
                            <MenuItem value={40}>L</MenuItem>
                            <MenuItem value={50}>LL</MenuItem>
                            <MenuItem value={60}>XXL</MenuItem>
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
                            value={condition}
                            label="Age"
                            onChange={handleConditonChange}
                        >
                            <MenuItem value={"new"}>新品未使用</MenuItem>
                            <MenuItem value={"nearNew"}>未使用に近い</MenuItem>
                            <MenuItem value={"used"}>使用感がある</MenuItem>

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
                        value={postage}
                        label="Age"
                        onChange={handlePostageChange}
                    >
                        <MenuItem value={"seller"}>出品者負担</MenuItem>
                        <MenuItem value={"buyer"}>購入者負担</MenuItem>

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
                        value={days}
                        label="Age"
                        onChange={handleDaysChange}
                    >
                        <MenuItem value={"1day"}>1~2日で発送</MenuItem>
                        <MenuItem value={"2day"}>2~3日で発送</MenuItem>
                        <MenuItem value={"3day"}>3~4日で発送</MenuItem>

                    </Select>
                </FormControl>
            </Box>
            {/*    ↑発送情報*/}


        </>
    )
        ;
}


export default ListingScreenRadiobutton;