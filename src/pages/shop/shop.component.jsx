import React from "react"
import Shop_Data from "../../shopData"

import Collection from "../../components/collection/collection.component"
class ShopPage extends React.Component {
  constructor(props) {
    super()

    this.state = {
      collections: Shop_Data,
    }
  }

  render() {
    const { collections } = this.state
    return (
      <div className="shop-page">
        {collections.map(({ id, ...otherProps }) => (
          <Collection key={id} {...otherProps} />
        ))}
      </div>
    )
  }
}

export default ShopPage
