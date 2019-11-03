import React from 'react'
import {makeStyles} from '@material-ui/core/styles'
import Chart from 'react-apexcharts'

const useStyles = makeStyles(theme => ({
    container: {
        width: '100%',
        marginBottom: theme.spacing(2),
        marginTop: theme.spacing(1)
    },
}))

// returns string array representing names of all members of the group
function getMembersNames(group) {
	let names = [];
	for (let i = 0; i < group.groupMembers.length; i ++) {
		names.push(group.groupMembers[i].name);
	}
	return names;
}

// returns array representing amount owed by each group member. The array is ordered in such a way that it corresponds to members in the groupMember array.
function getMoneyOwedBy(group) {
	let money = [];
	for (let i = 0; i < group.groupMembers.length; i ++) {
		const debt = group.groupMembers[i].debt
		if (debt < 0){
			money.push(0)
		}
		else {
			money.push(-debt)
		}

	}
	return money;
}

// returns array representing amount owed to each group member by everyone else in the group. The array is ordered in such a way that it corresponds to members in the groupMember array.
function getMoneyOwedTo(group) {
	let money = [];
	for (let i = 0; i < group.groupMembers.length; i ++) {
		const debt = group.groupMembers[i].debt
		if (debt > 0){
			money.push(0)
		}
		else {
			money.push(-debt)
		}
	}
	return money;
}

// returns the absolute of the maximum amount owed to or owed by anyone in the group. If nothing is owed, return 5
function getMaxAmountOwed(group) {
	return group.groupMembers.reduce((max, member) => {
		const amount = Math.abs(member.debt)
		return max > amount ? max : amount
	}, 5);
}

export function Balances(props) {
    const { group, value, index } = props;
    const classes = useStyles();
	
	const state = {
	options: {
		chart: {
		  stacked: true
		},
		colors: ['#47A54D', '#DC4828'],
		plotOptions: {
		  bar: {
			horizontal: true,
			barHeight: '80%',
		  },
		},
		dataLabels: {
		  enabled: false
		},
		stroke: {
		  width: 1,
		  colors: ["#fff"]
		},

		grid: {
		  xaxis: {
			showLines: false
		  }
		},
		yaxis: {
		  min: -getMaxAmountOwed(group),
		  max: getMaxAmountOwed(group),
		  title: {
			// text: 'Age',
		  },
		},
		tooltip: {
		  shared: false,
		  x: {
			formatter: function (val) {
			  return val
			}
		  },
		  y: {
			formatter: function (val) {
			  return "$" + val
			}
		  }
		},
		xaxis: {
		  categories: getMembersNames(group),
		  title: {
			text: 'Money'
		  },
		  labels: {
			formatter: function (val) {
			  return "$" + Math.round(val * 100) / 100
			}
		  }
		}
	  },
	  series: [
		{
		  name: 'Amount owed by others',
		  data: getMoneyOwedTo(group)
		},
		{
		  name: 'Amount owed to others',
		  data: getMoneyOwedBy(group)
		}
	  ],
	}
	
    return (
        <div className={classes.container} role="tabpanel" hidden={index !== value}>
            <Chart options={state.options} series={state.series} type="bar" horizontal={true}/>
        </div>
    )
}


export default Balances;
