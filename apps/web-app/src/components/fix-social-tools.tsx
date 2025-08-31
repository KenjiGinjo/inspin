import type { ICharacterBase } from '@inspin/interfaces'
import { IconHonourFill, IconStarFill, IconStarLine } from '@inspin/svg'
import { useSelector } from '@legendapp/state/react'
import { navigate } from 'wouter/use-browser-location'
import { $qc } from '@/query-client'
import { stateSocial } from '@/states'
import { Request } from './request'

const iconClassName = 'flex items-center justify-center bg-white rounded shadow p-1 border border-gray-200 border-solid'

export function FixSocialTools({ data }: { data: ICharacterBase }) {
  const social = useSelector(() => stateSocial.get(data.id))

  return (

    <div
      className="fixed bottom-[30%] right-2 z-10 "
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
    >
      <div className="flex flex-col gap-2 text-gray-700">
        <div
          className={iconClassName}
          onClick={() => {
            navigate(`/contributors/${data.id}`)
          }}
        >
          <IconHonourFill className="size-6" />
        </div>

        {social.isCollect
          ? (

              <Request
                showLoading
                request={() => $qc.character[':characterId'].uncollect.$put.mutation({
                  params: {
                    characterId: data.id,
                  },
                })}
                onSuccess={() => {
                  stateSocial.uncollect(data.id)
                }}
              >
                <div className={iconClassName}>
                  <IconStarFill className="size-6 text-yellow-500" />
                </div>
              </Request>
            )
          : (
              <Request
                showLoading
                request={() => $qc.character[':characterId'].collect.$put.mutation({
                  params: {
                    characterId: data.id,
                  },
                })}
                onSuccess={() => {
                  stateSocial.collect(data.id)
                }}
              >
                <div className={iconClassName}>
                  <IconStarLine className="size-6" />
                </div>
              </Request>
            )}

      </div>

    </div>
  )
}
