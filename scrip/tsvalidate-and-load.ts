import fs from 'fs'
import path from 'path'
import { z } from 'zod'

const workspace = process.argv[2]
const network = process.argv[3] || 'mainnet'

const configPath = path.resolve(__dirname, `../configs/${workspace}/${network}.json`)
const fallbackConfigPath = path.resolve(__dirname, `../configs/fallback/${network}.json`)
const questPath = path.resolve(__dirname, `../quests/${workspace}/${network}.json`)

const ConfigSchema = z.object({
  rpcUrl: z.string().url(),
  contractAddress: z.string().min(1),
  apiKey: z.string().min(1),
  features: z.object({
    quests: z.boolean(),
    badges: z.boolean()
  })
})

const QuestSchema = z.object({
  version: z.number(),
  quests: z.array(z.object({
    id: z.string(),
    title: z.string(),
    summary: z.string(),
    steps: z.array(z.object({
      id: z.string(),
      type: z.string(),
      required: z.boolean().optional()
    })),
    rewards: z.object({
      badge: z.string().optional(),
      points: z.number().optional()
    })
  }))
})

function loadJson(filePath: string) {
  if (!fs.existsSync(filePath)) return null
  return JSON.parse(fs.readFileSync(filePath, 'utf-8'))
}

const config = loadJson(configPath) || loadJson(fallbackConfigPath)
const quests = loadJson(questPath)

try {
  ConfigSchema.parse(config)
  console.log(`✅ Valid config for ${workspace}/${network}`)
} catch {
  console.error(`❌ Invalid config for ${workspace}/${network}`)
  process.exit(1)
}
