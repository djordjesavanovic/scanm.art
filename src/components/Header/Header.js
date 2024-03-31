import logo from '../../assets/img/logo.png';
import bag from '../../assets/img/bag.svg';
import { useBasketContext } from '../../context/BasketContext';
import PropTypes from 'prop-types';
import { useOffcanvasContext } from '../../context/OffcanvasContext';

const Badge = ({ amount }) => {
  return (
    <span
      className={
        'position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger'
      }
    >
      {amount}
    </span>
  );
};

Badge.propTypes = {
  amount: PropTypes.number.isRequired,
};

const Header = () => {
  const { items, basketID } = useBasketContext();
  const { toggleOffcanvas } = useOffcanvasContext();

  return (
    <div className={'row'}>
      <div className={'col-12 bg-white'}>
        <div className={'container'}>
          <div className={'row py-2'}>
            <div
              className={
                'col-12 d-flex align-items-center justify-content-between'
              }
            >
              <img
                src={logo}
                alt={'scanm.art Logo'}
                className={'img-fluid p-2'}
                style={{ maxHeight: 55 }}
              />
              {basketID && (
                <div
                  style={{ position: 'relative' }}
                  onClick={() => toggleOffcanvas()}
                >
                  {items && items.length > 0 && <Badge amount={items.length} />}
                  <img src={bag} alt={'Basket'} width={'32'} height={'32'} />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
