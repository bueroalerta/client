// @flow
import React, {PureComponent} from 'react'
import {Text, Markdown, Box, Meta} from '../../../../common-adapters'
import {
  globalStyles,
  globalColors,
  globalMargins,
  styleSheetCreate,
  collapseStyles,
  lineHeight,
} from '../../../../styles'
import {isMobile, isAndroid} from '../../../../constants/platform'

type Props = {
  backgroundColor: ?string,
  participantNeedToRekey: boolean,
  showBold: boolean,
  snippet: ?string,
  subColor: ?string,
  youNeedToRekey: boolean,
  youAreReset: boolean,
  hasResetUsers: boolean,
}

class BottomLine extends PureComponent<Props> {
  render() {
    const {
      participantNeedToRekey,
      youNeedToRekey,
      showBold,
      subColor,
      snippet,
      backgroundColor,
      hasResetUsers,
      youAreReset,
    } = this.props
    let content

    if (youNeedToRekey) {
      content = (
        <Box
          style={{
            alignSelf: 'center',
            backgroundColor: globalColors.red,
            borderRadius: 2,
            paddingLeft: globalMargins.xtiny,
            paddingRight: globalMargins.xtiny,
          }}
        >
          <Text
            type="BodySmallSemibold"
            backgroundMode="Terminal"
            style={{
              color: globalColors.white,
              fontSize: 11,
              lineHeight: lineHeight(14),
            }}
          >
            REKEY NEEDED
          </Text>
        </Box>
      )
    } else if (youAreReset) {
      content = (
        <Text
          type="BodySmallSemibold"
          backgroundMode="Terminal"
          style={{
            color: globalColors.red,
            fontSize: 11,
            lineHeight: lineHeight(14),
          }}
        >
          You have to be let back in.
        </Text>
      )
    } else if (participantNeedToRekey) {
      content = (
        <Text type="BodySmall" backgroundMode="Terminal" style={{color: subColor}}>
          Waiting for participants to rekey
        </Text>
      )
    } else if (snippet) {
      const baseStyle = styles['bottomLine']

      let style

      if (subColor !== globalColors.black_40 || showBold) {
        style = collapseStyles([
          baseStyle,
          {
            color: subColor,
            ...(showBold ? globalStyles.fontBold : {}),
          },
        ])
      } else {
        style = baseStyle
      }

      content = (
        <Markdown preview={true} style={style}>
          {snippet}
        </Markdown>
      )
    } else {
      return null
    }

    const height = isMobile ? (isAndroid ? 19 : 16) : 17
    return (
      <Box
        style={{
          ...globalStyles.flexBoxRow,
          alignItems: 'center',
          backgroundColor: isMobile ? backgroundColor : undefined,
          width: '100%',
          flexShrink: 0,
          height,
        }}
      >
        {hasResetUsers && <Meta title="RESET" style={resetStyle} />}
        <Box style={{flexGrow: 1, position: 'relative', height: '100%'}}>
          <Box
            style={{
              ...globalStyles.flexBoxRow,
              alignItems: 'flex-start',
              bottom: 0,
              justifyContent: 'flex-start',
              left: 0,
              position: 'absolute',
              right: 0,
              top: 0,
            }}
          >
            {content}
          </Box>
        </Box>
      </Box>
    )
  }
}

const resetStyle = {
  ...(isMobile ? {} : {display: 'block'}),
  alignSelf: 'center',
  backgroundColor: globalColors.red,
  marginRight: 6,
}

const noWrapStyle = {
  display: 'block',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  width: '100%',
}

const mobileBottomLineCommon = {
  color: globalColors.black_40,
  fontSize: 13,
  lineHeight: lineHeight(17),
  marginTop: 2,
  paddingRight: 30,
}

const mobileBottomLine = isAndroid
  ? {
      ...mobileBottomLineCommon,
      lineHeight: undefined,
    }
  : mobileBottomLineCommon

const styles = styleSheetCreate({
  bottomLine: isMobile
    ? mobileBottomLine
    : {
        ...noWrapStyle,
        color: globalColors.black_40,
        fontSize: 11,
        lineHeight: lineHeight(15),
        minHeight: 15,
        paddingRight: 30,
      },
})

export {BottomLine}
