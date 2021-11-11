import { ReserveDto } from 'src/dtos/reserve.dto';
import { RepositoryValidators } from 'src/helpers/repositoryValidators';
import Models from 'src/database/models';
import { ReturnError } from 'src/helpers/returnError';

class ReserveRepository extends RepositoryValidators {
  public async get (id: string): Promise<any> {
    return await Models.Reserve.findByPk(id, {
      include: [
        {
          model: Models.Ticket,
          as: 'ticket',
          attributes: ['id', 'quantity']
        }
      ]
    });
  }

  public async list (userId: number, ticketId?: number): Promise<any> {
    const query: any = {
      where: {}
    };
    if (ticketId) {
      query.where.ticketId = ticketId;
    } else {
      query.where.userId = userId;
    }
    const reserves = await Models.Reserve.findAll(query);
    if (!reserves || !reserves.length) {
      throw new ReturnError(404, 'Erro ao listar reservas', [
        {
          message: 'Reservas não encontradas',
          field: 'ticketId or userId'
        }
      ]);
    }
    return reserves;
  }

  public async create (reserve: ReserveDto): Promise<any> {
    return await Models.Reserve.create(reserve);
  }

  public async update (reserve: ReserveDto): Promise<void> {
    return await Models.Reserve.update(reserve, {
      where: { id: reserve.id }
    });
  }
}

export default new ReserveRepository(Models.Reserve);
