import { EventDto } from 'src/dtos/event.dto';
import { ReturnError } from 'src/helpers/returnError';
import { RepositoryValidators } from 'src/helpers/repositoryValidators';
import Models from 'src/database/models';

class EventRepository extends RepositoryValidators {
  private async getEvent (id: number): Promise<EventDto> {
    return await Models.Event.findByPk(id);
  }

  public async create (event: EventDto): Promise<any> {
    const errorMessage = 'Erro ao cadastrar evento';
    this.verifyRequiredFields({
      userId: event.userId,
      title: event.title,
      description: event.description,
      beginEvent: event.beginEvent,
      endEvent: event.endEvent
    }, errorMessage);
    const EventCreated = await Models.Event.create(event);
    return { id: EventCreated.id };
  }

  public async update (event: EventDto, id: string): Promise<void> {
    const errorMessage = 'Erro ao atualizar evento!';
    this.verifyNullFields(event, errorMessage);
    const foundEvent = this.getEvent(Number(id));
    if (!foundEvent) {
      throw new ReturnError(404, errorMessage, [
        {
          message: 'evento não encontrado',
          field: 'id'
        }
      ]);
    }
    await Models.Event.update(event, {
      where: { id }
    });
  }

  public async list (userId: number): Promise<EventDto[]> {
    const events = await Models.Event.findAll({
      where: {
        userId
      }
    });
    if (!events.length) {
      throw new ReturnError(404, 'Erro ao listar eventos!', [
        {
          message: 'Eventos não encontrados',
          field: 'userId'
        }
      ]);
    }
    return events;
  }

  public async delete (eventId: string, userId: number) {
    const foundEvent = this.getEvent(Number(eventId));
    if (!foundEvent) {
      throw new ReturnError(404, 'Erro ao apagar evento!', [
        {
          message: 'Evento não encontrado',
          field: 'id'
        }
      ]);
    }
    return await Models.Event.destroy({
      where: {
        id: eventId,
        userId
      }
    });
  }
}

export default new EventRepository(Models.Event);
