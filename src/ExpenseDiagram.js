import React from 'react';


export function ExpenseDiagram(props) {
    const {group} = props; 
    return (
        <div>
        {/* print list of group members*/}
            <p>{(() => { let text = group.groupMembers[0].name;
                        for (let i = 1; i < group.groupMembers.length; i++) {
                               text += ", " + group.groupMembers[i].name;
                        }
                        return text;})()}        
           </p>
        </div>)

}


export default ExpenseDiagram;
