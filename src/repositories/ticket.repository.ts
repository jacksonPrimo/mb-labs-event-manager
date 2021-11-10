import { TicketDto } from 'src/dtos/ticket.dto';
import { ReturnError } from 'src/helpers/returnError';
import { RepositoryValidators } from 'src/helpers/repositoryValidators';
import Models from 'src/database/models';

class TicketRepository extends RepositoryValidators {
  private async getTicket (id: number): Promise<TicketDto> {
    return await Models.Ticket.findByPk(id);
  }

  public async create (ticket: TicketDto): Promise<any> {
    const errorMessage = 'Erro ao cadastrar bilhete';
    this.verifyRequiredFields({
      eventId: ticket.eventId,
      title: ticket.title,
      description: ticket.description,
      beginTicket: ticket.quantity
    }, errorMessage);
    const TicketCreated = await Models.Ticket.create(ticket);
    return { id: TicketCreated.id };
  }

  public async update (ticket: TicketDto, id: string): Promise<void> {
    const errorMessage = 'Erro ao atualizar bilhete!';
    this.verifyNullFields(ticket, errorMessage);
    const foundTicket = this.getTicket(Number(id));
    if (!foundTicket) {
      throw new ReturnError(404, errorMessage, [
        {
          message: 'bilhete não encontrado',
          field: 'id'
        }
      ]);
    }
    await Models.Ticket.update(ticket, {
      where: { id }
    });
  }

  public async delete (TicketId: string) {
    const foundTicket = this.getTicket(Number(TicketId));
    if (!foundTicket) {
      throw new ReturnError(404, 'Erro ao apagar bilhete!', [
        {
          message: 'bilhete não encontrado',
          field: 'id'
        }
      ]);
    }
    return await Models.Ticket.destroy({
      where: {
        id: TicketId
      }
    });
  }
}

export default new TicketRepository(Models.Ticket);
