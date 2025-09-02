import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting database seeding...')

  // Clean up expired cache entries
  const deletedCache = await prisma.contentCache.deleteMany({
    where: {
      expiresAt: {
        lt: new Date()
      }
    }
  })
  console.log(`🧹 Cleaned up ${deletedCache.count} expired cache entries`)

  // Create some sample content cache entries for performance
  const sampleCacheEntries = [
    {
      key: 'subjects:fy:comps:odd',
      data: { cached: true, timestamp: new Date() },
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 hours
    },
    {
      key: 'subjects:sy:it:even',
      data: { cached: true, timestamp: new Date() },
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 hours
    }
  ]

  for (const entry of sampleCacheEntries) {
    await prisma.contentCache.upsert({
      where: { key: entry.key },
      update: entry,
      create: entry
    })
  }

  console.log(`✅ Created ${sampleCacheEntries.length} sample cache entries`)

  // Create database indexes for performance (these should ideally be in migration files)
  console.log('📈 Database indexes are defined in schema.prisma')

  console.log('🎉 Database seeding completed successfully!')
}

main()
  .catch((e) => {
    console.error('❌ Error during database seeding:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })