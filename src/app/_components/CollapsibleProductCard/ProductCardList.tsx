// ProductCardList.tsx
import CollapsibleProductCard from './CollapsibleProductCard';
import './CollapsibleProductCard.css';
import {ProductType} from "@/app/utils/product/productDetail";

interface ProductCardListProps {
    items: ProductType[];
}

const ProductCardList = ({ items }: ProductCardListProps) => {

    return (
        <div className="product-card-list">
                <CollapsibleProductCard
                    key={items._id}
                    item={items}
                    isOpen={openCardId === items._id}
                    onToggle={() => handleCardToggle(items._id)}
                />
        </div>
    );
};

export default ProductCardList;