import express, {Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'

const PORT = process.env.PORT || 3000
const app = express()
const prisma = new PrismaClient()

app.get('/', (req: Request, res: Response) => {
  res.send('Server is running')
})

app.get('/products', async (req: Request, res: Response) => {
  const products = await prisma.product.findMany()
  res.json({ products })
})

app.listen(PORT, () => console.error(`Express Server running on http://localhost:${PORT}`))
