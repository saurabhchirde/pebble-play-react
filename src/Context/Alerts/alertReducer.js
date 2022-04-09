const alertReducer = (alertState, action) => {
  switch (action.type) {
    // all alerts
    // cart
    case "addToCartAlert":
      return {
        ...alertState,
        addToCartAlert: true,
      };

    case "hideAddToCartAlert":
      return {
        ...alertState,
        addToCartAlert: false,
      };

    case "removeFromCartAlert":
      return {
        ...alertState,
        removeFromCartAlert: true,
      };

    case "hideRemoveFromCartAlert":
      return {
        ...alertState,
        removeFromCartAlert: false,
      };

    case "cartEditedAlert":
      return {
        ...alertState,
        cartEditedAlert: true,
      };

    case "hideCartEditedAlert":
      return {
        ...alertState,
        cartEditedAlert: false,
      };

    case "alreadyInCart":
      return {
        ...alertState,
        alreadyInCart: true,
      };

    case "hideAlreadyInCart":
      return {
        ...alertState,
        alreadyInCart: false,
      };

    // wishlist
    case "addToWishlistAlert":
      return {
        ...alertState,
        addToWishlistAlert: true,
      };

    case "hideAddToWishlistAlert":
      return {
        ...alertState,
        addToWishlistAlert: false,
      };

    case "removeFromWishlistAlert":
      return {
        ...alertState,
        removeFromWishlistAlert: true,
      };

    case "hideRemoveFromWishlistAlert":
      return {
        ...alertState,
        removeFromWishlistAlert: false,
      };

    case "alreadyInWishlist":
      return {
        ...alertState,
        alreadyInWishlist: true,
      };

    case "hideAlreadyInWishlist":
      return {
        ...alertState,
        alreadyInWishlist: false,
      };

    // address
    case "addAddressAlert":
      return {
        ...alertState,
        addAddressAlert: true,
      };

    case "hideAddAddressAlert":
      return {
        ...alertState,
        addAddressAlert: false,
      };

    case "addressDeletedAlert":
      return {
        ...alertState,
        addressDeletedAlert: true,
      };

    case "hideAddressDeletedAlert":
      return {
        ...alertState,
        addressDeletedAlert: false,
      };

    default:
      return alertState;
  }
};

export { alertReducer };
