import { PrismaClient } from '@prisma/client'

let postgres_client = new PrismaClient()

export default postgres_client