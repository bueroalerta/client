// @flow
import * as React from 'react'
import {ClickableBox, Icon, Avatar, Badge, Box, Divider, Text, Meta} from '../../common-adapters'
import {globalMargins, globalStyles, globalColors, isMobile} from '../../styles'

import type {Teamname} from '../../constants/types/teams'

export type Props = {
  teamnames: Array<Teamname>,
  teammembercounts: {[string]: number},
  teamNameToIsOpen: {[string]: boolean},
  newTeams: Array<Teamname>,
  newTeamRequests: Array<Teamname>,
  onOpenFolder: (teamname: Teamname) => void,
  onManageChat: (teamname: Teamname) => void,
  onViewTeam: (teamname: Teamname) => void,
}

type RowProps = {
  name: Teamname,
  membercount: number,
  isNew: boolean,
  isOpen: boolean,
  newRequests: number,
  onOpenFolder: ?() => void,
  onManageChat: ?() => void,
  onViewTeam: () => void,
}

const newCharmStyle = {
  backgroundColor: globalColors.orange,
  borderRadius: 1,
  marginRight: 4,
  alignSelf: 'center',
}

const openCharmStyle = {
  alignSelf: 'center',
  backgroundColor: globalColors.green,
  borderRadius: 1,
  marginLeft: 4,
  marginTop: 2,
}

const TeamRow = ({
  name,
  membercount,
  isNew,
  isOpen,
  newRequests,
  onOpenFolder,
  onManageChat,
  onViewTeam,
}: RowProps) => (
  <Box style={rowStyle}>
    <Box
      style={{
        ...globalStyles.flexBoxRow,
        alignItems: 'center',
        flex: 1,
        marginRight: globalMargins.tiny,
      }}
    >
      <ClickableBox style={{...globalStyles.flexBoxRow, alignItems: 'center', flex: 1}} onClick={onViewTeam}>
        <Avatar
          size={isMobile ? 48 : 32}
          teamname={name}
          isTeam={true}
          style={{marginLeft: globalMargins.tiny}}
        />
        <Box style={{...globalStyles.flexBoxColumn, flex: 1, marginLeft: globalMargins.small}}>
          <Box style={globalStyles.flexBoxRow}>
            <Text type="BodySemibold">{name}</Text>
            {isOpen && <Meta title="OPEN" style={openCharmStyle} />}
          </Box>
          <Box style={{...globalStyles.flexBoxRow, alignItems: 'center'}}>
            {!!newRequests && (
              <Badge badgeNumber={newRequests} badgeStyle={{marginLeft: 0, marginRight: 3, marginTop: 1}} />
            )}
            {isNew && <Meta title="NEW" style={newCharmStyle} />}
            <Text type="BodySmall">{membercount + ' member' + (membercount !== 1 ? 's' : '')}</Text>
          </Box>
        </Box>
      </ClickableBox>
      {!isMobile && onOpenFolder && <Icon type="iconfont-folder-private" onClick={onOpenFolder} />}
      {!isMobile &&
        onManageChat && (
          <Icon
            type="iconfont-chat"
            style={{marginLeft: globalMargins.small, marginRight: globalMargins.tiny}}
            onClick={onManageChat}
          />
        )}
    </Box>
    {!isMobile && <Divider style={{marginLeft: 48}} />}
  </Box>
)

const TeamList = (props: Props) => (
  <Box
    style={{
      ...globalStyles.flexBoxColumn,
      width: '100%',
    }}
  >
    {props.teamnames.map((name, index, arr) => (
      <TeamRow
        key={name}
        name={name}
        isNew={props.newTeams.includes(name)}
        isOpen={props.teamNameToIsOpen[name]}
        newRequests={props.newTeamRequests.filter(team => team === name).length}
        membercount={props.teammembercounts[name]}
        onOpenFolder={() => props.onOpenFolder(name)}
        onManageChat={() => props.onManageChat(name)}
        onViewTeam={() => props.onViewTeam(name)}
      />
    ))}
  </Box>
)

const rowStyle = {
  ...globalStyles.flexBoxColumn,
  flexShrink: 0,
  minHeight: isMobile ? 64 : 48,
}

export default TeamList
export {TeamRow}
