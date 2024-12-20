import type { SupabaseProviderMetadata } from './types.js'

/**
 * Get the direct database url for a given Supabase project.
 */
export function getDatabaseUrl(params: {
  project: SupabaseProviderMetadata['project']
  databaseUser?: string
  databasePassword?: string
}) {
  const user = params.databaseUser ?? params.project.database.user
  const password = params.databasePassword ?? '[YOUR-PASSWORD]'

  const { database } = params.project

  return `postgresql://${user}:${password}@${database.host}:${database.port}/${database.name}`
}

/**
 * Get the pooler url for a given Supabase project.
 */
export function getPoolerUrl(params: {
  project: SupabaseProviderMetadata['project']
  databaseUser?: string
  databasePassword?: string
}) {
  const user = params.databaseUser
    ? params.project.pooler.user.replace('postgres', params.databaseUser)
    : params.project.pooler.user
  const password = params.databasePassword ?? '[YOUR-PASSWORD]'

  const { pooler } = params.project

  return `postgresql://${user}:${password}@${pooler.host}:${pooler.port}/${pooler.name}`
}
