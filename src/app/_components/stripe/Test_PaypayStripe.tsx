// app/page.js
import {useEffect, useState} from 'react';
import {saveProduct} from '@/app/utils/stripe/getpaypay';

export default function Home() {
    const [productData, setProductData] = useState(null);

    useEffect(() => {
        try {
            const response = async () => {
                const product = await saveProduct();

            }
            response()
        } catch (error) {
            console.error('Error saving product:', error);
        }
    }, [])


    return (
        <div>
            <form>
                <input
                    type="text"
                    placeholder="PayPay Product ID"
                />
                <button type="submit">Fetch and Save Product</button>
            </form>
            {productData && (
                <div>
                    <h2>Product Data</h2>
                    <pre>{JSON.stringify(productData, null, 2)}</pre>
                </div>
            )}
        </div>
    );
}
