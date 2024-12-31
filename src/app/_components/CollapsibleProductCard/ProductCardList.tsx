// ProductCardList.tsx
import { useState } from 'react';
import CollapsibleProductCard from './CollapsibleProductCard';
import './CollapsibleProductCard.css';
import { DBProductType } from '@/app/api/product/route';

interface ProductCardListProps {
    items: DBProductType[];
}

const ProductCardList = ({ items }: ProductCardListProps) => {
    const [openCardId, setOpenCardId] = useState<string | null>(null);

    const handleCardToggle = (itemId: string) => {
        setOpenCardId(openCardId === itemId ? null : itemId);
    };

    return (
        <div className="product-card-list">
            {items.map((item) => (
                <CollapsibleProductCard
                    key={item._id}
                    item={item}
                    isOpen={openCardId === item._id}
                    onToggle={() => handleCardToggle(item._id)}
                />
            ))}
        </div>
    );
};

export default ProductCardList;