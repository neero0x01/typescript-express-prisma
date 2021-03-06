import express, {Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'

const PORT = process.env.PORT || 3000
const app = express()
const prisma = new PrismaClient()

app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.get('/', (req: Request, res: Response) => {
  res.send('Server is running')
})

app.get('/products', async (req: Request, res: Response) => {
  const products = await prisma.product.findMany({
    select: {
      name: true,
      reviews: {
        select: {
          text: true,
          rating: true
        }
      }
    }
  })
  res.json({ products })
})

app.post('/products', async (req: Request, res: Response) => {
  const { name, price, description } = req.body;
  const product = await prisma.product.create({
    data: {
      name,
      description,
      price
    }
  })
  res.json({ product })
})

app.post('/reviews', async (req: Request, res: Response) => {
  const { text, rating, productId } = req.body;
  const review = await prisma.review.create({
    data: {
      text,
      rating,
      product: {
        connect: {
          id: productId
        }
      }
    }
  })
  res.json({ review })
})

app.listen(PORT, () => console.error(`Express Server running on http://localhost:${PORT}`))
