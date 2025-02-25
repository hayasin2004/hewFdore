import React, {useState, useRef, useEffect} from 'react';
import {
    Card,
    CardContent,
    Grid,
    Collapse,
    Box
} from '@mui/material';
import './CollapsibleProductCard.css';
import Link from 'next/link';
import Image from "next/image";
import { ProductType } from '@/app/utils/product/productDetail';

interface CollapsibleProductCardProps {
    item: ProductType;
    isOpen: boolean;
    onToggle: () => void;
}

const CollapsibleProductCard = ({item, isOpen, onToggle}: CollapsibleProductCardProps) => {
    const [isAnimating, setIsAnimating] = useState(false);
    const [images, setImages] = useState<string[]>([]);
    const [mainImageChange, setMainImageChange] = useState<string>("");

    const [isContentVisible, setIsContentVisible] = useState(false);
    const cardRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        if (isOpen) {
            setIsAnimating(true);
            setTimeout(() => {
                setIsContentVisible(true);
                setTimeout(() => {
                    setIsAnimating(false);
                }, 50);
            }, 300);
        } else {
            setIsAnimating(true);
            setIsContentVisible(false);
            setTimeout(() => {
                setTimeout(() => {
                    setIsAnimating(false);
                }, 50);
            }, 300);
        }
    }, [isOpen]);

    useEffect(() => {
        setMainImageChange(item.productImage);  // メイン画像を初期化
        setImages([
            item.productImage ,
            item.productImage2 || "",
            item.productImage3 || "",
            item.productImage4 || ""
        ]);
    }, [item]);

    const handleCollapse = (event: React.MouseEvent) => {
        if (!event.target.closest('.expanded-reverse')) {
            return;
        }
        if (isAnimating) return;
        onToggle();
    };

    const handleExpand = () => {
        if (isAnimating || isOpen) return;
        onToggle();
    };
    const handleImageClick = (e: React.MouseEvent<HTMLAnchorElement>, index: number) => {
        e.preventDefault();
        setMainImageChange(images[index]);  // クリックされた画像をメイン画像に設定
    };
    return (
        <>
            <Card
                ref={cardRef}
                className={`collapsible-product-card ${isOpen ? 'expanded' : 'collapsed'}`}
                onClick={isOpen ? undefined : handleExpand}
                sx={{
                    width: isOpen ? '84%' : '20%',
                    transition: 'width 0.3s ease-in-out',
                    bgcolor: '#ddd',
                    boxShadow: '3px 4px #aaa',
                    borderRadius: '10px',
                    margin: '10px',
                    cursor: isOpen ? 'default' : 'pointer',
                    zIndex: isOpen ? 10 : 1,
                    opacity: isAnimating ? 0 : 1,
                    '& .MuiCardContent-root': {
                        padding: '0'
                    }
                }}
            >
                <Collapse in={!isOpen} timeout="auto">
                    <CardContent>
                        <div className="testttt">
                            <p className="collapsed-image">
                                <Image className={"proimg"}
                                       src={item?.productImage !== undefined ? item?.productImage : "/images/clothes/product.jpg"}
                                       width={400} height={310}
                                       alt="サンプル" id="sum"/>
                            </p>
                            <p className="product-Size">{item.productSize}</p>
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
                    onClick={handleCollapse}
                    sx={{
                        opacity: isContentVisible ? 1 : 0,
                        transition: 'opacity 0.3s ease-in-out'
                    }}
                >
                    <CardContent>
                        <Grid container spacing={2}>
                            <Grid item xs={4}>
                                <Box className="expanded-box" sx={{height: '100%'}}>
                                    <div className="expanded-image">
                                        <Image className={"proimg"}
                                               src={mainImageChange !== undefined ? mainImageChange : "/images/clothes/product.jpg"}
                                               width={420} height={550}
                                               alt="サンプル" id="sum"/>
                                    </div>
                                    <div className="expanded-Size">{item.productSize}</div>
                                </Box>
                            </Grid>

                            <Grid item xs={4}>
                                <Box
                                    className={`expanded-content ${isContentVisible ? 'visible' : 'hidden'}`}
                                    sx={{
                                        height: '100%',
                                        padding: 2,
                                        borderRadius: 1
                                    }}
                                >
                                    <p className="expanded-Name">商品名 : {item.productName}</p>
                                    <p className="expanded-Genre">カテゴリー : {item.productCategory}</p>
                                    <p className="expanded-Price">商品価格 : {item.productPrice}円</p>
                                    <p className="expanded-Situation">状態 : {item.productCondition} </p>

                                    <ul className="piclist">
                                        <li className="picts">
                                            {images.map((image, index) => (
                                                <li key={index} className="picts">
                                                    {image ? (
                                                        <a href="#" onClick={(e) => handleImageClick(e, index)}>
                                                            <Image className="pictS" src={image} width={50} height={50}
                                                                   alt={`画像${index + 1}`}/>
                                                        </a>
                                                    ) : null}
                                                </li>
                                            ))}
                                        </li>
                                    </ul>
                                    <p className="expanded-Cart">Add to Cart</p>
                                    <p className="expanded-Cart">
                                        <Link href={`product/${item?._id}`}>
                                            もっと見る
                                        </Link>
                                    </p>
                                </Box>
                            </Grid>

                            <Grid item xs={3}>
                                <Box className={"expanded-comment"}>
                                    <div className="expanded-comment-fream">
                                        <div className="comment-account">
                                            <p id={"ac_img"}>wa!</p>
                                            <p id={"ac_name"}>エマワトソン</p>
                                        </div>
                                        <div className="pu_comment">
                                            <p>ここにコメントが入りますここにコメントが入りますここにコメントが入りますここにコメントが入りますここにコメントが入りますここにコメントが入りますここにコメントが入りますここにコメントが入りますここにコメントが入りますここにコメントが入りますここにコメントが入りますここにコメントが入りますここにコメントが入りますここにコメントが入りますここにコメントが入りますここにコメントが入りますここにコメントが入りますここにコメントが入ります</p>
                                        </div>
                                    </div>
                                </Box>
                            </Grid>
                            <Grid item xs={1}>
                                <Box className={"expanded-reverse"}>
                                    <p>×</p>
                                </Box>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Collapse>
            </Card>
        </>
    );
};

export default CollapsibleProductCard;