# Azure-study-project

Azure勉強会の開発用プロジェクト

## 使用ライブラリ
- [Microsoft Graph JavaScript Client Library](https://www.npmjs.com/package/@microsoft/microsoft-graph-client)
    - Microsoft Graph APIを呼び出してMicrosoft 365サービスにアクセスできるクライアントライブラリ
    - HTTPリクエストを作成し、送信し、レスポンスを受信し、解析するための機能を提供
    - Requirement: Node.js 12 LTS or higher
- [Azure Identity client library for JavaScript](https://www.npmjs.com/package/@azure/identity?activeTab=readme)
    - javascript用Azure ADクライアントアプリ
- [dotenv](https://www.npmjs.com/package/dotenv)
    - .envで定義された環境変数を簡単に扱える

## 使用ファイル
- .env
    - アプリケーションの環境変数を設定するためのファイル
- Dockerfile
    - Dockerイメージをビルドするための設定ファイル
    - [node:alpine](https://hub.docker.com/_/node/)を使用。alpineは小さくスリムなイメージ(約5MG)
- docker-compose.yml
    - 複数のDockerコンテナを管理するための設定ファイル
- package.json
    - プログラムの諸情報と今回使うライブラリ情報を記述したファイル
    - dependencies: アプリケーションで使用するモジュールを定義するためのオブジェクト
    - scripts: アプリケーションのスクリプトを定義するためのオブジェクトであり、nodeコマンドを使用してsrc/server.jsファイルを実行
- src/client.js
    - MS Graph APIを使用してMicrosoft 365のデータにアクセスするためのクライアントを作成するファイル
- src/route.js
    - Webアプリケーションのルーティングを定義するファイル
- src/server.js
    - アプリケーションの起動と待機

# 1. クイックスタート

.envファイルの設定
```
PORT=<ホストとコンテナの使用ポート>
TENANT_ID=<テナントID>
CLIENT_ID=<クライアントID>
CLIENT_SECRET=<クライアントシークレットの値>
USER_ID=<自身のユーザーID>
```

DockerfileによるイメージのビルドとDockerコンテナの起動
```
docker-compose up -d --build
```

コンテナが起動したことを確認
```
docker container ls
```

ブラウザでサーバが起動していることを確認
```
http:localhost:8080
```
```
http:localhost:8080/about
```

コンテナの停止
```
docker-compose down
```

# 2. 参考

コンテナに接続
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

コンテナのログの確認
```
docker logs <CONTAINER ID>
```
