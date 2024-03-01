import {
  Listener,
  Subjects,
  ExpirationCompleteEvent,
} from "@summerivetickets/common";
import { Message } from "node-nats-streaming";
import { queueGroupName } from "./queueGroupName";
import { Order } from "../../models/order";
import { OrderStatus } from "@summerivetickets/common";
import { OrderCancelledPublisher } from "../publisher/order-cancelled-publisher";
import { natsWrapper } from "../../nats-wrapper";

export class ExpirationCompleteListener extends Listener<ExpirationCompleteEvent> {
  subject: Subjects.ExpirationComplete = Subjects.ExpirationComplete;
  queueGroupName = queueGroupName;

  async onMessage(data: ExpirationCompleteEvent["data"], msg: Message) {
    const order = await Order.findById(data.orderId).populate("ticket");

    if (!order) {
      throw new Error("Order not found");
    }
    if (order.status === OrderStatus.Complete) {
      return msg.ack();
    }

    order.set({
      status: OrderStatus.Cancelled,
    });
    await order.save();

    await new OrderCancelledPublisher(natsWrapper.client).publish({
      id: order.id,
      version: order.version,
      ticket: {
        id: order.ticket.id,
      },
    });

    msg.ack();
  }
}
