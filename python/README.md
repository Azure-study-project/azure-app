# Azure-study-project

Azure勉強会の開発用プロジェクト

## 使用ライブラリ
- [azure-identity](https://github.com/Azure/azure-sdk-for-python/tree/main/sdk/identity/azure-identity)
- [msgraph-sdk-python](https://github.com/microsoftgraph/msgraph-sdk-python)

# 1. ローカル開発環境のセットアップ

アプリのクローン
```
git clone https://github.com/Azure-study-project/azure-app.git
```

ディレクトリの移動
```
cd Azure-app
```

コンテナの立ち上げ
```
docker-compose up -d --build
```

コンテナが起動しているかを確認
```
docker container ls
```

コンテナへの接続
```
docker-compose exec azure-app bash 
```

config.cfgの作成
```
vim src/config.cfg
```

> **config.cfgのテンプレート**
>```
>[azure]
>clientId = <クライアントID>
>tenantId = <テナントID>
>graphUserScopes = <スコープ>
>```

コンテナとの接続を切断
```
exit
```

コンテナの停止
```
docker-compose down
```

# 2. 関数アプリの実行

ディレクトリの移動
```
cd src
```

main.pyの実行
```
python main.py
```