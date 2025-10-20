## ■概要
関東地方の不動産取引価格（2015年〜2018年）を検索できるAPIです。
JSONファイルから読み込んだデータをクエリパラメータで検索し、条件に合致する不動産取引価格を返却します。

## ■技術スタック
- Node.js: v24.5.0
- NestJS: v11.0.10
- TypeScript: v5.9.3
- class-validator: バリデーション
- class-transformer: データ変換
- Jest: テストフレームワーク
- ESLint: リンター
- Prettier: フォーマッター

## ■環境構築
### 前提条件
- Node.js v24.5.0がインストールされていること

### インストール手順
```shell
# 1. リポジトリをクローン
git clone <repository-url>
cd estate-transactions-app

# 2. 依存パッケージをインストール
npm install

# 3. アプリケーションを起動
npm run start:dev

# 4. 起動確認
curl 'http://localhost:3000/api/v1/townPlanning/estateTransaction/bar?year=2015&prefCode=13&type=1'
```

## ■API仕様

### エンドポイント
```
GET /api/v1/townPlanning/estateTransaction/bar
```

### クエリパラメータ
| パラメータ | 説明 | 必須 | 制約 |
| ---- | ---- | ---- | ---- |
| year | 年度 | ✅️ | 2015〜2018 |
| prefCode | 都道府県コード（関東地方） | ✅️ | 8〜14 |
| type | 土地種別 | ✅️ | 1：住宅地 / 2：商業地 |

## ■プロジェクト構成
本プロジェクトは `Controller > Service > Repository` の3層アーキテクチャで構成されています。

```
src/
├── main.ts
├── app.module.ts
├── config/
│   └── validation.config.ts          # バリデーション共通設定
├── assets/
│   └── estate_transactions.json      # 不動産取引データ
├── types/
│   └── estate-transaction.ts         # 型定義
└── estate-transaction/
    ├── dto/
    │   ├── search-estate.dto.ts              # 入力バリデーション
    │   └── search-estate.dto.spec.ts         # 入力バリデーションのテスト
    ├── repositories/
    │   ├── estate-transaction.repository.ts       # Repository層：データ取得処理
    │   └── estate-transaction.repository.spec.ts  # Repositoryのテスト
    ├── estate-transaction.controller.ts       # Controller層：ルーティング・バリデーション
    ├── estate-transaction.controller.spec.ts  # Controllerのテスト
    ├── estate-transaction.service.ts          # Service層：ビジネスロジック
    ├── estate-transaction.service.spec.ts     # Serviceのテスト
    └── estate-transaction.module.ts
```

## ■テスト実行方法

### 単体テスト
```shell
# 全テストを実行
npm run test

# 特定のテストファイルを実行
npm run test estate-transaction.controller.spec.ts
```

### カバレッジの確認
```shell
# カバレッジを測定
npm run test:cov

# カバレッジレポートを表示
open coverage/lcov-report/index.html
```

## ■Linter & Formatter 実行方法
### ESLint
```shell
npm run lint
```

### Prettier
```shell
npm run format
```

## ■実装済み要件と未実装要件

### 機能要件
- 不動産取引価格を検索する API を実装

### 非機能要件
- JSONファイルをインポートして不動産取引価格を返す
- Postman でAPIコール可能
- Nest.js利用
- ESLint / Prettierによるリンター・フォーマッターの設定
- GitHubでバージョン管理
- Controller > Service > Repository 構成で実装
- クエリパラメータのバリデーションを実装（class-validator / class-transformer使用）
- Controller, Service, Repository, DTOにユニットテストを追加

### 未対応要件
- Controller > UseCase > Repository > Infrastructure 構成

## ■工夫した点
- `husky`と`lint-staged`を使ってcommitしたファイルに対してのみリンター・フォーマッターを実行するようにしました。
- `.vscode/launch.json`でデバッグ構成を追加しました。
- `src/types/estate-transaction.ts`で、JSONデータ都道府県コードなどをリテラル型で定義することで、型の恩恵を受けられるようにしました。

## ■テストケース

```jsx
✅ 正常系テストケース
全パラメータが正しい
http://localhost:3000/api/v1/townPlanning/estateTransaction/bar?year=2015&prefCode=13&type=1
```
```jsx
# ❌ 異常系テストケース

### yearが無い
http://localhost:3000/api/v1/townPlanning/estateTransaction/bar?prefCode=13&type=1

### prefCodeが無い
http://localhost:3000/api/v1/townPlanning/estateTransaction/bar?year=2015&type=1

### typeが無い
http://localhost:3000/api/v1/townPlanning/estateTransaction/bar?year=2015&prefCode=13

### 全パラメータが無い
http://localhost:3000/api/v1/townPlanning/estateTransaction/bar

### yearが最小値未満
http://localhost:3000/api/v1/townPlanning/estateTransaction/bar?year=2014&prefCode=13&type=1

### yearが最大値超過
http://localhost:3000/api/v1/townPlanning/estateTransaction/bar?year=2019&prefCode=13&type=1

### yearが小数
http://localhost:3000/api/v1/townPlanning/estateTransaction/bar?year=2015.5&prefCode=13&type=1

### prefCodeが範囲外
http://localhost:3000/api/v1/townPlanning/estateTransaction/bar?year=2015&prefCode=7&type=1

### prefCodeが範囲外
http://localhost:3000/api/v1/townPlanning/estateTransaction/bar?year=2015&prefCode=15&type=1

### prefCodeが整数でない
http://localhost:3000/api/v1/townPlanning/estateTransaction/bar?year=2015&prefCode=tokyo&type=1

### typeが範囲外
http://localhost:3000/api/v1/townPlanning/estateTransaction/bar?year=2015&prefCode=13&type=0

### typeが範囲外
http://localhost:3000/api/v1/townPlanning/estateTransaction/bar?year=2015&prefCode=13&type=3

### typeが整数でない
http://localhost:3000/api/v1/townPlanning/estateTransaction/bar?year=2015&prefCode=13&type=residential
```
