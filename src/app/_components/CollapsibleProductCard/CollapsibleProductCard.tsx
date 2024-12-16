import { useState, useRef } from 'react';
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
    const [isAnimating, setIsAnimating] = useState(false);
    const [isContentVisible, setIsContentVisible] = useState(false);
    const cardRef = useRef(null);

    const handleClick = () => {
        if (isAnimating) return; // アニメーション中は追加のクリックを防止

        setIsAnimating(true); // アニメーション開始

        if (isOpen) {
            setIsContentVisible(false);

            setTimeout(() => {
                setIsOpen(false);
                // アニメーション完了後に表示を戻す
                setTimeout(() => {
                    setIsAnimating(false);
                }, 50);
            }, 300);
        } else {
            setIsOpen(true);

            setTimeout(() => {
                setIsContentVisible(true);
                // アニメーション完了後に表示を戻す
                setTimeout(() => {
                    setIsAnimating(false);
                }, 50);
            }, 300);
        }
    };

    return (
        <Card
            ref={cardRef}
            className={`collapsible-product-card ${isOpen ? 'expanded' : 'collapsed'}`}
            onClick={handleClick}
            sx={{
                width: isOpen ? '80%' : '20%',
                transition: 'width 0.3s ease-in-out',
                bgcolor: '#ddd',
                boxShadow: '6px 7px #aaa',
                borderRadius: '10px',
                margin: '10px',
                cursor: 'pointer',
                zIndex: isOpen ? 10 : 1,
                opacity: isAnimating ? 0 : 1, // アニメーション中は非表示
                '& .MuiCardContent-root': {
                    padding: '0'
                }
            }}
        >
            <Collapse in={!isOpen} timeout="auto">
                <CardContent>
                    <div className="testttt">
                        <p className="collapsed-image">item.いめーじ</p>
                        <p className="product-Size">L</p>
                    </div>
                    <p className="explanation">商品説明 : {item.productDesc}</p>
                    <p className="explanation">出品者名 : {item.productName}</p>
                    <p className="price">商品価格 : {Number(item.productPrice).toLocaleString()}円</p>
                </CardContent>
            </Collapse>

            <Collapse
                className="testtt"
                in={isOpen}
                timeout="auto"
                sx={{
                    opacity: isContentVisible ? 1 : 0,
                    transition: 'opacity 0.3s ease-in-out'
                }}
            >
                <CardContent>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <Box className="expanded-box" sx={{ height: '100%' }}>
                                <p className="expanded-image">item.いめーじ</p>
                                <p className="expanded-Size">L</p>
                            </Box>
                        </Grid>

                        <Grid item xs={6}>
                            <Box
                                className={`expanded-content ${isContentVisible ? 'visible' : 'hidden'}`}
                                sx={{
                                    height: '100%',
                                    padding: 2,
                                    borderRadius: 1
                                }}
                            >
                                <p className="expanded-Name">商品名</p>
                                <p className="expanded-Genre">ジャンル：</p>
                                <p className="expanded-Material">素材　　：</p>
                                <p className="expanded-Price">商品価格：{Number(item.productPrice).toLocaleString()}円</p>
                                <p className="expanded-Situation">状態　　：</p>
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