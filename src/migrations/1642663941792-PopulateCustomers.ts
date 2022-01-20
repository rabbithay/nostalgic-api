import {MigrationInterface, QueryRunner} from "typeorm";

const customers = [
    {
      name: 'Samuel Otávio Araújo',
      cpf: '91558203010',
      birthdate: '2007-12-18'
    },
    {
      name: 'Raimundo César Moreira',
      cpf: '68659538005',
      birthdate: '1999-09-11',
    },
    {
      name: 'Vitor Matheus da Luz',
      cpf: '22029344052',
      birthdate: '1980-08-25',
    },
    {
      name: 'Carla Teresinha Vitória Gonçalves',
      cpf: '54295769215',
      birthdate: '1991-01-10',
    },
    {
      name: 'Hugo César Rodrigues',
      cpf: '10835062422',
      birthdate: '2002-02-15',
    },
    {
      name: 'Sophia Sebastiana Manuela Oliveira',
      cpf: '36399586836',
      birthdate: '2003-07-04',
    },
    {
      name: 'Lucas Tiago Anderson Viana',
      cpf: '06933225607',
      birthdate: '1970-08-30',
    },
    {
      name: 'Emanuelly Jéssica',
      cpf: '63327275866',
      birthdate: '1998-04-13',
    },
    {
      name: 'Cauã Rodrigo Luiz Viana',
      cpf: '19914541127',
      birthdate: '1975-03-22',
    },
    {
      name: 'José Silva Olveira',
      cpf: '77995677243',
      birthdate: '2000-12-10',
    },
];

export class PopulateCustomers1642663941792 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        customers.forEach( async (customer)=>{                
            await queryRunner.query(`
                INSERT INTO customers 
                (name, cpf, birthdate)
                VALUES
                ($1, $2, $3)
            `, [customer.name, customer.cpf, customer.birthdate]);
        })
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DELETE FROM customers
        `)
    }
}
