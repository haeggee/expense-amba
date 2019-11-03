# team42

Some notes.

When we eventually implement the online DB stuff, we have to think about synchronization. For example, if user A creates a new group, and user B creates a new group at the same time, there needs to be a way to guarantee that the groupID of the groups that they created are unique. 

One way of doing this may be to have an integer stored in the DB that gets incremented whenever a new group is created. 

But for now I am just going to generate a unique id by going through all the groups in the array and generating one that is not used by any.


Also need to do this: for the group, bill, and payment dialogs (or anything else requiring input from user) make sure that the input is valid before accepting.

Also note that as of right now, GroupList component works by treating the groupID of a group to compare to selectedIndex. This may not work when the groupIDs are not continuous, like {1, 3, 6, 7, 2}.

Need to figure out how to indicate in each bill who pays how much. Because as of right now, each payee owes the same amount in a bill.
