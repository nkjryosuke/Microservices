import {
  Publisher,
  Subjects,
  TicketCreatedEvent,
} from "@summerivetickets/common";

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  subject: Subjects.TicketCreated = Subjects.TicketCreated;
}
