import { useState } from 'react';
import {
    Card,
    CardContent,
    Grid,
    Collapse,
    Box
} from '@mui/material';
import './CollapsibleProductCard.css';

const CollapsibleProductCard = ({ item }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <Card
            className={`collapsible-product-card ${isOpen ? 'expanded' : 'collapsed'}`}
            onClick={() => setIsOpen(!isOpen)}
            sx={{
                width: isOpen ? '80%' : '20%',
                transition: 'width 0.3s ease-in-out',
                bgcolor: '#ddd',
                boxShadow: '6px 7px #aaa',
                borderRadius: '10px',
                margin: '10px',
                cursor: 'pointer'
            }}
        >
            <Collapse in={!isOpen} timeout="auto">
                <CardContent>
                    <p className="collapsed-image">item.いめーじ</p>
                    <p className="explanation">商品説明 : {item.productDesc}</p>
                    <p className="explanation">出品者名 : {item.productName}</p>
                    <p className="price">商品価格 : {Number(item.productPrice).toLocaleString()}円</p>
                </CardContent>
            </Collapse>

            <Collapse className={"testtt"} in={isOpen} timeout="auto">
                <CardContent>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <Box sx={{ height: '100%' }}>
                                <p className="expanded-image">item.いめーじ</p>
                            </Box>
                        </Grid>

                        <Grid item xs={6}>
                            <Box
                                className="expanded-content visible"
                                sx={{
                                    height: '100%',
                                    padding: 2,
                                    borderRadius: 1
                                }}
                            >
                                <p className={"expanded-Name"}>商品名</p>
                                <p className={"expanded-Genre"}>ジャンル：</p>
                                <p className={"expanded-Material"}>素材　　：</p>
                                <p className="expanded-Price">商品価格：{Number(item.productPrice).toLocaleString()}円</p>
                                <p className={"expanded-Situation"}>状態　　：</p>
                            </Box>
                        </Grid>

                        <Grid item xs={6}>
                            <Box>
                                <p>コメント</p>
                            </Box>
                        </Grid>
                    </Grid>
                </CardContent>
            </Collapse>
        </Card>
    );
};

export default CollapsibleProductCard;