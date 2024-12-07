import { useState } from 'react';
import './CollapsibleProductCard.css';

const CollapsibleProductCard = ({ item }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div
            className={`collapsible-product-card ${isOpen ? 'expanded' : 'collapsed'}`}
            onClick={() => setIsOpen(!isOpen)}
        >
            <p className="image">item.いめーじ</p>
            <p className="explanation">商品説明 : {item.productDesc}</p>
            <p className="explanation">出品者名 : {item.productName}</p>
            <p className="price">商品価格 : {Number(item.productPrice).toLocaleString()}円</p>

            <div className={`expanded-content ${isOpen ? 'visible' : 'hidden'}`}>
                <p>いめーじぃ</p>
                <p>ジャンル：</p>
                <p>素材：</p>
                <p className="price">商品価格 : {Number(item.productPrice).toLocaleString()}円</p>
                <p>状態</p>
            </div>
        </div>
    );
};

export default CollapsibleProductCard;