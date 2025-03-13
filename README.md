## 初public作品  女性向け CtoCサイト F'dore
2024年6月から2025年3月に実施される学校内作品展に向けて作成した作品になります。

## チームコンセプト
F'dore 「female（女性）」「door（扉）」「store（お店）」の三つからなる造語で
女性がこのサービスを利用して、服を着ることで扉を開けて出かけたくなる、新しいことに挑戦できるというもの。

私たちの目標
CtoCという顧客だけのサービスだけでは終わらせたくない。
→MicroCMSを導入しスタッフがブログを投稿する機能を実装することでサイトとして運営も顧客も使いたいというサービスを作成しました。

リリースを想定したときに利益を生み出したい。
→お支払いを外部ライブラリからAPIをお借りして、テスト環境で利益を生み出すようになりました。


使用されている技術は、チームメンバー全員が独学で全て学び作り上げたので、ディレクトリの管理が甘いなど、詰めるところが多くあります。

## 機能
ユーザー管理機能
新規登録、ログイン、Github・GoogleなどNextAuthを活用した外部認証（Github・Googleは現状ログインはされるが、データベースには保存されない。）

商品一覧・出品・購入機能
商品一覧では検索機能、カテゴリーによる絞り込み機能を実装
出品機能、購入機能、
購入機能には利益を生み出す想定で、テスト環境でStripe , PayPayのお支払いを導入。


ＤＭ機能
商品にコメント、購入後の取引チャット、各チャットごとにスタンプリアクション機能


## 技術スタック
バージョン管理
git , GitHub

フロントエンド
TypeScript,React,Next.js 14,Mui,swiper.js

バックエンド
TypeScript,React,Next.js 14,Mongoose

データベース
Mongodb

セッション管理
jwt.io

外部ライブラリ
Stripe,PayPay,MicroCMS

## About Me
GitHub　ユーザー名 hayasin2004
6人1チームというグループ作品で、チームリーダとして、タスクの割り振り、メンバーのスケジュールを管理しました。

### 何をしたのか

React ,TypeScriptは学校では教わることはなく、独学で覚えなければならない中で、チームメンバーに今Reactを覚えると職の選択が広がるよと、
チームメンバーに許諾を得たうえで、全員を言語として未開拓の領域に引きずり込みました。

ただ引きずりこんだだけではリーダーとして無責任なので、夏季休暇を全てReactに時間を割き、メンバーに教えれるよう力を付けました。

開発ではフロントエンド、バックエンドを分け隔てなく行き来していました。
その甲斐もあり、この作品の規模であればフルスタックでも開発できるような力がつきました。


## 反省点
プログラミング経験が疎い中で、一人前として成長したく私が試行錯誤した知識をチームメンバーに教えた後に、
プッシュ、ブランチ、コミットが実務ではありえないやり方をしているところがあります。
→実務に携わった、プロジェクトを壊してしまう可能性もあるので1から原則を学びなおす必要がある。

HTML,CSSは学校では習いましたが、それ以外は言語としてエンジニアとしての商品価値をあげたいという一心で、
使っていないものをチームメンバーに使わせて、ハードルの高いことを指せてしまった。
→もっと時間をかけてチームメンバーに寄り添うべきだった。

HTTPなどをよく理解していない、冗長的なコードで開発をしてしまったので動作がかなりもっさりしている。
→バックエンドの開発は9割自身で開発をしていたので私が悪いです。
→サイトを作成するときの概念を学びおす必要性が十二分にある

## 成長

### リーダとして
初めてのグループ作品なので、どのようにタスクを割り振ればいいのか最初は混乱していたがそれをメンバーと話し合うということで解決できるようになった。
→　負荷をかけてしまうタスク、手がそうなタスクを割り振るのかを 誰だったらいけるとかを瞬時に判断できる力が身についた。

友達という意識が強くあり、思ったことが言えないことがあったが、それだと友達の為にもならないと思い、
ダメな時はダメを言うメンタルが身についた。


### 開発として
まず大きく感じたのがプログラミングをする上での感覚、思考が1年生のころとは比じゃない程身についた。

難しい機能でも、思考が整いやすくなったので、手が動くようになった。

新言語といわれても、嫌悪感を抱くことがなくなり、常にやらしてくださいと、前に向けるようになった。



```bash
npm run dev
# or
yarn dev
# or
npm dev
# or
bun dev
```
