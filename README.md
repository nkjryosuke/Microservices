# EC WebService
## About this service
このwebアプリケーションでは、C2Cを想定したESサービスを提供する。
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
このwebサービスはMicroservicesアーキテクチャを採用しており、個別のサービスが独立したサーバーやDBを保持し、連携することでサービスを構成している。
具体的なサービス構成は以下の通り。
  - Client
  - Auth
  - Tickets
  - Orders
  - Payments
  - Expiration

上記の独立したサービスは連携や同一性の担保にあたり、NATS Streaming Serverによって構築されるPub-Subタイプのイベントバスを通してEventデータを送受信する。
各サービスはそれぞれKubernetes clusterの中に展開され、Ingress Nginxを介して外部からの通信を受け付けている。
![system overview](/design/images/system_overview.drawio.png)

## Client service
### Overview
ClientサービスはReact appを提供しており、UIの他にNext.jsによるRoutingや各サービスへHTTPリクエストを送るための機能を備えている。

## Auth service
### Overview
Authサービスはユーザーのsignup/signin/signoutを実現する。

## Items service
### Overview
Ticketサービスではチケットの新規作成を行う。
チケットが購入プロセスに入ると、チケットの表示をブロックする。

## Orders service
### Overview
チケットが購入プロセスに入ると、10分間チケットをロックする。

## Payments service
### Overview
決済処理を行う。
決済に失敗した場合はorderをキャンセルし、成功した場合は完了させる。

## Expiration service
### Overview
Orderが作成されるのを待っており、10分経過後の自動でキャンセルする。
