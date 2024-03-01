import { Listener } from "../../../common/src/events/base-listener";
import { Message } from "node-nats-streaming";
import { TicketCreatedEvent } from "../../../common/src/events/ticket-created-events";
import { Subjects } from "../../../common/src/events/subject";

export class TicketCreatedListener extends Listener<TicketCreatedEvent> {
  subject: Subjects.TicketCreated = Subjects.TicketCreated; // : Subjects.TicketCreatedを記述することで、型をSubjects.TicketCreatedから変更しないことを宣言している。
  // TicketCreatedEventの内側で宣言されたsubject、つまりSubjects.TicketCreated以外がsubjectの型として宣言されると、TSが警告してくれる。
  queueGroupName = "payment-service";

  onMessage(data: TicketCreatedEvent["data"], msg: Message) {
    console.log("Event data!", data);

    console.log(data.id);
    console.log(data.title);
    console.log(data.price);

    msg.ack();
  }
}
