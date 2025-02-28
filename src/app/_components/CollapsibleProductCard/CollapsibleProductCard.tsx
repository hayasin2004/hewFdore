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
import {ProductType} from '@/app/utils/product/productDetail';

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
            item.productImage,
            item.productImage2 || "",
            item.productImage3 || "",
            item.productImage4 || ""
        ]);
    }, [item]);

    const handleCollapse = (event: React.MouseEvent) => {
        const target = event.target as HTMLElement;
        if (!target.closest('.expanded-reverse')) {
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

    const isDesktop = window.innerWidth >= 768;

    return (
        <>
            <Card
                ref={cardRef}
                className={`collapsible-product-card ${isOpen ? 'expanded' : 'collapsed'}`}
                onClick={isOpen ? undefined : handleExpand}
                sx={{
                    width: {
                        xs: '100%', // モバイルでは100%に
                        sm: isOpen ? '100%' : '45%',
                        md: isOpen ? '100%' : '30%'
                    },
                    margin: '0 auto', // 左右のマージンを自動に設定して中央揃え
                    marginBottom: '10rem',
                    transition: 'width 0.3s ease-in-out',
                    bgcolor: '#ddd',
                    boxShadow: '3px 4px #aaa',
                    borderRadius: '10px',
                    cursor: isOpen ? 'default' : 'pointer',
                    zIndex: isOpen ? 10 : 1,
                    opacity: isAnimating ? 0 : 1,
                    '& .MuiCardContent-root': {
                        padding: '0',
                        width: '100%'
                    }
                }}
            >
                <Collapse
                    in={!isOpen}
                    timeout="auto"
                    sx={{
                        width: '100%',
                        maxWidth: '100%',
                        '& .MuiCollapse-wrapper': {
                            width: '100%',
                            maxWidth: '100%'
                        },
                        '& .MuiCollapse-wrapperInner': {
                            width: '100%',
                            maxWidth: '100%'
                        }
                    }}
                >
                    <CardContent
                        sx={{
                            width: '100%',
                            maxWidth: '100%',
                            boxSizing: 'border-box',
                        }}
                    >
                        <div className="testttt">
                            <p className="collapsed-image">
                                <Image className={"proimg"}
                                       src={item?.productImage !== undefined ? item?.productImage : "/images/clothes/product.jpg"}
                                       width={400} height={310}
                                       alt="サンプル" id="sum"
                                       style={{maxWidth: '100%', height: 'auto'}}
                                />
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
                        width: '100%',
                        maxWidth: '100%',
                        opacity: isContentVisible ? 1 : 0,
                        transition: 'opacity 0.3s ease-in-out',
                        '& .MuiCollapse-wrapper': {
                            width: '100%',
                            maxWidth: '100%'
                        },
                        '& .MuiCollapse-wrapperInner': {
                            width: '100%',
                            maxWidth: '100%'
                        }
                    }}
                >
                    <CardContent
                        sx={{
                            width: '100%',
                            maxWidth: '100%',
                            boxSizing: 'border-box'
                        }}
                    >
                        <Grid container spacing={{xs: 1, sm: 2, md: 3}} sx={{width: '100%', m: 0}}>
                            <Grid item xs={12} md={5}>
                                <Box className="expanded-box" sx={{height: '100%'}}>
                                    <div className="expanded-image">
                                        <Image className={"ResponsiveExpandedImage"}
                                               src={mainImageChange !== undefined ? mainImageChange : "/images/clothes/product.jpg"}
                                               width={420} height={550}
                                               alt="サンプル" id="sum"
                                               style={{maxWidth: '100%', height: 'auto'}}
                                        />
                                    </div>
                                    <div className="expanded-Size">{item.productSize}</div>
                                </Box>
                            </Grid>
                            {isDesktop ? (
                                <>
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
                                                                    <Image className="pictS" src={image} width={50}
                                                                           height={50}
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
                                                    <Image
                                                        src={item.sellerUserProfilePicture !== undefined ? item.sellerUserProfilePicture : "/profile.png"}
                                                        alt={"出品者プロフィール画像"} width={50} height={50}
                                                        id={"ac_img"}/>
                                                    <p id={"ac_name"}>{item.sellerUserName}</p>
                                                </div>
                                                <div className="pu_comment">
                                                    <p>{item.sellerUserDesc}</p>
                                                </div>
                                            </div>
                                        </Box>
                                        <Grid item xs={13}>
                                            <Box className={"expanded-reverse"}>
                                                <p>×</p>
                                            </Box>
                                        </Grid>
                                    </Grid>
                                </>
                            ) : (
                                <Box className={"responsiveSmartPhoneDetailProduct"}>

                                    <Grid item xs={12} md={4}>
                                        <Box
                                            className={`expanded-content ${isContentVisible ? 'visible' : 'hidden'}`}
                                            sx={{
                                                height: '100%',
                                                padding: 2,
                                                borderRadius: 1,
                                                width: '100%'
                                            }}
                                        >
                                            <p className="expanded-Name">商品名 : {item.productName}</p>
                                            <p className="expanded-Genre">カテゴリー : {item.productCategory}</p>
                                            <p className="expanded-Price">商品価格 : {item.productPrice}円</p>
                                            <p className="expanded-Situation">状態 : {item.productCondition} </p>

                                            <ul className="piclist">
                                                {images.map((image, index) => (
                                                    <li key={index} className="picts">
                                                        {image ? (
                                                            <a href="#" onClick={(e) => handleImageClick(e, index)}>
                                                                <Image className="pictS" src={image} width={50}
                                                                       height={50}
                                                                       alt={`画像${index + 1}`}
                                                                />
                                                            </a>
                                                        ) : null}
                                                    </li>
                                                ))}
                                            </ul>
                                        </Box>
                                    </Grid>

                                    <Grid item xs={12} md={3}>
                                        <Box className={"expanded-comment"} sx={{width: '100%'}}>
                                            <div className="expanded-comment-fream">
                                                <div className="comment-account">
                                                    <Image
                                                        src={item.sellerUserProfilePicture !== undefined ? item.sellerUserProfilePicture : "/profile.png"}
                                                        alt={"出品者プロフィール画像"} width={50} height={50}
                                                        id={"ac_img"}
                                                    />
                                                    <p id={"ac_name"}>{item.sellerUserName}</p>
                                                </div>
                                                <div className="pu_comment">
                                                    <p>{item.sellerUserDesc}</p>
                                                </div>
                                            </div>

                                            <Grid item xs={12} md={12}
                                                  sx={{display: 'flex', justifyContent: 'flex-end'}}>
                                                <Box className={"expanded-reverse"}>
                                                    <p>×</p>
                                                </Box>
                                            </Grid>
                                            <p className="expanded-Cart ResponsiveExpandedCart">
                                                <Link href={`product/${item?._id}`}>
                                                    もっと見る
                                                </Link>
                                            </p>
                                            <span className={"responsiveSmartPhoneDetailProductSpan"}></span>
                                        </Box>
                                    </Grid>
                                </Box>
                            )
                            }
                        </Grid>
                    </CardContent>
                </Collapse>
            </Card>
        </>
    );
};

export default CollapsibleProductCard;
