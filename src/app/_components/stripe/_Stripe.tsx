"use client";

export default function Home() {
    const handlePayPayPayment = async () => {
        const res = await fetch("/api/paypay", {
            method: "POST",
        })
        const json = await res.json()
        window.location.href = json.url
    }

    return (
        <div >
            <main  >
                <h1>
                    PayPay 決済テスト
                </h1>

                <button onClick={handlePayPayPayment}>
                    支払う
                </button>
            </main>
        </div>
    );
}
