import type { UseFormReturn } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import merge from 'lodash.merge'
import { pick, shake } from 'radash'
import { useCallback, useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

function getSchemaKeys(schema: z.ZodType): string[] {
  if (schema instanceof z.ZodObject)
    return Object.keys(schema.shape)
  return []
}

export function useSchemaPatch<T extends z.ZodType>(schema: T, data?: Record<string, any>) {
  const form = useForm({
    defaultValues: data,
    resolver: zodResolver(schema as any),
    mode: 'onChange',
  })
  const keys = useMemo(() => getSchemaKeys(schema), [schema])
  const [_dto, _setDto] = useState(pick(data || {}, keys) as Record<string, any>)

  const _patch = useCallback(
    (v: any) => {
      _setDto(dto => shake(pick(merge(dto, v), keys)))
    },
    [keys],
  )

  return {
    form: form as unknown as UseFormReturn<any>,
    dto: _dto as z.infer<T>,
    patch: _patch,
  }
}
