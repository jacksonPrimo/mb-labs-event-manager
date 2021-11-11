import { TicketDto } from 'src/dtos/ticket.dto';
import { ReturnError } from 'src/helpers/returnError';
import { RepositoryValidators } from 'src/helpers/repositoryValidators';
import Models from 'src/database/models';

class TicketRepository extends RepositoryValidators {
  public async getTicket (id: number, errorMessage: string): Promise<TicketDto> {
    const foundTicket = await Models.Ticket.findByPk(id);
    if (!foundTicket) {
      throw new ReturnError(404, errorMessage, [
        {
          message: 'bilhete não encontrado',
          field: 'id'
        }
      ]);
    }
    return foundTicket;
  }

  public async create (ticket: TicketDto): Promise<any> {
    const errorMessage = 'Erro ao cadastrar bilhete';
    this.verifyRequiredFields({
      eventId: ticket.eventId,
      title: ticket.title,
      value: ticket.value,
      description: ticket.description,
      beginTicket: ticket.quantity
    }, errorMessage);
    if (ticket.value <= 0) {
      throw new ReturnError(400, errorMessage, [
        {
          message: 'O valor do bilhete não pode ser negativo ou zero',
          field: 'value'
        }
      ]);
    }
    if (ticket.quantity <= 0) {
      throw new ReturnError(400, errorMessage, [
        {
          message: 'A quantidade de bilhetes não pode ser negativo ou zero',
          field: 'quantity'
        }
      ]);
    }
    const TicketCreated = await Models.Ticket.create(ticket);
    return { id: TicketCreated.id };
  }

  public async update (ticket: TicketDto, id: string): Promise<void> {
    const errorMessage = 'Erro ao atualizar bilhete!';
    this.verifyNullFields(ticket, errorMessage);
    await this.getTicket(+id, errorMessage);
    await Models.Ticket.update(ticket, {
      where: { id }
    });
  }

  public async delete (ticketId: string) {
    await this.getTicket(+ticketId, 'Erro ao deletar bilhete');
    return await Models.Ticket.destroy({
      where: {
        id: ticketId
      }
    });
  }
}

export default new TicketRepository(Models.Ticket);
