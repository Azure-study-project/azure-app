import asyncio
import configparser
from graph import Graph

async def main():
    # ConfigParserオブジェクトを作成
    config = configparser.ConfigParser()
    # read()メソッドを使用して、設定ファイルのリストを渡す
    config.read(['config.cfg', 'config.dev.cfg'])
    # 設定ファイルからazureセクションを取得
    azure_settings = config['azure']
    # Graphオブジェクトを作成
    graph: Graph = Graph(azure_settings)

    choice = -1
    while choice != 0:
        print('Please choose one of the following options:')
        print('0. Exit')
        print('1. test_func')
        print('2. get_user')

        try:
            choice = int(input())
        except ValueError:
            choice = -1

        if choice == 0:
            print('Goodbye...')
        elif choice == 1:
            await test_func(graph)
        elif choice == 2:
            await get_user(graph)
        else:
            print('Invalid choice!\n')
    
async def test_func(graph: Graph):
    await graph.test_func()

async def get_user(graph: Graph):
    await graph.get_user()

# main関数の実行
asyncio.run(main())