# Python 3をベースにした公式イメージを取得
FROM python:3
# rootユーザーに切り替え
USER root

# パッケージリストを更新
RUN apt-get update
# 日本語ロケールをインストール
RUN apt-get -y install locales && \
    localedef -f UTF-8 -i ja_JP ja_JP.UTF-8
# LANG環境変数をja_JP.UTF-8に設定
ENV LANG ja_JP.UTF-8
# LANGUAGE環境変数をja_JP:jaに設定
ENV LANGUAGE ja_JP:ja
# LC_ALL環境変数をja_JP.UTF-8に設定
ENV LC_ALL ja_JP.UTF-8
# タイムゾーンを日本時間に設定
ENV TZ JST-9
# ターミナルの種類をxtermに設定
ENV TERM xterm

# vimとlessパッケージをインストール
RUN apt-get install -y vim less
# pipパッケージ自体をアップグレード
RUN pip install --upgrade pip
# setuptoolsパッケージ自体をアップグレード
RUN pip install --upgrade setuptools
# azure-identityパッケージをインストール
RUN python -m pip install azure-identity
# msgraph-sdkパッケージをインストール
RUN python -m pip install msgraph-sdk