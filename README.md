# EC WebService

## About this service

この web アプリケーションでは、C2C を想定した ES サービスを提供する。
ユーザーはチケットをオンラインで出品、購入することが可能。
支払い方法にはクレジットカードを利用する。

このサービスでは主に以下の機能をサポートしている。

- Authentication
  - Signup
  - Signin
  - Signout
- Item control
  - Create a new item
- Purchase
  - Order an item
  - Make a payment for an item
  - View order log

## Service overview

この web サービスは Microservices アーキテクチャを採用しており、個別のサービスが独立したサーバーや DB を保持し、連携することでサービスを構成している。
具体的なサービス構成は以下の通り。

- Client
- Auth
- Tickets
- Orders
- Payments
- Expiration

上記の独立したサービスは連携や同一性の担保にあたり、NATS Streaming Server によって構築される Pub-Sub タイプのイベントバスを通して Event データを送受信する。
各サービスはそれぞれ Kubernetes cluster の中に展開され、Ingress Nginx を介して外部からの通信を受け付けている。

### DB structure

![system overview](/design/images/system_overview.drawio.png)

## Client service

### Overview

Client サービスは React app を提供しており、UI の他に Next.js による Routing や各サービスへ HTTP リクエストを送るための機能を備えている。

## Auth service

### Overview

Auth サービスはユーザーの signup/signin/signout を実現する。

### DB structure

![auth data model](/design/images/auth_data.png)

## Tickets service

### Overview

Ticket サービスではチケットの新規作成を行う。
チケットが購入プロセスに入ると、チケットの表示をブロックする。

### DB structure

![tickets data model](/design/images/tickets_data.png)

## Order service

### Overview

チケットが購入プロセスに入ると、10 分間チケットをロックする。

### DB structure

![order data model](/design/images/orders_data.png)

## Payment service

### Overview

決済処理を行う。
決済に失敗した場合は order をキャンセルし、成功した場合は完了させる。

### DB structure

![payment data model](/design/images/Payments_data.png)

## Expiration service

### Overview

Order が作成されるのを待っており、10 分経過後の自動でキャンセルする。
