# node:alpineイメージをベースに新しいイメージを作成
FROM node:alpine
# rootユーザーに切り替え
USER root
# 作業ディレクトリを/root/に設定
WORKDIR /root/
# ホストマシン上の現在のディレクトリの全てのファイルを
# Dockerイメージ内の/root/ディレクトリにコピー
COPY ./ ./
# コンテナ内でnpm installコマンドを実行
# (アプリケーションに必要なパッケージをインストール)
RUN npm install
# 報告された脆弱性に関してノードパッケージを更新
RUN npm audit fix
# dotenvのパッケージのインストール
RUN npm install dotenv --save
# axiosのパッケージのインストール
RUN npm install axios --save
# cookie-parserのパッケージのインストール
RUN npm install cookie-parser --save
# パッケージのインストールと、package.jsonファイルのdependenciesに追加
RUN npm install @microsoft/microsoft-graph-client --save
# @azure/identityパッケージのインストール
RUN npm install --save @azure/identity
# コンテナが起動した際に実行されるコマンドを指定
CMD ["npm", "start"]