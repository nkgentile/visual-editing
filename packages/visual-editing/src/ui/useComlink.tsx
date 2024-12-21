import {
  createCompatibilityActors,
  type VisualEditingControllerMsg,
  type VisualEditingNodeMsg,
} from '@repo/visual-editing-helpers'
import {createNode, createNodeMachine} from '@sanity/comlink'
import {useEffect, useState} from 'react'
import type {VisualEditingNode} from '../types'

/**
 * Hook for maintaining a channel between overlays and the presentation tool
 * @internal
 */
export function useComlink(active: boolean = true): VisualEditingNode | undefined {
  const [node, setNode] = useState<VisualEditingNode>()

  useEffect(() => {
    if (!active) {
      // eslint-disable-next-line no-console
      console.count('useComlink inactive')
      return
    }
    // eslint-disable-next-line no-console
    console.count('useComlink active')
    const instance = createNode<VisualEditingNodeMsg, VisualEditingControllerMsg>(
      {
        name: 'visual-editing',
        connectTo: 'presentation',
      },
      createNodeMachine<VisualEditingNodeMsg, VisualEditingControllerMsg>().provide({
        actors: createCompatibilityActors<VisualEditingNodeMsg>(),
      }),
    )

    const stop = instance.start()
    // Wait with forwarding the comlink until the connection is established
    const unsubscribe = instance.onStatus(() => {
      // eslint-disable-next-line no-console
      console.count('comlink.onStatus')
      setNode(instance)
    }, 'connected')

    return () => {
      unsubscribe()
      stop()
      setNode(undefined)
    }
  }, [active])

  return node
}
