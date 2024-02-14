import type { RecordModel } from "pocketbase"

interface Effect {
  name: string,
  effect: string
}

interface BaseSkill {
  name: string,
  mastery: number,
}

interface FavourableSkill extends BaseSkill {
  favourable: boolean
}

export interface PremadeCharacter extends RecordModel {
  first_name: string
  last_name: string
  age: number
  heroic_culture: string
  particularities: string
  description: string
  stamina: number
  hope: number
  defense: number
  valour: number
  wisdom: number
  rewards: Effect[],
  virtues: Effect[],
  travelling_equipment: Effect[],
  image: string
  body: number
  heart: number
  spirit: number
  skills: FavourableSkill[]
  combat_skills: BaseSkill[]
}

export interface Character extends PremadeCharacter {
  campaign: string
  current_stamina: number
  current_load: number
  current_fatigue: number
  current_hope: number
  status: string
  user: string
}
