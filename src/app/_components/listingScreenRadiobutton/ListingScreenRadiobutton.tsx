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
    const [age, setAge] = React.useState('');

    const handleChange = (event: SelectChangeEvent) => {
        setAge(event.target.value as string);
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

                                        <FormControlLabel value="tops" control={<Radio/>} label="トップス"/>
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
                            value={age}
                            label="Age"
                            onChange={handleChange}
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
                            value={age}
                            label="Age"
                            onChange={handleChange}
                        >
                            <MenuItem value={10}>新品未使用</MenuItem>
                            <MenuItem value={20}>未使用に近い</MenuItem>
                            <MenuItem value={30}>使用感がある</MenuItem>

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
                        value={age}
                        label="Age"
                        onChange={handleChange}
                    >
                        <MenuItem value={10}>出品者負担</MenuItem>
                        <MenuItem value={20}>購入者負担</MenuItem>

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
                        value={age}
                        label="Age"
                        onChange={handleChange}
                    >
                        <MenuItem value={10}>1~2日で発送</MenuItem>
                        <MenuItem value={20}>2~3日で発送</MenuItem>
                        <MenuItem value={30}>3~4日で発送</MenuItem>

                    </Select>
                </FormControl>
            </Box>
            {/*    ↑発送情報*/}


        </>
    )
        ;
}


export default ListingScreenRadiobutton;