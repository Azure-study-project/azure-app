# Azure-study-project

Azure勉強会の開発用プロジェクト

## 使用コンテナ
- [node:alpine](https://hub.docker.com/_/node/)
    - alpineは小さくスリムなイメージ(約5MG)

## 使用ライブラリ
- [Microsoft Graph JavaScript Client Library](https://www.npmjs.com/package/@microsoft/microsoft-graph-client)
    - Microsoft Graph APIを呼び出してMicrosoft 365サービスにアクセスできるクライアントライブラリ
    - HTTPリクエストを作成し、送信し、レスポンスを受信し、解析するための機能を提供
    - Requirement: Node.js 12 LTS or higher
- [Microsoft Graph TypeScript Types](https://www.npmjs.com/package/@microsoft/microsoft-graph-types)
    - Microsoft GraphエンティティのTypeScript型
    - (使用する必要のないライブラリかもしれない)
- [Azure Identity client library for JavaScript](https://www.npmjs.com/package/@azure/identity?activeTab=readme)
    - javascript用Azure ADクライアントアプリ
- [dotenv](https://www.npmjs.com/package/dotenv)
    - .envで定義された環境変数を簡単に扱える

## 使用ファイル
- package.json
    - プログラムの諸情報と今回使うライブラリ情報を記述したファイル
- src/index.js
    - メインプログラム

# 1. クイックスタート

.envファイルの設定
```
PORT=<ホストとコンテナの使用ポート>
```

DockerfileによるイメージのビルドとDockerコンテナの起動
```
docker-compose up -d --build
```

コンテナが起動したことを確認
```
docker container ls
```

```
curl http://localhost:8080
```

ブラウザにて
```
http:localhost:8080
```

```
curl http://localhost:8080/about
```

ブラウザにて
```
http:localhost:8080/about
```

```
docker-compose exec azure-app sh
```

> **注意**
>
> alpine-linuxイメージのDockerコンテナではbashコマンドが使用できないため、以下のコマンドを実行することができない。
> ```
> docker-compose exec azure-app bash
> ```

コンテナとの接続を解除
```
exit
```

```
docker-compose down
```

# 1. Microsoft Graph JavaScript SDK をインストールする

https://learn.microsoft.com/ja-jp/graph/sdks/sdk-installation#install-the-microsoft-graph-javascript-sdk