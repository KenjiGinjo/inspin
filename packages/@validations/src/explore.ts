import { z } from 'zod'

export const vExploreListQuery = z.object({
  orderBy: z.enum(['latest', 'mostView']),
  genre: z.string().optional(),
  name: z.string().optional(),
})
export type vExploreListQuery = z.infer<typeof vExploreListQuery>
