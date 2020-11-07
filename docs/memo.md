# React に入門してみる。

JavaScript の書き方は ﾁｮｯﾄ わかってきたので、React を使ってアプリケーションを作ってみようと思います。

## React App を作ろう

### `create-react-app` を使うのが楽らしい

```sh:install
npm install -g create-react-app
```

`-g` は必須っぽい[^1]です。global な場所にインストールを行うときにつける option のようです。

### project の作成

```sh
create-react-app my-react-chat-app
```

これで、およそ以下のようなフォルダが (アプほとんど丸ごと) 出来上がります。
出来上がる場所はカレントディレクトリの下です。


```
my-react-chat-app/
├── README.md
├── node_modules/
├── package-lock.json
├── package.json
├── public/
│   ├── favicon.ico
│   ├── index.html
│   ├── logo192.png
│   ├── logo512.png
│   ├── manifest.json
│   └── robots.txt
└── src/
    ├── App.css
    ├── App.js
    ├── App.test.js
    ├── index.css
    ├── index.js
    ├── logo.svg
    ├── reportWebVitals.js
    └── setupTests.js


3 directories, 3 files
```

`git init` とかもされているし、`.gitignore` もありますね。
あとこれは結構迷ったのですが、ソースファイルは基本的に `src` 下に置くらしいです。


#### 動作確認 ( local server の起動)

project の initialize をしたところで、一度、動作確認をしてみます。

以下を実行することで local server が立ち上がります。

```sh
npm start 
```

無事成功すれば、このようなメッセージが出力されます。
そして、自動的にブラウザに切り替わります。(すごい)

```
Compiled successfully!

You can now view sample-app in the browser.

  Local:            http://localhost:3000
  On Your Network:  http://192.168.1.XXX:3000

Note that the development build is not optimized.
To create a production build, use npm run build.

```

切り替わらない場合でも、メッセージ中部にあるように、ブラウザから `localhost:3000` にアクセスすると、立ち上がったサービス (アプリ?) をみることができます。


さて、立ち上がった先では React のアイコンっぽい、atomic な何かしらがくるくる回る画面が出てきます。これで OK です。
ソースファイルを編集すると、この画面が変わります (だいたい)。

![React default frontpage](./pictures/00_react_default_frontpage.png)



## Firebase 周り
次は firebase 周りの設定をします。firebase にデプロイしない場合は、この部分をスキップして良いです。
(自分のメモのために残します)

### firebase CLI (SDK) をインストール
まずは firebase の SDK である `firebase-tools` をインストールします。SDK なので global にインストールしておくと良いでしょう。

```sh
npm install -g firebase-tools
```

### ライブラリのインストール
firebase のライブラリ (?) をインストールします。
これはプロジェクト内のソースで読み出すものなので、local で install します。

```sh
npm install firebase
```

### (まだの方) firebase に Google アカウントで login してプロジェクトを作成します。

firebase に Google アカウントで login して、プロジェクトを作成してきます。

1. project を追加 (作成) を選びます。
![create firebase project](./pictures/01_create_firebase_project.png)

2. project に名前をつけます。 (良かれば規約に同意して、続行します)
![name firebase project](./pictures/02_name_firebase_project.png)

3. 今回はお試しなので Google アナリティクスは off (disable) にしておきます。
![firebase google analytics off](./pictures/03_firebase_google_analytics_off.png)

4. 一旦完成です (やったぜ)
![create firebase project done](./pictures/04_create_firebase_project_done.png)

### SDK とサービスの関連付け

* local の firebase SDk と サービスとしての firebase の紐付けに login を行います。

```
firebase login
```

ブラウザが開いて、Google アカウントを選択すれば、関連付けが完了すると思います。

* local に作成したプロジェクトと、firebase 上のプロジェクトの紐付けを行うために initialize をします。

```
firebase init
```

実行するとこんな感じで「何かを選択しろ」と言わんばかりの待ち受けイベントが起こります。

```
(*'-') < firebase init

     ######## #### ########  ######## ########     ###     ######  ########
     ##        ##  ##     ## ##       ##     ##  ##   ##  ##       ##
     ######    ##  ########  ######   ########  #########  ######  ######
     ##        ##  ##    ##  ##       ##     ## ##     ##       ## ##
     ##       #### ##     ## ######## ########  ##     ##  ######  ########

You're about to initialize a Firebase project in this directory:

  /Users/sudachi/Documents/js/sample-app

? Which Firebase CLI features do you want to set up for this folder? Press Space to select features, then Enter 
to confirm your choices. (Press <space> to select, <a> to toggle all, <i> to invert selection)
❯◯ Database: Deploy Firebase Realtime Database Rules
 ◯ Firestore: Deploy rules and create indexes for Firestore
 ◯ Functions: Configure and deploy Cloud Functions
 ◯ Hosting: Configure and deploy Firebase Hosting sites
 ◯ Storage: Deploy Cloud Storage security rules
 ◯ Emulators: Set up local emulators for Firebase features
 ◯ Remote Config: Get, deploy, and rollback configurations for Remote Config
```

お試しで行う時は `Hosting` にしておくと良いでしょう。(というか、まだ不勉強で良くわかってません。ごめんなさい)

Hosting まで `❯` を持っていって、`[space]` を押下すると `◯` が `◉` になります。なったら `[Enter]` で OK です。

```
? Which Firebase CLI features do you want to set up for this folder? Press Space to select features, then Enter to confirm your choices. 
 ◯ Database: Deploy Firebase Realtime Database Rules
 ◯ Firestore: Deploy rules and create indexes for Firestore
 ◯ Functions: Configure and deploy Cloud Functions
❯◉ Hosting: Configure and deploy Firebase Hosting sites
 ◯ Storage: Deploy Cloud Storage security rules
 ◯ Emulators: Set up local emulators for Firebase features
 ◯ Remote Config: Get, deploy, and rollback configurations for Remote Config
```

さて、次は `project` を選択するイベントです。

```
? Please select an option: (Use arrow keys)
❯ Use an existing project 
  Create a new project 
  Add Firebase to an existing Google Cloud Platform project 
  Don't set up a default project 
```
ここでは `❯ Use an existing project` を選択して、先ほど作った firebase プロジェクト `myreactchatapp-d413c (myReactChatApp)` (とか) を選択します。(login が正しく行われていれば、プロジェクトが表示されると思います。)

あといくつか選択イベントがありますが、~~めんどうだし、良くわからないので~~ たぶんあとで設定とかもできるので、`[Enter]` をぽちぽちして先に進みます。

```
? What do you want to use as your public directory? 
? Configure as a single-page app (rewrite all urls to /index.html)? No
? Set up automatic builds and deploys with GitHub? No
✔  Wrote /404.html
✔  Wrote /index.html

i  Writing configuration info to firebase.json...
i  Writing project information to .firebaserc...

✔  Firebase initialization complete!
```

こんな感じのメッセージが出たら firebase のイニシャライズは完了です。多分 `.firebaserc` とか `firebase.json` が増えているのではないでしょうか。


### deploy 元のディレクトリの変更
firebase の設定では、デフォルトの deoloy 元となるディレクトリは `public/` です。

しかし、`npm run build` により作成されるのは `build/` の下です。なので、`firebase.json` を変更することで、`build/` を見るようにします。(さっきの選択イベントでも選べた気がしますが、気にしません。)


```firebase.json
{
  "hosting": {
    "public":"build",
    "ignore": [
      "firebase.json",
      "**/.*",
      "**/node_modules/**"
    ]
  }
}
```

### deploy

以下を実行して firebase に deploy します。

```sh
npm run build
firebase deploy
```

ドメインは firebase のコンソールの Hosting からみることができます。

![firebase app domain](./pictures/07_firebase_app_domain.png)

まだ何もいじっていないので、アクセスすると、先ほどの atomic なページが表示されれば、デプロイは完了です。

![firebase app page](./pictures/00_react_default_frontpage.png)


## Application を作っていくぞ











## Link:
* [React & Firebaseで簡単なChatアプリを作ってみた](https://qiita.com/kazushikawamura/items/58ea222b3cc289882d79)
* [初めてのFirebaseを触ってみる(Database)](https://qiita.com/watataku8911/items/ac040f4671c0f9a62bd4)
* [Firebase apiKey ってさらしていいの? ほんとに?](https://qiita.com/hoshymo/items/e9c14ed157200b36eaa5)


[^1]: 一度、プロジェクト local にインストールして使おうとしたけど PATH とかが面倒でやめました。特にこだわりがなければ global に install しちゃうのがいいと思います。ちなみに、私の環境では `create-react-app` は `$HOME/.nodebrew/current/bin/create-react-app` に配置されました。

