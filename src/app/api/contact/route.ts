import nodemailer from "nodemailer";
import confirmPassword from "@/app/utils/user/confirmPassword";

function generateRandomCode(): string {
    return Math.floor(1000 + Math.random() * 9000).toString();
}

export async function POST(req: Request) {
    const randomCode = generateRandomCode();

    const body = await req.json();
    const response = await confirmPassword(body.email,body.password)
     if (response?.ok == true){

    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        auth: {
            user: process.env.GMAILUSER,
            pass: process.env.GMAILPASSWORD,
        },
    });

     const toHostMailData = {
        from: body.emailDecodedComponent,
        to: "masataka1kousuke1@gmail.com.com",
        subject: `メールアドレス認証`,
        text: `Send from ${body.emailDecodedComponent}`,
        html: `

        <p>【確認コード】</p>
        <p>${randomCode}</p>
        `,
    };

      const toUserMailData = {
        from: process.env.GMAILUSER,
        to: "hew.dgroupe@gmail.com",
        subject: "確認コードのお知らせ",
        html: `  
        <p>あなたの確認コードは：<strong>${randomCode}</strong></p>
        <p>このコードは本人確認のために使用されます。</p>
        
        <h1>尚、身に覚えのない場合は無視をしてください。</h1>
        `,
    };

        try {
             await transporter.sendMail(toHostMailData);
            await transporter.sendMail(toUserMailData);

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
    }else {
          return new Response(
            JSON.stringify({ status: "Error", message: "メール送信に失敗しました。" }),
            { status: 500, headers: { "Content-Type": "application/json" } }
        );

    }
}
