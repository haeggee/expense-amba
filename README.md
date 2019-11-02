# team42

Some notes.

When we eventually implement the online DB stuff, we have to think about synchronization. For example, if user A creates a new group, and user B creates a new group at the same time, there needs to be a way to guarantee that the groupID of the groups that they created are unique. 

One way of doing this may be to have an integer stored in the DB that gets incremented whenever a new group is created. 

But for now I am just going to generate a unique id by going through all the groups in the array and generating one that is not used by any.


Also need to do this: for the group, bill, and payment dialogs (or anything else requiring input from user) make sure that the input is valid before accepting.
