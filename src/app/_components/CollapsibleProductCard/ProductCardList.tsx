import {useState} from 'react';
import CollapsibleProductCard from './CollapsibleProductCard';
import './CollapsibleProductCard.css';
import {ProductType} from "@/app/utils/product/productDetail";

export interface ProductCardListProps {
    items?: ProductType[];
    category?: string;
    size?: string
    currentProduct? : ProductType[];
    categoryProductList? : ProductType[]
}

const ProductCardList = ({items, category, size}: ProductCardListProps) => {

    const [openCardId, setOpenCardId] = useState<string | null>(null);
    const handleCardToggle = (itemId: string) => {
        setOpenCardId(openCardId === itemId ? null : itemId);
    };


    console.log("item" + JSON.stringify(items), "category" + category, "size" + size);
     return (
        <div className="product-card-list">
            {items?.map((item) => (
                    <CollapsibleProductCard
                        key={item._id}
                        item={item}
                        isOpen={openCardId === item._id}
                        onToggle={() => handleCardToggle(item._id!)}
                    />
                ))}

        </div>
    );
};

export default ProductCardList;