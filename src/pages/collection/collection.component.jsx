import React from "react"
import { connect } from "react-redux"

import { selectCollection } from "../../redux/shop/shop-selectors"

import CollectionItem from "../../components/collection-item/collection-item.component"

import "./collection.scss"
import { getByTitle } from "@testing-library/dom"

const CollectionPage = ({ collection }) => {
  const { title, items } = collection
  return (
    <div className="collection-page">
      <h2 className="title"> {title} </h2>
      <div className="items">
        {items.map((i) => (
          <CollectionItem key={i.id} item={i} />
        ))}
      </div>
    </div>
  )
}

const mapStateToProps = (state, ownProps) => ({
  collection: selectCollection(ownProps.match.params.collectionId)(state),
})

export default connect(mapStateToProps)(CollectionPage)
