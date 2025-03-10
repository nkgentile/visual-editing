import {LaunchIcon} from '@sanity/icons'
import {Button, Text, Tooltip} from '@sanity/ui'
import {useCallback} from 'react'
import {useTranslation} from 'sanity'
import {presentationLocaleNamespace} from '../i18n'
import type {PreviewProps} from './Preview'

/** @internal */
export function OpenPreviewButton(
  props: Pick<PreviewProps, 'openPopup'> & {
    previewLocationOrigin: string
    previewLocationRoute: string
  },
): React.ReactNode {
  const {openPopup, previewLocationOrigin, previewLocationRoute} = props

  const {t} = useTranslation(presentationLocaleNamespace)

  const handleOpenPopup = useCallback(
    (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
      event.preventDefault()
      openPopup(event.currentTarget.href)
    },
    [openPopup],
  )

  return (
    <Tooltip
      animate
      content={<Text size={1}>{t('share-url.menu-item.open.text')}</Text>}
      fallbackPlacements={['bottom-start']}
      padding={2}
      placement="bottom"
      portal
    >
      <Button
        as="a"
        aria-label={t('share-url.menu-item.open.text')}
        fontSize={1}
        icon={LaunchIcon}
        mode="bleed"
        padding={2}
        href={`${previewLocationOrigin}${previewLocationRoute}`}
        // @ts-expect-error the `as="a"` prop isn't enough to change the type of event.target from <div> to <a>
        onClick={handleOpenPopup}
        rel="opener"
        target="_blank"
      />
    </Tooltip>
  )
}
