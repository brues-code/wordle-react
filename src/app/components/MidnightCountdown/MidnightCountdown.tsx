import React, { useCallback, useMemo } from 'react'
import Countdown, { CountdownRendererFn } from 'react-countdown'
import { useIntl } from 'react-intl'

import { getMidnightStamp } from 'utils'

import { CountdownContainer } from './styles'

const MidnightCountdown = () => {
    const { formatMessage } = useIntl()
    const midnightStamp = useMemo(getMidnightStamp, [])

    const formatTime = useCallback(
        (time: number) => (time > 9 ? time : `0${time}`),
        []
    )

    const renderer: CountdownRendererFn = useCallback(
        ({ hours, minutes, seconds, completed }) => (
            <span>
                {completed
                    ? formatMessage({ id: 'countdown.complete' })
                    : formatMessage(
                          { id: 'countdown.remainingTime' },
                          {
                              hours: formatTime(hours),
                              minutes: formatTime(minutes),
                              seconds: formatTime(seconds),
                          }
                      )}
            </span>
        ),
        [formatTime, formatMessage]
    )

    return (
        <CountdownContainer>
            <Countdown date={midnightStamp} renderer={renderer} />
        </CountdownContainer>
    )
}

export default MidnightCountdown