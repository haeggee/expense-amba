# team42: AM.BA app

## Summary
The objective of this app is to provide a simple and easy to use solution to help people keep track of expenses and bills within their friend groups/families. It keeps track of common expenses such as restuarant bills and determines who owes money and who is owed money. For example, if Joe paid for all of his friends to go to a restaurant where everyone spent $20 each, then that means everyone owes Joe $20. 

## Usage
When arriving at the Home page, you shall be greeted by beautiful animations. You will be initially be signed in as a user named "Alice". Clicking on the Accounts button will bring you to the accounts page (see limitations for details). Clicking on the log out button will log you out. Click the same button to go to the login page. Finally, click on the logo in the top left corner to go to the overview page. 

### Login Page
Here, you can either create a new account or log in. Creating a new account does not work as of yet (since it needs to check the DB if the account info is valid). To sign in, enter in "user" for both the username and password if you wish to sign in as a user, which brings you to the Overview page. Enter "admin" for both username and password if you wish to sign in as the administrator, which brings you to the Admin page. Note, however, that this page does not do anything yet, since it needs access to a database in order to modify information.

### Overview page
This is where most of the action happens. The menu on the left displays all the groups that Alice (the person you are signed in as) is in. The content in the centre displays informations about the currently selected group. Here, you can add members to the group by clicking '+', as well as delete a group at the top. 
Note that initially, only group "Family" has any bills, so they are the only group that have balances displayed in the diagram. Downloading the current state of the diagram can be accomplished by clicking on the menu icon in the top right of the menu. One can look at the Balances and see who is a net debtor and who is a net creditor. Clicking on "Bills" will bring you to a section that details all the bills in the group that are providing the expenses. Here, you can also delete a specific bill if you want to.
Finally, clicking on "Add another payment" button near the bottom opens a dialog for you to either record an expense/bill or to transfer money over to someone. When recording Bills, you can choose which members of the group are participating in the Bill. It will be recorded that YOU are paying for everyones expenses and thus everyone would now owe you money. For example, if the total bill is 50, and there are five participants (including yourself), everyone else will owe you $10, meaning that in total you will be owed $40 (its not $50 because you can not owe money towards yourself). There is also the option of not including yourself in the bill, meaning that you can pay for other people. For example, if you pick up the tab for Joe for $20, he will now owe you $20. If you click on "Payment To", it will allow you to repay money that you owe to others. You can even overpay them, so now they owe YOU money. All the other buttons and functionality on this Overview page should work. 

## Limitations
As of now, making changes to account information from the Accounts page will not update in other pages. 
