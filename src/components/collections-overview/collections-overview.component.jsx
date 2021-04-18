import React from 'react'
import "./collections-overview.scss"
import Collection from "../../components/collection/collection.component"
import { connect } from "react-redux"
import { createStructuredSelector } from "reselect"
import { selectCollectionsForPreview } from "../../redux/shop/shop-selectors"


const CollectionsOverview = ({collections}) => {
    return (
        <div className="collections-overview">
        {collections.map(({ id, ...otherProps }) => (
            <Collection key={id} {...otherProps} />
          ))}
        </div>
    )
}

const mapStateToProps = createStructuredSelector({
    collections: selectCollectionsForPreview,
  })
  
  export default connect(mapStateToProps)(CollectionsOverview)
  