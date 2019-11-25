For fields of a model "data" defined in the format of:
    data: {
        type: mongoose.Schema.Types.ObjectID,
        ref: 'some model name'
    }
Use ModelName.populate('data') to get the "data" object referenced with the id.

Example:
    Group.findById(id).populate('members.user').then( (group) => {
        let name = group.members[0].user.name //will have access to the User properties.
        let otherGroup = group.members[1].user.groups[0] // NOT VALID! because "groups" not populated
    })

When setting such data, simply assign the object id to it. e.g:
    group.members[i].user = user._id

Check server.js at app.get(/group/:id) and app.post(/group) for more examples.

