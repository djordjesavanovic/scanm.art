import logo from '../assets/img/logo.png';
import bag from '../assets/img/bag.svg';

const Header = () => {
	return (
		<div className={'row'}>
			<div
				className={'col-12 bg-white'}
			>
				<div className={'container'}>
					<div className={'row'}>
						<div className={'col-12 d-flex align-items-center justify-content-between'}>
							<img
								src={logo}
								alt={'scanm.art Logo'}
								className={'img-fluid p-2'}
								style={{maxHeight: 55}}
							/>
							<img
								src={bag}
								alt={'Basket'}
								width='32'
								height='32'
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Header;
