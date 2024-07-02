import classes from './left-tab.module.css'
function LeftTab() {
	return (
		<div className={classes.left}>
		
				<ul>
					<li>Farm</li>
					<li>Shop</li>
					<li>Casino</li>
					<li>Achievements</li>
					<li>Options</li>
					<li>Stats</li>
				</ul>
			
		</div>
	);
}
export default LeftTab;
