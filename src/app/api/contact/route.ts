import nodemailer from "nodemailer";

function generateRandomCode(): string {
    return Math.floor(1000 + Math.random() * 9000).toString();
}

export async function POST(req: Request) {
    const randomCode = generateRandomCode();

    const body = await req.json();

    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        auth: {
            user: process.env.GMAILUSER,
            pass: process.env.GMAILPASSWORD,
        },
    });

    // Email to admin
    const toHostMailData = {
        from: body.email,
        to: "ao09011078@gmail.com", //後で変える
        subject: `[お問い合わせ]${body.name}様より`,
        text: `${body.message} Send from ${body.email}`,
        html: `
        <p>【お名前】</p>
        <p>${body.name}</p>
        <p>【メッセージ内容】</p>
        <p>${body.message}</p>
        <p>【メールアドレス】</p>
        <p>${body.email}</p>
        <p>【確認コード】</p>
        <p>${randomCode}</p>
        `,
    };

    // Email to user
    const toUserMailData = {
        from: process.env.GMAILUSER,
        to: body.email,
        subject: "確認コードのお知らせ",
        html: `
        <p>${body.name}様</p>
        <p>お問い合わせありがとうございます。</p>
        <p>あなたの確認コードは：<strong>${randomCode}</strong></p>
        <p>このコードは本人確認のために使用されます。</p>
        `,
    };

        try {
            // メールを送信
            await transporter.sendMail(toHostMailData);

            return new Response(
                JSON.stringify({ status: "Success", code: randomCode }),
                { status: 200, headers: { "Content-Type": "application/json" } }
            );
        } catch (error) {
            console.error("メール送信エラー:", error);

            return new Response(
                JSON.stringify({ status: "Error", message: "メール送信に失敗しました。" }),
                { status: 500, headers: { "Content-Type": "application/json" } }
            );
        }
}
