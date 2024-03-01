import nats, { Stan } from "node-nats-streaming";

class NatsWrapper {
  private _client?: Stan;

  // get関数(:getter)によってclientプロパティが定義される。このファイルのimport先でnatsWrapper.clientと記述するとclientプロパティにアクセスできる。
  // したがって先にnatsWrapper.connect(~~~)せずにnatsWrapper.clientでclient
  get client() {
    if (!this._client) {
      throw new Error("Cannot access NATS client before connecting");
    }
    // clientにアクセスしたとき、this._clientが定義されていない、つまり下のconnect関数で接続が確立される前の状態の際には_clientではなくエラーを返すように設定している。
    return this._client;
  }

  connect(clusterId: string, clientId: string, url: string) {
    this._client = nats.connect(clusterId, clientId, { url });

    // this.clientはclientのgetterを呼び出すため、これはつまりthis.client => this._clientとなる。
    // あたかもclientプロパティが最初からあったように使っているが、実際にはthis.clientが実行されたタイミングでthis.clientが生成され、this._clientが代入されたことになる。
    return new Promise<void>((resolve, reject) => {
      this.client.on("connect", () => {
        console.log("Connected to NATS");
        resolve();
      });
      this.client.on("error", (err) => {
        reject(err);
      });
    });
  }
}

export const natsWrapper = new NatsWrapper();
