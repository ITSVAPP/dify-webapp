# 研修用のDifyのアプリ

## 開発環境構築方法

1. クローン
`git clone https://github.com/ITSVAPP/dify-webapp.git`

1. インストール
`npm install`

1. 起動
`npm run dev`

## 最新化の方法

1. upstreamに本家を登録(初回のみ)
`git remote add upstream https://github.com/langgenius/webapp-conversation.git`

2. 以下、fetchしてマージ
- `git fetch upstream`
- `git merge upstream/main`

3. アプリにする場合
以下のコードを追記
```
 <script>
    window.difyChatbotConfig = {
      url: "{URL}",
    };
  </script>
  <script
    src="{URL}/dify.js"
    defer
  ></script>
  <style>
    #dify-chatbot-bubble-button {
      background-color: #1c64f2 !important;
    }
  </style>
```

## v0の追加

`npx v0@latest init`

### 追加コマンド

`npx shadcn@latest add "https://v0.dev/chat/b/cEDrPO1?token=eyJhbGciOiJkaXIiLCJlbmMiOiJBMjU2R0NNIn0..fwss8ERv--2YnUbf.ZN1CkVgTe34fZx_pUvsQPJv_XACVpJlj1dGDBfif6hUn9zyah8Y.0drnV6JiapavmkmvrFw1UA"`

## Config App
Create a file named `.env.local` in the current directory and copy the contents from `.env.example`. Setting the following content:
```
# APP ID
NEXT_PUBLIC_APP_ID=
# APP API key
NEXT_PUBLIC_APP_KEY=
# APP URL
NEXT_PUBLIC_API_URL=
# APP DOMAIN
NEXT_PUBLIC_API_DOMAIN=

```

Config more in `config/index.ts` file:   
```js
export const APP_INFO: AppInfo = {
  title: 'Chat APP',
  description: '',
  copyright: '',
  privacy_policy: '',
  default_language: 'zh-Hans'
}

export const isShowPrompt = true
export const promptTemplate = ''
```

## Getting Started
First, install dependencies:
```bash
npm install
# or
yarn
# or
pnpm install
```

Then, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Using Docker

```
docker build . -t <DOCKER_HUB_REPO>/webapp-conversation:latest
# now you can access it in port 3000
docker run -p 3000:3000 <DOCKER_HUB_REPO>/webapp-conversation:latest
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

> ⚠️ If you are using [Vercel Hobby](https://vercel.com/pricing), your message will be truncated due to the limitation of vercel.


The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
