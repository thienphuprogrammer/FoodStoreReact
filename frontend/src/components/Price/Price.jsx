import React from "react";

const Price = ({ price, locale, currency }) => {
    const formatPrice = () =>
        new Intl.NumberFormat(locale, {
            style: "currency",
            currency,
            minimumFractionDigits: 0,
        }).format(price);

    return (
        <span>
            {formatPrice()}
        </span>
    );
}

Price.defaultProps = {
    locale: "en-US",
    currency: "USD",
}

export default Price;