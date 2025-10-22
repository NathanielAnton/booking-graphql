import { PrismaClient, Role, BookingStatus, EventStatus } from '@prisma/client'
import { faker } from '@faker-js/faker'

const prisma = new PrismaClient()

async function main() {
  const services = await prisma.service.createMany({
    data: Array.from({ length: 5 }).map(() => ({
      name: faker.commerce.productName(),
      category: faker.commerce.department(),
      duration: faker.number.int({ min: 15, max: 120 }),
      price: parseFloat(faker.commerce.price({ min: 20, max: 150 })),
    })),
  })

  console.log('✅ Services créés.')

  const users = await Promise.all(
    Array.from({ length: 10 }).map(async () =>
      prisma.user.create({
        data: {
          firstName: faker.person.firstName(),
          lastName: faker.person.lastName(),
          email: faker.internet.email(),
          role: Role.INTERVENANT,
          createdAt: faker.date.past({ years: 1 }),
        },
      })
    )
  )

  console.log('✅ Utilisateurs créés.')

  const availabilities = await Promise.all(
    users.flatMap(user =>
      Array.from({ length: 3 }).map(() =>
        prisma.availability.create({
          data: {
            intervenantId: user.id,
            dayOfWeek: faker.number.int({ min: 0, max: 6 }),
            startTime: `${faker.number.int({ min: 8, max: 10 })}:00`,
            endTime: `${faker.number.int({ min: 16, max: 18 })}:00`,
            isAvailable: faker.datatype.boolean(),
          },
        })
      )
    )
  )

  console.log('✅ Availabilities créées.')

  const events = await Promise.all(
    users.map(user =>
      prisma.event.create({
        data: {
          intervenantId: user.id,
          title: faker.lorem.words(3),
          description: faker.lorem.sentence(),
          startDate: faker.date.soon({ days: 30 }),
          endDate: faker.date.soon({ days: 40 }),
          location: faker.location.streetAddress(),
          status: EventStatus.PLANNED,
        },
      })
    )
  )

  console.log('✅ Événements créés.')

  const serviceIds = (await prisma.service.findMany({ select: { id: true } })).map(s => s.id)
  
  const offerings = await Promise.all(
    Array.from({ length: 15 }).map(async () =>
      prisma.serviceOffering.create({
        data: {
          serviceId: faker.helpers.arrayElement(serviceIds),
          intervenantId: faker.helpers.arrayElement(users).id,
        },
      })
    )
  )

  console.log('✅ Offres de service créées.')

  await Promise.all(
    Array.from({ length: 30 }).map(async () => {
      const client = faker.helpers.arrayElement(users)
      const intervenant = faker.helpers.arrayElement(users.filter(u => u.id !== client.id))
      const event = faker.helpers.arrayElement(events.filter(e => e.intervenantId === intervenant.id))
      const availability = faker.helpers.arrayElement(availabilities.filter(a => a.intervenantId === intervenant.id))

      return prisma.booking.create({
        data: {
          clientId: client.id,
          intervenantId: intervenant.id,
          eventId: event.id,
          availabilityId: availability.id,
          status: faker.helpers.arrayElement([BookingStatus.PENDING, BookingStatus.CONFIRMED, BookingStatus.CANCELLED]),
          createdAt: faker.date.past({ years: 1 }),
        },
      })
    })
  )

  console.log('✅ Réservations créées.')
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })