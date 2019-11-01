
/** 
Class that represents a specific user. Has information such as the username, password, name, and email.
Also stores info on which group this user is in, etc.
*/
export default class User {
	
	/**
	 * Creates a new user.
	 * @param {username} The username. This should be used as a unique identifier for this user.
	 * @param {password} The password.
	 * @param {name} The name of this user.
	 * @param {email} The email address of this user.
	 */
	constructor(username, password, name, email) {
		this.username = username
		this.password = password
		this.name = name
		this.email = email
		
		// add more fields here such as account balance and which groups this user is in later
	}
	
}