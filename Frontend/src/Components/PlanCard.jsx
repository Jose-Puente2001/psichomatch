import PropTypes from 'prop-types'; 

function PlanCard({ icon, title, price, features, iconName }) {
  return (
    <div
      className={`flex flex-col justify-start gap-6 items-center w-[350px]`}
    >
      <div>
        <img src={icon} alt={iconName} />
      </div>
      <div>
        <p className="text-3xl text-Gray-dark font-bold">${price}</p>
        <span>Dls/mes</span>
      </div>
      <div className="w-60">
        <h3 className="-ml-5 text-2xl font-semibold">{title}</h3>
        {features.map((feature, index) => (
          <ul key={index}>
            <li className="text-base font-medium text-black list-disc">
              {feature}
            </li>
          </ul>
        ))}
      </div>
    </div>
  );
}

PlanCard.propTypes = {
  icon: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  features: PropTypes.arrayOf(PropTypes.string).isRequired,
  iconName: PropTypes.string.isRequired,
};

export default PlanCard;
