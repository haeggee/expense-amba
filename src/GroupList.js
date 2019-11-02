import React from 'react';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import { CustomButton, CustomHeader } from "./GUI/Theme";

import { uid } from 'react-uid';

export function GroupList(props) {
  const { groups, groupID, handleListItemClick } = props;

  return (
    <div className='GroupList'>
      <List component="nav">
        {groups.map((group) => {
          return (
            /* every list item needs a specific key to be identifiable, therefore use react uid */
            <ListItem key={uid(group)}
              button
              selected={group.groupID == groupID} /* highlights selected group*/
              onClick={event => handleListItemClick(event, group.groupID)}
            >
              <ListItemIcon>
                {/* use first two letters as short avatar left of name*/}
                <Avatar>{group.name.substring(0, 2).toUpperCase()}</Avatar>
              </ListItemIcon>

              <ListItemText primary={group.name} />
            </ListItem>
          )
        })}

      </List>
    </div>
  )
}


export default GroupList;
