import React from "react";
import { Link } from "react-router-dom";


const products = [
    {
        name: "DO Key chain",
        price: 5,
        image: "/sampleProduct.jpg",
        model: "/keychain.stl"
    },
    {
        name: "DO Key chain small",
        price: 5,
        image: "/sampleProduct.jpg",
        model: "/keychain_small.stl"
    },
    {
        name: "DO Glasses",
        price: 5,
        image: "/sampleProduct.jpg",
        model: "/glasses.stl"
    }
]


const Explore = () => {

    let renderedProducts = products.map((product) => (
        <div class="col-md-4">
            <div class="card" style={{width:"18rem"}}>
                <img src={product.image} className="card-img-top" alt={product.name} />
                <div className="card-body">
                    <h5 class="card-title">{product.name}</h5>
                    <h6 class="card-subtitle mb-2 text-muted">${product.price}</h6>
                    <p class="card-text">{/* Add short description? */}</p>
                    <Link class="btn btn-primary" to={`/explore`}>View in 3D</Link>
                </div>
            </div>
        </div>
    ))

    return (
        <div class="container-fluid" style={{margin: "20px"}}>
            <div class="row">
                {renderedProducts}
            </div>
        </div>
    )
}

export default Explore;